/* eslint-disable react/prop-types */
const Alert = ({ message, type }) => {

    const colors = {
        success: "text-[green]",
        warning: "text-[yellow]",
        failed: "text-[red]"
    }

    return (
        <span className={`${colors[type]}`}>{message}</span>
    )
}

export default Alert;