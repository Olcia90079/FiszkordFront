import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Logo,
} from "./NavbarElements";
import { useSelector } from 'react-redux';
import { logout } from '../Store/actions';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const isLogged = useSelector(state => state.isLogged);
    const isSubject = useSelector(state => state.subject?.id)
    console.log("Logged: " + isLogged + " in Navbar");
    console.log(isSubject)
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        dispatch(logout());
    };

    return (
        <>
            <Nav>
                <Bars />
                <Logo to="/">
                    Fiszkord
                </Logo>

                {isLogged && (
                    <NavMenu>
                        {/* <NavLink to="/aktualnosci">
                            Aktualności
                        </NavLink> */}
                        {isSubject &&
                        <>
                            <NavLink to="/fiszki">
                                Fiszki
                            </NavLink>
                            {/* <NavLink to="/pliki">
                                Pliki
                            </NavLink> */}
                            <NavLink to="/czat">
                                Czat
                            </NavLink>
                        </>}
                    </NavMenu>
                )}
                {isLogged && (
                    <NavBtn>
                        <NavBtnLink onClick={handleLogout}>
                            Wyloguj
                        </NavBtnLink>
                    </NavBtn>)}
                {!isLogged && (
                    <NavBtn>
                        <NavBtnLink to="/signup">
                            Rejestracja
                        </NavBtnLink>
                        <NavBtnLink to="/signin">
                            Logowanie
                        </NavBtnLink>
                    </NavBtn>)}
            </Nav>
        </>
    );
}

export default Navbar;