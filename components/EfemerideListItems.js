import React from 'react'

export default class EfemerideListItems extends React.Component {
  render () {
    return <ul id='listItems'>
      {this.props.children}
    </ul>
  }
}
