import { Link } from "react-router";
type NavbarProps = {
    appName: string;
};

function Navbar({ appName }: NavbarProps) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className="navbar-logo">{appName}</h2>

                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/reader">Bible Reader</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;