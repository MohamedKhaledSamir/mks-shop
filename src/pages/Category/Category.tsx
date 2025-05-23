import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { category, product } from "../../types";
import api from "../../api/axios";
import Product from "../../components/ui/Product";
import { useLoader } from "../../contexts/LoaderContext";

export default function Category() {
  const { setShowLoader } = useLoader();
  const { id } = useParams();
  const [products, setProducts] = useState<product[]>([]);
  const [category, setCategory] = useState<category>({
    name: "",
    _id: id || "",
    image: "",
  });

  useEffect(() => {
    setShowLoader(true);
    window.scrollTo(0, 0);
    async function getBrandProducts() {
      const res = await api.get(`/products?category[in]=${id}`);

      setProducts(res.data.data);
      setShowLoader(false);
    }

    async function getBrand() {
      const res = await api.get(`/categories/${id}`);
      setCategory(res.data.data);
    }

    getBrand();

    getBrandProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-20 px-5">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-700">
          <li>
            <div
              className="block transition-colors hover:text-gray-900"
              aria-label="Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <div className="block transition-colors text-lg hover:text-gray-900">
              {" "}
              Category{" "}
            </div>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <div className="block transition-colors text-lg hover:text-gray-900">
              {" "}
              {category.name}{" "}
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex items-center gap-10 flex-wrap justify-center">
        {products.map((product, index) => {
          return <Product product={product} key={index} />;
        })}
      </div>
    </div>
  );
}
