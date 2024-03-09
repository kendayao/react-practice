import React from 'react';
import {Link} from 'react-router-dom'

import './CategoryPreview.scss'
import ProductCard from './ProductCard';

function CategoryPreview ({title, products}){


    return(
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className='preview'>
                {products.filter((_,idx)=>idx<4).map((products)=>
                    <ProductCard key={products.id} product={products}/>
                )}
            </div>

        </div>
    )
}

export default CategoryPreview