import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "../actions/favoriteAction";
import { favoriteItems } from "../initialValues/favoriteItems";


const initialState={
    favoriteItems:favoriteItems
}

export default function favoriteReducer(state=initialState,{type,payload}) {
    switch (type) {
        case ADD_TO_FAVORITE:
            console.log(payload.id)
            let jobAdvert=state.favoriteItems.find(j=>j.id===payload.id)
            if (jobAdvert===undefined) {
                return{
                    ...state,
                    favoriteItems:[...state.favoriteItems,payload]
                }
            }else{
                return state;
            }
        case REMOVE_FROM_FAVORITE:
            return{
                ...state,
                favoriteItems:state.favoriteItems.filter(j=>j.id!==payload.id)
            }    
        default:
            return state;
    }
}