const ACTIONS = {
    UPDATE: 0,
}

const initial = {
    username: '',
    password: '',
}

const updateLoginField = (field, value) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.UPDATE,
            field,
            value
        });
    }
}

const reducer = (state = initial, action) => {
    const { type } = action;
    if (type === ACTIONS.UPDATE) {
        const { field, value } = action;
        return {
            ...state,
            [field]: value,
        }
    }
    return state;
}

export { updateLoginField };
export default reducer;