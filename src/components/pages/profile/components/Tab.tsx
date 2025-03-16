import { ProfileTabs } from '@/utils/utils';
import React from 'react';

interface TabProps {
  tab: ProfileTabs;
  activeTab: ProfileTabs;
  setActiveTab: (tab: ProfileTabs) => void;
}

const Tab: React.FC<TabProps> = ({ tab, activeTab, setActiveTab }) => {
  return (
    <button
      className={`flex-1 py-2 text-center ${
        activeTab === tab
          ? 'border-b-2 border-blue-600 font-bold'
          : 'text-gray-600'
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  );
};

export default Tab;
