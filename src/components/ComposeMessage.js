import React from 'react'

export default class Toolbar extends React.Component {
  propTypes: {
    messages: React.PropTypes.array.isRequired
  }

  state = {subject: '', message: ''}

  onTextChange = (type, text) => {
    let state = {};
    state[type] = text;
    this.setState(state)
  }

  createNewMessage = (e) => {
    this.props.createNewMessage(this.state.subject, this.state.message)
    this.setState({subject: '', message: ''})
    e.preventDefault()
  }

  render() {
    return (
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onBlur={(e) => this.onTextChange('subject', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" onBlur={(e) => this.onTextChange('message', e.target.value)} ></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" onClick={this.createNewMessage}/>
          </div>
        </div>
      </form>
    )
  }
}
