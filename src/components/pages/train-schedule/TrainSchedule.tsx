import React, { useState, useContext } from 'react';
import Filters from './components/Filters';
import OptionalRender from '@/components/common/OptionalRender';
import TrainTicket from '@/components/shared/TrainTicket';
import { Train } from '@/services/trainService';
import { AuthContext } from '@/context/AuthContext';
import { advancedIncludes } from '@/utils/utils';

interface TrainScheduleProps {
  trains: Train[];
  bookedTrains: Train[] | null;
}

const TrainSchedule: React.FC<TrainScheduleProps> = ({
  trains,
  bookedTrains,
}) => {
  const [tickets] = useState<Train[]>(trains);
  const [searchDeparture, setSearchDeparture] = useState('');
  const [searchArrival, setSearchArrival] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { isAdmin } = useContext(AuthContext);

  const filteredTickets = tickets
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
        <OptionalRender condition={filteredTickets.length > 0}>
          {filteredTickets.map((ticket) => {
            const booked: boolean =
              bookedTrains?.findIndex((train) => train.id === ticket.id) !== -1;

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
        <OptionalRender condition={filteredTickets.length === 0}>
          <p className="text-center text-gray-500">
            No matching tickets found.
          </p>
        </OptionalRender>
      </div>
    </div>
  );
};

export default TrainSchedule;
