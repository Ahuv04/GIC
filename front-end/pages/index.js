import { Fragment } from "react";
import Head from "next/head";
import classes from "../components/layout/MainNavigation.module.css";
import MeetupList from "../components/forms/MeetupList";

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

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
    // fetch data from an API
    // const client = await MongoClient.connect(
    //   'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
    // );
    // const db = client.db();

    // const meetupsCollection = db.collection('meetups');

    // const meetups = await meetupsCollection.find().toArray();

    // client.close();
    const meetups = [];
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1,
    };
}

export default HomePage;
