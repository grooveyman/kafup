import { EditIcon, EyeIcon, Trash2Icon, View } from "lucide-react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useApiMutation, useApiQuery } from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Product } from "../../Home";
import ListSkeletonLoader from "../../../components/ListSkeletonLoader";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const ProductList: React.FC = () => {
  const [isDelete, setIsDelete] = useState(false);
  const { data, isLoading, isError } = useApiQuery<Product[]>(["products"], "/products");
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useApiMutation<{message:string}>(`/products/del`, "DELETE", {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({queryKey: ["products"]});
        },
        onError: (error) => {
          toast.error(error.message);
        }
      });


  const handleDelete = (name:string, id:string) => {
    console.log("Delete clicked");
    Swal.fire({
      title: "Are you sure?",
      text: `You are deleting ${name} from products. Note: This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if(result.isConfirmed){
        mutation.mutate({id});
        setIsDelete(true);
        console.log("Item deleted");
        Swal.fire("Deleted!", "Product has been removed.", "success");
      }
    });
  }

  const handleEdit = (prodid:string) => {
    if(prodid){
      navigate(`/admin/editproducts/${prodid}`);
    }
  };
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="">
            <h5>Product List</h5>
            <div className="d-flex justify-content-between">
              <div>
                <Breadcrumb
                  crumbs={[
                    { label: "Dashboard", href: "/admin/dashboard" },
                    { label: "Product List", href: "/admin/products" },
                  ]}
                />
              </div>
              <div className="">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate("/admin/addproducts")}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="table-responsive">
              <table
                className="table table-borderless table-hover"
                style={{ background: "none" }}
              >
                <thead className="">
                  <tr>
                    <th>Product Details</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                  {isLoading ? (
                    <tr>
                      <td><ListSkeletonLoader count={3} /></td>
                      <td><ListSkeletonLoader count={3} /></td>
                      <td><ListSkeletonLoader count={3} /></td>
                      <td><ListSkeletonLoader count={3} /></td>
                      <td><ListSkeletonLoader count={3} /></td>
                    </tr>
                    
                  ) : (
                    data?.map((product:any) => {
                      return(
                        <tr className="" key={product.id}>
                      <td className="">
                        <div className="d-flex gap-3">
                          <img
                            src={product.previewimg}
                            height={50}
                            width={50}
                          />
                          <div className="prod-det">
                            <p className="prodname">{product.name}</p>
                            <p className="prod-var">Variations</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="prod-category">
                          {product.category && <span className="table-card">{product.category}</span>}
                          <span className="table-card">Men</span>
                        </p>
                      </td>
                      <td className="">
                        <p>{product.quantity}</p>
                      </td>

                      <td>
                        <div className="d-flex">
                          <p>{product.price}</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <p>{product.total}</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <p className="prod-action-btn">
                            <EditIcon
                              className="prod-action-edit"
                              style={{ cursor: "pointer" }}
                              size={25}
                              strokeWidth={1.3}
                              onClick={() => handleEdit(product.id)}
                            />
                            <Trash2Icon
                              className="prod-action-del"
                              size={25}
                              style={{ cursor: "pointer" }}
                              strokeWidth={1.3}
                              onClick={() => handleDelete(product.name, product.id)}
                            />
                          </p>
                        </div>
                      </td>
                    </tr>
                      );
                    })
                    
                  )}

                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
