import Product from "../components/SingleProduct/Product";
export const addToCart = (product, quantity) => (dispatch, getState) => {
  var cartItem = {
    name: product.name,
    _id: product._id,
    image: product.image,

    quantity: quantity,
    prices: product.price,
  };

  dispatch({ type: "ADD_TO_CART", payload: cartItem });

  const cartItems = getState().cartReducer.cartItems;

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteFromCart = (product) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: product });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
