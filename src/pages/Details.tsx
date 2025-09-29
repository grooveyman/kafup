import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dummyprod from "../assets/images/kaftan.jpg";
import "../assets/css/details.css";
import { CartItemType, CartVariation, useCartContext } from "../context/CartContext";
import { useApiMutation, useApiQuery } from "../hooks/useApi";
import DetailsSkeletonLoader from "../components/DetailsSkeletonLoader";
import { Variation } from "./admin/products/AddProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  previewimg: string;
  prodimages: Image[];
  colors: string[];
  quantity: number;
  variations: Variation[]; 
}

interface ProductResponse {
  product: Product;
}

interface Image{
  imgurl: string;
}

const ProductDetails: React.FC = () => {
  const { id: prodId } = useParams<{ id: string }>();
  const productId = prodId!;
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const calledRef = useRef(false);

  const { addToCart } = useCartContext();

  // fetch product
  const { data, isLoading, isError } = useApiQuery<ProductResponse>(
    ["products", productId],
    "/products/product/" + productId
  );

  // send click update request
  const mutate = useApiMutation<{message:string}>(`/products/productClick/${prodId}`, "PUT", {
    onSuccess : (data) => {
  console.log(data.message);
},
onError: (error) => {
  console.log(error.message);
}
  });
  useEffect(() => {
    if(!calledRef.current){
      calledRef.current = true;
      mutate.mutate({});
    }
    
  }, []);
  const product = data?.product;
  console.log("Fetched product:", product);


  const [selectedColor, setSelectedColor] = useState(
    product?.variations?.[0]?.color || ""
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  
  const images: Image[] = product?.prodimages || [];
  console.log("Product images:", images);

  const handleNext = () => {
    if (images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleAddToCart = () => {
    if (!product) return; 

    const cartVariations: CartVariation[] = [{
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      quantity: selectedQuantity,
    }];

    const productProd: CartItemType = {
      id: product.id,
      name: product.name,
      quantity: selectedQuantity,
      price: product.price,
      previmg: product.previewimg,
      variations: cartVariations,
      total: product.price * selectedQuantity,
    };

    addToCart(productProd);
  };
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    setSelectedSize(size);
  };

  if (isLoading) {
    return (
      <div className="container mb-5">
        <DetailsSkeletonLoader count={1} />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mt-5">
        <h3>Product not found.</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row mt-6">
        {/* LEFT SIDE */}
        <div className="col-md-6">
          <div className="d-flex">
            {/* Thumbnails */}
            <div className="other-img d-flex flex-column me-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.imgurl}
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
                src={images[selectedImage]?.imgurl || product.previewimg}
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
            <h4>${product.price}</h4>
            <div>
              <p>{product.description}</p>
            </div>

            {/* COLOR OPTIONS */}
            <div className="row">
              <div className="col-md-4 varcolor">
                <p className="mt-3 mb-1">Select Color</p>
                <div className="d-flex mt-2">
                  {product.variations.map((color) => (
                    <div
                      key={color.color}
                      className={`color-swatch me-2 ${
                        color.color === selectedColor ? "border border-dark" : ""
                      }`}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: color.color,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedColor(color.color);
                        setSelectedImage(0);
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIZE OPTIONS */}
            <div className="row">
              <div className="col-md-8 varsize">
                <p className="mt-3 mb-1">Select Size</p>
                {product.variations.length === 0 && <p>No size variations available.</p>}
                {product.variations.map((variation, index) => (
                  <>
                  <input
                  key={index}
                  type="radio"
                  className="btn-check btn-sm"
                  id={`btn-check-xl-${index}`}
                  autoComplete="off"
                  name="size"
                  value={variation.size}
                  onChange={handleSizeChange}
                />
                <label className="btn" htmlFor={`btn-check-xl-${index}`}>
                  {variation.size}
                </label>
                </>
                ))}
                
              </div>
            </div>

            {/* QUANTITY */}
            <div className="row">
              <p className="mt-3 mb-1">Quantity</p>
              <div className="col-md-4">
                <input type="number" value={selectedQuantity} onChange={(e)=>setSelectedQuantity(Number(e.target.value))} className="form-control input-quantity"/>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="row mt-3">
              <div className="col-md-6">
                <button
                  className="btn btn-outline-success form-control addcart-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-success form-control addcart-btn">
                  Buy Now
                </button>
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

          <img src={images[selectedImage].imgurl}
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
