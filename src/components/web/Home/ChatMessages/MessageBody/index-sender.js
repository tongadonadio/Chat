import React, { Component } from "react";
import "./index.css";
import { Col, Row } from "reactstrap";
import { emojify } from "react-emojione";
import MicrolinkCard from "react-microlink";

class MessageBodySender extends Component {
  constructor(props) {
    super(props);

    this.containUrl = this.containUrl.bind(this);
  }

  containUrl(text) {
    let tokens = text.split(/\s/);
    var url = "";
    var content = "";
    tokens.map((token, i) => {
      if (
        token.match(/^http:\//) ||
        token.match(/^https:\//) ||
        token.match(/^www./)
      ) {
        url = token;
      } else {
        content = content + " " + token;
      }
      return content;
    });
    return { content, url };
  }

  containImage(text) {
    let tokens = text.split(/\s/);
    var image = "";
    var content = "";
    tokens.map((token, i) => {
      if (
        token.match(/^data:image\//)
      ) {
        image = token;
      } else {
        content = content + " " + token;
      }
      return content;
    });
    return { content, image };
  }

  render() {
    let contentMessage = this.containUrl(this.props.messageText);
    if (contentMessage["url"]) {
      return (
        <Row className="message-body" key={this.props.messageId}>
          <Col sm="12" className="message-main-sender">
            <div className="message-body-sender pull-right">
              <div className="message-body-text">
                <MicrolinkCard url={contentMessage["url"]} />
                {emojify(this.props.messageText)}
              </div>
              <span className="message-body-time pull-right">
                {this.props.messageDate}
              </span>
            </div>
          </Col>
        </Row>
      );
    } else {
      let contentMessage = this.containImage(this.props.messageText);
      if (contentMessage["image"]) {
        return (
          <Row className="message-body" key={this.props.messageId}>
            <Col sm="12" className="message-main-sender">
              <div className="message-body-sender pull-right">
                <div className="message-body-text">
                  <img src={this.props.messageText} height="150" width="150" alt="Cargando imagen..."/>
                </div>
                <span className="message-body-time pull-right">
                  {this.props.messageDate}
                </span>
              </div>
            </Col>
          </Row>
        );
      } else {
        return (
          <Row className="message-body" key={this.props.messageId}>
            <Col sm="12" className="message-main-sender">
              <div className="message-body-sender pull-right">
                <div className="message-body-text">
                  {emojify(this.props.messageText)}
                </div>
                <span className="message-body-time pull-right">
                  {this.props.messageDate}
                </span>
              </div>
            </Col>
          </Row>
        );
      }
    }
  }
}


export default MessageBodySender;
