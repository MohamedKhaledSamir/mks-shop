import { useEffect, useState } from "react";
import { brand } from "../../types";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Brands() {
  const [brands, setBrands] = useState<brand[]>([]);
  useEffect(() => {
    async function getBrands() {
      const res = await api.get("/brands");
      setBrands(res.data.data);
    }

    getBrands();
  }, []);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 50,
        },
      }}
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="mySwiper my-5 !px-10 border-y-1 border-gray-300 !py-5 "
    >
      {brands.map((brand, index) => (
        <SwiperSlide>
          <Link className="" to={`/brands/${brand._id}`} key={index}>
            <img
              src={brand.image}
              alt={brand.name}
              className="w-30  object-fit object-contain"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
