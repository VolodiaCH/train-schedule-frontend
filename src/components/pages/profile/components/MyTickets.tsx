import React, { useContext } from 'react';
import OptionalRender from '@/components/common/OptionalRender';
import TrainTicket from '@/components/shared/TrainTicket';
import { Train } from '@/services/trainService';
import { AuthContext } from '@/context/AuthContext';

interface MyTicketsProps {
  tickets: Train[];
}

const MyTickets: React.FC<MyTicketsProps> = ({ tickets }) => {
  const { isAdmin } = useContext(AuthContext);

  const hasTickets = tickets.length > 0;

  return (
    <div className="max-w-lg mx-auto p-4">
      <OptionalRender condition={!hasTickets}>
        <h2 className="text-lg text-center text-gray-500 mb-4">
          {"You don't have tickets yet..."}
        </h2>
      </OptionalRender>

      <OptionalRender condition={hasTickets}>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TrainTicket
              key={ticket.id}
              ticket={ticket}
              canEdit={isAdmin}
              owned
            />
          ))}
        </div>
      </OptionalRender>
    </div>
  );
};

export default MyTickets;
