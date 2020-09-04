import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = (props: any) => {
    return (
        <div className="row">
            <UserAside profileImgUrl={props.profileImgUrl} username={props.username}/>
            <MessageList {...props}/>
        </div>
    )
} 

export default MessageTimeline;