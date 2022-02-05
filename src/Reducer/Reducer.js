export default function AppReducer(state, action){
    switch(action.type){
        case "CURRENT_USER":
            return {...state, user: action.payload}
        case "CURRENT_PLACE":
            return {...state, place: action.payload}
    }
}