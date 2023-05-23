import React, { Fragment } from "react";
import PartCard from "./PartCard";
import classes from "./PartCard.module.css";
import { useState } from "react";
const jsonData = [
    {
        id: 1,
        name: "Engine",
        str: "engine",
        verified: true,
    },
    {
        id: 2,
        name: "NVIDIA Drive",
        str: "drive",
        verified: true,
    },
    {
        id: 3,
        name: "Infotainment Dashboard",
        str: "infotainment",
        verified: true,
    },
    {
        id: 4,
        name: "Piston",
        str: "piston",
        verified: true,
    },
    {
        id: 5,
        name: "Transmission",
        str: "transmission",
        verified: true,
    },
    {
        id: 6,
        name: "Gearbox",
        str: "gearbox",
        verified: true,
    },
    {
        id: 7,
        name: "Friction Pad",
        str: "fricpads",
        verified: true,
    },
    {
        id: 8,
        name: "Catalytic converter",
        str: "cconverter",
        verified: true,
    },
    {
        id: 9,
        name: "Battery",
        str: "battery",
        verified: true,
    },
];
function PartsList(prop) {
    const { owner, parts } = prop;
    const result = jsonData.filter((item) => { return (parts[item.str.toLowerCase()] != undefined)});
    if (owner) {
        for (let i = 0; i < result.length; i++) {
            result[i].verified = parts[result[i].str];
        }
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(result);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filteredResults = result.filter((item) =>
            item.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(filteredResults);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search Parts"
                value={searchTerm}
                onChange={handleSearch}
                className={classes.search}
            />
            {searchResults.map((item, index) => (
                <Fragment key={item.id}>
                    <PartCard
                        id={index + 1}
                        name={item.name}
                        str={item.str}
                        verified={item.verified}
                    />
                </Fragment>
            ))}
            <button className={classes.button}>View All</button>
        </div>
    );
}

export default PartsList;
