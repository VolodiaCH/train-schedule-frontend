import React, { useState, useEffect } from 'react';
import Profile from '@/components/pages/profile/Profile';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { UserService } from '@/services/userService';
import { TicketService } from '@/services/ticketService';
import { Train } from '@/services/trainService';

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ticketsData, setTicketsData] = useState<Train[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userData = await UserService.getProfile();
        const ticketsData = await TicketService.getUserTickets();

        setTicketsData(ticketsData);
        setUser(userData);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <Error message="No user data found" />;
  if (!ticketsData) return <Error message="No tickets data found" />;

  return <Profile user={user} myTickets={ticketsData} />;
};

export default ProfilePage;
