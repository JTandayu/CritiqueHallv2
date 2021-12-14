// import '../styles/globals.css'
// import Layout from './layout/layout'

// export default function MyApp({ Component, pageProps }) {
//   return (
//           <Component {...pageProps} />
//   ) 
// }

import { ChakraProvider } from "@chakra-ui/react"
import Layout from './layout/layout'

function MyApp({ Component, pageProps }) {

  switch (Component.name) {
    case "Login":
        return <ChakraProvider><Component {...pageProps} /></ChakraProvider>;
    case "Register":
        return <ChakraProvider><Component {...pageProps} /></ChakraProvider>;
    case "Register2":
        return <ChakraProvider><Component {...pageProps} /></ChakraProvider>;
    case "ForgotPassword":
        return <ChakraProvider><Component {...pageProps} /></ChakraProvider>;
    case "ResetPassword":
        return <ChakraProvider><Component {...pageProps} /></ChakraProvider>;
    case "Welcome":
        return <ChakraProvider><Component {...pageProps} /></ChakraProvider>;
    // case "AdminDashboard":
    //     return <ChakraProvider><AdminLayout><Component {...pageProps} /></AdminLayout></ChakraProvider>;
    // case "AdminLogs":
    //     return <ChakraProvider><AdminLayout><Component {...pageProps} /></AdminLayout></ChakraProvider>;
    default:
      return (
        <ChakraProvider>
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