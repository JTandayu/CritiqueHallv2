import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Welcome.module.css'
import { motion } from "framer-motion"
import Link from 'next/link'
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'


const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const imageLoader = ({ src, width, quality }) => {
  return `/${src}?=${width}&q=${quality || 100}`
}

export default function Home() { 
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to Critique Hall</title>
        <meta name="description" content="Critique Hall generated by Next App" />
        <link rel="icon" href="/logo256.png" onLoad=""/>
      </Head>

      <main className={styles.main}>

        <motion.h1 
          animate={{ y: 50, stdDeviation: [1, 5, 3], opacity:1}}
          initial="hidden"
          variants={variants}
          whileHover={{ scale: 1.1 }}
          className={styles.title}>
          {/* <img className="imageLogo" src="/critiquehall2.png" /> */}
          <Image
          loader={imageLoader}
          src="critiquehall2.png"
          alt="Logo of Critique Hall"
          width={700}
          height={200}
          />
        </motion.h1>

        <motion.p 
          initial="hidden" 
          animate={{ y: 10, stdDeviation: [1, 5, 3], opacity:1 }}
          transition={{ delay: 1 }} 
          variants={variants} 
          className={styles.description}>
          A Discussion Forum Web Application for Students
        </motion.p>

        {/* <button className={styles.getStartedButton}>
          <motion.span
            // animate={{opacity:1}}
            initial={{opacity:0.5}}
            whileHover={{opacity:1}}
            transition={{duration:.1}}
          >
          <Link href="/login">Get Started</Link>
          </motion.span>
        </button> */}

        <Stack direction="row" spacing={8} align="center">
        <motion.button
            // initial="hidden"
            // animate={{ x: 10, stdDeviation: [1, 5, 3], opacity:1 }}
            // whileHover={{opacity:1}}
            // transition={{duration:.1}}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
        <Button rightIcon={<CheckIcon />} colorScheme="messenger" variant="solid" size="lg">
       <Link href="/login">Login</Link>
        </Button>
        </motion.button>

        <motion.button
            // initial="hidden"
            // animate={{ x: 10, stdDeviation: [1, 5, 3], opacity:1 }}
            // whileHover={{opacity:1}}
            // transition={{duration:.1}}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
        <Button rightIcon={<ArrowForwardIcon />} colorScheme="red" variant="solid" size="lg">
       <Link href="/register">Get Started</Link>
        </Button>
        </motion.button>
        </Stack>

      </main>
    </div>
  )
}