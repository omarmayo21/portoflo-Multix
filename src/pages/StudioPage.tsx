import React from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';

export const StudioPage: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0F1D38] overflow-hidden">
      <Studio config={config} />
    </div>
  );
};
