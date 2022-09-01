import React from "react";

interface SpaceComponentProps {
  spaceId: string;
  name: string;
  location: string;
  photoUrl?: string;
  reserveSpace: (spaceId: string) => void; //function callback to reserve the space
}

export class SpaceComponent extends React.Component<SpaceComponentProps> {
    private renderImage(){
      const logo =  require("../../assets/logo.png")
        if(this.props.photoUrl){
            return <img src={this.props.photoUrl} alt="" />
        }else{
            return <img src={logo} alt="" />
        }
    }
  render() {
    return (
      <div>
        {this.renderImage()}
        <label htmlFor="">{this.props.name}</label> <br />
        <label htmlFor="">{this.props.spaceId}</label> <br />
        <label htmlFor="">{this.props.location}</label> <br />
        <button onClick={() => this.props.reserveSpace(this.props.spaceId)}>
          Reserve
        </button>
      </div>
    );
  }
}
