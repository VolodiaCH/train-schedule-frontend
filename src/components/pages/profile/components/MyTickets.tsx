import React, { useContext, useState } from 'react';
import OptionalRender from '@/components/common/OptionalRender';
import TrainTicket from '@/components/shared/TrainTicket';
import Pagination from '@/components/common/Pagination';
import { Train } from '@/services/trainService';
import { AuthContext } from '@/context/AuthContext';

interface MyTicketsProps {
  tickets: Train[];
}

const MyTickets: React.FC<MyTicketsProps> = ({ tickets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isAdmin } = useContext(AuthContext);

  const ticketsPerPage = 2;

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const paginatedTickets = tickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

  return (
    <div className="max-w-lg mx-auto p-4">
      <OptionalRender condition={tickets.length === 0}>
        <h2 className="text-lg text-center text-gray-500 mb-4">
          {"You don't have tickets yet..."}
        </h2>
      </OptionalRender>

      <OptionalRender condition={tickets.length > 0}>
        <div className="space-y-4">
          {paginatedTickets.map((ticket) => (
            <TrainTicket
              key={ticket.id}
              ticket={ticket}
              canEdit={isAdmin}
              owned
            />
          ))}
        </div>

        <OptionalRender condition={totalPages > 1}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </OptionalRender>
      </OptionalRender>
    </div>
  );
};

export default MyTickets;
