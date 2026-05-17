import { Outlet, Navigate } from 'react-router-dom';

import { SideNavAdmin } from '../../components/SideNavAdmin'
import { Container } from './styles'

export function AdminLayout() {
    const userData = localStorage.getItem('devburger:userData');
    const { admin: isAdmin } = userData ? JSON.parse(userData) : { admin: false };

    return isAdmin ? (
        <Container>
            <>
                <SideNavAdmin />
                <main>
                    <section>
                        <Outlet />
                    </section>
                </main>
            </>
        </Container>
    ) : (
        <Navigate to="/login" />
    );
}