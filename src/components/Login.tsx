import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";
import { User } from "../model/Model";
import history from '../utils/history';

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void; //function to pass the user to the parent component
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccessfull: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccessfull: false,
  };
  
  private setUserName(event: CustomEvent) {
    this.setState({
      userName: event.target.value,
    });
  }

  private setUserPassword(event: CustomEvent) {
    this.setState({
      password: event.target.value,
    });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({
      loginAttempted: true,
    });
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      this.setState({
        loginSuccessfull: true,
      });
      this.props.setUser(result); //passing the user to App
      history.push('/profile');
    } else {
      this.setState({
        loginSuccessfull: false,
      });
    }
  }

  render() {
    let loginMessage: any;
    if (this.state.loginAttempted) {
      if (this.state.loginSuccessfull) {
        loginMessage = <label>Login Successfull!</label>;
      } else {
        loginMessage = <label>Login failed!</label>;
      }
    }

    return (
      <div>
        <h1>Please login</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            onChange={(e) => this.setUserName(e)}
            type="text"
            value={this.state.userName}
          />
          <br />
          <br />
          <input
            onChange={(e) => this.setUserPassword(e)}
            type="password"
            value={this.state.password}
          />
          <br />
          <br />
          <input type="submit" value="Login" />
        </form>
        {loginMessage}
      </div>
    );
  }
}
