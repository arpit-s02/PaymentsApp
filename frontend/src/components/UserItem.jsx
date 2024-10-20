import DisplayPicture from './DisplayPicture'
import DisplayName from './DisplayName'

const UserItem = ({ letter, name }) => {
  return (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
            <DisplayPicture letter={letter} />
            
            <DisplayName name={name} />
        </div>

        <button className="bg-black text-white py-2 px-4 rounded-md">Send Money</button>
    </div>
  )
}

export default UserItem