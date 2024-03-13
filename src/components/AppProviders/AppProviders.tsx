// important: this component should render on client side for this reason use "use client"
// see: https://nextjs.org/docs/app/building-your-application/rendering/client-components
"use client";

import { PropsWithChildren, useMemo } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { initializeStore } from "@/redux/store";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const AppProviders = ({ children }: PropsWithChildren) => {
    const store = useMemo(() => initializeStore(), [])

    return (
        <ReduxProvider store={store}>
            {children}
            <ToastContainer hideProgressBar />
        </ReduxProvider>
    )
}

export default AppProviders;