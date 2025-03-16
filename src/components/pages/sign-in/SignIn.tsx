import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/components/common/InputField';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import RedirectLink from '@/components/common/RedirectLink';
import { emailValidationRegexp } from '@/utils/utils';
import { AuthService } from '@/services/authService';
import { AuthContext } from '@/context/AuthContext';

interface SignInErrors {
  email: string | null;
  password: string | null;
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignInErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);

  const router = useRouter();

  const submit = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (newErrors === null) {
      try {
        setLoading(true);
        const result = await AuthService.signIn(email, password);
        login(result.access_token);

        router.push('/');
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateFields = (): SignInErrors | null => {
    let emailError = null,
      passwordError = null;

    if (!emailValidationRegexp.test(email))
      emailError = 'Please, enter real email!';
    if (email.length === 0) emailError = "Email field can't be empty!";
    if (password.length < 4)
      passwordError = 'Password should contain at least 4 symbols!';
    if (password.length === 0) passwordError = "Password field can't be empty!";

    if (emailError || passwordError) {
      return {
        email: emailError,
        password: passwordError,
      };
    }

    return null;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="flex justify-center items-start">
      <div className="container-box">
        <h2 className="text-2xl font-bold text-center mb-4">Sign-In</h2>
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
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            error={errors?.password}
          />
        </div>
        <button className="btn-primary" onClick={submit}>
          Submit
        </button>

        <RedirectLink
          text="Don't have an account? "
          href="/sign-up"
          linkText="Sign-Up"
        />
      </div>
    </div>
  );
};

export default SignIn;
