import '@/styles/globals.css'
import Layout from '@/components/layout'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Tengu</title>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  )
}
