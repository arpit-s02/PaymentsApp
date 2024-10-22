/* eslint-disable react/prop-types */
import UserItem from "./UserItem"

const UsersWrapper = ({ users }) => {
  return (
    <div className="flex flex-col gap-y-4">
      { users.length ? (
        <>
          {
            users.map(user => (
              <UserItem 
                key={user._id} 
                name={`${user.firstName} ${user.lastName}`} 
                letter={user.firstName[0]} 
                userId={user._id}
              />
            ))
          }
        </>
      ) : (
        <p className="text-center">No users found!</p>
      )}
    </div>
  )
}

export default UsersWrapper