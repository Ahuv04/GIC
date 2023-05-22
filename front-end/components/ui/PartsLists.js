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
function PartsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(jsonData);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filteredResults = jsonData.filter((item) =>
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
            {searchResults.map((item) => (
                <Fragment key={item.id}>
                    <PartCard
                        id={item.id}
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
