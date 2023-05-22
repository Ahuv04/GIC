
import JSONCards from "../components/ui/JsonCards";
import classes from "../components/ui/Card.module.css"
function BlockChain(props) {
    
    return (
        <div>
            <h1 className={classes.heading}>Blockchain</h1>
            <JSONCards />
        </div>
        );
}

export default BlockChain;