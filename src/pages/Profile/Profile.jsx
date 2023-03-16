import { useFormik } from 'formik';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { getProfile, updateProfile } from '~/api/userApi';
import NoneAvatar from '~/assets/image/none_avatar.png';
import LoadingModal from '~/components/UI/LoadingModal';
import Img from '~/components/UI/Img';
import { useDispatch } from 'react-redux';
import {
  updateProfile as updateProfileClient,
  handleLogout,
} from '~/redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  let avatarPreview = null;
  const fileAvatarPreview = useRef(null);
  const oldFileAvatar = useRef(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let firstName = useMemo(() => {
    return user ? user.name.split(' ') : null;
  }, [user]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('You must fill your full name'),
    }),
    onSubmit: (values) => {
      if (values.fullName === user.name && oldFileAvatar.current === avatar) {
        return;
      } else {
        setLoading(true);
        updateProfile({
          name: formik.values.fullName,
          fileAvatar: fileAvatarPreview.current,
        })
          .then((data) => {
            dispatch(
              updateProfileClient({
                fullName: data.data.data.name,
                avatarUrl: data.data.data.avatar,
              }),
            );
            setAvatar(data.data.data.avatar);
            formik.values.fullName = data.data.data.name;
            toast.success('Thay đổi thông tin thành công');
          })
          .catch((error) => {
            toast.error(`Thay đổi thông tin thất bại!`);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
  });

  const handleChangeAvatarPreview = (e) => {
    fileAvatarPreview.current = e.target.files[0];
    avatarPreview = URL.createObjectURL(fileAvatarPreview.current);
    setAvatar(avatarPreview);
  };

  useEffect(() => {
    if (!user) {
      getProfile()
        .then((data) => {
          oldFileAvatar.current = data.data.data.user.avatarurl;
          setAvatar(data.data.data.user.avatarurl || NoneAvatar);
          formik.values.fullName = data.data.data.user.name;
          setEmail(data.data.data.user.email);
          setUser(data.data.data.user);
        })
        .catch((err) => {
          toast.error('Lấy dữ liệu user thất bại');
        });
    }
  }, [user, formik]);

  const handleLogOut = (e) => {
    e.stopPropagation();
    dispatch(handleLogout());
    navigate('/log-in');
  };

  useEffect(() => {
    return () => {
      avatarPreview && URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  return (
    <div className="px-6">
      <form onSubmit={formik.handleSubmit} className="block">
        <div className="border-b-2 md:flex">
          <div className="w-full bg-white p-4 shadow-md sm:p-6 md:w-2/5 lg:p-8">
            <div className="flex justify-between">
              <span className="block text-xl font-semibold">
                {firstName && firstName[firstName.length - 1]}
              </span>
              <button
                type="submit"
                className="text-md -mt-2 rounded-full bg-gray-700 px-5 py-2 font-bold text-white hover:bg-gray-800"
              >
                Save
              </button>
            </div>

            <div className="text-center text-gray-600">Administration</div>
            <div className="flex w-full justify-center p-8">
              <label htmlFor="avatar_user" className="cursor-pointer">
                <div className="h-28 w-28 overflow-hidden rounded-full border border-gray-500 p-1">
                  <Img linkImg={avatar} shape="rounded-full"></Img>
                </div>
              </label>
              <input
                type="file"
                id="avatar_user"
                hidden
                onChange={handleChangeAvatarPreview}
              ></input>
            </div>
          </div>

          <div className="w-full bg-white p-8 shadow-md md:w-3/5 lg:ml-4">
            <div className="rounded  p-6 shadow">
              <div className="pb-6">
                <label
                  htmlFor="firstName"
                  className="block pb-1 text-left font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <div className="flex">
                  <input
                    id="fullName"
                    name="fullName"
                    className="border-1  w-full rounded-r px-4 py-2"
                    type="text"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.errors.fullName && formik.touched.fullName && (
                  <p className="text-left text-red-600">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="block pb-1 text-left font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="border-1  pointer-events-none w-full cursor-default rounded-r bg-[#E8F0FE] px-4 py-2"
                  type="email"
                  value={email}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="float-right clear-both mt-2 bg-[#000a3dea] px-4 text-sm leading-5 text-white hover:bg-[#000A3D] xs:w-full xs:py-[10px] md:w-auto md:py-2"
        >
          Log out
        </button>
      </form>
      {loading && <LoadingModal />}
    </div>
  );
};

export default Profile;
