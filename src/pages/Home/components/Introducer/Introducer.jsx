import React from 'react';

const Introducer = ({ title, des, imgLink, flexReverse = false }) => {
  return (
    <div className="introducer mt-14 px-3 md:px-8">
      <h4 className=" mb-6 text-xl font-bold text-[#000A3D] sm:text-2xl md:mb-12">
        {title}
      </h4>
      <div
        className={`flex flex-col md:flex-row ${
          flexReverse && 'md:flex-row-reverse'
        }`}
      >
        <div className="w-full pr-4 md:w-1/2">
          <img src={imgLink} alt="image_introduce"></img>
        </div>
        <div className="w-full whitespace-pre-line text-justify leading-6 tracking-wider md:w-1/2">
          <p>{des}</p>
          <button className="mt-9 h-9 w-28 rounded bg-[#132533] font-semibold text-white">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introducer;
