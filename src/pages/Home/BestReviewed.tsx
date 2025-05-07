import  { useEffect, useState } from "react";
import { product } from "../../types";
import api from "../../api/axios";
import Product from "../../components/ui/Product";

export default function BestReviewed() {
  const [bestReviewed, setBestReviewed] = useState<product[]>([]);

  useEffect(() => {
    async function getBestReviewed() {
      const res = await api.get("/products?sort=-ratingsAverage&limit=6");
      setBestReviewed(res.data.data);
    }

    getBestReviewed();
  }, []);

  return (
    <div className="max-w-screen overflow-scroll hide-scroll w-full px-3 py-5   mt-5 mb-20">
      <h2 className="text-2xl font-bold mb-5">Best Reviewed</h2>
      <div className="flex items-center  gap-7 flex-wrap justify-center">
        {bestReviewed.map((product, index) => {
          return <Product product={product} key={index} />;
        })}
      </div>
    </div>
  );
}
