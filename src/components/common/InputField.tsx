import React from 'react';
import OptionalRender from './OptionalRender';

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
}) => {
  const hasError = Boolean(error);
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : 'border-black'}`}
      />
      <OptionalRender condition={hasError}>
        <p className="mt-1 text-sm text-red-500">{error}</p>
      </OptionalRender>
    </div>
  );
};

export default InputField;
