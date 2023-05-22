import React, { Fragment } from "react";
import Card from "./Card";
import classes from "./Card.module.css";
const jsonData = [
    {
        id: 1,
        name: "John Doe",
        age: 30,
        email: "john@example.com",
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 28,
        email: "jane@example.com",
    },
    {
        id: 3,
        name: "Alice Johnson",
        age: 35,
        email: "alice@example.com",
    },
];
function JSONCards() {
    return (
        <div>
            {jsonData.map((item, index) => (
                <Fragment key={item.id}>
                    <Card>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    </Card>
                    {index < jsonData.length - 1 && <div className={classes.line} />}
                </Fragment>
            ))}
        </div>
    );
}

export default JSONCards;
