import { useState } from "react";
import { ArrowRight, BadgeCheck, MailCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginModal } from "../../context/LoginModalContext";
import { useApiMutation } from "../../hooks/useApi";
import "./OrderDetails.css";
import "./VerifyEmail.css";

type VerifyEmailResponse = {
  message?: string;
} | null;

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

const getEmailFromRouteState = (state: unknown): string => {
  if (
    typeof state === "object" &&
    state !== null &&
    "email" in state &&
    typeof state.email === "string"
  ) {
    return state.email;
  }
  return "";
};

const VerifyEmail: React.FC = () => {
  const { authUser } = useLoginModal();
  const location = useLocation();
  const email = getEmailFromRouteState(location.state) || authUser;
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const verifyMutation = useApiMutation<VerifyEmailResponse>(
    "/customer/verify-token",
    "POST",
    {
      onSuccess: (response) => {
        setErrorMessage("");
        setSuccessMessage(response?.message || "Your email has been verified.");
        setToken("");
        navigate("/portal/");
      },
      onError: (error) => {
        setSuccessMessage("");
        setErrorMessage(
          getErrorMessage(error.message) || "Unable to verify your email.",
        );
      },
    },
  );

  console.log(email);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    verifyMutation.mutate({ email, token });
  };

  return (
    <main className="container portal-order-page portal-verify-email-page py-4 py-lg-5">
      <div className="mb-4">
        
        <h1 className="portal-order-page-title mb-2">Verify your email</h1>
        <p className="portal-verify-email-intro mb-0">
          Confirm your email address to keep your account details up to date.
        </p>
      </div>

      <section
        className="portal-detail-panel portal-verify-email-card"
        aria-labelledby="verify-email-title"
      >
        <div className="portal-verify-email-art" aria-hidden="true">
          <span>
            <MailCheck size={27} />
          </span>
        </div>

        <div className="portal-verify-email-content">
          <span className="portal-detail-eyebrow">ACCOUNT SECURITY</span>
          <h2 id="verify-email-title">Check your inbox</h2>
          <p>
            {email
              ? `Enter the verification code sent to ${email}.`
              : "Open this page from registration to verify your email address."}
          </p>

          <form onSubmit={handleSubmit} className="portal-verify-email-form">
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success" role="status">
                <BadgeCheck size={17} aria-hidden="true" />
                {successMessage}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="verification-token" className="form-label">
                Verification code
              </label>
              <input
                id="verification-token"
                type="text"
                className="form-control portal-verify-email-token"
                autoComplete="one-time-code"
                inputMode="numeric"
                placeholder="Enter your code"
                required
                value={token}
                onChange={(event) => {
                  setToken(event.target.value);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark d-inline-flex align-items-center gap-2"
              disabled={verifyMutation.isPending || !email}
            >
              {verifyMutation.isPending ? "Verifying..." : "Verify email"}
              {!verifyMutation.isPending && (
                <ArrowRight size={16} aria-hidden="true" />
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;
