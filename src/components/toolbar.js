import React from 'react'

export default class Toolbar extends React.Component {
  propTypes: {
    messages: React.PropTypes.array.isRequired
  }

  selectAll = (value) => {
    this.props.setFieldForAll('selected', value)
  }

  deleteSelected = () => {
    this.props.setFieldForSelected('delete', true)
  }

  markAsRead = () => {
    this.props.setFieldForSelected('read', true)
  }

  markAsUnread = () => {
    this.props.setFieldForSelected('read', false)
  }

  setLabel = (type, value) => {
    this.props.setLabelForSelected(type.value, value);
    type.selectedIndex = 0;
  }

  render() {
    let someSelected = 1;
    let someNotSelected = 0;
    let offset = 1;
    let unreadCount = 0;

    this.props.messages.map(message => {
      if (message.delete !== true) {
        offset = 0;
        someSelected = message.selected ? 2 : someSelected;
        someNotSelected = message.selected ? someNotSelected : -1;
        !message.read && unreadCount++;
      }
      return message;
    });

    const selectedTotal = someSelected + someNotSelected - offset;

    const selectedClass = [
      'fa fa-square-o',
      'fa fa-minus-square-o',
      'fa fa-check-square-o'
    ];

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">
              {unreadCount}
            </span>
            unread message{unreadCount !== 1 && 's' }
          </p>

          <a className="btn btn-danger" onClick={this.props.toggleComposeMessage}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={() => this.selectAll(selectedTotal !== 2)}>
            <i className={selectedClass[selectedTotal]}></i>
          </button>

          <button className="btn btn-default" disabled={!selectedTotal} onClick={this.markAsRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={!selectedTotal} onClick={this.markAsUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={!selectedTotal} onChange={(e) => this.setLabel(e.target, true)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={!selectedTotal} onChange={(e) => this.setLabel(e.target, false)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={!selectedTotal} onClick={this.deleteSelected}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
