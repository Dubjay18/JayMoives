import Image from "next/image";
import React from "react";
import what from "../public/whatsbg.jpeg";
import { useRouter } from "next/router";
import { useStateValue } from "../stateProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const [{ user, uid, darkmode }, dispatch] = useStateValue();
  const router = useRouter();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_UID",
          uid: null,
        });
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  const mode = () => {
    dispatch({
      type: "SET_DARKMODE",
      darkmode: !darkmode,
    });
  };
  return (
    <>
      <div className="navbar shadow-md bg-base-300">
        <div className="flex-1">
          <h1
            className="btn btn-ghost normal-case  text-xl animate-bounce"
            onClick={() => router.push("/")}
          >
            <span className="text-primary font-bold">JAY</span>
            <span className="text-accent">movies</span>
          </h1>
        </div>
        <label className="swap swap-rotate " onChange={mode}>
          {darkmode ? (
            <input type="checkbox" />
          ) : (
            <input type="checkbox" checked />
          )}

          <svg
            className="swap-on fill-current md:w-10 md:h-10 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-off fill-current md:w-10 md:h-10 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabindex="0" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">1</span>
              </div>
            </label>
            <div
              tabindex="0"
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow-lg"
            >
              <div className="card-body bg-base-200">
                {/* <span className="font-bold text-lg">8 Items</span> */}
                <span className="text-error font-bold font-poppins">
                  site is still under development
                </span>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabindex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image src={what} layout="fixed" width={40} height={40} />
              </div>
            </label>
            <ul
              tabindex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow  bg-base-100  rounded-box w-52"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => router.push(`/Profile/${uid}`)}
                >
                  Profile
                  <span className="badge dark:bg-black dark:border-black bg-slate-200 border-white text-secondary">
                    New
                  </span>
                </a>
              </li>

              <li>
                <a onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
