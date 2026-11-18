import { useState } from 'react'
import './App.css'

function CountDisplay({ count }) {
  return (
    <output className="count" aria-live="polite">
      {count}
    </output>
  )
}

function CounterControls({ onDecrement, onIncrement, onReset }) {
  return (
    <div className="controls">
      <button type="button" onClick={onDecrement} aria-label="Decrease count">
        −
      </button>
      <button type="button" onClick={onIncrement} aria-label="Increase count">
        +
      </button>
      <button type="button" className="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}

function CounterPanel({ count, onDecrement, onIncrement, onReset }) {
  return (
    <section className="counter-panel" aria-labelledby="counter-title">
      <p className="eyebrow">React state &amp; props</p>
      <h1 id="counter-title">Counter</h1>
      <p className="description">
        Update the count and follow its value through the component tree.
      </p>
      <CountDisplay count={count} />
      <CounterControls
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onReset={onReset}
      />
      <p className="state-note">The count cannot go below zero.</p>
    </section>
  )
}

function App() {
  const [count, setCount] = useState(0)

  function decrement() {
    setCount((currentCount) => Math.max(0, currentCount - 1))
  }

  function increment() {
    setCount((currentCount) => currentCount + 1)
  }

  function reset() {
    setCount(0)
  }

  return (
    <main className="app">
      <CounterPanel
        count={count}
        onDecrement={decrement}
        onIncrement={increment}
        onReset={reset}
      />
    </main>
  )
}

export default App
