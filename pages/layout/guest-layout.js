import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Nav from "../nav/guest-nav";
import styles from "@styles/component/Nav.module.css";
// import Nav from "@component/nav";
// import styles from '../../styles/layout/Layout.module.css'

export default function GuestLayout({children}){
    return(
        <>
        <Nav  />
        <main>{children}</main>
        </>
    )

}