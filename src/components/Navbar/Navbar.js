import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../App.scss";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav fs-5 me-auto">
            <NavLink to="/" className="nav-link">
              Personajes
            </NavLink>
            <NavLink to="/episodes" className="nav-link">
              Episodios
            </NavLink>
            <NavLink activeClassName="active" className="nav-link" to="/location">
              Locaciones
            </NavLink>
          </div>
        </div>
        <Link to="/" className="navbar-brand fs-3 ubuntu">
         <img src="http://localhost:3000/rickandmorty.png" width="200px"  height="80px"alt="rick and morty"/>  
        </Link>
        <style jsx>{`
          button[aria-expanded="false"] > .close {
            display: none;
          }
          button[aria-expanded="true"] > .open {
            display: none;
          }
        `}</style>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fas fa-bars open text-dark"></span>
          <span className="fas fa-times close text-dark"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;