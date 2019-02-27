// a reducer is a function that returns an objec
// --or a piece of state to the rootReducer
// this reducer will manage user data/ name, token et al
// use action.type to change a reducer

export default (state = [], action) => {
    // signature takes state, which defaults to []
    console.log(action)
    if ((action.type === "AUTH_ACTION") || (action.type === "LOGIN_ACTION")) {
        console.log(action.payload.data)
        return action.payload.data
    } else if (action.type === "LOGOUT") {
        return []
    } else {
        return state
    }
}