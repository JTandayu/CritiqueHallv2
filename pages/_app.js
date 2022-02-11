// import '../styles/globals.css'
// import Layout from './layout/layout'

// export default function MyApp({ Component, pageProps }) {
//   return (
//           <Component {...pageProps} />
//   ) 
// }

import { ChakraProvider } from "@chakra-ui/react"
import SimpleReactLightbox from 'simple-react-lightbox'
import Layout from './layout/layout'
import GuestLayout from "./layout/guest-layout";
import theme from '../component/theme'
import {useCookies} from 'react-cookie'
import Router, { useRouter } from "next/router";
import { AppProps } from "next/dist/shared/lib/router/router";
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from "react";
import Script from 'next/script'

function MyApp({ Component, pageProps, ...appProps }) {
    const router = useRouter()

    const handleRouteChange = (url) => {
        window.gtag('config', 'G-BJ9NXYN9GV', {
          page_path: url,
        });
      };

      useEffect(() => {
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
        };
      }, [router.events]);

    // switch (Component.name) {
    //   case "Login":
    //       return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
    //       break;
    //   case "Register":
    //       return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
    //       break;
    // //   case "Register2":
    // //       return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
    //   case "ForgotPassword":
    //       return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
    //       break;
    //   case "ResetPassword":
    //       return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
    //       break;
    //   case "ConfirmationPage":
    //       return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
    //       break;
    //   case "Welcome":
    //       return <ChakraProvider theme={theme}><GuestLayout><Component {...pageProps} /></GuestLayout></ChakraProvider>;
    //   default:

        if ([ `/register`, `/forgot-password`, `/confirmation`, `/reset-password/[token]/[userId]`, `/` ].includes(appProps.router.pathname))
            return <ChakraProvider theme={theme}><NextNProgress /><Component {...pageProps} /></ChakraProvider>;;
      
        return (
          <ChakraProvider theme={theme}>
            <Layout>
                <SimpleReactLightbox>
                    <NextNProgress />
                    <Component {...pageProps} />{" "}
                </SimpleReactLightbox>
            </Layout>
          </ChakraProvider>
        );
    // }
}

export default MyApp