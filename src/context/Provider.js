import { useReducer } from 'react';
import { Context } from './Context';
import { Reducer } from './Reducer';
import AWS from 'aws-sdk'
import { types } from './types';

export const Provider = ({ children }) => {

    const initialState = {
        images: [],
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined,
        error: false
    }

    const [state, dispatch] = useReducer(Reducer, initialState);

    const login = (user) => {
        const action = { type: types.login, payload: user }
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action);
    }

    const listImages = () => {
        if (initialState.user) {
            AWS.config.update({
                accessKeyId: initialState.user.accessKey,
                secretAccessKey: initialState.user.secretKey
            })
            const s3 = new AWS.S3({
                params: { Bucket: initialState.user.bucketName },
                region: initialState.user.region,
            })
            const params = {
                Bucket: initialState.user.bucketName,
            };
            s3.listObjects(params, function (err, data) {
                if (err) {
                    toggleError(true)
                } else {
                    const action = { type: types.setImages, payload: data.Contents }
                    dispatch(action);
                }
            });
        }
    }

    const toggleError = (error) => {
        const action = { type: types.error, payload: error }
        dispatch(action)
    }

    return (
        <Context.Provider value={{
            ...state,
            login,
            listImages,
            toggleError
        }}>
            {children}
        </Context.Provider>
    );
}