import React from 'react'

export default class Page2 extends React.Component {
  render() {
    return (
      <div className="page page2">
        <h1>Page 2</h1>
        <button onClick={() => this.props.history.push('/page3')}>props push to Page3</button>
        <button onClick={() => this.props.history.replace('/page3')}>props replace to Page3</button>
        <button onClick={() => window.location.replace(window.location.origin + '/#/page3')}>window replace to Page3</button>
        <button onClick={() => window.location.href = window.location.origin + '/#/page3'}>window href to Page3</button>
      </div>
    )
  }
}