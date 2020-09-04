import React, { useState } from 'react';
import { connect } from "react-redux";
import { postNewMessage } from '../store/actions/messages';

export function MessageForm(props:any ){
    console.log("Form props", props)
    const [ messageState, setMessageState ] = useState({ message: '' });
    const handleNewMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("message state", messageState)
        props.postNewMessage(messageState.message);
        setMessageState({ message: "" });
        props.history.push("/");
    }
    return (
        <form onSubmit={handleNewMessage}>
            {props.errors && (
                <div className="alert alert-danger">
                    {props.errors.message}
                </div>
            )}
            <input
                type="text" className="form-control"
                value={messageState.message}
                onChange={e => setMessageState({ message: e.target.value })}
            />
            <button type="submit" className="btn btn-success">
                Add my message!
            </button>
        </form>
    )
}

function mapStateToProps(state: any) {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);