import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import container from '../../../../core/containers/Home/ChatList/UsersList';
import { withMessageHandlers } from '../../../../../containers/Message/hocs';
import './index.css';

const connected = (
  <span className="indicator text-success user-list-position-state">
    <i className="fa fa-fw fa-circle" />
  </span>
);

const disconnected = (
  <span className="indicator text-danger user-list-position-state">
    <i className="fa fa-fw fa-circle" />
  </span>
);

class Home extends Component {
  manageResponsive() {
    /*if (document.getElementById('ChatMessages').offsetHeight === 0) {
      document.getElementById('Home').style.display = "none";
      document.getElementById('ChatMessages').style.display = "block";
    }*/
  };

  render() {
    const {
      users,
      theme,
      loading,
      error,
      modifyUsersConversation
    } = this.props;

    return (
      <Row className={'users-list-sidebar ' + theme + '-body'}>
        {loading ? <p>Cargando...</p> : null}
        {error ? <p>Ha ocurrido un error</p> : null}

        {!loading &&
          !error &&
          users.allUsers.map(({ id, name, photo, lastActivity, state }) => (
            <Row
              className="user-list-sidebar-body"
              key={id}
              onClick={e => {
                modifyUsersConversation(sessionStorage.getItem('userId'), id);
                this.manageResponsive();
              }}
            >
              <Col md="3" id="col-user-avatar">
                <div className="user-list-avatar">
                  <img src={photo} alt="avatar" />
                  {state === 'Conectado' && connected}
                  {state === 'Desconectado' && disconnected}
                </div>
              </Col>
              <Col md="9" id="col-user-information">
                <Row>
                  <Col md="8" id="col-user-information-name">
                    <span>{name}</span>
                  </Col>
                  <Col md="4" id="col-user-information-time">
                    <span className="user-list-time pull-right">
                      {lastActivity}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
      </Row>
    );
  }
}

export default withMessageHandlers(container(Home));
