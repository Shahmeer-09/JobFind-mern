
import Wrapper from '../assets/wrappers/LandingPage';

import main from '../assets/images/main.svg';
import {Link } from 'react-router-dom';
import {Logo} from '../compnents/index';

 

const Landing = () => {
  return (
    <Wrapper>
      <nav>
         <Logo/>
      </nav>
      <div className='container page'>
         <div className='info' >
            <h1>Job<span>Tracking</span>App </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ratione accusamus vitae voluptatibus, accusantium, earum nisi deleniti incidunt harum odit delectus. Illo consectetur porro quasi rerum sunt commodi provident perspiciatis?
            </p>
             <Link to='/register' className='btn register-link'>Register</Link>
             <Link to='/login' className='btn '>Login / Demo User</Link>
         </div>
         <img src={main} alt="page_image" className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing