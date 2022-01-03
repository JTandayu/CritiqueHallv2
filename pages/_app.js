// import '../styles/globals.css'
// import Layout from './layout/layout'

// export default function MyApp({ Component, pageProps }) {
//   return (
//           <Component {...pageProps} />
//   ) 
// }

import { ChakraProvider } from "@chakra-ui/react"
import Layout from './layout/layout'
import GuestLayout from "./layout/guest-layout";
import theme from './theme'
import {useCookies} from 'react-cookie'
import Router from "next/router";


function MyApp({ Component, pageProps }) {

  const [cookies, setCookie] = useCookies('token')

  const token = cookies.token

    switch (Component.name) {
      case "Login":
          return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
      case "Register":
          return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
      case "Register2":
          return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
      case "ForgotPassword":
          return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
      case "ResetPassword":
          return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
      case "Welcome":
          return <ChakraProvider theme={theme}><GuestLayout><Component {...pageProps} /></GuestLayout></ChakraProvider>;
      default:
        return (
          <ChakraProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />{" "}
            </Layout>
          </ChakraProvider>
        );
    }
}

export default MyApp