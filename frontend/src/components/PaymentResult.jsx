/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import CheckIcon from "../assets/icons/CheckIcon";
import ExclamationIcon from "../assets/icons/ExclamationIcon";
import FailedIcon from "../assets/icons/FailedIcon";
import InProcessIcon from "../assets/icons/InProcessIcon";
import Timer from "./Timer";

const PaymentResult = ({ status, description }) => {

    const details = {
        completed: {
            icon: <CheckIcon />
        },
        failed: {
            icon: <FailedIcon />
        },
        processing: {
            icon: <InProcessIcon />
        },
        other: {
            icon: <ExclamationIcon />
        }
    }

    const { icon } = details[status] || details.other;

    return (
        <div className="w-[360px] flex flex-col gap-y-4 items-center p-8 bg-white shadow-md rounded-md">
            {icon}
            <p>{description}</p>
            <Timer intialTime={10} redirectPath={'/dashboard'} />
        </div>
    )

}

export default PaymentResult;