import Router from "next/router";
import { StoreProvider } from "../components/Store";
import Layout from "../components/Layout";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "tailwindcss/tailwind.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout commercePublicKey={pageProps.commercePublicKey}>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async () => {
  return {
    pageProps: {
      commercePublicKey: process.env.COMMERCE_PUBLIC_KEY,
    },
  };
};
