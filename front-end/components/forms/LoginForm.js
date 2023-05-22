import { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import Card from "../ui/Card";
import classes from "./LoginForm.module.css";
import LoginContext from "../../context/loginContext";
import { useRouter } from "next/router";

function LoginForm(props) {
    const { param } = props;
    const usernameRef = useRef();
    const passwordRef = useRef();

    const { isLoggedIn, login } = useContext(LoginContext);
    const router = useRouter();
    const [wrongPass, setWrongPass] = useState(false);
    // pick up the view mode used previously
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
        if (param == "out") {
            login("", "");
        }
    }, [isLoggedIn, param]);

    function submitHandler(event, setWrongPass) {
        event.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        login(username, password);

        if (!isLoggedIn) {
            setWrongPass(true);
        }
    }
    return (
        <Card>
            <form
                className={classes.form}
                onSubmit={(evt) => {
                    submitHandler(evt, setWrongPass);
                }}
            >
                <div className={classes.textcls}>
                    <text> Login to ChainRover </text>
                </div>
                <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        required
                        id="username"
                        ref={usernameRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        required
                        id="password"
                        ref={passwordRef}
                    />
                </div>
                {wrongPass && (
                    <div className={classes.errorState}>
                        <text>** The username, password you entered is incorrect.</text>
                    </div>
                )}
                <div className={classes.actions}>
                    <button>Login</button>
                </div>
            </form>
        </Card>
    );
}

export default LoginForm;
