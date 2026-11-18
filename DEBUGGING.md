# Debugging walkthrough

## Sample behavior and component tree

`App` owns the counter state. It passes `count` and three event handlers to
`CounterPanel`; the panel passes `count` to `CountDisplay` and the handlers to
`CounterControls`.

```text
App (state: count)
└── CounterPanel (props: count, onDecrement, onIncrement, onReset)
    ├── CountDisplay (props: count)
    └── CounterControls (props: onDecrement, onIncrement, onReset)
```

## Issue and resolution

The rendering issue this exercise demonstrates is a prop-name mismatch: the
parent passes `count`, while a display component that reads `value` receives
`undefined` and renders no number. In React Developer Tools, this appears as a
valid `count` prop on the display component even though the UI is blank.

The fix is to use the same prop name on both sides. `CountDisplay` now reads
`count`, and `CounterPanel` passes that prop through unchanged. The state stays
in `App`, so both the display and the controls observe one source of truth.
The increment and decrement handlers use functional state updates to avoid
stale values; decrement is clamped at zero.

## Inspect with React Developer Tools

1. If needed, install [React Developer Tools from the Chrome Web Store](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).
   Start the app with `npm run dev` and open its local Vite URL in a browser
   with the extension enabled.
2. Open browser Developer Tools and select the **Components** tab.
3. Select `App` to inspect its `count` state. Select `CounterPanel` and
   `CountDisplay` to verify that the `count` prop matches the state.
4. Click `+`, `-`, and **Reset**. Confirm that `App` state and the display prop
   update together, and that decrementing at zero leaves the count at zero.

The Chrome and Edge profiles available during setup did not contain the React
Developer Tools extension, and browser-panel automation was unavailable in this
session. I therefore did not claim a live Components-panel inspection. The
mismatch was reproduced through React's server renderer, which confirmed the
display output was empty when the parent passed `count` and the child read
`value`; after aligning the prop names, the initial output contains `0`. The
build and linter also pass.
