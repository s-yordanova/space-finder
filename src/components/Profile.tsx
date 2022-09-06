import React from "react";
import { Link } from "react-router-dom";
import { User, UserAttributes } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface ProfileState {
  userAttributes: UserAttributes[];
}

interface ProfileProps {
  user: User | undefined;
  authService: AuthService;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    userAttributes: []
  }

  async componentDidMount(){
    if(this.props.user){
      const userAttr = await this.props.authService.getUserAttributes(this.props.user);
      this.setState({
        userAttributes: userAttr
      });
    }
  }

  private renderUserAttributes() {
    const rows = [];
    for (const user of this.state.userAttributes) {
      rows.push(<tr key={user.Name}>
        <td>{user.Name}</td>
        <td>{user.Value}</td>
      </tr>)
    }
    return <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  render() {
    let profileSpace;
    if (this.props.user) {
      profileSpace = (
        <div>
          <h3>Hello {this.props.user.userName}</h3>
          Here are your information:
          {this.renderUserAttributes()}
        </div>
      );
    } else {
      profileSpace = (
        <div>
          Please <Link to="/login">Login </Link>!
        </div>
      );
    }

    return <div>{profileSpace}</div>;
  }
}
