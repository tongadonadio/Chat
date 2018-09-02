import React, { Component } from 'react';
import {
  Col,
  Row,
  ButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import './index.css';
import container from '../../../../core/containers/Home/ChatMessages/HeaderUser';

class UserChat extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.clear();
    this.props.logout();
  }

  render() {
    const {
      user,
      theme,
      dropdownOpen,
      toggle,
      loadThemeLight,
      loadThemeDark
    } = this.props;

    if (user && user.User) {
      return (
        <Row className={'header-user-msg ' + theme + '-header'}>
          <Col id="col-avatar" md="2">
            <div className="header-user-msg-avatar">
              <img src={user.User.photo} alt="avatar" />
            </div>
          </Col>
          <Col id="col-name-chat" md="8">
            <span className="header-user-msg-name">{user.User.name}</span>
            <br />
            <span className="header-user-msg-writing">{user.User.writing}</span>
          </Col>
          <Col md="1">
            <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className="dropdown-theme"
            >
              <DropdownToggle caret>
                <i className="fa fa-gear" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={loadThemeLight}>Tema claro</DropdownItem>
                <DropdownItem onClick={loadThemeDark}>Tema oscuro</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col md="1" className="header-user-logout">
            <i className="fa fa-fw fa-sign-out fa-2x" onClick={this.logout} />
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className={'header-user-msg ' + theme + '-header'}>
          <Col id="col-avatar" md="2" />
          <Col id="col-name-chat" md="8" />
          <Col md="1">
            <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className="dropdown-theme"
            >
              <DropdownToggle caret>
                <i className="fa fa-gear" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={loadThemeLight}>Tema claro</DropdownItem>
                <DropdownItem onClick={loadThemeDark}>Tema oscuro</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col md="1" className="header-user-logout">
            <i className="fa fa-fw fa-sign-out fa-2x" onClick={this.logout} />
          </Col>
        </Row>
      );
    }
  }
}

export default container(UserChat);
