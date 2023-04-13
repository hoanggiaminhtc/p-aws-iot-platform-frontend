import React from 'react';
import { Link } from 'react-router-dom';

const Introducer = ({ title, des, imgLink, flexReverse = false, linkTo,linkToRead }) => {
  return (
    <div className="px-3 introducer mt-14 md:px-8">
      {
        linkTo ? <Link to={linkTo} className="mb-6 text-xl font-bold text-[#000A3D] dark:text-[#2E89FF] sm:text-2xl md:mb-12 block">{title}</Link> : <h4 className="mb-6 text-xl font-bold text-[#000A3D] dark:text-[#2E89FF] sm:text-2xl md:mb-12">
        {title}
      </h4>
      }
      <div
        className={`flex flex-col gap-5 md:flex-row ${
          flexReverse && 'md:flex-row-reverse'
        }`}
      >
        <div className="flex items-center w-full pr-4 bg-white rounded md:w-1/2">
          <img src={imgLink} alt="image_introduce"></img>
        </div>
        <div className="w-full leading-6 tracking-wider text-justify whitespace-pre-line md:w-1/2">
          <p>{des}</p>
          {
            linkToRead ?<Link to={linkToRead} className="mt-9 flex h-9 w-28 rounded bg-[#132533] font-semibold text-white dark:bg-[#2E89FF] items-center justify-center">Read more</Link> : <div className="flex mt-9 h-9 w-28 rounded bg-[#132533] font-semibold text-white dark:bg-[#2E89FF] items-center justify-center">
            Read more
          </div>
          }
         
        </div>
      </div>
    </div>
  );
};

export default Introducer;
