import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">Carolink</div>
      <ul className="nav-menu">
        <li>About Carolink</li>
        <li className="nav-contact">
          <Link to="/register" className='nav-login'>Login</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;