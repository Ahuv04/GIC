// our-domain.com/new-meetup
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import LoginContext from "../context/loginContext";
import ScanRFID from "../components/forms/ScanRFID";
function AdminPage() {
    const { isAdmin } = useContext(LoginContext);
    const router = useRouter();
    const ui = isAdmin ? (
        <Fragment>
            <Head>
                <title>Scan vehicle</title>
                <meta
                    name="description"
                    content="Add your own meetups and create amazing networking opportunities."
                />
            </Head>
            <ScanRFID />
        </Fragment>
    ) : (
        <div />
    );
    return ui;
}

export default AdminPage;
