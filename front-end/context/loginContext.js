import React from "react";

// create a react context with a logical state and toggle function
const LoginContext = React.createContext({
    isAdmin: false,
    isLoggedIn: false,
    restPort: 0,
    login: () => {},
    setLoginState: () => {},
});
const loginIDs = {
    node1: ["pass1", 5001],
    node2: ["pass2", 5002],
    node3: ["pass3", 5003],
    node4: ["pass4", 5004],
    node5: ["pass5", 5005],
};

// define and export a function to provide a dark mode context
export function LoginContextProvider(props) {
    // define the state and set function
    const [loginState, setLoginState] = React.useState({
        isAdmin: false,
        isLoggedIn: false,
        restPort: 0,
    });
    const setState = (data) => {
        //const userData = JSON.parse(sessionStorage.getItem("userData"));
        window.sessionStorage.setItem("userData", JSON.stringify(data));
        setLoginState(data);
    };
    // define a method to toggle the state of the mode
    const login = (username, password) => {
        if (loginIDs[username] && loginIDs[username][0] == password) {
            const port = loginIDs[username][1];
            if (username == "node1" || username == "node2") {
                setState({ isAdmin: true, isLoggedIn: true, port: port });
            } else {
                setState({ isAdmin: false, isLoggedIn: true, port: port });
            }
        } else {
            setState({ isAdmin: false, isLoggedIn: false, port: 0 });
        }
    };

    // store the context state and toggle
    const context = {
        isAdmin: loginState.isAdmin,
        isLoggedIn: loginState.isLoggedIn,
        port: loginState.port,
        login: login,
        setLoginState: setLoginState,
    };

    return <LoginContext.Provider value={context}>{props.children}</LoginContext.Provider>;
}

// export the context
export default LoginContext;
