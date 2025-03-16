import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { Train } from '@/services/trainService';
import { formatDate } from '@/utils/utils';
import { TicketService } from '@/services/ticketService';

interface TrainTicket {
  ticket: Train;
  owned: boolean;
  canEdit: boolean;
}

const TrainTicket: React.FC<TrainTicket> = ({ ticket }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleView = () => {
    router.push(`/train/${ticket.id}`);
  };

  const handleEdit = () => {
    router.push(`/train/${ticket.id}/edit`);
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await TicketService.unbookTicket(ticket.id as string);
      router.push(`/train/${ticket.id}`);
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
    <div key={ticket.id} className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{ticket.name}</h3>
      <p className="text-gray-700">
        {ticket.departure} → {ticket.arrival}
      </p>
      <p className="text-sm text-gray-500">
        Departure: {formatDate(ticket.departureTime)}
      </p>
      <p className="text-sm text-gray-500">
        Arrival: {formatDate(ticket.arrivalTime)}
      </p>

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={handleView} className="btn-small btn-small-blue">
          View
        </button>
        <button onClick={handleEdit} className="btn-small btn-small-blue">
          Edit
        </button>
        <button onClick={handleCancel} className="btn-small btn-small-red">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TrainTicket;
