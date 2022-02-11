import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../component/theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head><meta name="google-site-verification" content="sUvYsIUWImHfTkWIYvXMioXKxYtGLe8oq53x-vEMHX0" /></Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}