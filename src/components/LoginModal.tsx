import {useState } from "react";
import { useLoginModal } from "../context/LoginModalContext";


const LoginModal: React.FC = () => {
    const { loginUser, closeLogin, isLoginOpen} = useLoginModal();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //login logic here
        if(username == 'admin' && password == 'admin'){
            loginUser("admin");
            closeLogin();
        }
        
    };

    


    return (
        <>

        {isLoginOpen && <div className="modal-backdrop fade show"></div>}

         <div className={`modal fade ${isLoginOpen ? 'show d-block' : ''}`} tabIndex={-1} role="dialog" aria-modal="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="btn-close" onClick={closeLogin}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username"
                       value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                       value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeLogin}>Close</button>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
       
    );

}

export default LoginModal;