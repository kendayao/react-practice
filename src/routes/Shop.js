import {React, useContext, Fragment} from 'react'
import { CategoriesContext } from '../contexts/categories.context'
import ProductCard from '../components/ProductCard'
import './Shop.scss'


function Shop () {
    const {categoriesMap} = useContext(CategoriesContext)
    // const CATEGORIES_KEYS = ['jackets', 'hats', 'mens', 'sneakers', 'womens']

    return(
        <Fragment>
             {Object.keys(categoriesMap).map((title)=>{
                return(
                <Fragment key={title}>
                    <h2>{title}</h2>
                    <div className="products-container">
                        {categoriesMap[title].map((product)=> (
                        <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                </Fragment>
                )
                })}
        </Fragment>                   
    )
    }



export default Shop


