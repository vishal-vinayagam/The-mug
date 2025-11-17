import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const RouteWithErrorBoundary = ({ children }) => (
  <ErrorBoundary>
    {children}
  </ErrorBoundary>
);

export default RouteWithErrorBoundary;