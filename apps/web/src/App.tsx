import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <img src="/logo.svg" alt="Pickleball Marketplace Logo" className="w-32 h-32 drop-shadow-xl" />
      </div>

      <h1 className="text-4xl font-bold text-primary mb-2">Pickleball Marketplace</h1>
      <p className="text-muted-foreground mb-8 text-lg">The Enterprise Platform for Pickleball Enthusiasts</p>

      <div className="card bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border max-w-md w-full text-center">
        <p className="mb-6 text-left">
          Welcome to the future of pickleball trading. Buy, sell, and trade equipment with enterprise-grade security and speed.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
            onClick={() => setCount((count) => count + 1)}
          >
            Explore Products ({count})
          </button>
          <button
            className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors"
          >
            Sell Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
