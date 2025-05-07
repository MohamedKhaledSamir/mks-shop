import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/layout/Header";
import Category from "./pages/Category/Category";
import ProductOverview from "./pages/ProductOverview/ProductOverview";
import Footer from "./components/layout/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProtectedAuth from "./utils/ProtectedAuth";
import { useLoader } from "./contexts/LoaderContext";
import Loader from "./components/ui/Loader";
import { useToast } from "./contexts/ToastContext";
import Toast from "./components/ui/Toast";
import Cart from "./pages/Cart/Cart";

export default function App() {
  const { showLoader } = useLoader();
  const { showToast } = useToast();

  return (
    <BrowserRouter>
      <Header />

      {showLoader && <Loader />}
      {showToast && <Toast />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Categories/:id" element={<Category />} />
        <Route path="/products/:id" element={<ProductOverview />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedAuth />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
