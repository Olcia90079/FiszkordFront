export const login = (tokens) => {
    console.log("login action");
    return {
        type: 'LOGIN',
        payload: tokens
    };
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
}

export const setUserGroups = (groups) => {
    return {
        type: 'SET_USER_GROUPS',
    };
}