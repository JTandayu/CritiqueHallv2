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
import AdminLayout from "./layout/admin-layout";
import theme from './theme'


function MyApp({ Component, pageProps }) {

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
    // case "AdminDashboard":
    //     return <ChakraProvider><AdminLayout><Component {...pageProps} /></AdminLayout></ChakraProvider>;
    // case "AdminLogs":
    //     return <ChakraProvider><AdminLayout><Component {...pageProps} /></AdminLayout></ChakraProvider>;
    default:
      return (
        <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />{" "}
        </Layout>
        </ChakraProvider>
      );
  }

  // return (
  //   <Layout>
  //     <ChakraProvider>
  //       <Component {...pageProps} />
  //     </ChakraProvider>
  //   </Layout>
  // )
}

export default MyApp