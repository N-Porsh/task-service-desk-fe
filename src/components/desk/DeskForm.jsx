import {Control, Textarea, Field, Input, Label, Select} from "react-bulma-components/lib/components/form";
import {Button} from "react-bulma-components/lib";
import React from "react";
import ErrorBox from "../ErrorBox";
import {priorities} from "../../config/constants"


class DeskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            email: '',
            description: '',
            priority: '',
            priorities: priorities,
            titleError: '',
            emailError: '',
            priorityError: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let ticket = {
            title: this.state.title,
            email: this.state.email,
            description: this.state.description,
            priority: this.state.priority
        };

        if (this.state.titleError === "" &&
            this.state.emailError === "" &&
            this.state.priorityError === "") {
            this.props.createTicket(ticket);
        }
    }

    handleChange = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    validateInput = (e) => {
        let name = e.target.name;
        let val = e.target.value;

        if (name === 'title') {
            const errResult = !val || val.trim().length < 3 ? 'Min 3 characters!' : '';
            this.setState({titleError: errResult});
        }
        if (name === 'email') {
            // eslint-disable-next-line
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const emailValid = re.test(String(val).toLowerCase());

            const errResult = !emailValid ? 'Valid email required!' : '';
            this.setState({emailError: errResult});
        }

        if (name === 'priority') {
            const errResult = val !== "" ? '' : 'Priority must be selected!';
            this.setState({priorityError: errResult});
        }
    }

    render() {
        const {title, email, description, priority, titleError, emailError, priorityError} = this.state;
        const isEnabled = title !== "" && email !== "" && priority !== "" && titleError === "" && emailError === "" && priorityError === "";
        return (
            <>
                <Field>
                    <Label>Title*</Label>
                    <Control>
                        <Input name="title" value={title}
                               className={titleError ? "is-danger" : ''}
                               onChange={this.handleChange} onKeyUp={this.validateInput}
                               placeholder="Ticket title"/>
                        <ErrorBox error={titleError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>E-mail*</Label>
                    <Control>
                        <Input name="email" type="email" value={email}
                               className={emailError ? "is-danger" : ''}
                               onChange={this.handleChange}
                               onKeyUp={this.validateInput}
                               placeholder="E-mail address"/>
                        <ErrorBox error={emailError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Select Priority*</Label>
                    <Control>
                        <Select name="priority" className={priorityError ? "is-danger" : ''}
                                onChange={this.handleChange} onBlur={this.validateInput} value={priority}>
                            <option value="">Select priority</option>
                            {
                                this.state.priorities.map(
                                    priority =>
                                        <option key={priority} value={priority}>
                                            {priority}
                                        </option>
                                )
                            }
                        </Select>
                        <ErrorBox error={priorityError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Description</Label>
                    <Control>
                        <Textarea name="description" value={description}
                                  onChange={this.handleChange}
                                  placeholder="Describe your issue"/>
                    </Control>
                </Field>

                <Field>
                    <Control>
                        <Button type="primary" disabled={!isEnabled}
                                className="is-primary"
                                onClick={this.handleSubmit}
                        >Create ticket</Button>
                    </Control>
                </Field>
            </>
        );
    }
}

export default DeskForm;