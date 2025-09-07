import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dummyprod from "../assets/images/kaftan.jpg";
import "../assets/css/details.css";
import { CartItemType, useCartContext } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  previmage: string;
  images: string[];
  colors: string[];
  quantity: number;
}

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Longsleeved Shirt",
    price: 20,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi culpa mollitia porro sapiente obcaecati. Quo deleniti libero odit officiis, assumenda rerum minima excepturi alias fugit, mollitia velit veritatis maxime suscipit.",
    previmage: "/assets/images/hero3.jpg",
    images: ["/assets/images/hero3.jpg", "/assets/images/hero1.jpg"],
    colors: ["yellow", "black"],
    quantity:3
  },
  {
    id: 2,
    name: "Product 2",
    price: 15,
    description: "This is a detailed description of Product 2.",
    previmage: "/assets/images/hero2.jpg",
    images: ["/assets/images/hero3.jpg", "/assets/images/hero1.jpg"],
    colors: ["yellow", "black"],
    quantity: 5
  },
  {
    id: 3,
    name: "Product 3",
    price: 30,
    description: "This is a detailed description of Product 3.",
    previmage: "/assets/images/carousel 10.png",
    images: ["/assets/images/hero3.jpg", "/assets/images/hero3.jpg"],
    colors: ["yellow", "black"],
    quantity:6
  },
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {addToCart, removeCart, cartItems} = useCartContext();

  const product = dummyProducts.find((p) => p.id === Number(id));

  //
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelected(values);
  };


  if (!product) {
    return (
      <div className="container mt-5">
        <h3>Product not found.</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const images = product.images;

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    const productProd:CartItemType = {
      id:product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      previmg: product.previmage
    };

    addToCart(productProd);
  }
  

  return (
    <div className="container mb-5">
      <div className="row mt-6">
        {/* LEFT SIDE */}
        <div className="col-md-6">
          <div className="d-flex">
            {/* Thumbnails */}
            <div className="other-img d-flex flex-column me-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`img-thumbnail mb-2 ${
                    selectedImage === index ? "border border-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    cursor: "pointer",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>

            {/* Preview */}
            <div className="preview-img flex-grow-1">
              <img
                src={images[selectedImage]}
                className="img-fluid rounded"
                style={{ cursor: "zoom-in" }}
                onClick={() => setFullscreen(true)}
                alt="Preview"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6">
          <div className="row prod-details">
            <h3>{product.name}</h3>
            <h4>${product.price.toFixed(2)}</h4>
            <div>
              <p>{product.description}</p>
            </div>

            {/* COLOR OPTIONS */}
            <div className="row">
              <div className="col-md-4 varcolor">
                <p className="mt-3 mb-1">Select Color</p>
                <div className="d-flex mt-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className={`color-swatch me-2 ${
                        color === selectedColor ? "border border-dark" : ""
                      }`}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedImage(0);
                      }}
                    ></div>
                  ))}
                </div>
                
              </div>
              
            </div>
            <div className="row">
              <div className="col-md-8 varsize">
                <p className="mt-3 mb-1">Select Szie</p>
                <input type="checkbox" className="btn-check btn-sm" id="btn-check-4" autoComplete="off" />
                <label className="btn" htmlFor="btn-check-4">XL</label>

              <input type="checkbox" className="btn-check" id="btn-check-5" checked autoComplete="off" />
              <label className="btn" htmlFor="btn-check-5">L</label>

              <input type="checkbox" className="btn-check" id="btn-check-6" autoComplete="off" />
              <label className="btn" htmlFor="btn-check-6">M</label>
              </div>
            </div>

            <div className="row">
              <p className="mt-3 mb-1">Quantity</p>
              <div>
                <input type="number" className="form-control"/>
              </div>
            </div>

            <div className="row mt-3">
           
                <div className="col-md-6">
                  <button className="btn btn-outline-success form-control addcart-btn" onClick={handleAddToCart}>Add to Cart</button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-success form-control addcart-btn">Buy Now</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {fullscreen && (
        <div
          className="fullscreen-modal d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1050,
          }}
        >
          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={() => setFullscreen(false)}
          ></button>

          <button
            className="btn btn-light position-absolute start-0 ms-3"
            onClick={handlePrev}
          >
            ‹
          </button>

          <img
            src={images[selectedImage]}
            className="img-fluid"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
            alt="Fullscreen preview"
          />

          <button
            className="btn btn-light position-absolute end-0 me-3"
            onClick={handleNext}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
