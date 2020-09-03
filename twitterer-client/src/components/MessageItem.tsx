import React from 'react';
import DefaultImg from '../images/default-profile-image.jpg';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const MessageItem = (props: any) => (
    <div>
        <li className="list-group-item">
            <img    src={props.profileImgUrl || DefaultImg} 
                    alt={props.username}
                    height="100" width="100"
                    className="timeline-image">
            </img>
            <div className="message-area">
                <Link to="/">@{props.username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {props.date}
                    </Moment>
                </span>
                <p>{props.text}</p>
            </div>
        </li>
    </div>
)
export default MessageItem;