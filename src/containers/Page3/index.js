import React from 'react'

export default class Page3 extends React.Component {
  render() {
    return (
      <div className="page page3">
        <h1>Page 3</h1>
        <button onClick={() => this.props.history.push('/page4')}>props to Page4</button>
      </div>
    )
  }
}