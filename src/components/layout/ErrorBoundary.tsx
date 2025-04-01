import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';
import { SpaceBetween } from '@/components/shared/SpaceBetween';
import { Icon } from '@/components/shared/Icon';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <SpaceBetween direction="horizontal" size="xs" className="text-red-700">
          <Icon.Error className="size-4" />
          <span className="text-sm">
            Something went wrong. Please refresh to try again
          </span>
        </SpaceBetween>
      );
    }

    return this.props.children;
  }
}
