import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import AdminList from '../components/AdminList';
import { BsArrowDownUp } from 'react-icons/bs';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { RiAdminFill, RiAdminLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import NewAdminModal from '../components/NewAdminModal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const DashboardAdmin = () => {
  const socket = useSelector((state) => state.socket.instance);
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [onlineAdmins, setOnlineAdmins] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [sort, setSort] = useState('');
  const limit = 10;

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const query = {
          limit,
        };

        if (currentPage) {
          query.currentPage = currentPage;
        } else if (!currentPage || currentPage > maxPage) {
          return;
        }

        if (searchParams.get('keyword')) {
          query.keyword = searchParams.get('keyword');
        }

        if (sort) {
          query.sort = sort;
        }

        setLoading(true);

        const response = await Axios.post(`${API_URL}/admin/account/all`, query);

        setAdmins(response.data.rows);
        setMaxPage(response.data.maxPage || 1);
        setTotalAdmins(response.data.totalAdmins);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        toast.error('Unable to fetch Admins!', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchAdmins();
  }, [currentPage, search, sort]);

  useEffect(() => {
    socket?.emit('getOnlineAdmin');

    socket?.on('onlineAdminData', ({ data }) => {
      setOnlineAdmins(data);
    });

    socket?.on('newOnlineAdmin', ({ data }) => {
      setOnlineAdmins(data);
    });

    socket?.on('offlineAdmin', ({ data }) => {
      setOnlineAdmins(data);
    });
  }, [socket]);

  const renderAdmins = () => {
    return admins.map((admin) => (
      <AdminList
        key={admin.id}
        admin={admin}
        online={onlineAdmins.some((onlineAdmin) => onlineAdmin.id === admin.id)}
        setAdmins={setAdmins}
        setMaxPage={setMaxPage}
        setTotalAdmins={setTotalAdmins}
        limit={limit}
      />
    ));
  };

  return (
    <div className="h-full flex flex-col px-10">
      <div className="flex flex-col justify-center py-4">
        <span className="text-3xl font-bold leading-10 bg-gradient-to-r from-sky-400 to-emerald-300 bg-clip-text text-transparent mb-1">
          Admins
        </span>
        <div className="w-full h-[2px] bg-gradient-to-r from-sky-400 to-sky-200" />
      </div>
      <div className="flex h-full">
        <div className="w-[70%] h-full flex flex-col">
          <div className="w-full flex flex-col">
            <div className="w-full flex py-1 divide-x">
              <div className="w-[7%] flex justify-center items-center gap-1 text-gray-600 ">
                <span className="text-sm font-semibold">ID</span>
                <BsArrowDownUp
                  onClick={() => {
                    if (sort === 'id,asc') {
                      setSort('id,desc');
                    } else {
                      setSort('id,asc');
                    }
                  }}
                  className="text-xs hover:text-sky-300 transition cursor-pointer active:scale-95"
                />
              </div>
              <div className="w-[20%] pl-2 flex items-center gap-1 text-gray-600 ">
                <span className="text-sm font-semibold">Name</span>
                <BsArrowDownUp
                  onClick={() => {
                    if (sort === 'name,asc') {
                      setSort('name,desc');
                    } else {
                      setSort('name,asc');
                    }
                  }}
                  className="text-xs hover:text-sky-300 transition cursor-pointer active:scale-95"
                />
              </div>
              <div className="w-[29%] pl-2 flex items-center gap-1 text-gray-600">
                <span className="text-sm font-semibold">Email</span>
                <BsArrowDownUp
                  onClick={() => {
                    if (sort === 'email,asc') {
                      setSort('email,desc');
                    } else {
                      setSort('email,asc');
                    }
                  }}
                  className="text-xs hover:text-sky-300 transition cursor-pointer active:scale-95"
                />
              </div>
              <div className="w-[21%] pl-2 flex items-center gap-1 text-gray-600">
                <span className="text-sm font-semibold">Username</span>
                <BsArrowDownUp
                  onClick={() => {
                    if (sort === 'username,asc') {
                      setSort('username,desc');
                    } else {
                      setSort('username,asc');
                    }
                  }}
                  className="text-xs hover:text-sky-300 transition cursor-pointer active:scale-95"
                />
              </div>
              <div className="w-[13%] pl-2 flex items-center gap-1 text-gray-600">
                <span className="text-sm font-semibold">Profile Pic</span>
              </div>
              <div className="w-[10%] flex justify-center items-center gap-1 text-gray-600">
                <span className="text-sm font-semibold">Status</span>
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-200" />
          </div>
          <div className="w-full py-3 flex flex-col gap-3 mb-auto relative">
            {loading && (
              <div className="absolute inset-0 z-20 rounded-lg bg-gray-200 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <div className="text-2xl flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  <span className="font-thin">Loading..</span>
                </div>
              </div>
            )}
            {admins.length ? (
              renderAdmins()
            ) : (
              <div className="h-96 flex justify-center items-center">
                <span className="text-2xl font-thin text-slate-800">You currently don't have any admin</span>
              </div>
            )}
          </div>
          <div className="w-full py-2 flex justify-center items-center border-t gap-2 text-gray-600 font-semibold">
            <button
              disabled={currentPage === 1 || !currentPage}
              className="hover:text-sky-400 disabled:text-gray-300 active:scale-95 disabled:active:scale-100 transition"
            >
              <GoChevronLeft />
            </button>
            <input
              type="number"
              className="w-7 rounded-lg border text-center focus:outline-none focus:border-sky-300 cursor-pointer transition"
              value={currentPage}
              onChange={(e) => {
                if (e.target.value > maxPage) {
                  setCurrentPage(parseInt(maxPage));
                } else {
                  setCurrentPage(parseInt(e.target.value));
                }
              }}
            />
            <span>of</span>
            <span>{maxPage}</span>
            <button
              disabled={currentPage === maxPage || !currentPage}
              className="hover:text-sky-400 disabled:text-gray-300 active:scale-95 disabled:active:scale-100 transition"
            >
              <GoChevronRight />
            </button>
          </div>
        </div>
        <div className="w-[27%] px-6">
          <div className="w-full px-5 rounded-xl bg-white shadow ring-1 ring-emerald-200 ring-offset-2 ring-inset flex flex-col">
            <div className="pt-3 pb-1 border-b">
              <span className="text-lg font-bold bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">
                Admin Summary
              </span>
            </div>
            <div className="w-full py-3">
              <div className="w-full h-full p-2 rounded-xl bg-gradient-to-b from-sky-50 to-sky-100 flex flex-col gap-2">
                <div className="w-full flex items-center text-gray-600">
                  <div className="relative mr-1">
                    <RiAdminFill />
                  </div>
                  <span className="font-semibold mr-auto">Total Admins:</span>
                  <span className="font-bold">{totalAdmins}</span>
                </div>
                <div className="w-full flex items-center text-gray-600">
                  <div className="relative mr-1">
                    <RiAdminLine />
                    <span className="h-1 w-1 rounded-full bg-green-400 absolute top-0 right-0"></span>
                  </div>
                  <span className="font-semibold mr-auto">Online Admins:</span>
                  <span className="font-bold">{onlineAdmins.length}</span>
                </div>
              </div>
            </div>
            <div className="w-full pb-4">
              <NewAdminModal setAdmins={setAdmins} setMaxPage={setMaxPage} setTotalAdmins={setTotalAdmins} limit={limit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
