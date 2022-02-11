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



function MyApp({ Component, pageProps, ...appProps }) {
    const router = useRouter()

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
            return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;;
      
        return (
          <ChakraProvider theme={theme}>
            <Layout>
                <SimpleReactLightbox>
                    <Component {...pageProps} />{" "}
                </SimpleReactLightbox>
            </Layout>
          </ChakraProvider>
        );
    // }
}

export default MyApp