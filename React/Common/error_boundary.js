import React from "react";

export class ErrorBoundary extends React.Component {
  location;
  constructor(props = { location: "Default Location" }) {
    super(props);
    this.state = { hasError: false, error: undefined };
    this.location = props.location;
    console.log('ErrorBoundary constructor', props);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("error", { error, errorInfo });
  }

  get Location() {
    return this.location ? ` in ${this.location}` : "";
  }

  render() {
    console.error('render error', this.state);
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong{this.Location}.</h1>;
    }

    return this.props.children;
  }
}
