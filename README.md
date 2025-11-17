# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Strudel Music Sequencer WebApp

This project is a React-based interface for writing, evaluating, and visualizing live-coded music using the [@strudel/web](https://github.com/tidalcycles/strudel) environment.

## Controls Overview

### TuneDropdown
- A dropdown menu that lets users select a predefined tune from `tunes.js`.
- Automatically populates the code editor with the selected tune.

### Editor
- The `StrudelMirror` code editor allows you to write or modify music code in Strudel format.
- It supports live evaluation of code and audio rendering via Web Audio API.

### Buttons
- **Play**: Preprocesses and evaluates the current Strudel code.
- **Stop**: Stops audio playback.
- **Replay**: Restarts the code evaluation after a short delay.
- **Save JSON**: Exports the current song text to a `.json` file.
- **Load JSON**: Loads a previously saved `.json` song file.

### Volume Control
- A slider that sets the global audio gain using a gain node.
- Dynamically applies volume changes in real-time.

### P1Toggle & P2Toggle
- Mute toggles for two pattern placeholders (`<p1_Radio>` and `<p2_Radio>`) in your code.
- When toggled off, these replace the pattern with `_` (silence).

### D3 Graph
- Still working progress unable to make it work.

##Demo Video

[Watch Demo on YouTube](https://youtu.be/TVfr6lgSHlc)  

## ?? AI Tools Used

### Tool:
- **ChatGPT (OpenAI GPT-4 / GPT-4o)**

### Prompts Given:
- Play button doesn’t work — help fix evaluate timing in Strudel.”
- Help build a React dropdown that loads tunes into my editor.”
- How do I connect a GainNode to Strudel playback for volume control?”
- Strudel .log() gives cutoff numbers — how can I graph them?”

### Outputs Received:
- Working Play/Stop/Replay logic
- Update?on?change volume system
- Dropdown integration for tune presets
- Assistance parsing .log() values and connecting them to D3 graph state

## ? Features Summary

- Tune editor with live preview
- Save/load your code as JSON
- Per-track mute controls
- Dynamic volume adjustment
- React hooks and modular components

---

