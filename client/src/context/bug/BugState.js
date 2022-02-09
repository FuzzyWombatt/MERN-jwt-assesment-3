import React, { useReducer } from 'react';
import axios from 'axios';

import BugContext from './bugContext';
import bugReducer from './bugReducer';
import {
    GET_BUG,
    GET_BUGS,
    SEARCH_BUGS,
    DELETE_BUG,
    ADD_BUG,
    MODIFY_BUG,
    BUG_ERROR,
    CLEAR_BUGS,
    SET_LOADING
} from '../types';

const BugState = (props) => {
    const initialState = {
        bugs: [],
        bug: {},
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(bugReducer, initialState);

    const getBugs = async () => {
        try {
            setLoading();
            const res = await axios.get(`http://localhost:5000/api/bugs`);

            dispatch({ type: GET_BUGS, payload: res.data });
        } catch (err) {
            dispatch({ type: BUG_ERROR, payload: err.response.msg });
        }
    };

    const searchBugs = async (text) => {
        setLoading();
        const res = await axios.get(
            `http://localhost:5000/api/bugs?title=${text}`,
        );

        dispatch({ type: SEARCH_BUGS, payload: res.data });
    };

    const getBug = async (id) => {
        try {
            setLoading();
            const res = await axios.get(`http://localhost:5000/api/bugs/${id}`);

            dispatch({ type: GET_BUG, payload: res.data.bug });
        } catch (err) {
            dispatch({ type: BUG_ERROR, payload: err.response.msg });
        }
    };

    const deleteBug = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/bugs/${id}`,
            );
            //just go get rid or warning
            console.log(res);

            dispatch({ type: DELETE_BUG, payload: id });
        } catch (err) {
            dispatch({ type: BUG_ERROR, payload: err.response.msg });
        }
    };

    const addBug = async (obj) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/bugs`, obj);

            dispatch({ type: ADD_BUG, payload: res.data });
        } catch (err) {
            dispatch({ type: BUG_ERROR, payload: err.response.msg });
        }
    };

    const modifyBug = async (obj, id) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/bugs/${id}`,
                obj,
            );

            dispatch({ type: MODIFY_BUG, payload: res.data });
        } catch (err) {
            dispatch({ type: BUG_ERROR, payload: err.response.msg });
        }
    };

    const clearBugs = () => {
        dispatch({ type: CLEAR_BUGS })
    };

    const setLoading = () => dispatch({ type: SET_LOADING })

    return (
        <BugContext.Provider
            value={{
                bugs: state.bugs,
                bug: state.bug,
                error: state.error,
                loading: state.loading,
                deleteBug,
                addBug,
                modifyBug,
                getBug,
                searchBugs,
                getBugs,
                clearBugs,
            }}>
            {props.children}
        </BugContext.Provider>
    );
};

export default BugState;
