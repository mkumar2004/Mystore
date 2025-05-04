import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Removeitem, Upadatecartitem } from "../../redux/slices/CartSlice";

const Product = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding and subtracting quantity
  const handleAddtocart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        Upadatecartitem({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  // Handle removing items
  const handleRemoveitemsCart = (productId, size, color) => {
    dispatch(Removeitem({ productId, size, color, guestId, userId }));
  };

  return (
    <div>
      {cart.products.map((item, index) => (
        <div key={index} className="flex justify-between items-start px-5 py-4 border-b">
          <div className="flex items-start">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded object-cover mr-4"
            />
            <div>
              <h2 className="uppercase font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>

              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddtocart(item.productId, -1, item.quantity, item.size, item.color)
                  }
                  className="bg-red-500 px-3 py-1 rounded-full text-white text-lg hover:bg-red-600"
                >
                  -
                </button>
                <span className="mx-4">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleAddtocart(item.productId, 1, item.quantity, item.size, item.color)
                  }
                  className="bg-red-500 px-3 py-1 rounded-full text-white text-lg hover:bg-red-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end ml-4">
            <h2 className="text-lg font-semibold">₹{item.price.toLocaleString()}</h2>
            <button onClick={() => handleRemoveitemsCart(item.productId, item.size, item.color)}>
              <RiDeleteBinFill className="h-6 w-6 text-orange-400 hover:text-orange-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
