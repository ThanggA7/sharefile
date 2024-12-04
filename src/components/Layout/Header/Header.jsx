import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-10">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-[#1B1E28]">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                ShareFile
              </span>
            </Link>

            <div className="flex items-center lg:order-2 space-x-6">
              <Link
                to="/files"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Your Files
              </Link>
              <Link
                to="/share"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Share Files
              </Link>

              {/* Profile & Log Out */}
              <div className="relative group leading-2">
                <button
                  onClick={toggleDropdown}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                {isDropdownOpen && (
                  <div className="w-[150px] bg-white absolute right-0 -bottom-[76px] rounded-lg">
                    <div className="flex items-center flex-col gap-1">
                      <Link
                        className="text-center text-black p-1 w-full hover:bg-[#0000005b] hover:text-white"
                        to="/profile"
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={onLogout}
                        className="p-1 text-black w-full hover:bg-[#0000005b] hover:text-white"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
