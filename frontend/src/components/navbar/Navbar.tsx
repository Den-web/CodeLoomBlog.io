
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import User from "./User";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Logo />
      <SearchBar />
      <User />
    </nav>
  );
};

export default Navbar;