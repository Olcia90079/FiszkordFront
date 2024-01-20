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

export const setSubject = (sub) => {
    return {
        type: 'SET_SUBJECT',
        payload: sub
    };
}

export const setDeck = (deck) => {
    return {
        type: 'SET_DECK',
        payload: deck
    };
}

export const setUserGroups = (groups) => {
    return {
        type: 'SET_USER_GROUPS',
    };
}