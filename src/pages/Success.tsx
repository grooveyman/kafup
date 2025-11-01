import { useParams } from "react-router-dom";
import { useApiQuery } from "../hooks/useApi";
import { CheckCircle } from "lucide-react";

const Success: React.FC = () => {
  const { ref } = useParams();
  const { data, isPending } = useApiQuery(
    [`chk_transaction_${ref}`],
    `/pay/success/${ref}`,
    { refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
  console.log(data);
  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card">
              {isPending ? (
                <div className="row d-flex justify-content-center p-5">
                  <span
                    className="spinner-border spinner-border"
                    role="status"
                  ></span>
                </div>
              ) : (
                <div className="row">
                  <CheckCircle size={50} />
                  <h2 className="text-center mt-4">Payment Successful</h2>
                  <p className="text-center">Thank you for buying from us.</p>

                  <div className="d-flex justify-content-center">
                     <hr
                    className="text-center"
                    style={{ width: "50%", textAlign: "center" }}
                  />
                  </div>
                 
                  <p className="text-center p-3">
                    Your order with Tracking No: xxxxx has been processed
                    succesfully. Kindly check your email inbox or{" "}
                    <a href="#">login</a> with your email to track your order.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary">Track Order</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Success;
