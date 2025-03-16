import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import EditTrainRoute from '@/components/pages/edit-train-route/EditTrainRoute';
import { TrainService } from '@/services/trainService';
import { Train } from '@/services/trainService';

const TrainRouteEdit = () => {
  const [trainData, setTrainData] = useState<Train | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (id) {
          setLoading(true);
          const result = await TrainService.getById(id as string);

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

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;
  if (trainData === null) return <Error message="Could not fetch data" />;

  return (
    <>
      <EditTrainRoute trainData={trainData} />
    </>
  );
};

export default TrainRouteEdit;
