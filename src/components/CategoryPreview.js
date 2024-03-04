import React from 'react';

import './CategoryPreview.scss'
import ProductCard from './ProductCard';

function CategoryPreview ({title, products}){


    return(
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
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