import Background from '@/components/Background';
import Header from '@/components/Header';
import styles from '@/styles/Home.module.css'
import Head from 'next/head'

export default function register() {
  return (
    <div className="relative h-screen lg:h-[140vh]">
      <Head>
          <title>Sign up for the PDF service</title>
          <meta name="description" content="Registration page for the Tactalyse PDF generation service" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            You can sign up for the tactalyse PDF generation service here.
          </p>
        </div>
      </main>
    </div>
  )
}