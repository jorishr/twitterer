import React from 'react';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';
import { apiCall } from '../../services/api';
import { addError } from './error';

//action creator to load messages
export const loadMessages = (messages: any) => ({
    type: LOAD_MESSAGES,
    messages
})

//api request to load all messages from db
export const fetchMessages = () => {
    return (dispatch: Function) => {
        return apiCall('GET', '/api/messages')
            .then(res => {
                dispatch(loadMessages(res));
            })
            .catch(err => addError(err.message));
    }
}