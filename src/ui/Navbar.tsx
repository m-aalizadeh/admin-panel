import Image from "next/image";
import { SignedUser } from "../types/user";

type Props = {
  user: SignedUser;
};

function Navbar({ user }: Props) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 ml-64">
        <div className="flex items-center">
          <button className="p-1 mr-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              {/* <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/profile-placeholder.jpg"
                  alt="MA"
                  layout="fill"
                  objectFit="cover"
                />
              </div> */}
              <span className="hidden md:inline text-sm font-medium">
                {user.username}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
