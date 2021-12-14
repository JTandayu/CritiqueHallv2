import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"

export default function ProfilePage() {

    return(
        <>
        <Head>
            <title>User</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
        <div >
            
        </div>
        </>
    )


};
