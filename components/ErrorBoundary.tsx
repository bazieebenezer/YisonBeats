"use client"

import * as React from "react"

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null; info: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { error: null, info: "" }
  }

  static getDerivedStateFromError(error: Error) {
    return { error, info: "" }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ info: info.componentStack || "" })
    console.error("ErrorBoundary caught:", error)
    console.error("Component stack:", info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="fixed bottom-4 right-4 z-[200] bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm shadow-lg">
          <p className="font-bold mb-1">Erreur React #{this.state.error.message.match(/\d+/)?.[0] || "?"}</p>
          <p className="font-mono text-[10px] break-all max-h-32 overflow-y-auto">{this.state.info}</p>
          <button
            onClick={() => this.setState({ error: null, info: "" })}
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
