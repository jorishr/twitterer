import React from 'react';
import { IProps } from '../containers/Main';
import MessageList from '../containers/MessageList';

const MessageTimeline = (props: IProps) => {
    return (
        <div className="row">
            <MessageList />
        </div>
    )
} 

export default MessageTimeline;