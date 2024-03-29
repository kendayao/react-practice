import {React, useContext} from 'react'
import { ReactComponent as ShoppingIcon } from '../assets/shopping-bag.svg'
import { CartContext } from '../contexts/cart.context'
import './CartIcon.scss'

function CartIcon(){

    const{isCartOpen, setIsCartOpen, cartCount}=useContext(CartContext)

    const toggleIsCartOpen = ()=>setIsCartOpen(!isCartOpen)
    return(
        <div className='cart-icon-container'>
            <ShoppingIcon onClick={toggleIsCartOpen} className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )

}

export default CartIcon