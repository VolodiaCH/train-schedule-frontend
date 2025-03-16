import React from 'react';

interface OptionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
}

const OptionalRender: React.FC<OptionalRenderProps> = ({ condition, children }) => {
  if (condition) {
    return <>{children}</>;
  }

  return null;
};

export default OptionalRender;