"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Interface for image data
interface ImageData {
  src: string;
}

// Image data array
const images: ImageData[] = [
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhjo8GuzxEO06g7-0uaN15t8x1pYvacGYns2AXCeK8V7h7-tMtFQdaEJBC3tqgdR9s894n6HLfB3jyoCB1zzPpXuLAdcytc7jz0A829eTPhUgLO2kvlheP72MmdqG2gpLNU_9SWLfQCjsHs_ZHD2aMfGWLZF9ST8knnn2OrIM2YDPdgwk-jN7i2ySa6VQ4/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2823%29.png",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKSTWhRA2e3Y-KlICgcXD7m77nEllHy7zu2XxQFrGDkyELImtqegl4l8nPDTvfQorAd-LLirhcFJ8MspvzfdydD2HNnOB5oOn9vfhWVUIXnRzZMuCWtoD2nXfHIoWJP6fl9kS2aRCNsqmPthfyYuqoC7SX2BaI-Cz6rAP89zTSJIaKl4fhhQTqi07UGJM/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2824%29.png",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWHeZIj5fTxGXS9_Pzkyn4n6Z88zFUKqUg2BEd30VkR0LBSaU3U7xWLm5OdjIVuGNp2YjqcspszjoTLLcAq1twOLDnWVBk3-nLy4rE3sGqrhNGHgyAKO_ATi7BG-_tylEGUk9H-Jjjdyd0fywwiKxea5fZ-fRFCNY9utyaJg77mHXenbRDg-ZJaBcZTzY/s1600/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2825%29.png",
  },
];

export default function ImageSlider(): JSX.Element {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full sm:w-4/5 mx-auto max-h-min">
      <div
        className="relative h-[300px] sm:h-[560px] w-full group overflow-hidden"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={`Slider Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`absolute transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform h-[300px] sm:h-[459px] mx-1 -mt-[10px] -translate-y-1/2 text-white group"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-gray-400 group-hover:text-white" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform h-[300px] sm:h-[459px] mx-1 -mt-[10px] -translate-y-1/2 bg-[#f9f9f900] text-white p-2 group"
        onClick={nextSlide}
      >
        <ChevronRight className="text-gray-400 group-hover:text-white" />
      </button>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-6 sm:w-10 mx-1 ${
              index === currentIndex
                ? "bg-[#c1e185] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}