import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProducts, FetchProducts } from '../../redux/slices/AdminProductSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(FetchProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(DeleteProducts(productId))
        .unwrap()
        .then(() => {
          // refetch to refresh the list
          dispatch(FetchProducts());
        })
        .catch((err) => {
          console.error('Delete failed:', err);
        });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      {loading && <p className="text-blue-500 mb-4">Loading products…</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr
                  key={item._id}
                  className="border-b bg-gray-50 hover:bg-gray-100"
                >
                  <td className="p-4 font-medium whitespace-nowrap text-gray-700">
                    {item.name}
                  </td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">{item.sku}</td>
                  <td className="p-4 space-x-2">
                    <Link
                      to={`/admin/ProductMangment/${item._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-amber-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-cyan-500 text-xl"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
