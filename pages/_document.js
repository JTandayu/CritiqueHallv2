import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../component/theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name="google-site-verification" content="sUvYsIUWImHfTkWIYvXMioXKxYtGLe8oq53x-vEMHX0" />
          <meta name="keywords" content="Critique Hall, critique hall, critiquehall, CritiqueHall, CRITIQUEHALL, CRITIQUE HALL" />
          <meta charset="UTF-8" />
          <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BJ9NXYN9GV"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-BJ9NXYN9GV');
            `,
          }}
        />
        </Head>
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