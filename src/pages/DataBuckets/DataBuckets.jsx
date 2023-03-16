// import React, { useCallback, useRef, useState } from 'react';
// import {
//   FaDatabase,
//   FaTag,
//   FaFileExport,
//   FaBook,
//   FaVideo,
//   FaHeadset,
//   FaCode,
// } from 'react-icons/fa';
// import Dialog from '~/components/Dialog';

// import SideBarIntroduces from '~/components/SideBarIntroduces';
// import BlockWrapperIntroduce from '~/components/BlockWrapperIntroduce';
// import ListDataBuck from './components/ListDataBuck';
// import FormCreateDataBucket from './components/FormCreateDataBucket';

// const content1 = [
//   {
//     icon: FaDatabase,
//     title: 'TIME-SERIES STORAGE',
//     content:
//       'Using a time-series database for IoT data opens the possibility for real-time analytics, i.e., aggregate data with averages, deltas, max-min, and more.',
//   },
//   {
//     icon: FaTag,
//     title: 'TAGGING SUPPORT',
//     content:
//       'Buckets support tagging each data, so, it is possible to generate reports for all devices, a group of them, or a single one with ease.',
//   },
//   {
//     icon: FaFileExport,
//     title: 'IMPORT & EXPORT',
//     content:
//       'Export your data to different formats, i.e., CSV, ARFF, or JSON for off-load processing. Import your data to migrate your existing deployment.',
//   },
// ];

// const content2 = [
//   {
//     icon: FaBook,
//     title: 'Buckets Docs',
//     subTitle: 'Devices Documentation',
//     content: 'Documentation about buckets and its configuration',
//   },
//   {
//     icon: FaVideo,
//     title: 'Product Tutorial',
//     subTitle: 'Buckets Tutorial',
//     content: 'Tutorial to get started with buckets and its features',
//   },
//   {
//     icon: FaHeadset,
//     title: 'Product Support',
//     subTitle: 'Buckets Support',
//     content: 'Ask our experts about buckets and its possibilities',
//   },
//   {
//     icon: FaCode,
//     title: 'API',
//     subTitle: 'Buckets API',
//     content: 'Manage and configure buckets via REST API',
//   },
// ];

// const DATABUKET = [
//   {
//     _id: '1',
//     createdAt: '2023-01-24T22:23:20.098+00:00',
//     dataSource: 'From Device Resource',
//     name: 'Databuck',
//   },
//   {
//     _id: '2',
//     createdAt: '2023-01-24T22:23:20.098+00:00',
//     dataSource: 'From Device Resource',
//     name: 'Databuck',
//   },
// ];

// const DataBuckets = () => {
//   const [listDataBucket, setListDataBucket] = useState(DATABUKET);
//   const [openModal, setOpenModal] = useState(false);
//   const idBucket = useRef();
//   const handleOpenModal = useCallback((idBucketSelected) => {
//     idBucket.current = idBucketSelected;
//     setOpenModal((pre) => !pre);
//   }, []);
//   const getDataBucket = () => {
//     setListDataBucket([
//       {
//         _id: '3',
//         createdAt: '2023-01-24T22:23:20.098+00:00',
//         dataSource: 'From Device Resource',
//         name: 'DatabuckCopy',
//       },
//       {
//         _id: '4',
//         createdAt: '2023-01-24T22:23:20.098+00:00',
//         dataSource: 'From Device Resource',
//         name: 'DatabuckCopy',
//       },
//     ]);
//   };
//   const handleDeleteDataBucket = () => {
//     console.log('Id Bucket Select to Delete : ', idBucket.current);
//   };
//   return (
//     <div className="w-screen md:w-full">
//       <SideBarIntroduces
//         title="Data Buckets"
//         content="Data generated in IoT is by nature a time-series. Data buckets store the data in a specialized database to support advanced analytics, alerts, and reports in real-time."
//         contentBtn="Create a Data Bucket"
//         elementForm={FormCreateDataBucket}
//       />
//       <BlockWrapperIntroduce
//         title1="Why use data buckets?"
//         content1={content1}
//         title2="Learn more about buckets"
//         content2={content2}
//       ></BlockWrapperIntroduce>
//       <ListDataBuck
//         handleOpenModal={handleOpenModal}
//         dataBucketList={listDataBucket}
//         handleGetDataBucket={getDataBucket}
//       />
//       {openModal && (
//         <Dialog
//           nameBtn="Xóa data bucket"
//           desBtn="Bạn sẽ mất tất cả dữ liệu bằng cách xóa data bucket của mình. Hành
//           động này không thể quay trở lại được."
//           handleClickCancel={() => {
//             handleOpenModal(null);
//           }}
//           handeClickDelete={handleDeleteDataBucket}
//         />
//       )}
//     </div>
//   );
// };

// export default DataBuckets;
