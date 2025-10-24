import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Balance Payment Access</title>
        <meta
          name="description"
          content="Secure access portal for the Balance Payment application"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
