import JSONCards from "../components/ui/JsonCards";
import classes from "../components/ui/Card.module.css";
import { useState, useContext, useEffect } from "react";
import LoginContext from "../context/loginContext";

function BlockChain(props) {
    const [data, setData] = useState(null);
    const { port } = useContext(LoginContext);
    const restURL = "http://localhost:" + port + "/blockchain";
    console.log(restURL);
    useEffect(() => {
        if(port){
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
        <div>
            <h1 className={classes.heading}>Blockchain</h1>
            <JSONCards data={data}/>
        </div>
    ) : (
        <div />
    ); 

    return uiElement;
}

export default BlockChain;
