import { useCart } from "../../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Item from "./Item";

import empty from "../../assets/Images/empty.png";
import api from "../../api/axios";
import { useLoader } from "../../contexts/LoaderContext";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
const Cart = () => {
  const { cart } = useCart();
  const { setShowLoader } = useLoader();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (!cart) {
    return (
      <div className="text-center w-full px-2 py-20 text-xl">Loading...</div>
    );
  }

  const { products, totalCartPrice } = cart.data;

  function checkout() {
    setShowLoader(true);
    api
      .post(
        `/orders/checkout-session/${cart?.cartId}?url=https://mks-shop.netlify.app`,
        {
          shippingAddress: {
            details: "details",
            phone: "0123456789",
            city: "Cairo",
          },
        },
        {
          headers: { token: localStorage.token },
        }
      )
      .then((res) => {
        setShowLoader(false);
        window.location.href = res.data.session.url;
      })
      .catch(() => {
        setShowLoader(false);
      });
  }

  return (
    (cart.numOfCartItems > 0 && (
      <section className="bg-gray-50 py-8  md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-8">
                {products.map((item, index) => {
                  return <Item item={item} key={index} />;
                })}
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${totalCartPrice}
                    </dd>
                  </dl>
                </div>
                <button
                  onClick={checkout}
                  className="flex w-full items-center bg-orange-400 text-white justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Checkout
                </button>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to={"/"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    {" "}
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )) || (
      <div className=" flex justify-center items-center flex-col gap-10 px-3  py-20 min-h-screen">
        <img src={empty} className="" alt="cart is empty" />

        <Link className="btn btn-warning text-gray-100 px-10" to={"/"}>
          Shop Products
        </Link>
      </div>
    )
  );
};

export default Cart;
