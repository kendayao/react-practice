import React, {Fragment} from 'react'
import Outlet, {Link} from 'react-router-dom'

function Navigation(){
    return(
      <Fragment>
        <div className="navigation">
            <Link className='logo-container' to='/'>
                <div>Logo</div>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                
                </Link>

            </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  
  }

  export default Navigation