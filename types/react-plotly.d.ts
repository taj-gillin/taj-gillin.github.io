declare module 'react-plotly.js' {
  import { Component } from 'react';
  import { PlotData, Layout, Config, PlotMouseEvent, PlotHoverEvent } from 'plotly.js';

  interface PlotParams {
    data: Partial<PlotData>[];
    layout?: Partial<Layout>;
    config?: Partial<Config>;
    style?: React.CSSProperties;
    className?: string;
    useResizeHandler?: boolean;
    onClick?: (event: PlotMouseEvent) => void;
    onHover?: (event: PlotHoverEvent) => void;
    onUnhover?: (event: PlotHoverEvent) => void;
    onSelected?: (event: PlotMouseEvent) => void;
    onRelayout?: (event: object) => void;
    onInitialized?: (figure: { data: PlotData[]; layout: Layout }, graphDiv: HTMLElement) => void;
    onUpdate?: (figure: { data: PlotData[]; layout: Layout }, graphDiv: HTMLElement) => void;
    onRedraw?: () => void;
    onError?: (error: Error) => void;
    divId?: string;
    revision?: number;
    frames?: object[];
  }

  class Plot extends Component<PlotParams> {}

  export default Plot;
}

