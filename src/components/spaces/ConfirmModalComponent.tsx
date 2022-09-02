import React from 'react'
import './confirmModalComponent.css'

interface ConfirmModalComponentProps{
  display: boolean,
  content: string,
  close: () => void
}

export class ConfirmModalComponent extends React.Component<ConfirmModalComponentProps> {
  render() {
    if(!this.props.display){
      return null;
    }
    else{
      return <div className='modal'>
        <div className="modal-content">
          <h2>You tried to reserve and ...</h2>
          <h3 className="moalText">{this.props.content}</h3>
          <button onClick={() => this.props.close()}>Ok</button>
        </div>
      </div>
    }
  }
}
