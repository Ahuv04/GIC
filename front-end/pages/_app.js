import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { LoginContextProvider } from "../context/loginContext";

function MyApp({ Component, pageProps }) {
    return (
        <LoginContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </LoginContextProvider>
    );
}

export default MyApp;
