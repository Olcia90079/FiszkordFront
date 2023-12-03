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

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <Logo to="/">
                    Fiszkord
                </Logo>
                
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
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signup">
                        Rejestracja
                    </NavBtnLink>
                    <NavBtnLink to="/signin">
                        Logowanie
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;