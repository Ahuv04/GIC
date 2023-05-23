import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { useRouter } from "next/router";
import LoginContext from "../../context/loginContext";
import { useContext, useEffect } from "react";

function Layout(props) {
    const { isLoggedIn, setLoginState } = useContext(LoginContext);

    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = JSON.parse(window.localStorage.getItem("userData"));
            // localStorage.setItem("userData", JSON.stringify(data));
            if (userData && userData.port && !isLoggedIn) {
                setLoginState(userData);
            }
        } else if (
            router.isReady &&
            router.pathname != "/" &&
            router.pathname != "/login" &&
            !isLoggedIn
        ) {
            console.log(isLoggedIn);
            router.push("/");
        }
    }, [router, isLoggedIn, setLoginState]);
    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;
