import React, { useEffect, useState } from 'react';
import GatewaysImg from '~/assets/image/gateways.png';
import { Link } from 'react-router-dom';
import FormCreateGateway from './components/FormCreateGateway';

const GateWays = () => {
  const [gateWayList, setGateWayList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal((pre) => !pre);
  };

  useEffect(() => {
    setGateWayList(['Gateway 1', 'Gateway 2', 'Gateway 3', 'Gateway 4']);
  }, []);

  return (
    <div>
      <div className="flex h-12 items-center bg-[#F8F8F8] pl-4 capitalize text-[##333333]">
        Gateways
      </div>
      <div className="pb-6">
        <div className="m-5 mx-5 grid gap-5 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {gateWayList?.map((getway, index) => {
            return (
              <Link
                to={`/gateways/${1}`}
                key={index}
                className="gateway max-w-sm cursor-pointer rounded-lg border-2 border-gray-500 bg-white shadow hover:border-black"
              >
                <div>
                  <img
                    className="rounded-t-lg"
                    src={GatewaysImg}
                    alt="gateway"
                  />
                </div>
                <div>
                  <div>
                    <h5 className="gateway_text mb-2 text-center text-lg font-bold tracking-tight text-gray-500">
                      {getway}
                    </h5>
                  </div>
                  {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so
                far, in reverse chronological order.
              </p> */}
                </div>
              </Link>
            );
          })}
        </div>
        {gateWayList.length === 0 && (
          <div className="flex justify-center pt-[15%]">
            <div className="rounded-sm border-4 border-dashed border-[#000A3D] py-7 px-12 text-[#D91E1E]">
              Không có Gateway
            </div>
          </div>
        )}
        <button
          onClick={handleOpenModal}
          className={`} fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#D91E1E] p-1 text-4xl
          text-white`}
        >
          +
        </button>
        {openModal && (
          <FormCreateGateway handleClickCLoseModal={handleOpenModal} />
        )}
      </div>
    </div>
  );
};

export default GateWays;
