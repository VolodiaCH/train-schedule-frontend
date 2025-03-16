import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import OptionalRender from '@/components/common/OptionalRender';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import RedirectLink from '@/components/common/RedirectLink';
import { TicketService } from '@/services/ticketService';
import { TrainService, Train } from '@/services/trainService';
import { formatDate } from '@/utils/utils';
import { AuthContext } from '@/context/AuthContext';

interface TrainDetailsProps {
  trainData: Train;
  isBooked: boolean;
}

const TrainDetails: React.FC<TrainDetailsProps> = ({ trainData }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useContext(AuthContext);

  const router = useRouter();

  const handleBook = async () => {
    try {
      setLoading(true);
      await TicketService.bookTicket(trainData.id as string);
      setIsBooked(true);
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await TicketService.unbookTicket(trainData.id as string);
      setIsBooked(false);
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => router.push(`${router.asPath}/edit`);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await TrainService.deleteTrain(trainData.id as string);
      router.replace(`/`);
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="flex justify-center items-start pt-8">
      <div className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white border border-gray-950">
        <h2 className="text-2xl font-bold text-center mb-4">
          {trainData.name}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Departure:</span>
            <span>{trainData.departure}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Arrival:</span>
            <span>{trainData.arrival}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Departure Time:</span>
            <span>{formatDate(trainData.departureTime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Arrival Time:</span>
            <span>{formatDate(trainData.arrivalTime)}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <OptionalRender condition={isBooked}>
            <button onClick={handleCancel} className="btn-small btn-small-red">
              Cancel
            </button>
          </OptionalRender>
          <OptionalRender condition={!isBooked}>
            <button onClick={handleBook} className="btn-small btn-small-blue">
              Book
            </button>
          </OptionalRender>
          <OptionalRender condition={isAdmin}>
            <button onClick={handleEdit} className="btn-small btn-small-blue">
              Edit
            </button>
            <button onClick={handleDelete} className="btn-small btn-small-red">
              Delete
            </button>
          </OptionalRender>
        </div>

        <RedirectLink href="/" linkText="Other trains..." />
      </div>
    </div>
  );
};

export default TrainDetails;
