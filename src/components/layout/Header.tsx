import profile from "../../assets/Images/profile.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  return (
    <div className="navbar  shadow-sm px-10 !border-b-1 border-b-gray-300 !pb-2 bg-neutral-950 text-white">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          MKS Store
        </Link>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <Link to="/cart" className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />{" "}
              </svg>
              <span className="badge badge-sm indicator-item !border-1 !border-gray-200">
                {cart?.numOfCartItems || "0"}
              </span>
            </div>
          </div>
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={profile} />
            </div>
          </div>
          {}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black"
          >
            {(!user && (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )) || (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
