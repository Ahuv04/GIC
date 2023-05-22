// our-domain.com/new-meetup
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import LoginForm from "../components/forms/LoginForm"
function LoginPage() {
  const router = useRouter();
  const param = router.query.sign;
  return (
    <Fragment>
      <Head>
        <title>Login to account</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
      <LoginForm param={param} />
    </Fragment>
  );
}

export default LoginPage;
