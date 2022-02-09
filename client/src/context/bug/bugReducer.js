import {
    GET_BUGS,
    GET_BUG,
    DELETE_BUG,
    SEARCH_BUGS,
    ADD_BUG,
    MODIFY_BUG,
    BUG_ERROR,
    CLEAR_ERRORS,
    CLEAR_BUGS,
    SET_LOADING
} from '../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_BUGS:
            return {
                ...state,
                bugs: action.payload,
                loading: false,
            };
        case GET_BUG:
            return {
                ...state,
                bug: action.payload,
                loading: false,
            };
        case DELETE_BUG:
            return {
                ...state,
                bugs: state.bugs.filter((bug) => bug._id !== action.payload),
            };
        case SEARCH_BUGS:
            return {
                ...state,
                bugs: action.payload,
                loading: false,
            };
        case ADD_BUG:
            return {
                ...state,
                bugs: [action.payload, ...state.bugs],
            };
        case MODIFY_BUG:
            return {
                ...state,
                bugs: state.bugs.map((bug) => 
                    bug._id === action.payload._id ? action.payload : bug
                ),
                bug: action.payload,
            };
        case BUG_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case CLEAR_BUGS:
            return {
                bugs: [],
                bug: {},
                error: null,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
