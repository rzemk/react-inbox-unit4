import React from 'react'
import Message from './message'

const MessageList = ({ messages, setFieldForId }) => (
  messages && messages.length > 0 &&
  <div>
  {
    messages.map((message, i) => {
      if (!message.delete) {
        return <Message key={ i } message={ message } setFieldForId={setFieldForId}/>
      }
      return <div key={ i }/>
    })
  }
  </div>
)

export default MessageList
