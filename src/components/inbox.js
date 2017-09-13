import React from 'react'

import Toolbar from './toolbar'
import MessageList from './messageList'
import ComposeMessage from './ComposeMessage'

export default class Inbox extends React.Component {

  state = {messages: [], showComposeMessage: false}

  async componentDidMount() {
    const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const messagesJson = await messagesResponse.json()
    const serverMessages = messagesJson._embedded.messages
    let labels;
    let messages = serverMessages.map(message => {
      labels = {}
      message.labels.map(label => {
        labels[label] = true
        return null
      })
      message.labels = labels;
      return message;
    })
    this.setState({messages})
  }

  setFieldForAll = (field, value) => {
    let messages = this.state.messages.map(message => {
        message[field] = value;
      return message;
    });

    this.setState({messages});
  }

  setFieldForSelected = (field, value) => {
    let body = {
      messageIds: [],
      command: field
    }
    body[field] = value
    let messages = this.state.messages.map(message => {
      if (message.selected) {
        body.messageIds.push(message.id)
        message[field] = value;
      }
      return message;
    });

    this.updateServer(body)

    this.setState({messages});
  }

  setFieldForId = (field, value, id) => {
    const cmd = field === 'starred' ? 'star' : field;
    let body = {
      messageIds: [id],
      command: cmd
    }
    body[cmd] = value
    let messages = this.state.messages.map(message => {
      if (message.id === id) {
        message[field] = value;
      }
      return message;
    });

    if (field !== 'selected') {
      this.updateServer(body)
    }

    this.setState({messages});
  }

  setLabelForSelected = (label, value) => {
    let messageIds = []
    let messages = this.state.messages.map(message => {
      if (message.selected) {
        messageIds.push(message.id)
        message.labels[label] = value;
      }
      return message;
    });

    const command = value ? 'addLabel' : 'removeLabel'

    this.updateServer({messageIds, command, label})

    this.setState({messages});
  }

  updateServer = (body) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  createNewMessage = async (subject, message) => {
    let body = {
      subject,
      body: message
    }
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const json = await response.json()
    const newMessage = {
      starred: false,
      read: false,
      labels: {},
      subject,
      id: json.id
    }
    let messages = this.state.messages
    messages.push(newMessage)
    this.setState({ messages, showComposeMessage: false })
  }

  toggleComposeMessage = () => {
    let showComposeMessage = !this.state.showComposeMessage
    this.setState({ showComposeMessage })
  }

  render() {
    return (
      <div>
        <Toolbar
          messages={ this.state.messages }
          setFieldForSelected={this.setFieldForSelected}
          setFieldForAll={this.setFieldForAll}
          setLabelForSelected={this.setLabelForSelected}
          toggleComposeMessage={this.toggleComposeMessage}
        />
        { this.state.showComposeMessage && <ComposeMessage createNewMessage={this.createNewMessage}/> }
        <MessageList messages={ this.state.messages } setFieldForId={this.setFieldForId}/>
      </div>
    )
  }
}
