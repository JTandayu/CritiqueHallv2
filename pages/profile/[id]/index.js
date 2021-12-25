import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function ProfilePage() {
    const router = useRouter()
    const {id} = router.query

    return(
        <main >
            <div>

            </div>

            <div>
                <p>This is Profile {id}</p>
                
            </div>
            
        </main>
    )
};
