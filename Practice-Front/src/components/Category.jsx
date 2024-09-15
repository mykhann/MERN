import React from "react";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const category = [
  "FullStack Developer",
  "React Developer",
  "Data Scientist",
  "Data Engineer",
  "Data Collector",
  "Graphic Designer",
  "Product Manager",
  "UX/UI Designer",
];

const Category = () => {
  return (
    <div className="relative">
        <div className="mt-4 mb-0 font-bold text-red-600"><h1>JOBS AVAIALABLE FOR</h1></div>
      <Carousel className="relative  overflow-hidden">
        <CarouselContent className="grod grid-cols-3 gap-4 font-bold">
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 w-1/4 p-4 font-bold   bg-red-50 rounded-lg shadow-md text-center"
            >
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-500 text-white rounded-full p-2 cursor-pointer">
          &gt;
        </CarouselNext>
        <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 text-white rounded-full p-2 cursor-pointer">
          &lt;
        </CarouselPrevious>
      </Carousel>
    </div>
  );
};

export default Category;
