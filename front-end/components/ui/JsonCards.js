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
function JSONCards(props) {
    const blocks = props.data.blocks;

    console.log(blocks);
    return (
        <div>
            {blocks.map((item, index) => (
                <Fragment key={"f" + index}>
                    <Card>
                        <pre>
                            {JSON.stringify(
                                item,
                                function (key, value) {
                                    if (typeof value === "string") {
                                        return value.substring(0, Math.min(value.length, 56));
                                    } else {
                                        return value;
                                    }
                                },
                                2
                            )}
                        </pre>
                    </Card>
                    {index < blocks.length - 1 && <div key={"k" + index} className={classes.line} />}
                </Fragment>
            ))}
        </div>
    );
}

export default JSONCards;
