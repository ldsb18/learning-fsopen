import React from "react"
import ReactDOM from "react-dom/client"

import { CssBaseline } from "@mui/material"

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from "./App"

import { Provider } from "react-redux"
import store from "./stores/store"

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<CssBaseline />
		<App />
	</Provider>,
)
