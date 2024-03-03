import React from 'react'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Logo } from '../compnents/index'
import { Link } from 'react-router-dom'
import { FormRow } from '../compnents/index'

const Register = () => {
  return (
    <Wrapper>
      <form className='form' >
        <Logo/>
        <h4>register</h4>
        <FormRow type='text' name='name' labelText='Name' Default='Shahmeer'/>
        <FormRow type='text' name='lastname' labelText='Last Name' Default='Ali'/>
        <FormRow type='text' name='location' labelText='Location' Default='multan'/>
        <FormRow type='email' name='email' labelText='Email' Default='shah@ggmail.com'/>
        <FormRow type='password' name='pasword' labelText='Password' Default='ali123'/>
        

       <button type='submit' className='btn btn-block' >Register</button>
       <p>Already have an account? <Link className='member-btn'  to={"/login"} >Login</Link></p>
      
      </form>
    </Wrapper>
  )
}

export default Register