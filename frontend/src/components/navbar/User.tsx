import user from '../../assets/user.png';

const User = () => {
  return (
    <div className="flex items-center gap-4">
        <button className="text-gray-700 hover:text-black">Write</button>
        <img
          src={user}
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </div>
  )
}

export default User