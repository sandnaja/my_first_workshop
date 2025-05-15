'use client';

import dynamic from 'next/dynamic';

// dynamic import แบบปิด SSR
const MapLandmark = dynamic(() => import('@/components/map/MapLandmark'), {
  ssr: false,
});

const ClientMapWrapper = () => {
  return <MapLandmark />;
};

export default ClientMapWrapper;
