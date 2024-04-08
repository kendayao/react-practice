import { createContext, useState, useEffect, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer'

const addCartItem = (cartItems, productToAdd) => {
    
    const existingCartItem = cartItems.find((cartItem)=>
        cartItem.id === productToAdd.id
    )

    if (existingCartItem) {
        return cartItems.map((cartItem)=>{ 
            return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity +1} : cartItem
        })
    }

    return [...cartItems, {...productToAdd, quantity: 1}]

}

const removeCartItem = (cartItems, cartItemToRemove) => {

    //find the cart item to remove
    const existingCartItem = cartItems.find((cartItem)=>cartItem.id===cartItemToRemove.id)

    //check if quantity is equal to 1, if it is removee that item from the cart
    if(existingCartItem.quantity===1){
        return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id)
    }

    //return back cart items with mathcin cart item with reduced quantity
    if (existingCartItem) {
        return cartItems.map((cartItem)=>{ 
            return cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
        })
    }

}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem=>cartItem.id!==cartItemToClear.id)
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0

}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                //payload is an object in this case so spread payload, otherwise due like isCartOpen: payload ex
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            };
        default:
            throw new Error(`Unahndled type ${type} in usesrReducer`)
    }
}


export const CartProvider = ({children})=>{
    // const [isCartOpen, setIsCartOpen]=useState(false)
    // const [cartItems, setCartItems]=useState([])
    // const [cartCount, setCartCount]=useState(0)
    // const [cartTotal, setCartTotal]=useState(0)

    // useEffect(()=>{
    //     const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
    //     setCartCount(newCartCount)
    // },[cartItems])

    // useEffect(()=>{
    //     const newCartTotal = cartItems.reduce((total, cartItem)=>total+cartItem.quantity*cartItem.price, 0)
    //     setCartTotal(newCartTotal)
    // },[cartItems])

    const [state, dispatch] = useReducer(cartReducer, INITAL_STATE)

        const {isCartOpen, cartItems, cartCount, cartTotal} = state

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem)=>total+cartItem.quantity*cartItem.price, 0);

        dispatch({
            type:CART_ACTION_TYPES.SET_CART_ITEMS,
            payload:{
                cartItems:newCartItems,
                cartTotal:newCartTotal,
                cartCount: newCartCount

            }
        })

    }


    const addItemToCart = (productToAdd)=>{
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

