// our-domain.com/new-meetup
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ScanRFID from "../components/forms/ScanRFID"
function AdminPage() {
  const router = useRouter();
  const param = router.query.sign;
  return (
    <Fragment>
      <Head>
        <title>Scan vehicle</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
      <ScanRFID/>
    </Fragment>
  );
}

export default AdminPage;
