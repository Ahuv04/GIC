import PartsList from "../components/ui/PartsLists";
import classes from "../components/ui/PartCard.module.css";
import { Fragment } from "react";
function MyNFTs(props) {
    const vin = "IDKWHAT";
    return (
        <div style={{ display: "flex", "margin-top": "-5%", "margin-left": "10%", "margin-right":"5%" }}>
            <div style={{ "margin-right": "20%" }}>
                <h1
                    style={{
                        "font-family": "Noto Sans",
                        "font-style": "normal",
                        "font-weight": 400,
                        "font-size": "45px",
                    }}
                >
                    My NFTs
                </h1>
                <img
                    src="/src/jlrcar.png"
                    className={classes.carImage}
                />
                <h2 style={{ "text-align": "center" }}>VIN Number: {vin}</h2>
            </div>
            <div style={{ width: "100%" }}>
                <h3 className={classes.heading}>Parts Collection</h3>
                <PartsList />
            </div>
        </div>
    );
}

export default MyNFTs;
