import { useNotificationValue } from "../contexts/notificationContext"

const Notification = () => {

	const notification = useNotificationValue()

	const baseStyle = {
		background: "lightgrey",
		fontSize: 20,
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	const color = notification.type === "error" ? "red" : "green"

	const style = { ...baseStyle, color: color }

	if (notification.payload === null) {
		return null
	}

	return (
		<div style={style} className="notification">
			{notification.payload}
		</div>
	)
}

export default Notification
