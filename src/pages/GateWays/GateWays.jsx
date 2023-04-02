import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGateWayList } from '~/api/gateWayApi';
// import NoGateWayImg from '~/assets/image/no-gateways.png';
import FormCreateGateway from './components/FormCreateGateway';
import GateWay from './components/GateWay';
import { BiWifiOff } from 'react-icons/bi';

const GateWays = () => {
  const [gateWayList, setGateWayList] = useState([]);
  const { user } = useSelector((select) => select.user);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal((pre) => !pre);
  };

  const handleGetGateWayList = (user) => {
    getGateWayList(user.id).then((data) => {
      setGateWayList(data.data.data.gateway);
    });
  };

  useEffect(() => {
    if (user) {
      handleGetGateWayList(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="dark:bg-[#242526]">
      <div className="flex h-12 items-center bg-[#F8F8F8] pl-4 capitalize text-[##333333] dark:bg-[#202124] dark:text-white">
        Gateways
      </div>
      <div className="min-h-screen pb-6">
        {user && gateWayList.length > 0 ? (
          <div className="m-5 mx-5 grid gap-5 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            {gateWayList?.map((getway, index) => {
              return (
                <GateWay
                  getway={getway}
                  key={getway._id}
                  timeDelay={index * 0.3 + 0.3}
                  getRepeatGetWay={() => {
                    handleGetGateWayList(user);
                  }}
                />
              );
            })}
            <Link
              to={`/gateways/other`}
              style={{
                animationDuration: gateWayList.length * 0.3 + 0.3 + 's',
              }}
              className="animationToTop gateway max-w-sm cursor-pointer rounded-lg border-2 border-gray-500 bg-white shadow hover:border-black dark:bg-black dark:hover:border-white"
            >
              <div className="mt-4 flex justify-center">
                <BiWifiOff className="text-7xl dark:text-white sm:text-8xl" />
              </div>
              <div>
                <div>
                  <h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-500 dark:text-white">
                    Other
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center pt-[15%]">
            <div className="rounded-sm border-4 border-dashed border-[#000A3D] py-7 px-12 text-[#D91E1E]">
              Không có Gateway
            </div>
          </div>
        )}
        <button
          onClick={handleOpenModal}
          className={`fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#D91E1E] p-1 text-4xl
          text-white`}
        >
          +
        </button>
        {openModal && (
          <FormCreateGateway
            handleClickCLoseModal={handleOpenModal}
            handleAddSucess={handleGetGateWayList}
          />
        )}
      </div>
    </div>
  );
};

export default GateWays;
