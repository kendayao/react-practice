import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments,getCategoriesAndDocuments } from '../utils/firebase/firebase.js';

import SHOP_DATA from '../shop-data.js'

// what we want to store
export const CategoriesContext = createContext({
    categoriesMap:{},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap]=useState({})


    //USE EFFECT TO ADD CATEGORES TO FIRESTORE DB
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])

    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap();
    },[])



    const value = {categoriesMap}
    return (<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>)
    
}