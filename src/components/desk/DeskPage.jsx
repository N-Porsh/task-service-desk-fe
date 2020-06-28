import React from "react";
import {Columns, Modal, Section, Heading} from "react-bulma-components/lib";
import DeskForm from "./DeskForm";
import TicketsTable from "./TicketsTable";
import {api} from '../../config';
import axios from 'axios';
import OpenModal from "../OpenModal";
import {withRouter} from "react-router-dom";
import NotificationBox from "../NotificationBox";

class DeskPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            response: null,
            sortBy: '',
            sortDirection: 'ASC'
        }
    }

    componentDidMount() {
        this.getAllTickets();
    }

    toggleSort = (sortBy) => {
        const dir = this.state.sortDirection === 'ASC' ? 'DESC' : 'ASC';
        this.setState({
            sortBy: sortBy,
            sortDirection: dir
        })
        this.props.history.push(`/?sortBy=${sortBy}&sortDirection=${this.state.sortDirection}`)

        this.getAllTickets();
    };

    appendSorting = (sortBy = 'id', dir = 'ASC') => {
        const params = new URLSearchParams(window.location.search);
        sortBy = params.get('sortBy') || sortBy;
        dir = params.get('sortDirection') || dir;
        return `sortBy=${sortBy}&sortDirection=${dir}`
    };

    getAllTickets = async () => {
        try {
            const sorting = this.appendSorting();
            const response = await axios.get(`${api}/tickets?${sorting}`);
            await this.setState({tickets: response.data})
        } catch (e) {
            console.log("Error:", e);
        }
    };

    createTicket = async ticket => {
        try {
            const response = await axios.post(`${api}/tickets`, ticket);
            this.setState({response: response})
            if (response.status !== 201) {
                console.log("error", response.data);
                return;
            }
            this.getAllTickets();
        } catch (e) {
            console.log("Error:", e);
        }
    };

    render() {
        return (
            <>
                <Columns>
                    <Columns.Column size={5}>
                        <OpenModal buttonName={"New Ticket"} modal={{closeOnBlur: true, showClose: false}}>
                            <Modal.Content>
                                <Section style={{backgroundColor: 'white'}}>
                                    <Heading size={4}>Create new ticket</Heading>
                                    <DeskForm createTicket={this.createTicket}/>
                                    <NotificationBox data={this.state.response}/>
                                </Section>
                            </Modal.Content>
                        </OpenModal>
                    </Columns.Column>
                </Columns>

                <TicketsTable toggleSortDirection={this.toggleSort}
                              tickets={this.state.tickets}/>
            </>
        );
    }
}

export default withRouter(DeskPage);