import { useNavigate, useParams } from "react-router-dom";
import { useApiMutation } from "../hooks/useApi";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Success: React.FC = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const { ref } = useParams();
  
  const verifyMutation = useApiMutation<{status:boolean}>(`/transactions/check/${ref}`, 'POST', {
    onSuccess: (data) => {
      console.log('verification successful');
      console.log(data);

    },

    onError: (error) => {
      toast.error(error.message);
    }

  });

  // const { data, isPending, isError } = useApiQuery<{ status: boolean }>(
  //   [`chk_transaction_${ref}`],
  //   `/pay/success/${ref}`,
  //   { enabled: !!ref, refetchOnWindowFocus: false, refetchOnReconnect: false, retry: false }
  // );
  const navigate = useNavigate();

  const handleConfirm = () => {
    if(!ref) {
      toast.error("No reference provided");
    }else{
      setIsConfirm(true);
      verifyMutation.mutate({});
    }
  };

  if (!isConfirm) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="p-4 text-center">
          <h3>Confirm Payment</h3>
          <p>Click below to verify your payment if you have entered your PIN and completed the verification.</p>

          <button
            className="btn btn-primary"
            onClick={handleConfirm}
          >
            Verify Payment
          </button>
        </div>
      </div>
    );
  }

  if (verifyMutation.isPending) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <span className="spinner-border" role="status"></span>
      </div>
    );
  }

  if (verifyMutation.isError) {
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
        <div className="d-flex justify-content-center">
          <CheckCircle size={50} color="green" />
        </div>

        <h2 className="mt-4">Payment Successful</h2>
        <p className="text-center">Thank you for buying from us.</p>
        <hr style={{ width: "50%", margin: "0 auto" }} />
        <p className="text-center p-3">
          Your order was processed successfully. Check your email to track your order.
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary">Track Order</button>
        </div>

      </div>
    </div>
  );
};

export default Success;
