
import { useState } from 'react';
import { checkEmail, checkPassword } from '../../utils/helpers';
import styles from './userForm.module.css';
import CustomInput from '../customInput/Input';


const UserForm = () => {
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [enteredValues, setEnteredValues] = useState({ email: '', password: '' });
  const [isLoading,setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnteredValues((prev) => ({ ...prev, [name]: value }));

  }
  const handleBlur = (e) => {
    const { name , value} = e.target;
      if( name === 'email') {
      setErrors((prev) => ({ ...prev, email: (value !== '' && checkEmail(value)) ? '' : 'please enter valid email' }));
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: (value !== '' && checkPassword(value)) ? '' : 'please enter valid password' }));
    }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
    if (!errors.email && !errors.password && !isLoading) {
      setIsLoading(true);
      console.log(enteredValues);
      localStorage.setItem('user', JSON.stringify(enteredValues));
      setIsLoading(false);
      setEnteredValues({ email: '', password: '' });
      return
    }
    
  }
  return (
    <form className={styles.userForm} onSubmit={(e) => handleSubmit(e)}>

      <CustomInput type={'email'}
        name={'email'}
        label={'Email'}
        placeholder='Enter your email'
        value={enteredValues.email}
        hasError={errors.email}
        errorMsg={errors.email}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
        required/>
      

      <CustomInput type={'password'}
        name={'password'}
        label={'Password'}
        placeholder='Enter your password'
        value={enteredValues.password}
        hasError={errors.password}
        errorMsg={errors.password}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
        required/>

        <button className='globalbutton' type="submit" disabled={isLoading}>Submit</button>

        </form>
    )
}

export default UserForm