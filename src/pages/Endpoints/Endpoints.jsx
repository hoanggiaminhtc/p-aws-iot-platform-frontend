import React from 'react';
import {
  FaTachometerAlt,
  FaCode,
  FaLock,
  FaBook,
  FaVideo,
  FaHeadset,
} from 'react-icons/fa';

import SideBarIntroduces from '~/components/SideBarIntroduces';
import BlockWrapperIntroduce from '~/components/BlockWrapperIntroduce';

const Form = () => {
  return <div>1</div>;
};

const Endpoints = () => {
  const content1 = [
    {
      icon: FaTachometerAlt,
      title: 'OFF-LOAD DEVICE REQUIREMENTS',
      content:
        'Devices can easily interact with third party applications and services with minimal code, i.e., call a REST API without embedding HTTP(s) stack.',
    },
    {
      icon: FaCode,
      title: 'TEMPLATING SUPPORT',
      content:
        'Endpoints supports templates to embed custom data or values to your messages, i.e., send an email with temperatures, locations, etc.',
    },
    {
      icon: FaLock,
      title: 'ENHANCED SECURITY',
      content:
        'Authorization parameters to call other services are stored in the cloud, not in every device. Any auth change is done once in the cloud for all devices.',
    },
  ];

  const content2 = [
    {
      icon: FaBook,
      title: 'Product Docs',
      subTitle: 'Endpoints Documentation',
      content: 'Documentation about endpoints and its configuration',
    },
    {
      icon: FaVideo,
      title: 'Product Tutorial',
      subTitle: 'Endpoints Tutorial',
      content: 'Tutorial to get started with endpoints and its features',
    },
    {
      icon: FaHeadset,
      title: 'Product Support',
      subTitle: 'Endpoints Support',
      content: 'Ask our experts about endpoints and its possibilities',
    },
    {
      icon: FaCode,
      title: 'API',
      subTitle: 'Endpoints API',
      content: 'Manage and configure endpoints via REST API',
    },
  ];
  return (
    <div>
      <SideBarIntroduces
        title="Endpoints"
        content="Connect your devices with third party applications or messaging services, i.e., Telegram or Whatsapp. Send emails with alerts, control other devices, call IFTTT or custom REST API endpoints."
        contentBtn="Create an Endpoint"
        elementForm={Form}
      />
      <BlockWrapperIntroduce
        title1="Why use endpoints?"
        content1={content1}
        title2="Learn more about endpoints"
        content2={content2}
      ></BlockWrapperIntroduce>
    </div>
  );
};

export default Endpoints;
