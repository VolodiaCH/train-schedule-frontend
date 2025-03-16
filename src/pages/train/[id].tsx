import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TrainDetails from '@/components/pages/train-details/TrainDetails';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { TrainService } from '@/services/trainService';
import { TicketService } from '@/services/ticketService';
import { Train } from '@/services/trainService';

const TrainDetailsPage = () => {
  const [trainData, setTrainData] = useState<Train | null>(null);
  const [isBooked, setIsBooked] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (id) {
          setLoading(true);

          const result = await TrainService.getById(id as string);
          console.log(result);
          setIsBooked(await TicketService.isBooked(id as string));
          setTrainData(result);
        }
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading || isBooked === null) return <Loading />;
  if (error) return <Error message={error} />;
  if (trainData === null) return <Error message="Could not fetch data" />;

  return (
    <>
      <TrainDetails trainData={trainData} isBooked={isBooked} />
    </>
  );
};

export default TrainDetailsPage;
