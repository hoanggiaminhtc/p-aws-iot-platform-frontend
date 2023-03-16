import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ImgError from '~/assets/image/img_error.jpg';

const Img = ({ linkImg, name = 'img', shape = '' }) => {
  const [addressImg, setAddressImg] = useState(linkImg);

  const handleErrorImg = () => {
    setAddressImg(ImgError);
  };

  useEffect(() => {
    setAddressImg(linkImg);
  }, [linkImg]);

  return (
    <img
      src={addressImg}
      alt={name}
      onError={handleErrorImg}
      className={`h-full w-full object-cover ${shape}`}
    ></img>
  );
};

Img.propTypes = {
  linkImg: PropTypes.string,
  name: PropTypes.string,
  shape: PropTypes.string,
};

export default Img;
