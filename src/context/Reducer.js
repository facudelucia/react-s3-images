import { types } from './types';

export const Reducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                user: action.payload
            };
        case types.setImages:
            return {
                ...state,
                images: action.payload
            }
        case types.error:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}