import { Link } from 'react-router-dom';
import { Feather } from "lucide-react";

const Logo = () => {
  return (
    <>
        <Link to="/" className="flex-none">
            <Feather className="w-6 h-6 text-black" />
        </Link>
    </>
  )
}

export default Logo