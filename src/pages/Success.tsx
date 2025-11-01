import { useNavigate, useParams } from "react-router-dom";
import { useApiQuery } from "../hooks/useApi";
import { CheckCircle, XCircle } from "lucide-react";

const Success: React.FC = () => {
  const { ref } = useParams();
  const { data, isPending, isError } = useApiQuery<{ status: boolean }>(
    [`chk_transaction_${ref}`],
    `/pay/success/${ref}`,
    {enabled: !!ref, refetchOnWindowFocus: false, refetchOnReconnect: false, retry: false }
  );
  const navigate = useNavigate();
  

  if (isPending) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <span className="spinner-border" role="status"></span>
      </div>
    );
  }

    if (isError || data?.status === false) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card p-4 text-center">
            <div className="d-flex justify-content-center">
                <XCircle size={50} />
            </div>
          
          <h2 className="mt-4">Payment Failed</h2>
          <p className="text-center p-3">We are sorry, payment was unsuccessful. Try again.</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={() => navigate("/categories/shop")}>Back</button>
          </div>
          
        </div>
      </div>
    );
  }
  
return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 text-center">
        <CheckCircle size={50} />
        <h2 className="mt-4">Payment Successful</h2>
        <p className="text-center">Thank you for buying from us.</p>
        <hr style={{ width: "50%", margin: "0 auto" }} />
        <p className="text-center p-3">
          Your order was processed successfully. Check your email to track your order.
        </p>
        <button className="btn btn-primary">Track Order</button>
      </div>
    </div>
  );
};

export default Success;
