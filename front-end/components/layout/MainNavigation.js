import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import LoginContext from "../../context/loginContext";
function MainNavigation() {
    const router = useRouter();
    const path = router.pathname;
    const { isLoggedIn, isAdmin } = useContext(LoginContext);
    return (
        <div>
            <header className={classes.header}>
                <img
                    src="/src/logo.PNG"
                    alt="Logo"
                    className={classes.logo}
                />
                <nav>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                            {path == "/" && (
                                <img
                                    src="/src/line.png"
                                    alt="Selected Line"
                                    className={classes.selectedLine}
                                />
                            )}
                        </li>
                        {isLoggedIn && (
                            <li>
                                <Link href="/new-meetup">Explore</Link>
                                {path == "/new-meetup" && (
                                    <img
                                        src="/src/line.png"
                                        alt="Selected Line"
                                        className={classes.selectedLine}
                                    />
                                )}
                            </li>
                        )}
                        {isAdmin && (
                            <li>
                                <Link href="/admin">Admin</Link>
                                {path == "/admin" && (
                                    <img
                                        src="/src/line.png"
                                        alt="Selected Line"
                                        className={classes.selectedLine}
                                    />
                                )}
                            </li>
                        )}

                        <li>
                            <Link href={isLoggedIn ? "/login?sign=out" : "/login?sign=in"}>
                                <a className={classes.getStartedButton}>
                                    {isLoggedIn ? "Sign Out" : "Sign In"}
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default MainNavigation;
