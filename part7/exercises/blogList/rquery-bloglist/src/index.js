import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "./App"
import { UserContextProvider } from "./contexts/userContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<App />
		</UserContextProvider>
	</QueryClientProvider>,
)
