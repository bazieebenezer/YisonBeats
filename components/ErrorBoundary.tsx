"use client"

import * as React from "react"

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="fixed bottom-4 right-4 z-[200] bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
          <p className="font-bold mb-1">Erreur</p>
          <p className="font-mono text-xs break-all">{this.state.error.message}</p>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-2 text-xs underline"
          >
            Ignorer
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
