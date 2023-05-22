import classes from "./PartCard.module.css";

function PartCard(props) {
    const { id, name, str, verified } = props;
    console.log(id, name, str, verified )
    const imgSrc = "/src/" + str + ".PNG";
    const verifSrc = verified ? "/src/tick.png" : "/src/cross.png";
    return (
        <div
            key={id}
            className={classes.partCard}
        >
            <p>{id}</p>
            <img
                src={imgSrc}
                alt="PartImage"
                className={classes.partImage}
            />
            <p>{name}</p>
            <img
                src={verifSrc}
                alt="CheckImage"
                className={classes.check}
            />
        </div>
    );
}

export default PartCard;
