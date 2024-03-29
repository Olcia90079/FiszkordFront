import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


export const Logo = styled(Link)`
    color: #808080;
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;

export const Nav = styled.nav`
    background: #bbbbbb;
    height: 85px;
    display: flex;
    z-index: 12;
    /* Third Nav */
    /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
    color: #808080;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #000000;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
  white-space: nowrap; 
    @media screen and (max-width: 768px) {
        display: none;
    } */
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    /* Third Nav */
    justify-content: flex-end;
    width: 100vw;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;


export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #fff;
    color: #808080;
    padding: 10px 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    /* Second Nav */
    margin-left: 24px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #808080;
        color: #f0f0f0;
    }
`;