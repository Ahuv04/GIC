import { Fragment } from "react";
import Head from "next/head";
import classes from "../components/layout/MainNavigation.module.css";

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>ChainRover - Home</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <div className={classes.content}>
                <h1 className={classes.title}>
                    Secure and manage your car<br></br>on ChainRover like a breeze
                </h1>
                <p className={classes.subtitle}>A platform by Jaguar Land Rover</p>
            </div>
            
            <div className={classes.imageContainer}>
                <img className={classes.fullWidthImage}
                    src="/src/car-image.png"
                    alt="Car"
                />
            </div>
        </Fragment>
    );
}

export default HomePage;
