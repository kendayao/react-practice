import {Routes, Route} from 'react-router-dom'
import './Shop.scss'
import CategoriesPreview from './CategoriesPreview'

function Shop () {
  
    return(
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
        </Routes>       
    )
    }



export default Shop


