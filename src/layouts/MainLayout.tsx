import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
// import NavBar from './NavBar';
// import Footer from './Footer';


const MainLayout: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <section className='' style={{ marginTop: '60px' }}>
                <Outlet />
            </section>
               <Footer/>
        </div>
    );
};

export default MainLayout;