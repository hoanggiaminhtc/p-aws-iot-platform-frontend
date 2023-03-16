import React from 'react';
import PropTypes from 'prop-types';

const BlockIntroduceFeature = ({ indexBlock, icon, title, content }) => {
  let Icon = icon;

  return (
    <div
      className={`${
        indexBlock === 2 &&
        'mtb:col-start-1 mtb:col-end-3 mmb:col-start-auto mmb:col-end-auto'
      }`}
    >
      <Icon className="mb-8 text-[28px] leading-7 text-[#0174e9]"></Icon>
      <h4 className="mb-[30px] text-lg font-medium leading-5 text-[#0174e9]">
        {title}
      </h4>
      <p className="leading-[22.8571px] text-[#58666e]">{content}</p>
    </div>
  );
};

BlockIntroduceFeature.propTypes = {
  icon: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default BlockIntroduceFeature;
