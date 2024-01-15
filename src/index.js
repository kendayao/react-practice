import React from 'react';
import {createRoot} from 'react-dom/client'
import App from "./components/App"
import { BrowserRouter } from 'react-router-dom'
import "./index.scss"
import {UserProvider} from './contexts/user.context'
import { ProductsProvider } from './contexts/products.context';



const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <UserProvider>
            <ProductsProvider>
                <App />
            </ProductsProvider>
        </UserProvider>
    </BrowserRouter>
)

