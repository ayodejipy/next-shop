import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { AppStore } from "@/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GeneralLayout from "@/layouts/general";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

declare global {
    interface Window {
        Cypress?: Cypress.Cypress;
        store?: AppStore;
    }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, ...rest }: AppPropsWithLayout) {
    const {
        store,
        props: { pageProps },
    } = wrapper.useWrappedStore(rest);

    // expose store when run in Cypress
    if (global?.window && window.Cypress) {
        window.store = store;
    }

    // redux persis
    const persistor = persistStore(store);

    // get page level layout or use default's layout
    const getLayout = Component.getLayout ?? ((page) => <GeneralLayout>{page}</GeneralLayout>);
    return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {getLayout(<Component {...pageProps} />)}
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    );
}
