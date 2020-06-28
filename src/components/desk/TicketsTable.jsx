import React from "react";
import {Table, Heading} from "react-bulma-components/dist";
import {Link} from "react-router-dom";
import './TicketsTable.css';

const TicketsTable = (props) => {
    return (
        <>
            <Heading size={4}>Tickets</Heading>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>E-mail</th>
                    <th><span onClick={() => props.toggleSortDirection('status')}>Status ⇅</span></th>
                    <th><span onClick={() => props.toggleSortDirection('priority')}>Priority ⇅</span></th>
                    <th><span onClick={() => props.toggleSortDirection('created')}>Date Created ⇅</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    props.tickets.map(
                        ticket =>
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.email}</td>
                                <td>{ticket.status}</td>
                                <td>{ticket.priority}</td>
                                <td>{ticket.created}</td>
                                <td>
                                    <Link data-id={ticket.id} className="is-info button"
                                          to={`ticket/${ticket.id}`}>Edit</Link>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </Table>
        </>
    );
};


export default TicketsTable;