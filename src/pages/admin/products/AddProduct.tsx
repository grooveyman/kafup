import React, { useState, useRef } from 'react';
import './admin.css';
import { CopyPlus } from 'lucide-react';
import Breadcrumb from '../../../components/BreadCrumb';
import { href } from 'react-router-dom';

interface SizeEntry {
  size: string;
  quantity: number;
  color: string;
}

declare global {
  interface Window {
    bootstrap: any;
  }
}


const AddProducts: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [sizes, setSizes] = useState<SizeEntry[]>([]);
  const [showSizeModal, setShowSizeModal] = useState(false);    

  const colorInputRef = useRef<HTMLInputElement>(null);

  const isDarkColor = (hexColor: string): boolean => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    const yiq = (r*299 + g*587 + b*114)/1000;
    return yiq < 128;
  }

  //extra images
  const [extraImages, setExtraImages] = useState<(string | null)[]>([null, null, null]);

const handleExtraImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

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

    const newEntry: SizeEntry = {
      size,
      quantity,
      color: selectedColor,
    };

    setSizes([...sizes, newEntry]);

    // Reset form values
    setSize('');
    setQuantity(1);
    setSelectedColor('#000000');

    

    setShowSizeModal(false);

  };
  

  const handleDeleteSize = (index: number) => {
        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
        setSizes(updatedSizes);
    }

  return (
    <div className="container">
      <div className='row'>
        <h5>Add New Product</h5>
        <div>
                <Breadcrumb crumbs={[{label: "Dashboard", href:"/dashboard"}, {label:"Product List", href:"/products"}, {label:"Add Product", href:"/addproducts"}]} />
              </div>
      </div>
      <div className="row">
        <div className='col-md-6'>
{/* Image Upload */}
        <label htmlFor="file-upload" className="addcube">
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          ) : (
            <div><CopyPlus /> Add Image</div>
          )}
        </label>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        </div>
        <div className='col-md-6'>
           <div className='row g-2'>
    {extraImages.map((img, index) => (
      <div className='col-4' key={index}>
        <label htmlFor={`extra-upload-${index}`} className="extra-image-box">
          {img ? (
            <img src={img} alt={`Extra ${index + 1}`} className="img-fluid" />
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
          style={{ display: 'none' }}
          onChange={(e) => handleExtraImageChange(index, e)}
        />
      </div>
    ))}
  </div>
        </div>
        
      </div>

      {/* Form */}
      <div className='row mt-4'>
        <div className='col-md-4'>
          <label>Product Name</label>
          <input className='form-control' />
        </div>

        <div className='col-md-4'>
          <label>Category</label>
          <select className='form-control'>
            <option>Shirt (Men)</option>
            <option>Shirt (Women)</option>
            <option>Kaftan</option>
            <option>Wedding</option>
          </select>
        </div>

        <div className='col-md-4'>
          <label>Price</label>
          <input className='form-control' />
        </div>

        <div className='col-md-4 mt-3'>
          <label>Size:Quantity:Color</label>
          <div className='size-btn d-flex gap-2 flex-wrap'>
            {sizes.map((entry, index) => {
                const isDark = isDarkColor(entry.color);
              return (<button key={index} className='btn btn-primary d-flex align-items-center gap-2' style={{backgroundColor: entry.color, borderColor:entry.color, color:isDark?'white':'black'}} onClick={() =>  handleDeleteSize(index)}>
                {entry.size}:{entry.quantity}
              </button>)
            })}

            {/* Trigger Bootstrap Modal */}
            <button
              className='btn btn-outline-secondary'
              data-bs-toggle="modal"
              data-bs-target="#sizeModal"
              onClick={()=>setShowSizeModal(true)}
            >
              + Add Variant
            </button>
          </div>
        </div>

        <div className='col-md-4 mt-3'>
            <label>Description</label>
            <textarea rows={6} style={{resize:"none", height:"150px"}} className='form-control'></textarea>
        </div>

        <div className='col-md-4 mt-5'>
            <button className='btn btn-success form-control'>Save</button>
        </div>
      </div>

      {/* Hidden color input */}
      <input
        type="color"
        ref={colorInputRef}
        value={selectedColor}
        onChange={handleColorChange}
        style={{ display: 'none' }}
      />







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
              <h5 className="modal-title" id="sizeModalLabel">Add Size Info</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

              <div className="mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                />
              </div>

              <div className="mb-3">
                <label>Color</label>
                <div className="d-flex align-items-center">
                  <button className="btn btn-secondary" onClick={handleColorPick}>
                    Pick Color
                  </button>
                  <div
                    style={{
                      width: '25px',
                      height: '25px',
                      marginLeft: '10px',
                      borderRadius: '5px',
                      backgroundColor: selectedColor,
                      border: '1px solid #ccc',
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setShowSizeModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={saveSizeEntry}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
