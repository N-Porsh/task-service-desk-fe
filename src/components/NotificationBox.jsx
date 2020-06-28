import React from "react";
import {Notification} from "react-bulma-components/lib";

const NotificationBox = props => {
    if (props.data !== null) {
        const {status, message} = props.data;
        if (status >= 200 && status < 300) {
            return <Notification color={status === 201 ? 'success' : 'info'}>
                {typeof message === 'string' ? message : 'Success'}
            </Notification>
        }

        return <Notification color='danger'>
            {message}
        </Notification>
    }
    return null;
};

export default NotificationBox;