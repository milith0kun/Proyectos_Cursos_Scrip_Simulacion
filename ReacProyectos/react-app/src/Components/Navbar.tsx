import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/">Mi Proyecto</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/nutrition">Nutrición</Link>
        </li>
        <li>
          <Link to="/seo">SEO</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
