import { Link, Outlet } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";
import { useLogin } from "../state/UserContext";
import { useAlbum } from "../state/AlbumContext";


function Header() {
    const { state, dispatch } = useLogin();
    const { albumDispatch } = useAlbum();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        albumDispatch({ type: "UNSELECT" });
    }
    return (
        <div className="h-90">
            <div className="w-100 h-10 fixed-top bg-white"></div>
            <nav className="br-20 navbar navbar-expand-lg navbar-light prm-bg fixed-top m-3">
                
                <div className="container-fluid">
                    <Link className="Logo-Typography ms-3" to="/">
                        하나로 앨범
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                   {state.user && <div className="ms-auto" id="navbarNav">
                        <ul className="navbar-nav "> 
                            <li className="nav-item d-flex">
                                <Link className="nav-link align-middle d-flex fs-4 gap-3" to="#">
                                    <span >
                                    {state.user.userId} 
                                    </span>
                                    <span className="fw-bold">
                                    {state.user.userName} 
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">
                                    <Button className="btn-success" onClick={handleLogout}>
                                        로그아웃
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </div>}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;
