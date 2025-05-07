import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { product } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useLoader } from "../../contexts/LoaderContext";
import { useCart } from "../../contexts/CartContext";
export default function ProductOverview() {
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const { setShowLoader } = useLoader();

  useEffect(() => {
    setShowLoader(true);

    window.scrollTo(0, 0);

    async function fetchProductDetails() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);
        setMainImage(res.data.data.images[0]); // Set initial main image
        setShowLoader(false);
      } catch (error) {
        console.error("Failed to fetch product details", error);
        setShowLoader(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  function addToCart() {
    if (!user) {
      return navigate("/register");
    }

    addItem(id || "");
  }

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  return (
    product && (
      <div className="product-overview  mx-auto p-6 bg-white shadow-md  ">
        <div className="">
          <div className="product-images w-full">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-80 object-contain bg-gray-100"
            />
            <div className="flex max-w-screen overflow-scroll hide-scroll gap-2  my-10 w-fit mx-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer ${
                    mainImage === image
                      ? "border-2 border-yellow-500"
                      : "border"
                  }`}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="product-info space-y-3">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold text-yellow-600">
              ${product.price}
            </p>
            <p>Category: {product.category?.name}</p>
            <p>Brand: {product.brand?.name}</p>
            <p>Sold: {product.sold} times</p>
            <p>Quantity: {product.quantity}</p>
            <div className="flex items-center gap-2">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.217 3.752a1 1 0 00.95.69h3.946c.969 0 1.371 1.24.588 1.81l-3.192 2.425a1 1 0 00-.36 1.118l1.218 3.752c.3.921-.755 1.688-1.539 1.118l-3.192-2.425a1 1 0 00-1.176 0l-3.192 2.425c-.784.57-1.838-.197-1.539-1.118l1.218-3.752a1 1 0 00-.36-1.118L2.746 8.479c-.783-.57-.38-1.81.589-1.81h3.946a1 1 0 00.95-.69l1.217-3.752z" />
                </svg>
                <span>{product.ratingsAverage}</span>
              </span>
              <span>({product.ratingsNumber} ratings)</span>
            </div>
          </div>
        </div>
        <button
          onClick={addToCart}
          className="bg-orange-400 text-white py-3  w-full mt-10"
        >
          Add To Cart
        </button>
      </div>
    )
  );
}
