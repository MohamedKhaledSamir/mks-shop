import { useState } from "react";
import { Link } from "react-router-dom";
import { category } from "../../types/index.ts";
export default function Categories() {
  const [categories] = useState<category[]>([
    {
      _id: "6439d5b90049ad0b52b90048",
      name: "Men's Fashion",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
    },
    {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Women's Fashion",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg",
    },
    {
      _id: "6439d2d167d9aa4ca970649f",
      name: "Electronics",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png",
    },
  ]);

  return (
    <div className="   border-y-gray-400 mb-16 rounded-md min-md:mt-7 flex min-md:gap-10 px-5 justify-center items-center flex-wrap  bg-gray-100 text-black">
      {categories.map((category, index) => (
        <Link
          to={"/categories/" + category._id}
          key={index}
          className={` relative block max-md:w-full  h-96 `}
        >
          <div className="relative max-md:w-full w-96 h-full">
            <img
              src={category.image}
              alt="category image"
              className="absolute inset-0 h-full w-full object-cover object-center  "
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
            <h3 className="text-xl font-medium  bg-white text-black px-5 py-2">
              {category.name}
            </h3>

            <span className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide text-white uppercase">
              Shop Now
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
