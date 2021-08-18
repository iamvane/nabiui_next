import * as React from 'react';

export class ErrorBoundary extends React.Component <{}, {hasError: boolean}> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h2>Something went wrong</h2>
            <p>Please refresh the page. If the problem persists report this bug to support@nabimusic.com</p>
          </div>
        );
      }
  
      return this.props.children; 
    }
  }