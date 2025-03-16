import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import OptionalRender from '../common/OptionalRender';

const NavBar: React.FC = () => {
  const { isAuthorised, isAdmin } = useContext(AuthContext);

  const linkClass = 'text-white hover:text-gray-200 transition';

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-2xl">
      <div className="flex space-x-4">
        <Link href="/" className={linkClass}>
          Train Schedules
        </Link>
        <OptionalRender condition={isAdmin}>
          <Link href="/create-train-route" className={linkClass}>
            Create Train Route
          </Link>
        </OptionalRender>
      </div>
      <div className="flex space-x-4">
        <OptionalRender condition={isAuthorised}>
          <Link href="/profile" className={linkClass}>
            Profile
          </Link>
        </OptionalRender>
        <OptionalRender condition={!isAuthorised}>
          <Link href="/sign-in" className={linkClass}>
            Sign-In
          </Link>
        </OptionalRender>
      </div>
    </nav>
  );
};

export default NavBar;
