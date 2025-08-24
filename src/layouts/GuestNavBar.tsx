
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css';
import logo from '../assets/images/logo.png';
import { useLoginModal } from '../context/LoginModalContext';

const GuestNavBar = () =>{

        const [scrolled, setScrolled] = useState<boolean>(false);
        const { isLoggedIn, openLogin, isLoginOpen } = useLoginModal();
    
        const handleScroll = () => {
            if(window.scrollY > 50){
                setScrolled(true);
            }else{
                setScrolled(false);
            }
    
            
        }
    
        useEffect(()=> {
            if(isLoginOpen){
                document.body.classList.add('modal-open');
            }else{
                document.body.classList.remove('modal-open');
            }
    
            return () => {
                document.body.classList.remove('modal-open');
            }
        }, [isLoginOpen]);
    
        useEffect(()=> {
            window.addEventListener('scroll', handleScroll);
    
            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
        }, []);

    return (
        <>
        
        <nav className={` ${scrolled ? 'scrolled':''} navbar fixed-top navbar-expand-lg `}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src={logo} width={"80px"} height={"40px"} /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <div className="d-flex w-100 justify-content-between">
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-start">
                            <li className="nav-item">
                                <Link to="/" className='nav-link active' aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> Cart</a>
                            </li>
                            
                        </ul>
                        <span className="">
                            <ul className="navbar-nav mb-lg-0">

                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={openLogin}> Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"> Register</a>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
        </>
        
    );
}

export default GuestNavBar;