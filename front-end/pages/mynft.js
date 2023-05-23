import PartsList from "../components/ui/PartsLists";
import classes from "../components/ui/PartCard.module.css";
import { Fragment } from "react";
import { useState, useContext, useEffect } from "react";
import LoginContext from "../context/loginContext";

function MyNFTs(props) {
    const [data, setData] = useState(null);
    const { port } = useContext(LoginContext);
    const restURL = "http://localhost:" + port + "/getParts";
    console.log(restURL);
    useEffect(() => {
        console.log("Port " + port)
        if (port) {
            fetch(restURL)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log(res);
                    setData(res);
                });
        }
    }, [setData, port]);
    console.log(data);
    const uiElement = data ? (
        <div
            style={{
                display: "flex",
                "marginTop": "-5%",
                "marginLeft": "10%",
                "marginRight": "5%",
            }}
        >
            <div style={{ "marginRight": "20%" }}>
                <h1
                    style={{
                        "fontFamily": "Noto Sans",
                        "fontStyle": "normal",
                        "fontWeight": 400,
                        "fontSize": "45px",
                    }}
                >
                    My NFTs
                </h1>
                <img
                    src="/src/jlrcar.png"
                    className={classes.carImage}
                />
                <h2 style={{ "textAlign": "center" }}>VIN Number: {data["vin"]}</h2>
            </div>
            <div style={{ width: "100%" }}>
                <h3 className={classes.heading}>Parts Collection</h3>
                <PartsList parts={data["parts"]} />
            </div>
        </div>
    ) : (
        <div />
    );
    return uiElement;
}

export default MyNFTs;
