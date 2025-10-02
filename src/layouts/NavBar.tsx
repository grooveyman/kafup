
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/navbar.css';
import logo from '../assets/images/logo.png';
import { useLoginModal } from '../context/LoginModalContext';
import GuestNavBar from './GuestNavBar';

const NavBar: React.FC = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const { isLoggedIn, authUser, isLoginOpen, logoutUser } = useLoginModal();
    const navigate = useNavigate();
    

    const handleScroll = () => {
        if(window.scrollY > 50){
            setScrolled(true);
        }else{
            setScrolled(false);
        }
        
    }

    const handleLogOut = () => {
        logoutUser(authUser);
        navigate("/");
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
        {isLoggedIn ? (
            <nav className={` ${scrolled ? 'scrolled':'not-scrolled'} navbar fixed-top navbar-expand-lg `}>
            <div className="container">
                <a className="navbar-brand" href="#">
                    KafUp
                    {/* <img src={logo} width={"80px"} height={"40px"} /> */}
                    </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <div className="d-flex w-100 justify-content-between">
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-start">
                            <li className="nav-item">
                                <Link to="/dashboard" className='nav-link active' aria-current="page">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={()=>navigate("/admin/products")} href="#"> Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> Orders</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> Customers</a>
                            </li>
                           
                        </ul>
                        <span className="">
                            <ul className="navbar-nav mb-lg-0">

                                <li className="nav-item dropdown">
                                    <a className="nav-link" type='button' data-bs-toggle="dropdown" href="#"> {authUser}</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#" onClick={handleLogOut}>Logout</a></li>
  </ul>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
        ): <GuestNavBar />}
        
        </>
        
    );
};

export default NavBar;