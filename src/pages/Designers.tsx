
import "../assets/css/designers.css";
import Designer from "../components/homecomponents/Designer";

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
            <div className="container-fluid designers">
        <div className="container">
            
          <div className="designers-content">
                <div className="designers-filters">
                    <span className="filter-item">All</span>
                    <span className="filter-item">Popular</span>
                    <span className="filter-item">New</span>
                </div>
            <div className="row designers-profile">
              <Designer />
              <Designer />
              <Designer/>
              <Designer />
            </div>
            <div className="row designers-profile mt-5">
              <Designer />
              <Designer />
              <Designer/>
              <Designer />
            </div>
          </div>
        </div>
      </div>
        </>
    );
};

export default Designers;