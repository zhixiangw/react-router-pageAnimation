import React from 'react'

export default class Page1 extends React.Component {
  render() {
    const style = {
      position: 'absolute',
      height: 300,
      width: '100%',
      backgroundColor: 'brown'
    }
    return (
      <div className="page page1">
        <h1>Page 1</h1>
        <button onClick={() => this.props.history.push('/page2')}>props push to Page2</button>
      </div>
    )
  }
}