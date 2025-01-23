import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';


const Navbar = () => {

  return (
    <nav className='navbar flex justify-between items-center p-4'>
      <Link to="/">
        <img className='flex-none w-10' src={logo} alt="Logo" />
      </Link>
    </nav>
  );
};

export default Navbar;