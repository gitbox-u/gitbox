const ACTIONS = {
    UPDATE: 0,
    AUTH: 1,
};

const initial = {
    username: '',
    password: '',

    loggedIn: false,
    isAdmin: false,
};

const updateLoginField = (field, value) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.UPDATE,
            field,
            value
        });
    }
};

const tryLogin = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.AUTH,
        });
    }
}

const loginReducer = (state = initial, action) => {
    const { type } = action;
    if (type === ACTIONS.UPDATE) {
        const { field, value } = action;
        return {
            ...state,
            [field]: value,
        }
    } else if (type === ACTIONS.AUTH) {
        const { username, password } = state;

        if (username === "user" && password === "user") {
            return {
                ...state,
                loggedIn: true,
                isAdmin: false,
            }
        } else if (username === "admin" && password === "admin") {
            return {
                ...state,
                loggedIn: true,
                isAdmin: true,
            }
        }
    }
    return state;
};

export { updateLoginField, tryLogin };
export default loginReducer;