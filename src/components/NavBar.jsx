import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MyLogo</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/post">Create New Post</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
