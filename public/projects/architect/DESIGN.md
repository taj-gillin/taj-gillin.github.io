# Trading Game Design Document

## 1. Game Overview

The Trading Game is an Electron and React-based application that simulates a trading environment involving cards. Players, including a human user and several AI agents, participate in a game structured around distinct phases: Preparation, Setup, Bidding, Card Reveal, and Settlement.

The core gameplay appears to revolve around a "contract" (e.g., `SUM_OF_MIDDLE` mentioned in `src/main/game.ts`). Players likely trade this contract, with its value influenced by a set of community cards and individual player cards. Cards are dealt at the beginning of the game, with some initially hidden. Over time, these hidden cards are progressively revealed, impacting the perceived value of the contract and influencing trading decisions.

Players start with an initial monetary balance and aim to make profitable trades before the game concludes after a set duration. AI players can operate with different trading strategies.

Key files for understanding the game concept:
*   `src/core/game.ts`: Contains the primary game logic, state initialization, and phase management.
*   `src/main/game-engine.ts`: Manages the game lifecycle from the main process.
*   `src/core/types.ts`: Defines core data structures like `GameConfig`, `GameState`, `Card`, etc.

## 2. System Architecture

This section will detail the various systems that make up the Trading Game and how they interact.

### 2.1. Main Process

The Electron Main Process is the backbone of the application, responsible for managing the application's lifecycle, native OS interactions, and coordinating other processes.

*   **Entry Point**: `src/main/main.ts` (compiles to `dist/main/main.js`, specified in `package.json`).
*   **Core Responsibilities**:
    *   **Application Lifecycle**: Initializes Electron, creates the main browser window (`BrowserWindow`), and handles application-level events (e.g., `whenReady`, `window-all-closed`).
    *   **Window Management**: The `createWindow` function in `src/main/main.ts` configures and displays the primary UI window.
    *   **Game Orchestration**:
        *   It instantiates and maintains a global instance of the `GameEngine` (from `src/main/game-engine.ts`). This `GameEngine` is central to managing the game's state and flow.
        *   It registers various handlers for game-specific logic, including:
            *   General IPC handlers (`src/main/ipc-handlers.ts`).
            *   Contract-specific handlers (`src/main/contract-handlers.ts`).
            *   Game event handlers (`src/main/game.ts`).
    *   **Inter-Process Communication (IPC)**: Acts as the central hub for IPC, receiving messages from the Renderer Process and dispatching actions or data accordingly.
    *   **Preload Script Management**: Loads a preload script (`src/preload/index.ts` likely, compiled to `dist/preload/index.js`) into the renderer's web environment to securely expose specific Node.js/Electron APIs.

The Main Process sets up the environment where the game logic (managed by `GameEngine`) executes and coordinates communication with the user-facing Renderer Process.

### 2.2. Renderer Process

The Renderer Process is responsible for displaying the user interface (UI) and handling user interactions. Each `BrowserWindow` instance in Electron runs its own Renderer Process.

*   **UI Framework**: React (version 18.x, using Vite for development and bundling).
*   **Entry Point (HTML)**: `src/renderer/index.html` (serves as the base HTML file).
*   **Entry Point (JavaScript/TypeScript)**: `src/renderer/index.tsx` initializes the React application by rendering the main `App` component (`src/renderer/App.tsx`) into the DOM.
*   **Core Responsibilities**:
    *   **UI Rendering**: Uses React components (structured in `src/renderer/pages/` and `src/renderer/components/`) along with MUI and ShadCN/UI libraries for the visual presentation.
    *   **User Input**: Captures user actions (clicks, form submissions, etc.) within the React components.
    *   **State Management**: Manages UI-specific state. Global game state is received from the Main Process.
    *   **Routing**: `react-router-dom` (`HashRouter`) is used for client-side navigation between different views/pages of the application (e.g., `HomePage`, `GamePage`, `SettingsPage`). Defined in `src/renderer/App.tsx`.
    *   **Communication with Main Process**: Interacts with the Main Process via IPC mechanisms exposed by the preload script (`window.electron`). This is used to send requests (e.g., start a game, submit a trade) and receive updates (e.g., game state changes, market data).
*   **Styling**: Tailwind CSS is used for utility-first CSS, configured via `tailwind.config.js` and `postcss.config.js`.
*   **Key UI Files**:
    *   `src/renderer/App.tsx`: Main application component, sets up routing and global providers.
    *   `src/renderer/pages/GamePage.tsx`: The primary interface for gameplay.
    *   `src/renderer/index.tsx`: Mounts the React application to the DOM.

### 2.3. Inter-Process Communication (IPC) & Preload Script

Communication between the Main Process and the Renderer Process(es) is essential for the application to function. Electron's IPC mechanisms are used, secured by a preload script and context isolation.

*   **Preload Script (`src/preload/index.ts`)**:
    *   This script runs in the Renderer Process's web environment but has access to Node.js APIs and a limited connection to the Main Process.
    *   It is loaded by the `BrowserWindow` configuration in `src/main/main.ts`.
    *   Its primary role is to securely expose specific IPC functionalities to the Renderer code using `contextBridge.exposeInMainWorld('electron', { ... })`.
    *   This prevents the Renderer from having direct access to the entire `ipcRenderer` object or other Node.js/Electron internals, enhancing security.

*   **Exposed API (`window.electron`)**: The preload script makes an object available on `window.electron` in the Renderer process. This object provides controlled access to:
    *   `ipcRenderer.invoke(channel, ...args)`: For Renderer-to-Main two-way communication (request/response). Used for actions like starting the game (`'start-game'`), loading configuration (`'load-config'`), or placing trades (`'place-bid'`, `'place-ask'`).
    *   `ipcRenderer.on(channel, callback)`: For Main-to-Renderer one-way communication (event listening). Used for the Main process to send updates to the Renderer, such as game state changes (`'game-state-update'`) or timer updates (`'timer-update'`).
    *   `ipcRenderer.removeAllListeners(channel)`: To clean up event listeners.

*   **Main Process IPC Handlers**:
    *   The Main Process sets up handlers to respond to `invoke` calls and to send events using `ipcMain`.
    *   These handlers are defined in:
        *   `src/main/ipc-handlers.ts`: General application/IPC setup.
        *   `src/main/contract-handlers.ts`: For logic related to game contracts.
        *   `src/main/game.ts` (via `registerGameHandlers()`): For core game actions and events.
        *   `src/main/game-engine.ts`: While not directly registering IPC handlers itself, the `GameEngine` is invoked by these handlers to perform game logic operations.

*   **Data Flow Example (Starting Game)**:
    1.  User clicks a "Start Game" button in the React UI (`GamePage.tsx`).
    2.  `GamePage.tsx` calls `window.electron.ipcRenderer.invoke('start-game', config)`. 
    3.  The preload script relays this call to the Main Process.
    4.  An `ipcMain.handle('start-game', ...)` handler in `src/main/game.ts` or `src/main/ipc-handlers.ts` receives the request.
    5.  This handler likely calls a method on the global `gameEngine` instance (e.g., `global.gameEngine.startGame(config)`).
    6.  The `GameEngine` initializes the game, and the Main Process starts sending `game-state-update` events back to the Renderer via `mainWindow.webContents.send('game-state-update', newState)`.
    7.  `GamePage.tsx` (or another relevant component) listens for these `'game-state-update'` events using `window.electron.ipcRenderer.on('game-state-update', ...)` and updates the UI accordingly.

This structured IPC ensures a clear separation of concerns and secure communication between the different parts of the Electron application.

### 2.4. Game Logic System

The core game mechanics and state are managed by a two-tiered system primarily residing in the Main Process, with detailed logic encapsulated in a reusable core module.

**A. `GameEngine` (`src/main/game-engine.ts`) - The Orchestrator**

*   **Location**: Main Process (instantiated globally in `src/main/main.ts`).
*   **Role**: Acts as the primary interface and high-level manager for the game from the Main Process perspective.
*   **Responsibilities**:
    *   **Owns `Game` Instance**: Creates, holds, and manages the lifecycle of a `Game` object (from `src/core/game.ts`).
    *   **Lifecycle Management**: Handles requests (often from IPC handlers) to `start`, `stop`, `startGame` (with specific config), and `settleGame`. These actions are largely delegated to the `Game` instance.
    *   **State Access**: Provides methods (`getGameState`, `getMarketState`, `getAggregatedOrderBook`) to access current game information from the underlying `Game` instance. These are used by IPC handlers to respond to Renderer requests.
    *   **Action Broker**: Exposes methods for player actions like `placeBid`, `placeAsk`, `cancelOrder`. These calls are delegated to the `Game` instance. If actions result in trades, `GameEngine` emits further events.
    *   **Event Publishing (to Renderer)**: This is a crucial function.
        *   It listens for fine-grained events emitted by the `Game` instance (e.g., `card-revealed`, `trade-executed`, `orderbook-changed`, `game-phase-changed`).
        *   Upon receiving these events, or on a regular interval (for `game-state-update`), it formats the data and sends it to the Renderer Process via IPC channels (e.g., `'game-state-update'`, `'card-reveal'`, `'trade-executed'`, `'orderbook-update'`). See `publishGameState()`, `publishCardReveal()`, etc.

**B. `Game` (`src/core/game.ts`) - The Core Rules Engine**

*   **Location**: Core logic module, instantiated by `GameEngine` in the Main Process.
*   **Role**: Encapsulates the detailed rules, state, and progression of a single game session. It is designed to be independent of Electron or specific UI implementations.
*   **Key Components & Responsibilities**:
    *   **State Management**:
        *   Maintains the definitive `GameState` (player data, cards, current phase, contract details) and `MarketState` (order books, trade history).
        *   Initialized by `initializeGameState()` using a `GameConfig` (from `src/core/types.ts`).
    *   **Game Loop (`update()`)**: This internal method is called rapidly (e.g., every 50ms) by an interval timer started by `Game.start()`.
        *   Manages game time (`state.elapsed`).
        *   Handles game phase transitions (e.g., Preparation -> Bidding -> Settlement).
        *   Triggers periodic card reveals (`checkCardReveals()`) based on configured intervals.
        *   Initiates AI player actions via the `GameAIAdapter` (`runAITrading()`).
        *   Updates market prices/contract values (`updateMarketPrices()`, `calculateContractValue()`).
    *   **Card Mechanics**: Manages the `deck`, dealing cards (`dealCardsFromDeck`, `dealPlayerCards`), and progressive card revelation logic.
    *   **Order Matching & Market Logic**: 
        *   Handles `placeBid`, `placeAsk`, `cancelOrder` requests.
        *   Contains the `matchOrder()` logic to match buy/sell orders, generate `Trade`s, and update player balances and order statuses.
        *   Maintains buy/sell order books within `this.market.orders`.
    *   **AI Integration**: Interacts with an `aiAdapter` (`GameAIAdapter` instance) to get AI decisions and execute them.
    *   **Contract Valuation**: Uses a `contractAdapter` (`ContractAdapter` instance) to determine contract values based on game state (e.g., revealed cards).
    *   **Event Emission**: Uses an internal event system (e.g., `onCardRevealed` and listeners) to notify its owner (`GameEngine`) about significant game events like card reveals, trades, etc. `GameEngine` then relays these to the Renderer.

**Game Execution Flow (Simplified)**:

1.  `GameEngine.startGame(config)` is called (e.g., by an IPC handler).
2.  `GameEngine` creates a new `Game(config)` instance.
3.  `GameEngine` calls `game.start()`.
4.  `Game.start()` initializes its state, starts its internal `update()` loop, and begins the game (e.g., in `PREPARATION` phase).
5.  The `Game.update()` loop drives game progression: time, card reveals, AI turns, market updates.
6.  As events occur in `Game` (e.g., a card is revealed), it emits an internal event.
7.  `GameEngine` listens for these events and uses IPC to send updates (`'card-reveal'`, `'game-state-update'`, etc.) to the Renderer process.
8.  Player actions from the Renderer (e.g., placing a bid) go via IPC to handlers in the Main Process, which call methods on `GameEngine` (e.g., `gameEngine.placeBid()`), which in turn calls methods on the `Game` instance (`game.placeBid()`).

### 2.5. AI System

The game incorporates AI players that participate in trading alongside the human player. The AI system is designed to be modular, allowing for different trading strategies.

*   **Location**: Core AI logic resides in `src/core/ai/`.
*   **Configuration (`GameConfig` in `src/core/types.ts`)**:
    *   The `ai` section of `GameConfig` allows specifying:
        *   `count`: Total number of AI players.
        *   `players`: An array to configure individual AI agents, including their `id`, `strategyType` (e.g., 'random', 'monte_carlo', 'bayesian'), and strategy-specific `strategyConfig`.
        *   `defaultStrategy`: A fallback strategy if one isn't specified for an AI.
        *   `updateFrequency`: Determines how often AI agents attempt to take actions.

*   **Key Components**:
    1.  **`GameAIAdapter` (`src/core/ai/game-adapter.ts`)**: 
        *   Acts as the bridge between the `Game` class and the AI strategy logic.
        *   Instantiated as a singleton and used by the `Game` instance.
        *   Its primary method, `executeAITrading(aiPlayer, gameState, marketState, strategyType, executors)`, is called by the `Game`'s update loop (`runAITrading`) for each AI player.
        *   It prepares a simplified `GameInfo` object (from `src/core/ai/types.ts`) tailored for the AI, containing relevant game state (cards, market, phase, etc.).
        *   It invokes the `StrategyManager` to get the next action for the AI based on its `strategyType`.
        *   It then executes the chosen action (e.g., place bid, place ask) using executor functions passed in by the `Game` class (which directly manipulate the game state/market).
        *   It keeps a record of recent AI actions.

    2.  **`StrategyManager` (`src/core/ai/strategy-manager.ts`)**: 
        *   Manages the available AI trading strategies. It is designed as a singleton.
        *   `initialize()`: Registers different strategy implementations by mapping `AIStrategyType` enums (e.g., `RANDOM`, `MONTE_CARLO`, `BAYESIAN` from `src/core/ai/strategy-manager.ts` or `src/core/ai/types.ts`) to concrete strategy class instances.
        *   `getNextAction(strategyType, gameInfo)`: Retrieves the appropriate strategy object based on the `strategyType` and calls its `getNextAction` method, passing the `gameInfo`.

    3.  **`AIStrategy` Interface (`src/core/ai/strategy-manager.ts`)**:
        *   Defines the common interface for all AI strategy implementations: `getNextAction(gameInfo: GameInfo): AnyAIAction;`.
        *   `AnyAIAction` (from `src/core/ai/types.ts`) defines the structure of actions an AI can take (e.g., type, price, volume, probability).

    4.  **Strategy Implementations (currently inline in `src/core/ai/strategy-manager.ts`)**:
        *   **`RandomStrategy`**: A basic strategy that makes somewhat random trading decisions (place bid/ask, accept order) based on a simple heuristic for fair value estimation.
        *   **`MonteCarloStrategy`**: A more advanced strategy placeholder. It intends to use simulations (currently a heuristic) to estimate fair value and make more informed trading decisions, often with a tighter price spread and different action probabilities.
        *   **`BayesianStrategy`**: Another placeholder for a strategy likely based on Bayesian inference to update beliefs and make decisions.
        *   These strategies are instantiated by the `StrategyManager` during its initialization.

*   **Execution Flow (AI Turn)**:
    1.  The `Game`'s `runAITrading()` method iterates through AI players.
    2.  For each AI, it calls `GameAIAdapter.executeAITrading()`, passing the AI's current state, the overall game/market state, the AI's configured `strategyType`, and executor functions.
    3.  The `GameAIAdapter` calls `StrategyManager.getNextAction()`, providing the `strategyType` and a prepared `GameInfo` object.
    4.  The `StrategyManager` selects the correct `AIStrategy` implementation based on `strategyType`.
    5.  The selected strategy's `getNextAction(gameInfo)` method is called, which analyzes the `gameInfo` and returns an `AnyAIAction` (e.g., a bid, an ask, or do nothing).
    6.  The `GameAIAdapter` receives this action and, after checking its probability, uses the provided executor functions to apply the action to the game (e.g., call `game.placeBid()`).

*   **Note on Current Implementation**: While `src/core/ai/strategy-manager.ts` defines a robust manager and several strategy skeletons, the `GameAIAdapter` in `src/core/ai/game-adapter.ts` currently uses a simplified, inline version of `StrategyManager` with only basic random behavior. The full, more sophisticated `StrategyManager` is not yet actively used by the `GameAIAdapter`, indicating this area might be under development or refactoring.

### 2.6. Contract System

The game revolves around trading a specific financial "contract" whose value is derived from the state of the game, particularly the revealed cards. The system is designed to be flexible, supporting various types of contracts.

*   **Location**: Core contract logic is in `src/core/contracts/`, with IPC handlers in `src/main/contract-handlers.ts`.
*   **Key Components**:
    1.  **`ContractAdapter` (`src/core/contracts/adapter.ts`)**: 
        *   A singleton that serves as the primary interface for the `Game` logic to interact with the contract system.
        *   It resolves contract IDs (handling legacy types), and delegates valuation to the `ContractRegistry`.
        *   Provides methods to get contract details (name, description) and list all available contracts.
        *   Supports registration of custom contract definitions.

    2.  **`ContractRegistry` (`src/core/contracts/registry.ts`)**: 
        *   A singleton that stores all known `ContractDefinition`s (both built-in and custom-defined).
        *   Loads built-in contract definitions (likely from `src/core/contracts/built-in/`).
        *   Responsible for invoking the specific valuation logic (`calculate` or `estimate` functions) of a requested contract.

    3.  **`ContractDefinition` (structure defined in `src/core/contracts/types.ts`)**: 
        *   Specifies the properties of a contract: `id`, `name`, `description`.
        *   `cardSource`: Defines which set of cards (e.g., community, player hand) are used for valuation.
        *   `operations`: A sequence of operations (e.g., get value, check color) applied to the selected cards.
        *   `finalAggregator`: A function (e.g., sum, average) to combine the results of the operations into a final contract value.
        *   Includes `calculate(gameState)` and `estimate(gameState, hiddenInfo)` functions that implement the valuation logic.

    4.  **`ContractFactory` (`src/core/contracts/factory.ts`)**: 
        *   Likely used by the `ContractRegistry` to construct the executable `calculate` and `estimate` functions for contract definitions, especially for custom contracts.

    5.  **Built-in Contracts (`src/core/contracts/built-in/`)**: 
        *   This directory contains predefined contract definitions for standard game contracts (e.g., "Sum of Middle Cards").

    6.  **IPC Handlers (`src/main/contract-handlers.ts`)**: 
        *   Exposes contract-related functionalities to the Renderer process:
            *   `'get-all-contracts'`: Fetches all registered contracts for display (e.g., for user selection).
            *   `'save-contract-definition'`: Allows the renderer to send a custom contract definition to be saved and registered.
            *   `'load-custom-contracts'`: Loads and registers custom contracts from persistent storage (e.g., `custom-contracts.json`) at application startup.
            *   `'delete-custom-contract'`: Removes a custom contract.
*   **Workflow**:
    1.  Renderer requests available contracts (`'get-all-contracts'`).
    2.  Main process (via `contract-handlers.ts` and `ContractAdapter`) returns the list.
    3.  User selects a contract; its `contract_id` is included in `GameConfig` for a new game.
    4.  `Game` instance uses its `ContractAdapter` to get valuations by passing the `contract_id` and current `GameState`.
    5.  `ContractAdapter` uses `ContractRegistry` to execute the specific contract's logic.


### 2.7. Key Data Structures

Several key data structures define the state and configuration of the game and its components. These are primarily defined in `src/core/types.ts` (shared between core logic and potentially renderer via adaptations), `src/shared/types.ts` (if distinct, for direct IPC), `src/core/ai/types.ts`, and `src/core/contracts/types.ts`.

*   **Core Game State & Configuration (`src/core/types.ts`, potentially mirrored/adapted from `src/shared/types.ts`)**:
    *   `GameConfig`: Defines the parameters for a game session, including duration, initial player balances, card distribution rules (player cards, community cards, reveal intervals), AI player configurations (count, strategy types), and the `contract_id` to be used.
    *   `GameState`: Represents the complete current state of an active game. Includes `elapsed` time, current `phase` (e.g., `BIDDING`, `SETTLEMENT`), `communityCards`, an array of `players` (each with `PlayerState`), `currentContract` details (ID, bid/ask), and `revealState` for card reveals.
    *   `PlayerState`: Details for each player, including `id`, `balance`, their hand of `cards`, and AI-specific properties like `strategyType`.
    *   `Card`: Represents a single playing card with `suit`, `value`, `displayName`, and boolean flags like `isVisible`, `isRed`, `isFace`, `isPrime`.
    *   `MarketState`: Contains the order books (`orders: { buy: Order[], sell: Order[] }`) and a list of executed `trades` (`Trade[]`).
    *   `Order`: Represents a bid or ask in the market, with `id`, `player_id`, `price`, `volume`, `timestamp`, `isBuy` flag, and `status`.
    *   `Trade`: Represents an executed trade between a buyer and seller, with `id`, `buyer_id`, `seller_id`, `price`, `volume`, and `timestamp`.
    *   `GamePhase`: Enum defining the different stages of the game (e.g., `SETUP`, `PREPARATION`, `BIDDING`, `REVEAL`, `SETTLEMENT`, `FINISHED`).

*   **AI System (`src/core/ai/types.ts`)**:
    *   `GameInfo`: A distilled version of game state provided to AI strategies for decision-making, containing relevant aspects of `GameState` and `MarketState` tailored for an AI's perspective.
    *   `AIActionType`: Enum for possible AI actions (e.g., `PLACE_BID`, `ACCEPT_ASK`, `DO_NOTHING`).
    *   `AnyAIAction`: A union type representing the structure for different AI actions, including parameters like `price`, `volume`, `orderId`, and `probability`.

*   **Contract System (`src/core/contracts/types.ts`)**:
    *   `ContractDefinition`: The schema for defining a tradable contract. Includes `id`, `name`, `description`, `cardSource` (which cards to use), an array of `operations` (transformations/filters on cards), a `finalAggregator` (to combine results), and the core `calculate(gameState)` and `estimate(visibleState, hiddenInfo)` functions.
    *   `Operation`: Defines a step in contract valuation, like filtering cards or extracting values.
    *   `Aggregator`: Defines how to combine processed card data into a single numerical value for the contract.

These data structures are fundamental to the game's operation, passed between systems (e.g., `GameState` from Main to Renderer via IPC, `GameConfig` to initialize a game), and manipulated by the core logic.

### 2.8. Configuration Management and Persistence

The game allows for configuration of game parameters and persistence of user-defined elements like custom trading contracts.

*   **Game Configuration (`GameConfig`)**:
    *   **Definition**: The `GameConfig` interface (in `src/core/types.ts`) structures all parameters for a game session.
    *   **Loading**: The `GameEngine` is initialized with or can be updated with a `GameConfig`. The Renderer can request the current configuration from the Main process using the `'load-config'` IPC channel (handled in `src/main/contract-handlers.ts`).
    *   **Saving**: The Renderer can send an updated `GameConfig` to the Main process via the `'save-config'` IPC channel, which then calls `gameEngine.updateConfig()`. The persistence of this `GameConfig` across application sessions (e.g., to a file) is not explicitly detailed but could be a feature of `gameEngine.updateConfig()` or handled separately if such a requirement exists.

*   **Custom Contract Persistence**: 
    *   **Mechanism**: The system allows users to define their own trading contracts. These custom definitions are persisted as JSON.
    *   **Storage**: Custom contract definitions are saved to and loaded from a `custom-contracts.json` file in the application's user data directory (logic inferred from `src/main/contract-handlers.ts`). The `src/core/contracts/persistence.ts` file likely contains helper functions for these file operations.
    *   **Management via IPC (`src/main/contract-handlers.ts`)**:
        *   `'load-custom-contracts'`: On application startup, this handler (if invoked or called internally) loads definitions from `custom-contracts.json` and registers them with the `ContractRegistry` via `ContractAdapter.registerCustomContract()`.
        *   `'save-contract-definition'`: When a user creates or edits a contract in the Renderer, this handler receives the definition, validates it using `ContractAdapter.registerCustomContract()`, and then saves it to `custom-contracts.json`.
        *   `'delete-custom-contract'`: Allows removal of a custom contract definition from the `custom-contracts.json` file and potentially from the live `ContractRegistry`.
    *   **Dynamic Registration**: This persistence mechanism, combined with the `ContractAdapter.registerCustomContract()` method, allows the game to dynamically extend its available contract types without code changes.

This approach to configuration and persistence provides flexibility for game setup and empowers users to create and share their own contract types.

*(Further sections will be added here as we explore the codebase: Main Process, Renderer Process, Game Logic System, AI System, IPC, etc.)*
