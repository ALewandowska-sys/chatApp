import React, { useState } from 'react'
import './Register.css';
import { RegisterModel } from './Register.types';

export default function Register() {

  const [RegisterModel, setRegisterModel] = useState<RegisterModel>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: 2,
  });

  const setValue = (event: any) => {
    setRegisterModel(prev => { return {...prev, [event.target.name]: event.target.value } });
  }

  const register = () => {
    if(isFormValid()) {
      // request and route to PagesUserHome
    }
  }

  const validatePassword = (): boolean => {
    return RegisterModel.password !== '' && (RegisterModel.password === RegisterModel.confirmPassword);
  }

  const validateUsername = (): boolean => {
    return RegisterModel.username !== '' && RegisterModel.username.length > 4 && RegisterModel.username.length < 16;
  }

  const validateGender = (): boolean => {
    return RegisterModel.gender == 1 || RegisterModel.gender == 0;
  }


  const isFormValid = (): boolean => {
    const password = validatePassword();
    const username = validateUsername();
    const gender = validateGender();

    return password && username && gender;
  }


  return (
    <div>

      <div className="registration-form">

        <h2 className='text-center'>Register</h2>

        <form>

          <div className="form-group">
            <input type="text" className="form-control item" id="email" placeholder="Email" name="email" onChange={(ev) => setValue(ev)} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control item" name="username" onChange={(ev) => setValue(ev)} id="username" placeholder="Username" />
            {
              !validateUsername() &&
                <div className='error-feedback'>
                  username cannot be empty and length must be between 4 and 16 characters
                </div>
            }
          </div>
          <div className="form-group">
            <input type="password" className="form-control item" id="password" name="password" onChange={(ev) => setValue(ev)} placeholder="Password" />
            {
              !validatePassword() &&
                <div className='error-feedback'>
                  Password is empty or Confirm Email is not valid
                </div>
              }
          </div>

          <div className="form-group">
            <input type="password" className="form-control item" id="confirmPassword" name="confirmPassword" onChange={(ev) => setValue(ev)} placeholder="Confirm Password" />
            {
              !validatePassword() &&
                <div className='error-feedback'>
                  Password is empty or Confirm Email is not valid
                </div>
            }
          </div>

          <div>

            <select defaultValue={'2'} className="form-select mt-3" name="gender" onChange={(x) => { setValue(x) }} required>
              <option value={2}>Gender</option>
              <option value={0}>Male</option>
              <option value={1}>Female</option>
            </select>

            {
              !validateGender() &&
                <div className='error-feedback'>
                  Gender must be selected
                </div>
            }

          </div>

          <div className="form-group" >
            <button onClick={register} type="button" className="btn btn-block create-account" disabled={!isFormValid()}>Create Account</button>
          </div>
        </form>

      </div>

    </div>
  )
}
