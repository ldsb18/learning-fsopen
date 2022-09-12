const Notification = ({ message, type }) => {

    const baseStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const color = type === 'error'
        ? 'red'
        : 'green'

    const style = {...baseStyle, color: color}

    if(message === null){
        return null
    }

    return(
        <div style={style} >
            { message }
        </div>
    )
}

export default Notification
