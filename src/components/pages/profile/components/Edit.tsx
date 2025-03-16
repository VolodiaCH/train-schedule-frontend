import React, { useState, useContext, useRef, useEffect } from 'react';
import InputField from '@/components/common/InputField';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import { AuthContext } from '@/context/AuthContext';
import { User } from '@/pages/profile';
import { UserService } from '@/services/userService';

interface EditProps {
  user: User;
}

interface ProfileErrors {
  name: string | null;
  surname: string | null;
}

const Edit: React.FC<EditProps> = ({ user }) => {
  const defaultNameRef = useRef(user.name);
  const defaultSurnameRef = useRef(user.surname);

  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [errors, setErrors] = useState<ProfileErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useContext(AuthContext);

  const [disabledSubmit, setDisabledSubmit] = useState(true);

  useEffect(() => {
    setDisabledSubmit(
      defaultNameRef.current === name && defaultSurnameRef.current === surname
    );
  }, [name, surname]);

  const submit = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (!newErrors) {
      try {
        setLoading(true);

        const result = await UserService.updateNames(name, surname);

        defaultNameRef.current = result.name;
        defaultSurnameRef.current = result.surname;

        setDisabledSubmit(true);
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateFields = (): ProfileErrors | null => {
    let nameError = null,
      surnameError = null;

    if (name.length === 0) nameError = "Name field can't be empty!";
    if (surname.length === 0) surnameError = "Surname field can't be empty!";

    if (nameError || surnameError) {
      return { name: nameError, surname: surnameError };
    }

    return null;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">
        Edit your profile data
      </h2>
      <div>
        <p className="text-l">
          <span className="font-bold">Email: </span> {user.email}{' '}
          {isAdmin ? '(admin)' : ''}
        </p>

        <div className="mt-4 space-y-4">
          <InputField
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            error={errors?.name}
          />
          <InputField
            label="Surname"
            name="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value.trim())}
            error={errors?.surname}
          />
          <button
            className="btn-primary"
            disabled={disabledSubmit}
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
