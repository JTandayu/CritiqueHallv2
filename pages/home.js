import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Layout from './layout/layout'

export default function Home(){
    return(
        <Layout>
            <div>
                <p>Hello World</p>
            </div>
        </Layout>
    )
}

