import React from 'react';
import RedirectLink from './RedirectLink';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mt-2"></p>
      <RedirectLink
        text="The page you are looking for doesn’t exist. "
        href="/"
        linkText="Go home"
      />
    </div>
  );
};

export default NotFound;
