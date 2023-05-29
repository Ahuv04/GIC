import PartsList from "../components/ui/PartsLists";
import classes from "../components/ui/PartCard.module.css";
import { Fragment } from "react";
import { useState, useContext, useEffect } from "react";
import LoginContext from "../context/loginContext";
import Card from "../components/ui/Card";

function MyNFTs(props) {
    const [data, setData] = useState(null);

    const [walletBalance, setWallet] = useState(null);
    const [stake, setStake] = useState(null);
    const [mineRewards, setMine] = useState(null);

    const { port } = useContext(LoginContext);
    const restURL = "http://localhost:" + port;
    console.log(restURL);
    useEffect(() => {
        console.log("Port " + port);
        if (port) {
            fetch(restURL + "/getParts")
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log(res);
                    setData(res);
                });

            fetch(restURL + "/mineReward")
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setMine(res);
                });
            fetch(restURL + "/walletAmt")
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setWallet(res);
                });
            fetch(restURL + "/getStake")
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (res == null) {
                        res = 0;
                    }
                    setStake(res);
                });
        }
    }, [setData, port]);
    console.log(walletBalance, stake, mineRewards);
    console.log(data);
    const uiElement = data ? (
        data.vin ? (
            <div
                style={{
                    display: "flex",
                    marginTop: "-5%",
                    marginLeft: "10%",
                    marginRight: "5%",
                }}
            >
                <div style={{ marginRight: "20%" }}>
                    <h1
                        style={{
                            fontFamily: "Noto Sans",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "45px",
                        }}
                    >
                        My NFTs
                    </h1>
                    <img
                        src="/src/jlrcar.png"
                        className={classes.carImage}
                    />
                    <h2 style={{ textAlign: "center", marginRight: "8%" }}>
                        VIN Number: {data["vin"]}
                    </h2>
                    <button
                        className={classes.button}
                        style={{ width: "30%", marginLeft: "30%", marginTop: "10%" }}
                    >
                        Report car stolen
                    </button>
                    {walletBalance != null && stake != null && mineRewards != null ? (
                        <div style={{ padding: "5px", marginLeft: "auto", marginRight: "10%" }}>
                            <Card>
                                <div style={{ padding: "5px" }}>
                                    <p>Wallet Balance: {walletBalance}</p>
                                    <p>Coins for stake: {stake}</p>
                                    <p>Mining Rewards: {mineRewards}</p>
                                    <p>Sustainability Rewards: 50</p>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
                <div style={{ width: "100%" }}>
                    <h3 className={classes.heading}>Parts Collection</h3>
                    <PartsList parts={data["parts"]} />
                </div>
            </div>
        ) : (
            <h1
                style={{
                    fontFamily: "Noto Sans",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "35px",
                    textAlign: "center"
                }}
            >
                Sorry, you do not any JLR NFT!
            </h1>
        )
    ) : (
        <div />
    );
    return uiElement;
}

export default MyNFTs;
