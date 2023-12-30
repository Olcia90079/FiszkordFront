export const login = () => {
    console.log("login action");
    return {
        type: 'LOGIN'
    };
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
}
