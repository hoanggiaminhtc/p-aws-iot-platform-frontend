import React from 'react';
import PropTypes from 'prop-types';

const BlockIntroduceDocument = ({ icon, title, subTitle, content }) => {
  let Icon = icon;

  return (
    <a
      href="/"
      target="_blank"
      rel="noopener"
      className="bg-[#FFFFFF] p-[15px]"
    >
      <div className="flex items-center text-lg leading-[18px] text-[#0174e9]">
        <Icon></Icon>
        <span className="ml-[2px]">{title}</span>
      </div>
      <div className="my-[15px] leading-[22.8571px] text-[#58666e]">
        {subTitle}
      </div>
      <p className="leading-[22.8571px] text-[#98a6ad]">{content}</p>
    </a>
  );
};

BlockIntroduceDocument.propTypes = {
  icon: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  content: PropTypes.string,
};

export default BlockIntroduceDocument;
