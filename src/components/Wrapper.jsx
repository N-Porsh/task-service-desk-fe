import React, {Component} from 'react';
import {Container, Section} from 'react-bulma-components/dist';
import {Route, Switch, Redirect} from 'react-router-dom'
import Navbar from "./navbar/Navbar";
import DeskPage from "./desk/DeskPage";
import NotFoundPage from "./NotFoundPage";
import TicketDetails from "./desk/TicketDetails";

class Wrapper extends Component {

    render() {
        return (
            <Container>
                <Navbar/>
                <Section>
                    <Switch>
                        <Route exact path="/" render={() => <DeskPage {...this.state} />}/>
                        <Route exact path="/ticket/:id" component={TicketDetails} />
                        <Route exact path="/404" component={NotFoundPage} />
                        <Redirect to={"/404"}/>
                    </Switch>
                </Section>
            </Container>
        );
    }
}

export default Wrapper;
