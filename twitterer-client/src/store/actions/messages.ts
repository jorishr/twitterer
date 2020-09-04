import React from 'react';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';
import { apiCall } from '../../services/api';
import { addError } from './error';

//action creator to load messages
export const loadMessages = (messages: any) => ({
    type: LOAD_MESSAGES,
    messages
})

//action creator to delete a message
export const removeMessage = (id: string) => ({
    type: REMOVE_MESSAGE,
    id
})

//api request to load all messages from db
export const fetchMessages = () => {
    return (dispatch: Function) => {
        return apiCall('get', '/api/messages')
            .then(res => {
                dispatch(loadMessages(res));
            })
            .catch(err => addError(err.message));
    }
}

//post new message
export const postNewMessage = (text: string) => (dispatch: Function, getState: Function) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/users/${id}/messages`, { text })
        .then(res => {
            return {}
        })
        .catch(err => dispatch(addError(err.message)));
};

//delete message
export const deleteMessage = (user_id: string, message_id:string) => {
    return (dispatch: Function) => {
        return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)
            .then(() => {
                dispatch(removeMessage(message_id));
            })
            .catch(err => dispatch(addError(err.message)));
    }
}