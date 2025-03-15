declare module 'react-virtualized-auto-sizer' {
  import * as React from 'react';

  interface AutoSizerProps {
    /** Function responsible for rendering children. */
    children: (size: { height: number; width: number }) => React.ReactNode;
    /** Optional custom CSS class name to attach to root AutoSizer element. */
    className?: string;
    /** Default height to use for initial render; useful for SSR */
    defaultHeight?: number;
    /** Default width to use for initial render; useful for SSR */
    defaultWidth?: number;
    /** Disable dynamic :height property */
    disableHeight?: boolean;
    /** Disable dynamic :width property */
    disableWidth?: boolean;
    /** Nonce of the inlined stylesheet for Content Security Policy */
    nonce?: string;
    /** Callback to be invoked on-resize */
    onResize?: (size: { height: number; width: number }) => void;
    /** Optional inline style */
    style?: React.CSSProperties;
  }

  class AutoSizer extends React.Component<AutoSizerProps> {}

  export default AutoSizer;
} 