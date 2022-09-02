import React from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { ConfirmModalComponent } from "./ConfirmModalComponent";
import { SpaceComponent } from "./SpaceComponent";

interface SpacesState {
  spaces: Space[];
  displayModal: boolean;
  modalContent: string;
}

interface SpacesProps {
  dataService: DataService;
}

export class Spaces extends React.Component<SpacesProps, SpacesState> {
  constructor(props: SpacesProps) {
    super(props);
    this.state = {
      spaces: [],
      displayModal: false,
      modalContent: "",
    };
    this.reserveSpace = this.reserveSpace.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const spaces = await this.props.dataService.getSpaces();
    this.setState({
      spaces: spaces,
    });
    this.reserveSpace = this.reserveSpace.bind(this);
  }

  private async reserveSpace(spaceId: string) {
    const reservationResult = await this.props.dataService.reserveSpace(
      spaceId
    );
    if (reservationResult) {
      this.setState({
        displayModal: true,
        modalContent: `You reserved the space with id ${spaceId} and got the reservation number ${reservationResult}!`,
      });
    } else {
      this.setState({
        displayModal: true,
        modalContent: `You can't reserve the space with id ${spaceId}`,
      });
    }
  }

  private renderSpaces() {
    const rows: any[] = [];
    for (const space of this.state.spaces) {
      rows.push(
        <SpaceComponent
          location={space.location}
          name={space.name}
          spaceId={space.spaceId}
          reserveSpace={this.reserveSpace}
        />
      );
    }
    return rows;
  }

  private closeModal() {
    this.setState({
      displayModal: false,
      modalContent: "",
    });
  }

  render() {
    return (
      <div>
        <h2>Spaces available</h2>
        {this.renderSpaces()}
        <ConfirmModalComponent
          close={this.closeModal}
          content={this.state.modalContent}
          display={this.state.displayModal}
        />
      </div>
    );
  }
}
