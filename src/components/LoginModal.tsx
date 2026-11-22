import { useState } from "react";
import { useLoginModal } from "../context/LoginModalContext";
import GoogleLogo from "./GoogleLogo";
import { Link } from "react-router-dom";
import { useApiMutation } from "../hooks/useApi";

const getErrorMessage = (errorMessage: string): string => {
  try {
    const response: unknown = JSON.parse(errorMessage);
    if (
      typeof response === "object" &&
      response !== null &&
      "message" in response &&
      typeof response.message === "string"
    ) {
      return response.message;
    }
  } catch {
    return errorMessage;
  }
  return errorMessage;
};

const LoginModal: React.FC = () => {
  const { loginUser, closeLogin, isLoginOpen } = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState("");

  const handleClose = () => {
    setLoginError("");
    closeLogin();
  };

  const mutation = useApiMutation<{ message?: string } | null>("/auth/customer-login", "POST", {
      onSuccess: (response) => {
        console.log("Login successful:", response?.message);
        loginUser(email);
        handleClose();
      },
      onError: (error) => {
        setLoginError(
          getErrorMessage(error.message) || "Unable to log in. Please try again.",
        );
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    mutation.mutate({ email, password });
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
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {loginError && (
                  <div id="login-error" className="alert alert-danger" role="alert">
                    {loginError}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email"
                    value={email} onChange={(e) => { setEmail(e.target.value); setLoginError(""); }} required
                    aria-describedby={loginError ? "login-error" : undefined} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password"
                    value={password} onChange={(e) => { setPassword(e.target.value); setLoginError(""); }} required
                    aria-describedby={loginError ? "login-error" : undefined} />
                </div>
                {/* login with google button */}
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn form-control btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  >
                    <GoogleLogo />
                    Login with Google
                  </button>
                </div>
                <p>Already have an account? <Link to="/register" onClick={handleClose}>Register here</Link></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
                  {mutation.isPending ? "Signing in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );

}

export default LoginModal;