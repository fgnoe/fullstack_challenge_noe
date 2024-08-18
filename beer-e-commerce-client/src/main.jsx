import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {
    RouterProvider,
    createRouter,
    createRootRoute,
    Outlet,
    redirect,
    createRoute
} from '@tanstack/react-router'
import './index.css'
import {Product} from './routes/product'
import {Products} from './routes/products'

import {BrowserView, MobileView} from "react-device-detect";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
        </>
    ),
})
const indexRoute = createRoute({
    path: '/',
    getParentRoute: () => rootRoute,
    loader: () => {
        throw redirect({
            to: '/products',
        })
    }
})
export const productRoute = createRoute({
    path: '/product/$compositeId',
    getParentRoute: () => rootRoute,
    component: Product,
})
const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/products',
    component: Products,
})

const routeTree = rootRoute.addChildren([indexRoute, productRoute, productsRoute])
const router = createRouter({ routeTree })
const queryClient = new QueryClient()
// Render the app
const rootElement = document.getElementById('root');
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <BrowserView>
                <h1>This app is designed for mobile devices, please use a mobile device</h1>
            </BrowserView>
            <MobileView>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </MobileView>
        </StrictMode>,
    );
}