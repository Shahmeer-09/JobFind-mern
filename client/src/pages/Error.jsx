import React from 'react'
import { useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
const Error = () => {
  const error = useRouteError()  
  console.log(error.message)
  return (
    <Wrapper>
      {
        error.status !== 404 ?  (
          <>

          <h1>{error.msg}</h1>
        <h1>Something went wrong</h1>
          
          </>
        ) : (
          <div>
            <img src={img} alt="not-found" />
            <h1>Ohh! Page Not found</h1>
            <p>we cant seem to find tha page yuo are looking for </p>
            <Link to={'/dashboard'} >Back Home</Link>
          </div>
        )
      }
    </Wrapper>
  )
}

export default Error