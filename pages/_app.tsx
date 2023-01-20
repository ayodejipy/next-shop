import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GeneralLayout from "@/layouts/general";
import { Provider } from "react-redux";
import { wrapper } from "@/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, ...rest }: AppPropsWithLayout) {
    const { store, props: { pageProps } } = wrapper.useWrappedStore(rest);

    // get page level layout or use default's layout
    const getLayout = Component.getLayout ?? ((page) => <GeneralLayout>{page}</GeneralLayout>);
    return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
            <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
        </GoogleOAuthProvider>
    );
}
