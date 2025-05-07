import { useEffect, useState } from "react";
import { product } from "../../types";
import api from "../../api/axios";
import Product from "../../components/ui/Product";

export default function BestSeller() {
  const [bestSeller, setBestSeller] = useState<product[]>([]);

  useEffect(() => {
    async function getBestSeller() {
      const res = await api.get("/products?sort=-sold&limit=6");
      setBestSeller(res.data.data);
    }

    getBestSeller();
  }, []);

  return (
    <div className="max-w-screen overflow-scroll hide-scroll w-full py-5 max-sm:w-full px-3   mt-5">
      <h2 className="text-2xl font-bold mb-5">Best Seller</h2>
      <div className="flex items-center  gap-7 flex-wrap justify-center">
        {bestSeller.map((product, index) => {
          return <Product product={product} key={index} />;
        })}
      </div>
    </div>
  );
}
