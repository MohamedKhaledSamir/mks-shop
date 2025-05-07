import { useState } from "react";
import api from "../../api/axios";
import { useLoader } from "../../contexts/LoaderContext";
import { useCart } from "../../contexts/CartContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Item({ item }: { item: any }) {
  const [count, setCount] = useState<number>(item.count);
  const { setShowLoader } = useLoader();
  const { removeItem } = useCart();

  function increament() {
    setShowLoader(true);
    api
      .put(
        `/cart/${item.product._id}`,
        { count: `${count + 1}` },
        { headers: { token: localStorage.token } }
      )
      .then(() => {
        setCount(count + 1);
        setShowLoader(false);
      });
  }
  function decreament() {
    if (count === 1) return;

    setShowLoader(true);
    api
      .put(
        `/cart/${item.product._id}`,
        { count: `${count - 1}` },
        { headers: { token: localStorage.token } }
      )
      .then(() => {
        setCount(count - 1);
        setShowLoader(false);
      });
  }

  return (
    <div className="flex items-center justify-between max-sm:flex-col max-sm:justify-center max-sm:gap-8 px-3 rounded-md p-3 bg-white border-1 border-gray-200">
      <div className="left-side flex gap-10">
        <img
          className="w-30 h-30"
          src={item.product.imageCover}
          alt="product image"
        />

        <div className="flex flex-col gap-3 justify-center">
          <h3 className="max-w-64">{item.product.title}</h3>

          <p>${item.price * count}</p>
          <button
            onClick={() => removeItem(item.product._id)}
            className="text-error w-fit "
          >
            Remove Item
          </button>
        </div>
      </div>

      <div className="right-side min-sm:space-y-5 max-sm:flex items-center  max-sm:gap-4">
        <button onClick={increament} className="btn btn-neutral">
          +
        </button>

        <p className="text-center font-bold text-lg border-1 px-3 py-1 border-gray-200 rounded-md">
          {count}
        </p>

        <button onClick={decreament} className="btn btn-neutral">
          -
        </button>
      </div>
    </div>
  );
}
