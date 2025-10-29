import { SignOutIcon } from "@phosphor-icons/react";
import { useResolvedPath } from "react-router-dom";

import { navLinks } from "./navLinks";
import { Container, NavLinkContainer, NavLink, Footer } from "./styles";
import { useUser } from '../../hooks/UserContext';
import Logo from '../../assets/logo.svg';

export function SideNavAdmin() {
    const { logout } = useUser();
    const { pathname } = useResolvedPath();

    return (
        <Container>
            <img src={Logo} alt='Hamburger-logo-Devburger' />
            <NavLinkContainer>
                {navLinks.map(link => (
                    <NavLink
                        key={link.id}
                        to={link.path}
                        $isActive={pathname === link.path}
                    >
                        {link.icon}
                        <span>  {link.label}</span>
                    </NavLink>
                ))}
            </NavLinkContainer>
            <Footer>
                <NavLink to='/login' onClick={logout}>
                    <SignOutIcon />
                    <span>Sair</span>
                </NavLink>
            </Footer>
        </Container>
    );
}