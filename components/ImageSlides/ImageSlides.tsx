import React, { useState } from "react";

const ImageSlides: React.FC<{ name: string, imagePaths: string[], loading: boolean }> = ({ name, imagePaths = [], loading = true }) => {
  const [currentIndexImage, setCurrentIndexImage] = useState(0);

  if (loading) {
    return (
      <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded order-1 sm:order-2">
        Loading
      </div>
    )
  }

  const changeCurrentIndex = (index: number) => {
    setCurrentIndexImage(index);
  }

  return (
    <div className="relative lg:w-1/2 w-full lg:h-auto h-64 order-1 sm:order-2">
      <img
        alt={name}
        className="w-full h-full object-contain object-center"
        src={imagePaths[currentIndexImage]}
      />

      <div className="absolute w-full h-12 bottom-0 left-0 flex justify-center items-center">
        {
          imagePaths.map((ip, index) =>
            <button
              key={ip}
              className={"block h-3 w-3 mr-4 bg-indigo-600 rounded-full " + (currentIndexImage === index ? 'bg-indigo-400 shadow-md' : 'shadow-sm')}
              title={index.toString()}
              onClick={e => changeCurrentIndex(index)}></button>
          )
        }
      </div>
    </div>
  );
}

export default ImageSlides;