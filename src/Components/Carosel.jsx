import React, {useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import { getData } from "../Context/DataContext";
import { Autoplay } from "swiper/modules";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

// Custom arrows
const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={() => swiper.slidePrev()}
        className="absolute  left-3 top-[68%] md:left-5 md:top-1/2 z-30 -translate-y-1/2 
                   rounded-full bg-red-500 p-2 text-white 
                   hover:bg-red-600 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => swiper.slideNext()}
        className="absolute right-3 top-[68%] md:right-5 md:top-1/2 z-30 -translate-y-1/2 
                   rounded-full bg-red-500 p-2 text-white 
                   hover:bg-red-600 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </>
  );
};

const Carosel = () => {
const { data, fetchAllProducts } = getData();
 const navigate = useNavigate()

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // console.log("data =", data);

  return (
    <>
    <Swiper
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      className="w-full relative"
    >
      {data?.slice(0, 7)?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="h-[600px] w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
              <div className="flex flex-col md:flex-row my-0 md:my-0 gap-10 h-[580px] items-center justify-center px-4 ">
                <div className="md:space-y-6 space-y-3">
                  <h3 className="text-red-500 font-semibold font-sans text-sm mt-6">
                    Powering Your World with the Best in Electronics
                  </h3>
                  <h1 className=" md:text-4xl text-xl font-bold uppercase  line-clamp-2 md:line-clamp-3 md:w-[500px] text-white">
                    {item.title}
                  </h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400">
                    {item.description}
                  </p>
                  <button
                    className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md
                     cursor-pointer mt-2" onClick={()=>navigate('./products')}
                  >
                    Shop Now
                  </button>
                </div>
                <div
                  className="flex md:h-[450px] md:w-[450px] h-[300px] w-[300px] items-center justify-center rounded-full bg-white
                  transition-all shadow-2xl shadow-red-400 hover:scale-110 "
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-full md:w-[260px] w-[150px] 
                 "
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      <SliderButtons />
    </Swiper>
     <Category/>
   </>
  );
};

export default Carosel;
