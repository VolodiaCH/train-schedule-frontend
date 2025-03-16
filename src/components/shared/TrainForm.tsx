import React from 'react';
import InputField from '../common/InputField';
import { FormField } from '@/utils/utils';

export interface TrainFormErrors {
  departure: string | null;
  arrival: string | null;
  departureTime: string | null;
  arrivalTime: string | null;
}

interface TrainFormProps {
  form: {
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
  };
  errors: TrainFormErrors | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    formField: FormField
  ) => void;
}

export default function TrainForm({ form, errors, onChange }: TrainFormProps) {
  return (
    <div className="space-y-4">
      <InputField
        label="Departure"
        name="departure"
        type="text"
        value={form.departure}
        onChange={(e) => onChange(e, FormField.Departure)}
        error={errors?.departure}
      />
      <InputField
        label="Arrival"
        name="arrival"
        type="text"
        value={form.arrival}
        onChange={(e) => onChange(e, FormField.Arrival)}
        error={errors?.arrival}
      />
      <InputField
        label="Departure Time"
        name="departureTime"
        type="datetime-local"
        value={form.departureTime}
        onChange={(e) => onChange(e, FormField.DepartureTime)}
        error={errors?.departureTime}
      />
      <InputField
        label="Arrival Time"
        name="arrivalTime"
        type="datetime-local"
        value={form.arrivalTime}
        onChange={(e) => onChange(e, FormField.ArrivalTime)}
        error={errors?.arrivalTime}
      />
    </div>
  );
}
