/* eslint-disable react/prop-types */
import DisplayPicture from './DisplayPicture'
import DisplayName from './DisplayName'
import { useNavigate } from 'react-router-dom'

const UserItem = ({ letter, name, userId }) => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
            <DisplayPicture letter={letter} />
            
            <DisplayName name={name} />
        </div>

        <button 
          onClick={() => navigate(`/pay?friend=${userId}&&name=${name}`)} 
          className="bg-black text-white py-2 px-4 rounded-md"
        >
          Send Money
        </button>
    </div>
  )
}

export default UserItem