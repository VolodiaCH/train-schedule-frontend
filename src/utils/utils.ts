export enum FormField {
  Departure = 1,
  Arrival = 2,
  DepartureTime = 3,
  ArrivalTime = 4,
}

export enum ProfileTabs {
  Edit = 'Edit',
  Tickets = 'My tickets',
}

export const emailValidationRegexp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const formatDate = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(parsedDate);
};

export const formatDateTime = (dateString: string) => {
  return dateString.slice(0, 16);
};

export const advancedIncludes = (value: string, search: string): boolean => {
  return value.toLowerCase().includes(search.toLowerCase());
};
