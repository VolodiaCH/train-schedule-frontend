import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/components/common/InputField';
import Loading from '@/components/common/Loading';
import ErrorComponent from '@/components/common/Error';
import RedirectLink from '@/components/common/RedirectLink';
import { emailValidationRegexp } from '@/utils/utils';
import { AuthService } from '@/services/authService';
import { AuthContext } from '@/context/AuthContext';

interface SignUpErrors {
  email: string | null;
  name: string | null;
  surname: string | null;
  password: string | null;
  repeatPassword: string | null;
}

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);

  const router = useRouter();

  const submit = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (newErrors === null) {
      const user = {
        email,
        name,
        surname,
        password,
        isAdmin,
      };

      try {
        setLoading(true);

        const result = await AuthService.signUp(user);
        login(result.access_token);

        router.push('/');
      } catch (error) {
        console.error(error);

        if (error instanceof Error && error.message.startsWith('Error 409')) {
          setErrors({
            email: 'User with this email already exist!',
            name: null,
            surname: null,
            password: null,
            repeatPassword: null,
          });
        } else {
          setError(`${error}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const validateFields = (): SignUpErrors | null => {
    let emailError = null,
      nameError = null,
      surnameError = null,
      passwordError = null,
      repeatPasswordError = null;

    if (!emailValidationRegexp.test(email))
      emailError = 'Please, enter real email!';
    if (email.length === 0) emailError = "Email field can't be empty!";
    if (name.length === 0) nameError = "Name field can't be empty!";
    if (surname.length === 0) surnameError = "Email field can't be empty!";
    if (password.length < 4)
      passwordError = 'Password should contain at least 4 symbols!';
    if (password.length === 0) passwordError = "Password field can't be empty!";
    if (password !== repeatPassword)
      repeatPasswordError = "Passwords don't match!";

    if (
      emailError ||
      nameError ||
      surnameError ||
      passwordError ||
      repeatPasswordError
    ) {
      return {
        email: emailError,
        name: nameError,
        surname: surnameError,
        password: passwordError,
        repeatPassword: repeatPasswordError,
      };
    }

    return null;
  };

  if (loading) return <Loading />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <div className="flex justify-center items-start">
      <div className="container-box">
        <h2 className="text-2xl font-bold text-center mb-4">Sign-Up</h2>
        <div className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            error={errors?.email}
          />
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
          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            error={errors?.password}
          />
          <InputField
            label="Repeat Password"
            name="repeat_password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value.trim())}
            error={errors?.repeatPassword}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 border border-black rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="isAdmin"
              className="text-sm font-medium text-gray-700"
            >
              {'Admin (this is test task, so you can create admin user)'}
            </label>
          </div>
        </div>

        <button className="btn-primary" onClick={submit}>
          Submit
        </button>

        <RedirectLink
          text="Already have an account? "
          href="/sign-in"
          linkText="Sign-In"
        />
      </div>
    </div>
  );
};

export default SignUp;
