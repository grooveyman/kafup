import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
// import NavBar from './NavBar';
// import Footer from './Footer';


const MainLayout: React.FC = () => {
    return (
        <>
            <NavBar />
            <section className='' style={{ marginTop: '60px' }}>
                <Outlet />
            </section>

            <div className='conatiner'> 
               <Footer/>
            </div>

        </>
    );
};

export default MainLayout;