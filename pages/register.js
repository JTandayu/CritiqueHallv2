import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/Register.module.css'

export default function Register() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Register</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/critiquehall.png" />
        </Head>
  
        <main className={styles.main}>
  
        
            <form id="login">
                <input placeholder="First Name" type="text"/>
                <br/>
                <input placeholder="Last Name" type="text"/>
                <br/>
                <input placeholder="Email" type="email"/>
                <br/>
                <input placeholder="Display Name" type="text"/>
                <br/>
                <input placeholder="Password" type="password"/>
                <br/>
                <input placeholder="Confirm Password" type="password"/>
                <br/>
                <button type="button" className={styles.login_button}>Login</button>
            </form>
  
          
          
        </main>

      </div>
    )
  }