import {React, useContext, Fragment} from 'react'
import { CategoriesContext } from '../contexts/categories.context'

import CategoryPreview from '../components/CategoryPreview'
import './Shop.scss'


function Shop () {
    const {categoriesMap} = useContext(CategoriesContext)
    // const CATEGORIES_KEYS = ['jackets', 'hats', 'mens', 'sneakers', 'womens']

    return(
        <div className='shop-container'>
             {Object.keys(categoriesMap).map((title)=>{
                const products = categoriesMap[title]
                console.log(products)
                return <CategoryPreview key={title} title={title} products={products} />
                
                })}
        </div>                   
    )
    }



export default Shop


