import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';
//to render all message retrieved from databse with Redux and API call
//related action defined in messages.ts

const MessageList = (props: any) => {
    //when component mounts, fetch all messages
    useEffect(() => {
        props.fetchMessages();
    },[])
    console.log("Message List Props", props)
    const { messages } = props;
    let messageList = messages.map((m: any) => (
        <MessageItem 
            key={m._id}
            date={m.data}
            text={m.text}
            username={m.user.username}
            profileImgUrl={m.user.profileImgUrl}
        />
    ))
    return (
        <div className="row col-sm-8">
            <div className="offset-1 col-sm-10">
                <ul className="list-group" id="messages">
                    {messageList}
                </ul>
            </div>
        </div>
    )
}

function mapStateToProps(state: any){
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, { fetchMessages })(MessageList);