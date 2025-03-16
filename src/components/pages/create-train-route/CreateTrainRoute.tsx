import React, { useState } from 'react';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import { useRouter } from 'next/router';
import TrainForm from '@/components/shared/TrainForm';
import { FormField } from '@/utils/utils';
import { TrainFormErrors } from '@/components/shared/TrainForm';
import { TrainService } from '@/services/trainService';
import { formatDateTime } from '@/utils/utils';

const CreateTrainRoute: React.FC = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [errors, setErrors] = useState<TrainFormErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const submit = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (newErrors === null) {
      try {
        setLoading(true);

        const result = await TrainService.createTrain({
          name: `${departure}-${arrival}`,
          departure,
          arrival,
          departureTime: formatDateTime(departureTime),
          arrivalTime: formatDateTime(arrivalTime),
        });

        router.push(`train/${result.id}`);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateFields = (): TrainFormErrors | null => {
    let departureError = null,
      arrivalError = null,
      departureTimeError = null,
      arrivalTimeError = null;

    if (departure.length === 0)
      departureError = "Departure field can't be empty!";
    if (arrival.length === 0) arrivalError = "Arrival field can't be empty!";
    if (departureTime.length === 0)
      departureTimeError = 'Please, select departure time!';
    if (new Date(departureTime) >= new Date(arrivalTime))
      arrivalTimeError = 'Arrival time should be  after departure time!';
    if (arrivalTime.length === 0)
      arrivalTimeError = 'Please, select arrival time!';

    if (
      departureError ||
      arrivalError ||
      departureTimeError ||
      arrivalTimeError
    ) {
      return {
        departure: departureError,
        arrival: arrivalError,
        departureTime: departureTimeError,
        arrivalTime: arrivalTimeError,
      };
    }

    return null;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formField: FormField
  ) => {
    const value = e.target.value;

    switch (formField) {
      case FormField.Departure:
        setDeparture(value.trim());
        break;
      case FormField.Arrival:
        setArrival(value.trim());
        break;
      case FormField.DepartureTime:
        setDepartureTime(value);
        break;
      case FormField.ArrivalTime:
        setArrivalTime(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-start">
      <div className="container-box">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create Train Route
        </h2>
        <TrainForm
          form={{
            departure,
            arrival,
            departureTime,
            arrivalTime,
          }}
          errors={errors}
          onChange={handleChange}
        />
        <button className="btn-primary" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateTrainRoute;
