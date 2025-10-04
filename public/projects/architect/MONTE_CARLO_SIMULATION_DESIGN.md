# Monte Carlo Simulation Design for AI Contract Valuation

## 1. Overview and Objectives

This document outlines the plan to enhance the `MonteCarloStrategy` within the AI system of the Trading Game. The primary objective is to replace heuristic-based fair value estimation with a Monte Carlo simulation approach to predict the final value of the active game contract.

**Key Goals**:

*   **Simulation-Based Prediction**: The AI will run multiple simulation rollouts to estimate the contract's final value based on the probable outcomes of unknown card reveals.
*   **"Anytime" Algorithm**: The simulation process will be iterative. The AI's estimate of the contract value will improve as more simulations are run over successive turns. The AI will be able to make trading decisions using its current best estimate while simulations continue to refine it.
*   **Initial Focus**: For now, the simulation will focus on predicting the contract value based on community card and the AI's own card reveals. It will not initially model or predict the actions of opposing players within the rollouts.
*   **Integration**: The simulation logic will be integrated into the existing `MonteCarloStrategy` class.

## 2. AI Strategy Types

The Trading Game supports multiple AI strategy types, each with different approaches to market analysis and trading decisions:

### 2.1. Random Strategy

The simplest strategy that makes trading decisions based on random factors and basic heuristics:

```typescript
interface RandomStrategyConfig extends AIStrategyConfig {
    // Basic trading parameters
    minBidPrice: number;        // Minimum price to place bids
    maxAskPrice: number;        // Maximum price to place asks
    positionLimit: number;      // Maximum position size
    actionProbability: number;  // Base probability of taking any action
}
```

**Key Characteristics**:
- Uses simple heuristics for fair value estimation
- Randomly decides between placing bids, asks, or doing nothing
- Limited market analysis
- Good for testing and as a baseline opponent

### 2.2. Monte Carlo Strategy

The focus of this document, using simulation-based prediction:

```typescript
interface MonteCarloStrategyConfig extends AIStrategyConfig {
    // Simulation settings
    simulationsPerTurn: number;      // Number of simulations per turn
    minSimulationsForConfidence: number; // Minimum simulations before making decisions
    
    // Risk tolerance (0-1)
    riskTolerance: number;           // How aggressive the AI is in taking positions
    
    // Trading parameters
    spreadPercentage: number;        // Desired spread between bid/ask
    positionLimit: number;           // Maximum position size
    volumePreference: number;        // Preference for larger trades (0-1)
    
    // Personality traits
    aggressiveness: number;          // How aggressively to price orders (0-1)
    patience: number;                // How long to wait for better prices (0-1)
    confidenceThreshold: number;     // Required confidence to take action (0-1)
}
```

**Key Characteristics**:
- Uses Monte Carlo simulation to predict contract values
- Maintains state across turns to improve predictions
- Adapts trading behavior based on confidence levels
- Supports different personality profiles (Conservative, Balanced, Aggressive)

### 2.3. Bayesian Strategy

A more sophisticated approach using Bayesian inference:

```typescript
interface BayesianStrategyConfig extends AIStrategyConfig {
    // Learning parameters
    learningRate: number;           // How quickly to update beliefs
    priorStrength: number;          // Weight of prior beliefs vs new evidence
    
    // Market analysis
    marketMemorySize: number;       // Number of past trades to consider
    volatilityThreshold: number;    // Threshold for market volatility
    
    // Trading parameters
    positionLimit: number;          // Maximum position size
    profitTarget: number;           // Target profit per trade
    stopLoss: number;              // Maximum loss per trade
}
```

**Key Characteristics**:
- Maintains and updates beliefs about market conditions
- Uses Bayesian inference to update predictions
- Adapts to changing market conditions
- More sophisticated risk management

### 2.4. Arbitrage Strategy

Specializes in identifying and exploiting price discrepancies:

```typescript
interface ArbitrageStrategyConfig extends AIStrategyConfig {
    // Arbitrage parameters
    minProfitThreshold: number;     // Minimum profit to trigger arbitrage
    maxPositionSize: number;        // Maximum position for arbitrage
    maxHoldingTime: number;         // Maximum time to hold arbitrage position
    
    // Risk management
    maxExposure: number;            // Maximum total exposure
    stopLoss: number;              // Stop loss for arbitrage positions
}
```

**Key Characteristics**:
- Focuses on price discrepancies between different contracts
- Quick execution of trades
- Strict risk management
- Short holding periods

### 2.5. Market Making Strategy

Specializes in providing liquidity and profiting from spreads:

```typescript
interface MarketMakingStrategyConfig extends AIStrategyConfig {
    // Market making parameters
    targetSpread: number;           // Target spread to maintain
    inventoryTarget: number;        // Target inventory level
    maxInventory: number;           // Maximum inventory allowed
    
    // Risk parameters
    maxPositionSize: number;        // Maximum position size
    rebalanceThreshold: number;     // Threshold to trigger rebalancing
}
```

**Key Characteristics**:
- Maintains continuous bid and ask orders
- Manages inventory to stay neutral
- Adjusts spreads based on market conditions
- Focuses on consistent small profits

## 3. Strategy Configuration and Settings

### 3.1. Strategy Types and Personality Traits

The Monte Carlo strategy can be configured with different personality traits that affect its trading behavior:

```typescript
interface MonteCarloStrategyConfig extends AIStrategyConfig {
    // Simulation settings
    simulationsPerTurn: number;      // Number of simulations per turn (default: 100)
    minSimulationsForConfidence: number; // Minimum simulations before making decisions (default: 50)
    
    // Risk tolerance (0-1)
    riskTolerance: number;           // How aggressive the AI is in taking positions
    
    // Trading parameters
    spreadPercentage: number;        // Desired spread between bid/ask (default: 0.03)
    positionLimit: number;           // Maximum position size (default: 10)
    volumePreference: number;        // Preference for larger trades (0-1)
    
    // Personality traits
    aggressiveness: number;          // How aggressively to price orders (0-1)
    patience: number;                // How long to wait for better prices (0-1)
    confidenceThreshold: number;     // Required confidence to take action (0-1)
}
```

### 3.2. Personality Profiles

The strategy supports different personality profiles that combine these traits:

1. **Conservative Trader**:
   ```typescript
   {
       riskTolerance: 0.3,
       spreadPercentage: 0.05,
       positionLimit: 5,
       volumePreference: 0.3,
       aggressiveness: 0.2,
       patience: 0.8,
       confidenceThreshold: 0.8
   }
   ```

2. **Balanced Trader**:
   ```typescript
   {
       riskTolerance: 0.5,
       spreadPercentage: 0.03,
       positionLimit: 10,
       volumePreference: 0.5,
       aggressiveness: 0.5,
       patience: 0.5,
       confidenceThreshold: 0.6
   }
   ```

3. **Aggressive Trader**:
   ```typescript
   {
       riskTolerance: 0.8,
       spreadPercentage: 0.02,
       positionLimit: 15,
       volumePreference: 0.7,
       aggressiveness: 0.8,
       patience: 0.3,
       confidenceThreshold: 0.4
   }
   ```

### 3.3. Dynamic Parameter Adjustment

The strategy will dynamically adjust its parameters based on:

1. **Market Conditions**:
   - Increase spread in high volatility
   - Reduce position size in low liquidity
   - Adjust aggressiveness based on market sentiment

2. **Simulation Results**:
   - Increase confidence threshold if simulation variance is high
   - Adjust position size based on confidence in fair value
   - Modify spread based on expected profit potential

3. **Game Phase**:
   - More conservative in early game
   - More aggressive near settlement
   - Adjust patience based on time remaining

## 4. Proposed Changes to `MonteCarloStrategy`

The `MonteCarloStrategy` is currently defined in `DESIGN.md` (originally found in `src/core/ai/strategy-manager.ts`). We will modify it as follows:

### 4.1. New Persistent State in `MonteCarloStrategy`

The class instance will need to maintain state across turns:

*   `totalSimulationsRun: number = 0;`
*   `sumOfSimulatedValues: number = 0;`
*   `estimatedFairValue: number;` (Can be initialized with the old heuristic or a neutral value like 100).
*   `contractAdapter: ContractAdapter;` (To be initialized in the constructor).
*   `deckTemplate: Card[];` (A full, ordered deck of 52 cards, used as a template for generating unknown card pools).

### 4.2. Configuration Parameters

*   `SIMULATIONS_PER_TURN_BATCH: number = 100;` (Or other suitable value): The number of new simulation rollouts to execute each time the AI's `getNextAction` method is called. This allows the "anytime" improvement.

### 4.3. Constructor Modification

*   The constructor will initialize `this.contractAdapter = ContractAdapter.getInstance();`.
*   It will also initialize `this.deckTemplate` by creating a standard 52-card deck (logic similar to `Game.createDeck()`).
*   Initialize `this.estimatedFairValue` (e.g., to 100 or using its previous simple heuristic).

### 4.4. Modified `getNextAction` Method

```typescript
// Inside MonteCarloStrategy class
public getNextAction(gameInfo: GameInfo): AnyAIAction {
    // 1. Run a new batch of simulations to update the estimate
    this.runSimulationBatch(gameInfo, SIMULATIONS_PER_TURN_BATCH);

    // 2. Update the estimated fair value
    if (this.totalSimulationsRun > 0) {
        this.estimatedFairValue = this.sumOfSimulatedValues / this.totalSimulationsRun;
    }
    // console.log(`AI ${gameInfo.currentPlayer.id} (MonteCarlo): Ran ${this.totalSimulationsRun} total simulations. Estimated FV: ${this.estimatedFairValue.toFixed(2)}`);

    // 3. Use this.estimatedFairValue to make trading decisions
    // (The existing logic for placing bids/asks, accepting orders, etc., will be adapted
    //  to use this.estimatedFairValue instead of a simpler heuristic calculation)
    //  Example:
    //    const spreadPercentage = 0.03; // 3% spread
    //    const bidPrice = Math.floor(this.estimatedFairValue * (1 - spreadPercentage));
    //    const askPrice = Math.ceil(this.estimatedFairValue * (1 + spreadPercentage));
    //    // ... rest of decision logic ...

    // Placeholder for actual decision logic using the new estimatedFairValue
    return {
        type: AIActionType.DO_NOTHING,
        probability: 1.0
    };
}
```

### 4.5. New `runSimulationBatch` Method

This is the core of the Monte Carlo simulation.

```typescript
// Inside MonteCarloStrategy class
private runSimulationBatch(gameInfo: GameInfo, batchSize: number): void {
    const activeContractId = gameInfo.contractId;
    if (!activeContractId) {
        console.warn("MonteCarloStrategy: No active contract ID in gameInfo.");
        return;
    }

    // 1. Identify Known Cards from gameInfo
    const myPlayer = gameInfo.currentPlayer;
    const knownPlayerHand: Card[] = myPlayer.cards;
    const knownCommunityCards: Card[] = gameInfo.communityCards.filter(c => c.isVisible);

    // 2. Determine Unknown Card Pool
    // Start with a fresh copy of the full deck template
    let unknownCardPool: Card[] = [...this.deckTemplate];
    // Remove cards known to this AI (its hand and visible community cards)
    const allKnownCards = [...knownPlayerHand, ...knownCommunityCards];
    unknownCardPool = unknownCardPool.filter(deckCard => 
        !allKnownCards.some(knownCard => knownCard.suit === deckCard.suit && knownCard.value === deckCard.value)
    );

    // 3. Get Game Configuration for card counts (from gameInfo, requires GameConfig to be part of it)
    //    Assuming gameInfo.gameConfig.cards contains player_cards, community_cards counts
    //    This part needs to ensure gameInfo is populated with gameConfig or has direct access to these numbers.
    //    For now, let's assume these are available:
    const totalCommunityCards = gameInfo.config?.community_cards || 5; // Fallback, ensure this path
    const numCommunityCardsToSimulate = totalCommunityCards - knownCommunityCards.length;

    if (numCommunityCardsToSimulate < 0) {
        // All community cards already known, prediction should be fairly stable
        // Potentially run fewer simulations or just use contractAdapter.calculateContractValue directly
        // For now, we'll proceed, but it implies the contract is already largely determined.
    }

    for (let i = 0; i < batchSize; i++) {
        // Create a mutable copy of the unknown pool for this simulation run
        let currentSimPool = [...unknownCardPool];
        // Shuffle the pool for this specific simulation to ensure randomness
        for (let j = currentSimPool.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [currentSimPool[j], currentSimPool[k]] = [currentSimPool[k], currentSimPool[j]];
        }

        // a. Simulate a full set of community cards
        const simulatedNewCommunityCards: Card[] = currentSimPool.slice(0, Math.max(0, numCommunityCardsToSimulate));
        const completeSimulatedCommunityCards: Card[] = [...knownCommunityCards, ...simulatedNewCommunityCards];
        
        // Ensure all simulated cards are marked as visible for the calculation
        completeSimulatedCommunityCards.forEach(c => c.isVisible = true);
        knownPlayerHand.forEach(c => c.isVisible = true);


        // b. Construct Simulated State for Valuation
        // This needs to match the structure ContractDefinition.calculate expects (GameState)
        // We are focusing on contract value based on community cards + AI's own hand (if relevant for contract)
        const simulatedGameState: GameState = {
            // Essential fields for ContractAdapter.calculateContractValue via getCardsBySource
            communityCards: completeSimulatedCommunityCards,
            players: [ // Only need current player if contract uses player cards
                {
                    ...myPlayer,
                    cards: knownPlayerHand // AI's own cards
                }
                // If contracts can depend on other players' hands, those would need simulation too (future enhancement)
            ],
            phase: GamePhase.SETTLEMENT, // Ensures contract calculation uses all cards as if game ended

            // Other GameState fields that might be accessed by a contract's calculate function
            // (These might need default/dummy values if not directly relevant to card-based valuation)
            elapsed: gameInfo.elapsed,
            currentContract: { // Essential for the contract adapter
                contractId: activeContractId,
                currentBid: 0, // Not relevant for final value calculation
                currentAsk: 0  // Not relevant for final value calculation
            },
            // Ensure all parts of GameState that ContractDefinition.calculate might touch are present
            // Add default/empty values for other fields if necessary to satisfy the type.
             revealState: { communityCardsToReveal: [], playerCardsToReveal: [], lastCommunityReveal: 0, lastPlayerReveal: 0 },
             // config: gameInfo.config // if contract needs config
        };
        
        // c. Calculate Contract Value
        try {
            const simulatedValue = this.contractAdapter.calculateContractValue(activeContractId, simulatedGameState);
            this.sumOfSimulatedValues += simulatedValue;
            this.totalSimulationsRun++;
        } catch (error) {
            console.error(`MonteCarloStrategy: Error during contract value calculation in simulation:`, error);
            // Decide how to handle: skip this run, count as 0, etc. For now, just log and skip.
        }
    }
}
```

## 5. Trading Decision Logic

### 5.1. Order Placement Strategy

```typescript
private determineOrderAction(gameInfo: GameInfo): AnyAIAction {
    const currentPrice = (gameInfo.currentBid + gameInfo.currentAsk) / 2;
    const fairValue = this.estimatedFairValue;
    const confidence = this.calculateConfidence();
    
    // Calculate optimal prices
    const bidPrice = this.calculateOptimalEntryPrice(
        fairValue,
        this.config.spreadPercentage,
        'bid',
        this.config.aggressiveness
    );
    
    const askPrice = this.calculateOptimalEntryPrice(
        fairValue,
        this.config.spreadPercentage,
        'ask',
        this.config.aggressiveness
    );
    
    // Calculate position size
    const positionSize = this.calculateRiskAdjustedPositionSize(
        this.config.positionLimit,
        this.config.riskTolerance,
        this.config.volumePreference,
        gameInfo.currentPlayer.position,
        this.config.positionLimit
    );
    
    // Determine action based on confidence and market conditions
    if (confidence < this.config.confidenceThreshold) {
        return {
            type: AIActionType.DO_NOTHING,
            probability: 1.0
        };
    }
    
    // Place orders based on fair value comparison
    if (currentPrice < fairValue * 0.95) {
        return {
            type: AIActionType.PLACE_BID,
            price: bidPrice,
            volume: positionSize,
            probability: this.calculateExecutionProbability('bid', bidPrice, gameInfo)
        };
    } else if (currentPrice > fairValue * 1.05) {
        return {
            type: AIActionType.PLACE_ASK,
            price: askPrice,
            volume: positionSize,
            probability: this.calculateExecutionProbability('ask', askPrice, gameInfo)
        };
    }
    
    return {
        type: AIActionType.DO_NOTHING,
        probability: 1.0
    };
}
```

### 5.2. Confidence Calculation

```typescript
private calculateConfidence(): number {
    if (this.totalSimulationsRun < this.config.minSimulationsForConfidence) {
        return 0;
    }
    
    // Calculate standard deviation of simulated values
    const mean = this.sumOfSimulatedValues / this.totalSimulationsRun;
    const variance = this.simulatedValues.reduce((sum, val) => 
        sum + Math.pow(val - mean, 2), 0) / this.totalSimulationsRun;
    const stdDev = Math.sqrt(variance);
    
    // Convert to confidence score (0-1)
    const coefficientOfVariation = stdDev / mean;
    return Math.max(0, 1 - coefficientOfVariation);
}
```

## 6. Dependencies and Assumptions

*   **`GameInfo` Structure**: The `GameInfo` object passed to `getNextAction` must contain (or provide access to):
    *   Current player's state (`currentPlayer`).
    *   Visible community cards (`communityCards`).
    *   The active `contractId`.
    *   Game configuration details, specifically `gameInfo.config.cards.community_cards` (total number of community cards for the game). This implies that `GameConfig` or relevant parts of it are included when `GameInfo` is constructed in `GameAIAdapter`.
*   **`ContractAdapter.calculateContractValue`**: This method must correctly use the `gameState.phase = GamePhase.SETTLEMENT` to value the contract based on all cards provided in the `simulatedGameState` (community and relevant player cards), assuming them all to be visible for the purpose of that calculation. The existing `getCardsBySource` utility used by contracts should handle this if it checks for `GamePhase.SETTLEMENT`.
*   **Card Uniqueness in Simulation**: The method for creating `unknownCardPool` and drawing from it must ensure that cards are unique and correctly represent the remaining possibilities in the deck for each simulation.
*   **Performance**: Running hundreds of simulations per turn might have performance implications. The `SIMULATIONS_PER_TURN_BATCH` will need tuning. The simulation logic itself (card dealing, state construction) should be kept lightweight.

## 7. Future Enhancements

*   **Simulating Opponent Cards**: If contracts can depend on opponent hands, simulate their unknown cards as well.
*   **Modeling Opponent Actions**: (More complex MCTS-like approach) During rollouts, predict and incorporate potential actions of other AI players or the human player, which could influence market state and thus trading decisions.
*   **Confidence Interval**: Calculate a confidence interval for the `estimatedFairValue` based on simulation variance.
*   **Dynamic Batch Sizing**: Adjust `SIMULATIONS_PER_TURN_BATCH` based on available time or uncertainty.
*   **Offloading Simulations**: For true "anytime" behavior without impacting game loop responsiveness, explore moving simulations to a Web Worker (though this adds complexity with data transfer for Electron).
*   **Adaptive Learning**: Implement reinforcement learning to adjust strategy parameters based on performance.
*   **Market Making**: Add market making behavior when confidence is high and spread is profitable.
*   **Risk Management**: Implement more sophisticated position sizing and risk management based on simulation results.
*   **Multi-Contract Support**: Extend the simulation to handle games with multiple active contracts.

## 8. Integration Steps

1.  Modify `MonteCarloStrategy` in `src/core/ai/strategy-manager.ts` (or its own file if refactored) with the new state, constructor logic, `getNextAction` update, and the new `runSimulationBatch` method.
2.  Ensure `GameInfo` in `src/core/ai/types.ts` and its construction in `GameAIAdapter` includes the necessary `gameConfig` details (like total card counts).
3.  Test thoroughly, starting with simple contracts and verifying the `estimatedFairValue` converges reasonably.
4.  Tune `SIMULATIONS_PER_TURN_BATCH` for a balance of accuracy and performance.

This plan provides a clear path to implementing a foundational Monte Carlo simulation for contract valuation, significantly upgrading the AI's predictive capabilities.

## 9. Performance Considerations

### 9.1. Simulation Optimization

* Use Web Workers for parallel simulation execution
* Implement early termination for simulations that show extreme values
* Cache simulation results for similar card distributions
* Use statistical sampling to reduce required simulation count

### 9.2. Memory Management

* Clear old simulation results periodically
* Implement efficient card pool management
* Use object pooling for frequently created objects
* Monitor memory usage and adjust batch sizes accordingly

### 9.3. Timing Constraints

* Implement time-based simulation limits
* Adjust batch size based on available processing time
* Use progressive refinement of estimates
* Implement early decision making when confidence is sufficient 