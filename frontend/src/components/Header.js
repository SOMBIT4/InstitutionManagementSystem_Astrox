import React, { useContext, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import ProfileDisplay from "./ProfileDisplay";
import Audio, { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";
import Context from "../context";

const Header = () => {
  const [showLoader, setShowLoader] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [profileDisplay, setProfileDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handelLogout = async () => {
    setShowLoader(true);
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      setShowLoader(false);
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
      setShowLoader(false);
    }
  };

  const handelSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };
  return (
    <div>
      {showLoader ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
        </div>
      ) : (
        <header className="h-16 shadow-md bg-white fixed w-full z-40">
          <div className="h-full container mx-auto flex items-center px-4 justify-between">
            <div className="">
              <Link to={"/"}>
              <img src="/icon5.png" width="65" height="40"/>
              </Link>
            </div>
            <div className="hidden lg:flex items-center w-full justify-between max-w-sm border-2 rounded-full focus-within:shadow-md pl-3">
              <input
                type="text"
                placeholder="Find your items...."
                className="w-full outline-none "
                onChange={handelSearch}
                value={search}
              />
              <div className="text:lg min-w-[50px] h-8 bg-red-500 flex items-center justify-center rounded-full text-white">
                <IoSearchSharp />
              </div>
            </div>
            <div className="z-50 flex items-center gap-4">
              <div className="relative flex justify-center">
                {user?._id && (
                  <div
                    className="text-2xl cursor-pointer relative flex justify-center"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className="w-10 h-10 rounded-full"
                        alt={user?.name}
                      />
                    ) : (
                      <FaUserLarge />
                    )}
                  </div>
                )}

                {menuDisplay && (
                  <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                    <nav>
                      {(user?.role === ROLE.ADMIN ||
                        user?.role === ROLE.FACULTY) && (
                        <Link
                          to={"/admin-panel/all-products"}
                          className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-center"
                          onClick={() => setMenuDisplay((preve) => !preve)}
                        >
                          Admin Panel
                        </Link>
                      )}

                      {(user?.role === ROLE.STUDENT || user?.role === ROLE.FACULTY ||
                        user?.role === ROLE.ADMIN) && (
                        <Link
                          to={"/order"}
                          className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-center"
                          onClick={() => setMenuDisplay((preve) => !preve)}
                        >
                          Courses
                        </Link>
                      )}
                      {(user?.role === ROLE.STUDENT ||
                        user?.role === ROLE.ADMIN ||
                        user?.role === ROLE.FACULTY) && (
                        <div className="flex justify-center">
                          <button
                            className="whitespace-nowrap  hover:bg-slate-100 p-2"
                            onClick={() => {
                              setProfileDisplay(true);
                            }}
                          >
                            Profile
                          </button>
                        </div>
                      )}
                    </nav>
                  </div>
                )}
              </div>
              {profileDisplay && (
                <ProfileDisplay
                  onClose={() => setProfileDisplay(false)}
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  userId={user._id}
                  profilePic={user.profilePic}
                  callFunc={handelLogout}
                />
              )}

              {user?._id && (
                <Link to={"/cart"} className="text-2xl relative">
                  <span>
                    <BsCart4 />
                  </span>
                  <div className="bg-red-400 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">{context.cartProductCount}</p>
                  </div>
                </Link>
              )}

              <div>
                {user?._id ? (
                  <button
                    onClick={handelLogout}
                    className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center "
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center "
                  >
                    LogIn
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;

//for hovering
//group
// hidden group-hover:block
