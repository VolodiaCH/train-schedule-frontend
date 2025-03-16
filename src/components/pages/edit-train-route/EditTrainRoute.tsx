import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import TrainForm from '@/components/shared/TrainForm';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import { FormField } from '@/utils/utils';
import { TrainFormErrors } from '@/components/shared/TrainForm';
import { TrainService, Train } from '@/services/trainService';
import { formatDateTime } from '@/utils/utils';

interface EditTrainRouteProps {
  trainData: Train;
}

const EditTrainRoute: React.FC<EditTrainRouteProps> = ({ trainData }) => {
  const defaultDepartureRef = useRef(trainData.departure);
  const defaultArrivalRef = useRef(trainData.arrival);
  const defaultDepartureTimeRef = useRef(
    formatDateTime(trainData.departureTime)
  );
  const defaultArrivalTimeRef = useRef(formatDateTime(trainData.arrivalTime));

  const [departure, setDeparture] = useState(trainData.departure);
  const [arrival, setArrival] = useState(trainData.arrival);
  const [departureTime, setDepartureTime] = useState<string>(
    formatDateTime(trainData.departureTime)
  );
  const [arrivalTime, setArrivalTime] = useState<string>(
    formatDateTime(trainData.arrivalTime)
  );
  const [errors, setErrors] = useState<TrainFormErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setDisabledSubmit(
      defaultDepartureRef.current === departure &&
        defaultArrivalRef.current === arrival &&
        defaultDepartureTimeRef.current === departureTime &&
        defaultArrivalTimeRef.current === arrivalTime
    );
  }, [departure, arrival, departureTime, arrivalTime]);

  const submit = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (!newErrors) {
      try {
        setLoading(true);

        const newTrainData = {
          ...trainData,
          departure,
          arrival,
          departureTime,
          arrivalTime,
        };

        await TrainService.updateTrainDetails(id as string, newTrainData);

        defaultDepartureRef.current = departure;
        defaultArrivalRef.current = arrival;
        defaultDepartureTimeRef.current = departureTime;
        defaultArrivalTimeRef.current = arrivalTime;

        setDisabledSubmit(true);
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
      arrivalTimeError = 'Arrival time should be after departure time!';
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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="flex justify-center items-start">
      <div className="container-box">
        <h2 className="text-2xl font-bold text-center mb-4">
          Edit Train Details
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
        <button
          className="btn-primary"
          disabled={disabledSubmit}
          onClick={submit}
        >
          Submit
        </button>
        <button className="btn-primary" onClick={() => router.back()}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default EditTrainRoute;
