import React from 'react'

export default class Message extends React.Component {
  render () {

    const selected = this.props.message.selected ? ' selected' : '';
    const unread = !this.props.message.read ? 'un' : '';

    return (
      <div className={`row message ${unread}read${selected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.props.message.selected} onChange={() => {this.props.setFieldForId('selected', !this.props.message.selected, this.props.message.id)}} />
            </div>
            <div className="col-xs-2">
              <i className={`star fa fa-star${this.props.message.starred ? '' : '-o'}`} onClick={() => {this.props.setFieldForId('starred', !this.props.message.starred, this.props.message.id)}}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {
            this.props.message.labels && Object.keys(this.props.message.labels).map((label, i) => {
              if (this.props.message.labels[label]) {
                return <span key={ i } className="label label-warning">{label}</span>
              }
              return <div/>
            })
          }
          <a>
            {this.props.message.subject}
          </a>
        </div>
      </div>
    )
  }
}
