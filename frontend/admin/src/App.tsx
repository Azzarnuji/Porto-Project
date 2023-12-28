import React, { useRef, useState } from "react";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

const App: React.FC = () => {
    const [getPage, setPage] = useState<any>("Home");
    const collapsedRef = useRef<any>();
    const active = (name: string) => {
        setPage(name);
        const activeElement = document.querySelector('li[class="rounded-lg bg-blue-700"]');
        console.log(activeElement);

        if (activeElement) {
            activeElement.classList.remove("bg-blue-700");
        }
        if (Menu[name].current) {
            Menu[name].current.classList.add("bg-blue-700");
        }
        collapsedRef.current.checked = false;
    };
    const Menu: any = {
        Home: useRef<HTMLLIElement>(null),
        Profile: useRef<HTMLLIElement>(null)
    };
    const page: any = {
        Home: <Home />,
        Profile: <Profile />
    };

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" ref={collapsedRef} />
                <div className="drawer-content flex flex-col">
                    <div className="navbar bg-base-100 sticky top-0 z-10">
                        <div className="lg:hidden navbar-start ml-5 ">
                            <label htmlFor="my-drawer-2" className="drawer-button">
                                <FontAwesomeIcon icon={faBars} size="lg" />
                            </label>
                        </div>
                        <div className="navbar-center lg:navbar-start">
                            <div className="flex-1">
                                <a className="btn btn-ghost text-xl">Arya Wirayuda</a>
                            </div>
                        </div>
                        <div className="lg:navbar-end">
                            <div className="flex-none">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            {/* <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px" }} /> */}
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                            />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>Settings</a>
                                        </li>
                                        <li>
                                            <a>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>

                    {page[getPage]}
                </div>

                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 min-h-full bg-slate-900 text-slate-300 ">
                        {/* Sidebar content here */}
                        <li className="rounded-lg bg-blue-700" id="Home" onClick={() => active("Home")} ref={Menu.Home}>
                            <div className="join hover:text-white">
                                <FontAwesomeIcon icon={faHouse} className="mx-3" />
                                <span className="">Home</span>
                            </div>
                            {/* <button className="btn btn-sm hover:bg-blue-700 hover:text-white  btn-active btn-primary flex items-start justify-start">
                                <FontAwesomeIcon icon={faHouse} className="mx-3" />
                                <span className="">Home</span>
                            </button> */}
                        </li>
                        <li className="rounded-lg" id="Profile" onClick={() => active("Profile")} ref={Menu.Profile}>
                            <div className="join hover:text-white">
                                <FontAwesomeIcon icon={faUser} className="mx-3" />
                                <span className="">Profile</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default App;
