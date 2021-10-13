import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
import { Button, ButtonGroup } from "@chakra-ui/react"

const MotionButton = motion(Button)

export default function Nav(){
    return(
    <div className={styles.container}>
        
        <div className={styles.logo}>
            <Link href="/home">
                <Image src={Logo} alt="Critique Hall Logo"></Image>
            </Link>
        </div>
        <nav>
            <ul>
                <li><Link href="/home"><a>Home</a></Link></li>
                <li><Link href=""><a>Critique</a></Link></li>
                <li><Link href=""><a>Feedback</a></Link></li>
                {/* Profile will be changed into a dropdown with AccName as label */}
                <li><Link href=""><a>Profile</a></Link></li>
                <MotionButton className={styles.nav_button}
                colorScheme="red"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}><Link href="/login">Log Out</Link></MotionButton>
            </ul>
        </nav>
    </div>
    )
}

