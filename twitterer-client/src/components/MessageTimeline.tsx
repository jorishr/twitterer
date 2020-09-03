import React from 'react';
import { IProps } from '../containers/Main';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = (props: any) => {
    return (
        <div className="row">
            <UserAside profileImgUrl={props.profileImgUrl} username={props.username}/>
            <MessageList />
        </div>
    )
} 

export default MessageTimeline;