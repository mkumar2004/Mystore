import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, updateProducts } from "../../redux/slices/ProductSlice";
import axios from "axios";

const EditProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedProduct } = useSelector((state) => state.products);

  const [productdata, setProductdata] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    brand: "",
    size: [],  // Sizes will be an array
    colors: [], // Colors will be an array
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setProductdata({
        ...selectedProduct,
        size: selectedProduct.sizes ?? [],
        colors: selectedProduct.colors ?? [],
        images: selectedProduct.images ?? [],
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizeChange = (e) => {
    setProductdata((prevData) => ({
      ...prevData,
      size: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  const handleColorChange = (e) => {
    setProductdata((prevData) => ({
      ...prevData,
      colors: e.target.value.split(",").map((c) => c.trim()),
    }));
  };

  const HandleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductdata((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "Product Image" }],
      }));
    } catch (error) {
      console.error("Image Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProducts({ id, productdata }));
    navigate("/admin");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Panel</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productdata.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productdata.description}
            className="w-full border border-gray-200 rounded-md p-2"
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productdata.price}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md p-2"
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productdata.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productdata.sku}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md p-2"
            required
          />
        </div>

        {/* Brand */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={productdata.brand}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md p-2"
            required
          />
        </div>

        {/* Size */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Size (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={(productdata.size ?? []).join(",")}
            onChange={handleSizeChange}
            className="w-full border border-gray-200 rounded-md p-2"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={(productdata.colors ?? []).join(",")}
            onChange={handleColorChange}
            className="w-full border border-gray-200 rounded-md p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            onChange={HandleImageUpload}
            className="block border border-gray-300 rounded p-2 cursor-pointer hover:bg-gray-400"
          />
          <div className="flex gap-4 mt-4">
            {(productdata.images ?? []).map((item, index) => (
              <div key={index}>
                <img
                  src={item.url}
                  alt={item.altText || "Product image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 font-semibold transition-all"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;

