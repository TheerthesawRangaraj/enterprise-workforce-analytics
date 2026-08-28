import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SkillMatrix AI Uncaught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    try {
      localStorage.removeItem('skillmatrix_user');
      localStorage.removeItem('skillmatrix_theme');
      sessionStorage.clear();
    } catch {
      // Ignore
    }
    window.location.href = '/login';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0b0f19',
            color: '#f9fafb',
            padding: '2rem',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              backgroundColor: '#111827',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <AlertOctagon size={36} />
            </div>

            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Application Encountered an Error
            </h1>

            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              An unexpected issue occurred while rendering this view. Your data is protected.
            </p>

            {this.state.error && (
              <div
                style={{
                  backgroundColor: '#1f2937',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1.75rem',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  color: '#fca5a5',
                  overflowX: 'auto',
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <RefreshCw size={18} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  backgroundColor: '#1f2937',
                  color: '#f9fafb',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Trash2 size={18} />
                <span>Reset Session</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
