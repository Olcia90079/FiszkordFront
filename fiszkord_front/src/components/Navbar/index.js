import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
 
                <NavMenu>
                    <NavLink to="/aktualnosci" >
                        Aktualności
                    </NavLink>
                    <NavLink to="/fiszki" activeStyle>
                        Fiszki
                    </NavLink>
                    <NavLink to="/pliki" activeStyle>
                        Pliki
                    </NavLink>
                    <NavLink to="/czat" activeStyle>
                        Czat
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signup">
                        Sign Up
                    </NavBtnLink>
                </NavBtn>
                <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};
 
export default Navbar;