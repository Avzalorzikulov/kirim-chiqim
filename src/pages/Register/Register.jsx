import { useContext, useState } from 'react';
import FieldInput from '../../components/FieldInput/FieldInput';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { API } from '../../utils/config';

function Register() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  
  const inputs = [
    {
      id: 1,
      label: 'First Name',
      type: 'text',
      placeholder: 'First Name',
      name: 'firstName',
      required: true,
      pattern: "[a-zA-Z]{2,}",
      error: 'First Name shouldn`t contain any numbers and special characters!',
    },
    {
      id: 2,
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last Name',
      name: 'lastName',
      required: true,
      pattern: "[a-zA-Z]{2,}",
      error: 'Last Name also shouldn`t contain any numbers and special characters!',
    },
    {
      id: 3,
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      name: 'email',
      required: true,
      error: 'It should be a valid email address!',
    },
    {
      id: 4,
      label: 'Age',
      type: 'number',
      placeholder: 'Age',
      name: 'age',
      required: true,
      pattern: '^[1-9][0-9]*$',
      error: 'Age should contain only numbers!',
    },
    {
      id: 5,
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      name: 'password',
      required: true,
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      error: 'Password should contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 special character!',
    },
    {
      id: 6,
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm Password',
      name: 'confirmPassword',
      required: true,
      error: 'Passwords don’t match!',
    },
  ];

  const onChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    inputs.forEach((input) => {
      const value = values[input.name];
      if (input.required && !value) {
        formErrors[input.name] = `${input.label} is required!`;
        valid = false;
      } else if (input.pattern && !new RegExp(input.pattern).test(value)) {
        formErrors[input.name] = input.error;
        valid = false;
      }
    });

    if (values.password !== values.confirmPassword) {
      formErrors.confirmPassword = "Passwords don't match!";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const age = parseInt(values.age);

    API.post('/register', {
      first_name: values.firstName,
      last_name: values.lastName,
      age,
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/');
        setAuth(true);
      })
      .catch((err) => console.log('Error occurred during registration.'));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-10 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
        <Link to="/" className="text-blue-600 hover:underline text-lg">Log In</Link>
        
        <form className="space-y-4" action="#" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FieldInput
              key={input.id}
              {...input}
              onChange={onChange}
              value={values[input.name]}
              error={errors[input.name]}
            />
          ))}
          
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
