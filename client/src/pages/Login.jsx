import React from 'react'
import {FormRow, Logo} from '../compnents/index'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {Link} from 'react-router-dom'


const Login = () => {
  return (
     <Wrapper>
      <form className='form' >
        <Logo/>
        <h4>Login</h4>
        <FormRow type='email' name='email' Default="Shah@gmail.com"/>
        <FormRow type='password' name='password' Default="ali123"/>
        <button type='submit' className='btn btn-block'>Login</button>
        <button  className='btn btn-block'>Explore The App</button>
        <p>Not yet have an account ? <Link className='member-btn'  to={"/register"} >Register</Link></p>
      </form>

     </Wrapper>
  )
}

export default Login