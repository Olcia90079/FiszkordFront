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

const Navbar = ({ isLoggedIn }) => {

    return (
        <>
            <Nav>
                <Bars />
                <Logo to="/">
                    Fiszkord
                </Logo>

                {isLoggedIn && (
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
                {!isLoggedIn && (
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
};

export default Navbar;