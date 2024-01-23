import React from 'react'
import Button from './Button'

import './CartDropdown.scss'

function CartDropdown(){

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>

            </div>
            <Button>CHECKOUT</Button>
        </div>
    )

}

export default CartDropdown