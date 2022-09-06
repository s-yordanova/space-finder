import React from "react";
import './spaceComponent.css';

interface SpaceComponentProps {
  spaceId: string;
  name: string;
  location: string;
  photoUrl?: string;
  reserveSpace: (spaceId: string) => void; //function callback to reserve the space
}

export class SpaceComponent extends React.Component<SpaceComponentProps> {
    private renderImage(){
      const logo =  require("../../assets/proj2.jpg")
        if (this.props.photoUrl){
            return <img src={this.props.photoUrl} alt="" />
        } else {
            return <img src={logo} alt="" />
        }
    }
  render() {
    return (
      <div className="spaceComponent">
        {this.renderImage()}
        <label className="name" htmlFor="">{this.props.name}</label> <br />
        <label className="spaceId" htmlFor="">{this.props.spaceId}</label> <br />
        <label className="location" htmlFor="">{this.props.location}</label> <br />
        <button onClick={() => this.props.reserveSpace(this.props.spaceId)}>
          Reserve
        </button>
      </div>
    );
  }
}
