import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bulma-components/lib';

class OpenModal extends React.Component {
    static propTypes = {
        modal: PropTypes.object,
        children: PropTypes.node.isRequired,
    }

    static defaultProps = {
        modal: {},
    }

    state = {
        show: false,
    }

    open = () => this.setState({show: true});
    close = () => this.setState({show: false});

    render() {
        return (
            <div>
                <Button id="openModal" className="is-info" onClick={this.open}>{this.props.buttonName}</Button>
                <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                    {this.props.children}
                </Modal>
            </div>
        );
    }
}

export default OpenModal;