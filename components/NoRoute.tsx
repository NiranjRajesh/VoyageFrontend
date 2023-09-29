import React from 'react';
import Image from 'next/image';

type NoRouteProps = {
  title: string;
};

const NoRoute: React.FC<NoRouteProps> = ({ title }) => {
  return (
    <div className="no-route-container">
      <h2>{title}</h2>
      <Image src="/assets/NoRoute.svg" alt="NoRoute" height={300} width={300} />
    </div>
  );
};

export default NoRoute;
