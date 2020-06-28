import {Control, Textarea, Field, Input, Label, Select} from "react-bulma-components/lib/components/form";
import {Button, Heading} from "react-bulma-components/lib";
import React from "react";
import ErrorBox from "../ErrorBox";
import axios from "axios";
import {api} from "../../config";
import {priorities, statuses} from "../../config/constants"

class TicketDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            email: '',
            description: '',
            priority: '',
            priorities: priorities,
            status: '',
            statuses: statuses,
            titleError: '',
            emailError: '',
            priorityError: '',
            statusError: '',
        }
    }

    componentDidMount() {
        this.getTicket();
    }

    getTicket = async () => {
        try {
            const response = await axios.get(`${api}/tickets/${this.props.match.params.id}`);
            await this.setState(response.data);
        } catch (e) {
            if (e.response.status === 404) {
                this.props.history.push("/404");
            }
            console.log("Error:", e);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let ticket = {
            title: this.state.title,
            email: this.state.email,
            description: this.state.description,
            priority: this.state.priority,
            status: this.state.status,
        };

        if (this.state.titleError === "" &&
            this.state.emailError === "" &&
            this.state.priorityError === "" &&
            this.state.statusError === "") {
            this.updateTicket(ticket);
            window.location.href = "/";
            //this.props.history.push("/")
        }
    }

    updateTicket = async ticket => {
        try {
            const id = this.props.match.params.id;
            const response = await axios.put(`${api}/tickets/${id}`, ticket);
            if (response.status !== 200) {
                console.log("error", response.data);
            }
        } catch (e) {
            console.log("Error:", e);
        }
    };

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

        if (name === 'status') {
            const errResult = val !== "" ? '' : 'Status must be selected!';
            this.setState({statusError: errResult});
        }
    }

    render() {
        const {title, email, description, priority, status, titleError, emailError, priorityError, statusError} = this.state;
        const isEnabled = title !== "" && email !== "" && priority !== "" && titleError === "" && emailError === "" && priorityError === "";
        return (
            <>
                <Heading size={4}>Ticket ID: {this.props.match.params.id}</Heading>
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
                    <Label>Change Status*</Label>
                    <Control>
                        <Select name="status" className={statusError ? "is-danger" : ''}
                                onChange={this.handleChange} onBlur={this.validateInput} value={status}>
                            <option value="">Change status</option>
                            {
                                this.state.statuses.map(
                                    status =>
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                )
                            }
                        </Select>
                        <ErrorBox error={statusError}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button type="primary" disabled={!isEnabled}
                                className="is-primary"
                                onClick={this.handleSubmit}
                        >Update ticket</Button>
                    </Control>
                </Field>
            </>
        );
    }
}

export default TicketDetails;