import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Notification = () => {
	const notification = useSelector(({ notification }) => notification)

	const color = notification.type === "error" ? "error" : "success"

	return (
		<div className="notification">
			{notification.message &&
				<Alert severity={color}>
					{notification.message}
				</Alert>
			}
		</div>
	)
}

export default Notification
