import React from "react";

const ErrorBox = props => {
    if (props.error !== '') {
        return <p className="help is-danger">{props.error}</p>;
    }
    return '';
};

export default ErrorBox;