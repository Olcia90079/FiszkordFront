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

const Navbar = () => {
    const isLogged = useSelector(state => state.isLogged);
    console.log("Logged: " + isLogged + " in Navbar");

    return (
        <>
            <Nav>
                <Bars />
                <Logo to="/">
                    Fiszkord
                </Logo>

                {isLogged && (
                    <NavMenu>
                        <NavLink to="/aktualnosci">
                            Aktualności
                        </NavLink>
                        <NavLink to="/fiszki">
                            Fiszki
                        </NavLink>
                        <NavLink to="/pliki">
                            Pliki
                        </NavLink>
                        <NavLink to="/czat">
                            Czat
                        </NavLink>
                    </NavMenu>)}
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