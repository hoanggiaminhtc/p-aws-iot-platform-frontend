import React from 'react';

import SideBarIntroduces from '~/components/SideBarIntroduces';

const Assets = () => {
  const Form = () => {
    return <h1>SideBarAssets</h1>;
  };

  return (
    <div>
      <SideBarIntroduces
        title="Assets"
        content="Bring your group of devices access to your IoT application."
        contentBtn="Create a Assets"
        elementForm={Form}
      />
    </div>
  );
};

export default Assets;
