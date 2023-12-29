import React, {Fragment, useContext} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {ReactComponent as CrwnLogo } from '../assets/crown.svg'
import './Navigation.scss'
import {UserContext} from '../contexts/user.context'

function Navigation(){
    //component rerenders whenever current user from UserContext gets updated
    const context = useContext(UserContext)
    console.log(context.currentUser)
    return(
      <Fragment>
        <div className="navigation">
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo-container' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                  SHOP
                </Link>
                <Link className='nav-link' to='/auth'>
                  SIGN IN
                </Link>

            </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  
  }

  export default Navigation