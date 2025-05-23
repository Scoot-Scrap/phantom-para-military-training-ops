import React from 'react';

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong in the HUD.</div>;
    }
    return this.props.children;
  }
}