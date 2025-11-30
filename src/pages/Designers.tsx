
import "../assets/css/designers.css";

const Designers: React.FC = () => {
    const designersData = [
        {
            name: "Alice Klottey",
            followers: "23K",
            likes: 45,
            products: 100,
            image: "assets/images/hero3.jpg",
            collections: 22,
            caption: "First stop for kaftan, unisex. Men and women, materialize your imaginations. Find the most equisite here"
        },
        {
            name: "Mercy Awortwe",
            followers: "3K",
            likes: 5,
            products: 10,
            image: "assets/images/hero2.jpg",
            collections: 43,
            caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections."
        },
        {
            name: "Kelvin Ansah",
            followers: "3K",
            likes: 52,
            products: 108,
            image: "assets/images/hero1.jpg",
            collections: 87,
            caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections."
        },
        {
            name: "Mercy Awortwe",
            followers: "3K",
            likes: 5,
            products: 10,
            image: "assets/images/hero2.jpg",
            collections: 43,
            caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections."
        }

    ]
    return (
        <>
            <div className="container">
                <div className="row">
                    {designersData.map((designer) => (
                        <div className="col-xs-6 col-lg-3 col-sm-6 col-md-3">
                            <div className="dsg-container">
                                <div className="dsg-img d-flex justify-content-center">
                                    <div className="dsg-img-container">
                                        <img className="img-fluid" src={designer.image} />
                                    </div>
                                </div>
                                <div className="dsg-content text-center pt-3">
                                    <h5>{designer.name}</h5>
                                    <div className="d-flex justify-content-center">
                                        <div className="d-flex justify-content-between">
                                            <div className="rate">
                                            </div>
                                            <div className="follows">
                                                <span className="followers">{designer.followers}</span> Followers <span className="likes">{designer.likes}</span> Likes
                                                <div>
                                                    <span className="followers">{designer.products}</span> Products <span className="likes">{designer.collections}</span> Collections
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-center p-3">
                                        {designer.caption}
                                    </p>
                                    <button className="btn btn-primary">View Profile</button>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </>
    );
};

export default Designers;