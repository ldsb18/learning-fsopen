const Notification = ({ notification }) => {
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

	if (notification.message === "") {
		return null
	}

	return (
		<div style={style} className="notification">
			{notification.message}
		</div>
	)
}

export default Notification
