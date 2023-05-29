import { QrReader } from "react-qr-reader";
import classes from "./LoginForm.module.css";
import { useRef, useState, useContext } from "react";
import Card from "../ui/Card";
import PartsList from "../ui/PartsLists";
import LoginContext from "../../context/loginContext";

const MyForm = () => {
    const [tstype, setType] = useState("validate");
    const [jsonData, setJsonData] = useState(null);
    const [result, setResult] = useState(null);

    const { port } = useContext(LoginContext);
    const ttypeRef = useRef();
    const changeRef = (evt) => {
        setType(ttypeRef.current.value);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();

        let restURL = "http://localhost:" + port;

        const type = ttypeRef.current.value;

        if (type == "ownership") {
            restURL = restURL + "/transaction";
        } else {
            restURL = restURL + "/verifyParts";
        }

        // Make the POST request here
        // Example using fetch:
        fetch(restURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
                if (type == "validate") {
                    setResult(data);
                } else {
                    setResult(jsonData);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onResFunc = (result, error) => {
        if (!!result) {
            const json = JSON.parse(result?.text);

            console.log(json);
            setJsonData(json);
        }

        if (!!error) {
        }
    };

    return (
        <Card>
            {!result ? (
                <form
                    className={classes.form}
                    onSubmit={handleFormSubmit}
                >
                    <div className={classes.textcls}>
                        <p>
                            {tstype == "validate"
                                ? "Validate parts for customers"
                                : "Give ownership to customer"}
                        </p>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="select">Transaction type:</label>
                        <select
                            required
                            id="ttype"
                            ref={ttypeRef}
                            onChange={changeRef}
                        >
                            <option value="validate">Validate Parts</option>
                            <option value="ownership">Give Ownership</option>
                        </select>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="qr">{jsonData ? "Parts Data" : "Scan RFID/QR:"}</label>
                        {jsonData ? (
                            <pre id="qr">
                                {JSON.stringify(
                                    jsonData,
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
                        ) : (
                            <div style={{ marginTop: "-10%", marginBottom: "-10%" }}>
                                <QrReader
                                    delay={300}
                                    onResult={onResFunc}
                                    id="qr"
                                    style={{ width: "50%" }}
                                />
                            </div>
                        )}
                    </div>
                    <div className={classes.actions}>
                        <button>Submit</button>
                    </div>
                </form>
            ) : (
                <div style={{ width: "100%", marginTop: "10%" }}>
                    <h3 className={classes.heading}>
                        {tstype == "validate"
                            ? "Validated Parts"
                            : "Added following parts to the owner's NFT"}
                    </h3>
                    <PartsList
                        parts={result.parts}
                        owner={result.owner}
                    />
                </div>
            )}
        </Card>
    );
};

export default MyForm;
