import { product } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function Product({ product }: { product: product }) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  function addToCart() {
    if (!user) {
      return navigate("/register");
    }

    addItem(product.id);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addToCart();
  }

  return (
    <div
      key={product.id}
      className="group relative block overflow-hidden w-72  max-sm:w-full"
    >
      <Link to={`/products/${product.id}`}>
        <img
          src={product.images[0]}
          alt=""
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-105  "
        />
      </Link>

      <div className="relative border border-gray-100 bg-white p-6">
        <h3 className="mt-4 line-clamp-2 h-20 text-lg font-medium text-gray-900">
          {product.title}
        </h3>

        <p className="  text-gray-700 text-lg">${product.price}</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <button className="block w-full rounded-sm bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}
