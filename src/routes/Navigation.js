import React, {Fragment, useContext} from 'react'
import {Outlet, Link} from 'react-router-dom'
import CartIcon from '../components/CartIcon'
import CartDropdown from '../components/CartDropdown'
import {ReactComponent as CrwnLogo } from '../assets/crown.svg'
import './Navigation.scss'
import {UserContext} from '../contexts/user.context'
import {CartContext} from '../contexts/cart.context'
import {signOutUser} from '../utils/firebase/firebase'

function Navigation(){
    //component rerenders whenever current user from UserContext gets updated
    const {currentUser} = useContext(UserContext)
    const {isCartOpen}=useContext(CartContext)

    // const signOutHandler = async () => {
    //   await signOutUser();
    //   setCurrentUser(null)
    // }

    
    return(
      //Fragment use it when dont want to render html element . this is due to requirement of react for a parent div
      <Fragment>
        <div className="navigation">
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo-container' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                  SHOP
                </Link>

                {
                  currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                  ) : (
                    <Link className='nav-link' to='/auth'>
                      SIGN IN
                    </Link>
                  )
                }
                <CartIcon/>
            </div>
            {isCartOpen&&<CartDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    )
  
  }

  export default Navigation