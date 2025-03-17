import React, { useState, useContext, useEffect } from 'react';
import Filters from './components/Filters';
import OptionalRender from '@/components/common/OptionalRender';
import TrainTicket from '@/components/shared/TrainTicket';
import { Train } from '@/services/trainService';
import { AuthContext } from '@/context/AuthContext';
import { advancedIncludes } from '@/utils/utils';
import Pagination from '@/components/common/Pagination';

interface TrainScheduleProps {
  trains: Train[];
  bookedTrains: Train[] | null;
}

const TrainSchedule: React.FC<TrainScheduleProps> = ({
  trains,
  bookedTrains,
}) => {
  const [searchDeparture, setSearchDeparture] = useState('');
  const [searchArrival, setSearchArrival] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isAdmin } = useContext(AuthContext);

  const ticketsPerPage = 2;

  const filteredTickets = trains
    .filter((ticket) => {
      const departureTime = new Date(ticket.departureTime).getTime();
      const startTime = startDate ? new Date(startDate).getTime() : null;
      const endTime = endDate
        ? new Date(endDate).setHours(23, 59, 59, 999)
        : null;

      return (
        advancedIncludes(ticket.departure, searchDeparture) &&
        advancedIncludes(ticket.arrival, searchArrival) &&
        (!startTime || departureTime >= startTime) &&
        (!endTime || departureTime <= endTime)
      );
    })
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime()
        : new Date(b.departureTime).getTime() -
          new Date(a.departureTime).getTime()
    );

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchDeparture, searchArrival, startDate, endDate]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Train Schedule</h2>

      <Filters
        searchDeparture={searchDeparture}
        searchArrival={searchArrival}
        sortOrder={sortOrder}
        startDate={startDate}
        endDate={endDate}
        setSearchDeparture={setSearchDeparture}
        setSearchArrival={setSearchArrival}
        setSortOrder={setSortOrder}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <div className="space-y-4">
        <OptionalRender condition={paginatedTickets.length > 0}>
          {paginatedTickets.map((ticket) => {
            const booked =
              bookedTrains !== null &&
              bookedTrains.findIndex((train) => train.id === ticket.id) !== -1;

            return (
              <TrainTicket
                key={ticket.id}
                ticket={ticket}
                owned={booked}
                canEdit={isAdmin}
              />
            );
          })}
        </OptionalRender>
        <OptionalRender condition={paginatedTickets.length === 0}>
          <p className="text-center text-gray-500">
            No matching tickets found.
          </p>
        </OptionalRender>
      </div>

      <OptionalRender condition={totalPages > 1}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </OptionalRender>
    </div>
  );
};

export default TrainSchedule;
