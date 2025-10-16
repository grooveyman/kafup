import CartSummary from "../components/CartSummary";


const Checkout:React.FC = () => {
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h5>Personal Details</h5>
                </div>
                <CartSummary subtotal={0} estotal={0}/>
            </div>
        </div>
        </>
    );
};

export default Checkout;