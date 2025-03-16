import React, { useState, useEffect, useContext } from 'react';
import TrainSchedule from '@/components/pages/train-schedule/TrainSchedule';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { TrainService, Train } from '@/services/trainService';
import { TicketService } from '@/services/ticketService';
import { AuthContext } from '@/context/AuthContext';

const HomePage: React.FC = () => {
  const [trains, setTrains] = useState<Train[] | null>(null);
  const [bookedTrains, setBookedTrains] = useState<Train[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthorised } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const result = await TrainService.getAll();
        setTrains(result);

        if (isAuthorised) {
          const bookedTrains = await TicketService.getUserTickets();
          setBookedTrains(bookedTrains);
        }
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthorised]);

  if (loading || trains === null) return <Loading />;
  if (error) return <Error message={error} />;

  return <TrainSchedule trains={trains} bookedTrains={bookedTrains} />;
};

export default HomePage;
