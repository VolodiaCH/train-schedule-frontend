import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Tab from './components/Tab';
import Edit from './components/Edit';
import MyTickets from './components/MyTickets';
import OptionalRender from '@/components/common/OptionalRender';
import { ProfileTabs } from '@/utils/utils';
import { AuthContext } from '@/context/AuthContext';
import { User } from '@/pages/profile';
import { Train } from '@/services/trainService';

interface ProfileProps {
  user: User;
  myTickets: Train[];
}

const Profile: React.FC<ProfileProps> = ({ user, myTickets }) => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>(ProfileTabs.Edit);
  const { logout } = useContext(AuthContext);

  const router = useRouter();

  const signout = () => {
    logout();
    router.push('/sign-in');
  };

  return (
    <div className="flex justify-center items-start">
      <div className="container-box">
        <div className="flex border-b border-gray-300">
          <Tab
            tab={ProfileTabs.Edit}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            tab={ProfileTabs.Tickets}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="mt-4">
          <OptionalRender condition={activeTab === ProfileTabs.Edit}>
            <Edit user={user} />
          </OptionalRender>
          <OptionalRender condition={activeTab === ProfileTabs.Tickets}>
            <MyTickets tickets={myTickets} />
          </OptionalRender>
        </div>

        <button className="btn-primary" onClick={signout}>
          Sign-Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
