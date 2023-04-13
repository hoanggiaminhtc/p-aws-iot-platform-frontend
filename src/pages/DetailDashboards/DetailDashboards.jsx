import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteDashBoard, getAllDashBoard } from '~/api/dashBoardApi';
import { deleteWidget, getListWidget, getWidgets } from '~/api/widgetApi';
import DisplayWidget from './components/DisplayWidget';
import FormCreateDashBoard from '../Dashboards/components/FormCreateDashBoard';
import FormCreateWidget from './components/FormCreateWidget';
import LoadingModal from '~/components/UI/LoadingModal';

const HEIGHT_DASHBOARD_OPTION = {
  1: 'h-[38px]',
  2: 'h-[76px]',
  3: 'h-[114px]',
  4: 'h-[152px]',
  5: 'h-[190px]',
};

const DetailDashboards = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const slicePathName = location.pathname.substring(1).split('/')[0];
  const [opendModalCreateDashBoard, setOpendModalCreateDashBoard] =
    useState(false);
  const [dashBoardList, setDashBoardList] = useState([]);
  const [widgetsList, setWidgetList] = useState([]);
  const [openModalCreateWidget, setOpenModalCreateWidget] = useState(false);
  const [openSelectDashBoard, setOpenSelectDashBoard] = useState(false);
  const [loading, setLoading] = useState(false);

  const getListDashBoard = () => {
    getAllDashBoard()
      .then((data) => {
        setDashBoardList(data.data.data.dashboard);
        setOpendModalCreateDashBoard(false);
      })
      .catch((error) => {});
  };

  const getListWigets = () => {
    if (params.id === 'all') {
      getListWidget()
        .then((data) => {
          setWidgetList(data.data.data.widgets);
          setOpenModalCreateWidget(false);
        })
        .catch((err) => {});
    } else {
      getWidgets(params.id)
        .then((data) => {
          setWidgetList(data.data.data.dashboard);
          setOpenModalCreateWidget(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleClickCLoseModalCreateDashBoard = () => {
    setOpendModalCreateDashBoard(false);
  };

  const handleClickCLoseModal = useCallback(() => {
    setOpenModalCreateWidget(false);
  }, []);

  const handleOpenSelectDashBoard = () => {
    setOpenSelectDashBoard((pre) => !pre);
  };

  const handleDeleteDashBoard = (id) => {
    setLoading(true);
    deleteDashBoard(id)
      .then(() => {
        getListDashBoard();
        getListWigets();
        if (id === params.id) {
          navigate(`/dashboard/all`);
        }
        toast.success('Xóa dashboard thành công');
      })
      .catch((err) => {
        toast.error('Xóa dashboard thất bại');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteWidget = (idWidget) => {
    setLoading(true);
    deleteWidget(idWidget)
      .then(() => {
        getListWigets();
        toast.success('Xóa widget thành công');
      })
      .catch((err) => {
        toast.success('Xóa widget thất bại');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const widgetCategory = useMemo(() => {
    let newListButtonWidget = [];
    let newListChartWidget = [];
    widgetsList.forEach((widget) => {
      if (widget.type === 'button') {
        newListButtonWidget.push(widget);
      } else {
        newListChartWidget.push(widget);
      }
    });
    return {
      newListButtonWidget,
      newListChartWidget,
    };
  }, [widgetsList]);

  useEffect(() => {
    if (params.id) {
      getListDashBoard();
      getListWigets();
      setOpenSelectDashBoard(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const nameDashBoard = useMemo(() => {
    const resultName = dashBoardList.find(
      (dashBoard) => params.id === dashBoard._id,
    );
    if (resultName) {
      return resultName.name;
    }
    return 'All';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <>
      <div className="flex h-12 items-center bg-[#F8F8F8] pl-4 capitalize text-[##333333] dark:bg-[#202124] dark:text-white">
        <span>{slicePathName}/</span>
        <span
          // eslint-disable-next-line prettier/prettier
          className="cursor-pointer text-base hover:text-blue-600 hover:underline "
          onClick={(e) => {
            e.stopPropagation();
            setOpendModalCreateDashBoard(true);
          }}
        >
          Add
        </span>
      </div>
      <div className="bg-[#F0F3F4] dark:bg-[#242526]">
        <div>
          <div className="text-base">
            <div
              className="flex h-10 cursor-pointer items-center justify-between bg-[#F6F8F8] px-3 dark:bg-[#202124] dark:text-white"
              onClick={handleOpenSelectDashBoard}
            >
              <div>{`DashBoard Details/${nameDashBoard}`}</div>
              <div>
                <AiOutlineCaretDown
                  className={`${
                    openSelectDashBoard && 'rotate-180'
                  } transitionSideBar`}
                />
              </div>
            </div>
            <ul
              className={`hide-scrollbar transitionSideBar max-h-[200px] ${
                openSelectDashBoard
                  ? HEIGHT_DASHBOARD_OPTION[
                      dashBoardList.length > 5
                        ? '5'
                        : dashBoardList.length.toString()
                    ]
                  : 'h-0'
              } dark:bg-gray overflow-y-scroll bg-white dark:bg-black dark:text-white`}
            >
              {dashBoardList?.map((dashBoard) => {
                return (
                  <div
                    key={dashBoard._id}
                    className="blockSelectDashBoard flex h-[38px] justify-between border border-solid border-transparent  px-3 hover:border-blue-600 hover:bg-[#f6f8f8d6] dark:hover:border-white dark:hover:bg-black dark:hover:text-white"
                    onClick={() => {
                      navigate(`/dashboard/${dashBoard._id}`);
                    }}
                  >
                    <span className="flex items-center">{dashBoard.name}</span>
                    <span
                      // eslint-disable-next-line prettier/prettier
                      className="hidden cursor-pointer items-center hover:text-red-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDashBoard(dashBoard._id);
                      }}
                    >
                      Delete
                    </span>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="mt-2 min-h-full bg-white p-6 dark:bg-[#242526]">
            {widgetCategory?.newListButtonWidget.length > 0 && (
              <>
                <h1 className="text-lg font-bold dark:text-white">
                  Bảng điều khiển
                </h1>
                <DisplayWidget
                  widgetsListDisplay={widgetCategory.newListButtonWidget}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </>
            )}
            {widgetCategory?.newListChartWidget.length > 0 && (
              <>
                <h1 className="mb-1 text-lg font-bold dark:text-white">
                  Bảng giám sát
                </h1>
                <DisplayWidget
                  widgetsListDisplay={widgetCategory.newListChartWidget}
                  handleDeleteWidget={handleDeleteWidget}
                />
              </>
            )}
            {widgetsList.length === 0 && (
              <div className="flex justify-center pt-[15%]">
                <div className="rounded-sm border-4 border-dashed border-[#000A3D]  py-7 px-12 text-[#D91E1E] dark:text-white">
                  Không có Widget
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setOpenModalCreateWidget(true);
          }}
          className={`fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#D91E1E] p-1 text-4xl text-white ${
            params.id === 'all' && 'hidden'
          }`}
        >
          +
        </button>
        {openModalCreateWidget && (
          <FormCreateWidget
            handleClickCLoseModal={handleClickCLoseModal}
            dashBoardId={params.id}
            onGetWidget={getListWigets}
          />
        )}
        {opendModalCreateDashBoard && (
          <FormCreateDashBoard
            handleClickCLoseModal={handleClickCLoseModalCreateDashBoard}
            handleAddSucess={getListDashBoard}
          />
        )}
        {loading && <LoadingModal />}
      </div>
    </>
  );
};

export default DetailDashboards;
