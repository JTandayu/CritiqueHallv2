import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Nav from "../nav/nav";
import styles from "@styles/component/Nav.module.css";
import Router from 'next/router'
import {useCookies} from 'react-cookie'
import { useEffect } from 'react'
import axios from 'axios';
import WindowEventHandlersImpl from 'jsdom/lib/jsdom/living/nodes/WindowEventHandlers-impl';

// import Nav from "@component/nav";
// import styles from '../../styles/layout/Layout.module.css'


export default function Layout({children}){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [cookies, setCookies] =  useCookies('token', 'encrypted_id')
    const token = cookies.token
    const id = cookies.encrypted_id

    useEffect(() => {
        // Always do navigations after the first render
        let formData = new FormData();
        formData.append('token', token)
        formData.append('user_id', id)

        const config = {
            headers: { 
              'content-type': 'multipart/form-data',
              'X-API-KEY': `${API_KEY}`,
              'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
              // 'Accept-Encoding': 'gzip, deflate, br',
              'Accept': 'application/json',
            }
        }

        axios.post(`${API_URL}/api/valid_user`, formData, config)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            window.location.href = '/login'
        });

        if (token === 'undefined'){
            Router.replace('/login')
            return null;
        }
        
    }, [])


    return(
        <>
        <Nav  />
        <main>{children}</main>
        </>
    )

}