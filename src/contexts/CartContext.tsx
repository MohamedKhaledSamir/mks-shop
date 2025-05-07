import { createContext, useContext, useState, ReactNode } from "react";
import api from "../api/axios";
import { useToast } from "./ToastContext";
import { useLoader } from "./LoaderContext";
import { product } from "../types";

interface item {
  count: number;
  _id: string;
  product: product;
  price: number;
}

interface cart {
  numOfCartItems: number;
  cartId: string;
  data: {
    products: item[];
    totalCartPrice: number;
  };
}

interface CartContextType {
  cart: cart | null;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<cart | null>(null);
  const { setShowToast, setMessage, setType } = useToast();
  const { setShowLoader } = useLoader();
  const fetchCart = async () => {
    try {
      const response = await api.get("/cart", {
        headers: { token: localStorage.token },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  fetchCart();

  function addItem(productId: string) {
    setShowLoader(true);
    api
      .post(
        "/cart",
        {
          productId,
        },
        {
          headers: { token: localStorage.token },
        }
      )
      .then(() => {
        fetchCart();
        setMessage("Product added to cart");
        setType("success");
        setShowToast(true);
        setShowLoader(false);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setType("error");
        setShowToast(true);
        setShowLoader(false);
      });
  }

  function removeItem(productId: string) {
    setShowLoader(true);
    api
      .delete(`/cart/${productId}`, {
        headers: { token: localStorage.token },
      })
      .then(() => {
        setShowLoader(false);
      })
      .catch(() => {
        setShowLoader(false);
      });
  }

  function clearCart() {}
  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
