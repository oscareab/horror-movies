import { Link } from 'react-router-dom';

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Navbar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim()) {
            e.preventDefault(); // Prevent default form behavior
            navigate(`/search/${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="navbar bg-base-100 ">
            <div className="navbar-start">
                <p className="text-xl mx-8">Horror Movies</p>
            </div>
            <div className="navbar-center flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/explore'}>Explore</Link></li>
                    <li><Link to={'/stats'}>Stats</Link></li>
                </ul>
            </div>
            <div className="navbar-end flex">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-auto"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar