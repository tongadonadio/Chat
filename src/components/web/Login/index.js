import React, { Component } from "react";
import { Container, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./index.css";
import img from "../../../img/upload-img.png";
import container from "../../core/containers/Login"
import { withMessageHandlers } from "../../../../src/containers/Message/hocs";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUser: img,
      username: ""
    };
    sessionStorage.setItem("imageUser", img);

    this.login = this.login.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({ target: { value: username } }) => {
    this.setState({ username });
  };

  login = ({ addUser, data }) => {
    sessionStorage.setItem("username", this.state.username);

    if (data && data.allUsers && data.allUsers[0]) {
      sessionStorage.setItem("userId", data.allUsers[0].id);
      this.props.modifyUsersConversation(data.allUsers[0].id, 0);
    } else {
      const promiseUser = addUser({
        variables: {
          name: this.state.username,
          photo: this.state.imgUser,
          date: new Date().toLocaleString()
        }
      });
      promiseUser.then(response => {
        sessionStorage.setItem("userId", response.data.createUser.id);
        this.props.modifyUsersConversation(response.data.createUser.id, 0);
      }
      );
    }
    
    this.props.history.push("/home");
  };

  imageUpload(e) {
    const file = e.target.files[0];
    this.getBase64(file).then(base64 => {
      sessionStorage["imageUser"] = base64;
      this.setState({ imgUser: base64 });
    });
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  handleKeyPress(addUser, client, e) {
    if (e.key === "Enter") {
      const { data } = client.query({
        query: this.getUser,
        variables: { userName: this.state.username }
      });
      this.login({ addUser, data });
    }
  }

  render() {

    const { addUser, getUser, client } = this.props;

    return (
      <Container className="justify-content-center align-self-center">
        <Col md={{ offset: 3, size: "6" }} className="container-login">
          <Card className="card-container">
            <CardHeader>Login</CardHeader>
            <CardBody>
              <div className="container-image-login">
                <Label for="file-input">
                  <img
                    className="profile-img-card"
                    src={this.state.imgUser}
                    alt="user"
                  />
                </Label>
                <Input
                  id="file-input"
                  type="file"
                  onChange={this.imageUpload}
                />
              </div>
              <Form>
                <FormGroup>
                  <Label> Usuario </Label>
                  <Input
                    placeholder="Ingresar usuario"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onKeyPress={e => {
                      this.handleKeyPress(addUser, client, e);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    color="primary"
                    onClick={async () => {
                      const { data } = await client.query({
                        query: getUser,
                        variables: { userName: this.state.username }
                      });

                      this.login({ addUser, data });
                    }}
                    block
                  >
                    Login
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    );
  }
}

export default withMessageHandlers(container(Login));
