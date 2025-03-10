import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img4 from "../../assets/carouselimg/image 333.jpg";
import img5 from "../../assets/carouselimg/image 555.jpg";
import img6 from "../../assets/carouselimg/image 666.jpg";
import img3 from "../../assets/carouselimg/image 777.jpg";

export default function Banner() {
  return (
    <Carousel>
      <div className="relative flex items-center justify-center lg:min-h-screen">
        <img src={img3} alt="Apple TV" className="w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Vivica A. Fox to Star in New Empire Spinoff
          </h2>
          <p className="text-center w-10/12">
            A camera club supporting local photographers of all abilities is
            celebrating its 50th anniversary. Mid Somerset Camera Club meets
            every Tuesday in Street - and has done for decades.
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-center lg:min-h-screen">
        <img src={img4} alt="Apple TV" className="w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white space-y-4">
          <h2 className="text-2xl font-bold text-center">
            A Veggie Dish to Impress Your Friends
          </h2>
          <p className="text-center w-10/12">
            A camera club supporting local photographers of all abilities is
            celebrating its 50th anniversary. Mid Somerset Camera Club meets
            every Tuesday in Street - and has done for decades.
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-center lg:min-h-screen">
        <img src={img5} alt="Apple TV" className="w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Mysterious Light in California Sky on Friday
          </h2>
          <p className="text-center w-10/12">
            A camera club supporting local photographers of all abilities is
            celebrating its 50th anniversary. Mid Somerset Camera Club meets
            every Tuesday in Street - and has done for decades.
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-center lg:min-h-screen">
        <img src={img6} alt="Apple TV" className="w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Arsenal Beat by Bayern and Loses the Tournament
          </h2>
          <p className="text-center w-10/12">
            A camera club supporting local photographers of all abilities is
            celebrating its 50th anniversary. Mid Somerset Camera Club meets
            every Tuesday in Street - and has done for decades.
          </p>
        </div>
      </div>
    </Carousel>
  );
}
