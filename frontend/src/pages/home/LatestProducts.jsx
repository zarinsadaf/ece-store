import React, { useState, useRef, useEffect } from 'react';
import MerchandiseCard from '../Merchandises/MerchandiseCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { useFetchAllMerchandiseQuery } from '../../redux/features/merchandises/merchandisesApi';

const categories = [
  "Choose Product Type",
  "Cricket Jersey",
  "Football Jersey",
  "Volleyball Jersey",
  "Fan T-Shirt",
  "Winter Collection"
];

const LatestProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose Product Type");
  const { data: merchandises = [] } = useFetchAllMerchandiseQuery();

  const nextRef = useRef(null);

  const filteredMerchandises =
    selectedCategory === "Choose Product Type"
      ? merchandises
      : merchandises.filter(
          (merchandise) =>
            merchandise.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Latest Products</h2>

      {/* Category Filter */}
      <div className='mb-8 flex items-center'>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Swiper Slider */}
      <div className="relative">
        {/* Right Arrow Only */}
        <div
          ref={nextRef}
          className="swiper-button-next text-black absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
        ></div>

        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          onInit={(swiper) => {
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          modules={[Navigation]}
        >
          {filteredMerchandises.length > 0 ? (
            filteredMerchandises.map((merchandise, index) => (
              <SwiperSlide key={index}>
                <MerchandiseCard merchandise={merchandise} />
              </SwiperSlide>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestProducts;