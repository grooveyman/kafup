import React, { useState, useRef, useEffect } from "react";
import "./admin.css";
import { CopyPlus } from "lucide-react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useApiMutation, useApiQuery } from "../../../hooks/useApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../Home";

declare global {
  interface Window {
    bootstrap: any;
  }
}

export interface Variation {
  size: string;
  color: string;
  price: number;
  quantity: number;
}
interface OtherImage {
  url: string | File;
}
interface FormData {
  name: string;
  description?: string;
  variation: Variation[];
  previmage: string | File;
  otherimages: OtherImage[];
  category: string;
  previewimg_format?:string;
  previewimg_height?:number;
  previewimg_width?:number;
  previewimg_public_id?: string;
}

const EditProduct: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const navigate = useNavigate();
  const { prodid } = useParams();

  //get product details
  const {
    data: retrievedData,
    isLoading,
    isError,
  } = useApiQuery<Product>(["product_by_id"], `/products/product/${prodid}`);
  console.log(retrievedData);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "",
    description: "",
    variation: [],
    previmage: "",
    otherimages: [],
    category: "",
  });
  useEffect(() => {
    if (retrievedData?.previewimg && retrievedData.prodimages) {
      setImagePreview(retrievedData?.previewimg);
      setExtraImages([
        retrievedData?.prodimages![0].imgurl,
        retrievedData?.prodimages![1].imgurl,
        retrievedData?.prodimages![2].imgurl,
      ]);
      setData({
        name: retrievedData.name,
        description: retrievedData?.description,
        previewimg_format: retrievedData?.previewimg_format,
        previewimg_height: retrievedData?.previewimg_height,
        previewimg_width: retrievedData?.previewimg_width,
        previewimg_public_id: retrievedData?.previewimg_public_id,
        variation: [],
        previmage: "",
        otherimages: [],
        category: "",
      });
    }
    //variations
    setVariations(retrievedData?.variations!);
    console.log(retrievedData);
  }, [retrievedData]);

  //mutation to send post request
  const mutation = useApiMutation<{ message: string }>(
    "/products/product",
    "POST",
    {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate("/admin/products");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const colorInputRef = useRef<HTMLInputElement>(null);

  const isDarkColor = (hexColor: string): boolean => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128;
  };

  //extra images
  const [extraImages, setExtraImages] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);

  const handleExtraImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    //set extra image to data
    setData((prev) => {
      const updated = [...prev.otherimages];
      updated[index] = { ...updated[index], url: file };
      const newState = { ...prev, otherimages: updated };
      console.log("extra images", newState);

      return newState;
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...extraImages];
      updatedImages[index] = reader.result as string;
      setExtraImages(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData({ ...data, previmage: file }); //set file to data
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorPick = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const saveSizeEntry = () => {
    if (!size || quantity < 1) return;

    const newEntry: Variation = {
      size,
      quantity,
      color: selectedColor,
      price,
    };

    setVariations([...variations, newEntry]);

    // Reset form values
    setSize("");
    setQuantity(1);
    setSelectedColor("#000000");

    setShowSizeModal(false);
  };

  const handleDeleteSize = (index: number) => {
    const updatedSizes = [...variations];
    updatedSizes.splice(index, 1);
    setVariations(updatedSizes);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPrice(e.target.name === "price" ? Number(value) : price);
    setData((prev) => ({ ...prev, [name]: value }));
  };
  //handle sending products to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    ["name", "description", "category"].forEach((key) => {
      formData.append(key, (data as any)[key]);
    });
    //variations
    formData.append("variations", JSON.stringify(variations));

    //preview image
    if (data.previmage instanceof File) {
      formData.append("previewimg", data.previmage);
    }

    //extra images
    // formData.append("otherimages", JSON.stringify(data.otherimages));
    data.otherimages.forEach((img) => {
      if (img.url instanceof File) {
        formData.append("images", img.url);
      }
    });

    //send data to backend
    console.log(formData);
    mutation.mutate(formData);
    // console.log(res.json());
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <h5>Edit Product</h5>
        <div>
          <Breadcrumb
            crumbs={[
              { label: "Dashboard", href: "/admin/dashboard" },
              { label: "Product List", href: "/admin/products" },
              { label: "Edit Product", href: "/admin/editproducts" },
            ]}
          />
        </div>
      </div>
      <form
        className="w-100"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-md-6">
            {/* Image Upload */}
            <label htmlFor="file-upload" className="addcube">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              ) : (
                <div>
                  <CopyPlus /> Add Image
                </div>
              )}
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="col-md-6">
            <div className="row g-2">
              {extraImages.map((img, index) => (
                <div className="col-4" key={index}>
                  <label
                    htmlFor={`extra-upload-${index}`}
                    className="extra-image-box"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`Extra ${index + 1}`}
                        className="img-fluid"
                      />
                    ) : (
                      <div className="extra-image-placeholder">
                        <CopyPlus size={18} />
                        <small>Add</small>
                      </div>
                    )}
                  </label>
                  <input
                    id={`extra-upload-${index}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleExtraImageChange(index, e)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="row mt-4">
          <div className="col-md-4">
            <label>Product Name</label>
            <input
              className="form-control"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              onChange={handleChange}
              value={data.category}
            >
              <option>Shirt (Men)</option>
              <option>Shirt (Women)</option>
              <option>Kaftan</option>
              <option>Wedding</option>
            </select>
          </div>

          {/* <div className="col-md-4">
                <label>Price</label>
                <input
                  className="form-control"
                  name="price"
                  onChange={handleChange}
                  value={price}
                />
              </div> */}

          <div className="col-md-4 mt-3">
            <label>Size:Quantity:Color</label>
            <div className="size-btn d-flex gap-2 flex-wrap">
              {variations.map((entry, index) => {
                const isDark = isDarkColor(entry.color);
                return (
                  <button
                    key={index}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: entry.color,
                      borderColor: entry.color,
                      color: isDark ? "white" : "black",
                    }}
                    onClick={() => handleDeleteSize(index)}
                  >
                    {entry.size}:{entry.quantity}
                  </button>
                );
              })}

              {/* Trigger Bootstrap Modal */}
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#sizeModal"
                onClick={() => setShowSizeModal(true)}
              >
                + Add Variant
              </button>
            </div>
          </div>

          <div className="col-md-4 mt-3">
            <label>Description</label>
            <textarea
              rows={6}
              style={{ resize: "none", height: "150px" }}
              className="form-control"
              name="description"
              onChange={handleChange}
              value={data.description ?? ""}
            ></textarea>
          </div>

          <div className="col-md-4 mt-5">
            <button type="submit" className="btn btn-success form-control">
              {mutation.isPending ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
              ) : null}
              {mutation.isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </div>

        {/* Hidden color input */}
        <input
          type="color"
          ref={colorInputRef}
          value={selectedColor}
          onChange={handleColorChange}
          style={{ display: "none" }}
        />
      </form>

      {/* Bootstrap Modal */}
      {showSizeModal && <div className="modal-backdrop fade show"></div>}
      <div
        className="modal fade"
        id="sizeModal"
        tabIndex={-1}
        aria-labelledby="sizeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="sizeModalLabel">
                Add Size Info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setShowSizeModal(false)}
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label>Size</label>
                <input
                  className="form-control"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    name="price"
                    onChange={handleChange}
                    min={1}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label>Color</label>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-secondary"
                    onClick={handleColorPick}
                  >
                    Pick Color
                  </button>
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      marginLeft: "10px",
                      borderRadius: "5px",
                      backgroundColor: selectedColor,
                      border: "1px solid #ccc",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowSizeModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={saveSizeEntry}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
