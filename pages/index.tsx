import React, {FC} from 'react';
// next
import Head from 'next/head';
// components
// import {Link} from '../components/elements';
import Link from 'next/link';
// next router
import Router from 'next/router';
// cookie
// import cookie from 'js-cookie';s

const Home: FC = () => {
  React.useEffect(() => {
    // if (!cookie.get('accessToken')) {
    //   Router.push('/auth/signin');
    // } else {
    //   Router.push('/dashboard');
    // }
    Router.push('/dashboard');
  });
  return (
    <div>
      <Head>
        <title>AlphaStream</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-center">
        <h1>Welcome to AlphaStream</h1>
        <Link href="/dashboard">
          <a>Go to Dashbaord</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
