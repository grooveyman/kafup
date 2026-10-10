

export const DesignerSignUp: React.FC = () => {
    
    return (
        <>
            <div className="container-fluid home-signup">
                <div className="container">
                    <div className="row inner-section">
                        <div className="mb-4 col-md-6">
                            <h3>Ready to Setup Your Brand on Kafup?</h3>
                            <p>
                                Sign up with our easy and fast process. No business is too small to be on Kafup. We are here to help you grow your brand and reach the world.
                            </p>
                            <button className="mt-2 btn btn-secondary" onClick={() => {location.href="https://kafupdesigner.vercel.app"}}>Get Started</button>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <h5 style={{margin:0}}>Subscribe to our Newletter</h5>
                                <p>Receive new design alerts/emails and future packages</p>
                            </div>

                            <div className="mt-3 d-flex align-items-center">
                                <form className="d-flex flex-wrap flex-lg-nowrap flex-row flex-grow-1 w-100 gap-3">
                                    <input
                                        type="email"
                                        className="form-control me-2"
                                        placeholder="Enter your email"
                                    />
                                    <button type="submit" className="btn btn-primary">
                                        Continue
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};