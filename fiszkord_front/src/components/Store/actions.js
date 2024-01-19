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

export const setGroup = (id) => {
    return {
        type: 'SET_GROUP',
        payload: id
    };
}

export const setSubject = (id) => {
    return {
        type: 'SET_SUBJECT',
        payload: id
    };
}

export const setUserGroups = (groups) => {
    return {
        type: 'SET_USER_GROUPS',
    };
}