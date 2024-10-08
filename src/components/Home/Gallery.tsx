import React, { useRef } from "react";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { galleryInfo } from "../../data/galleryInfo";

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, title }) => (
  <div className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
    <img className="h-[350px] sm:h-[450px] w-full sm:w-[280px]  lg:w-[332px]" src={src} alt={alt} />
    <p className="mt-5 text-base font-bold text-gray-600">{title}</p>
  </div>
);

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="p-1.5 -m-1.5 text-gray-300 transition-all duration-200 rounded-full hover:text-gray-600 hover:bg-gray-100"
  >
    {direction === "left" ? (
      <LuChevronLeft className="w-6 h-6" />
    ) : (
      <LuChevronRight className="w-6 h-6" />
    )}
  </button>
);

export const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div className="max-w-md mx-auto text-center lg:text-left lg:mx-0">
              <h2 className="text-3xl font-bold text-gray-900">{galleryInfo.title}</h2>
              <p className="mt-6 text-base font-medium text-gray-500">{galleryInfo.description}</p>
            </div>

            <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-3">
              <NavigationButton direction="left" onClick={() => scroll("left")} />
              <NavigationButton direction="right" onClick={() => scroll("right")} />
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex w-full gap-6 pb-8 mt-12 overflow-x-auto sm:mt-16 snap-x"
        >
          {galleryInfo.images.map((image, index) => (
            <ImageCard key={index} {...image} />
          ))}
        </div>

        <div className="flex items-center justify-center mt-4 space-x-3 lg:hidden">
          <NavigationButton direction="left" onClick={() => scroll("left")} />
          <NavigationButton direction="right" onClick={() => scroll("right")} />
        </div>
      </section>
    </div>
  );
};
