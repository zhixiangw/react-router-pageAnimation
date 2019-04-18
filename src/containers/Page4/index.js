import React from 'react'

export default class Page4 extends React.Component {
  render() {
    return (
      <div className="page page4">
        <h1>Page 4</h1>
        <button type="primary" onClick={() => this.props.history.goBack()}>props goback</button>
        <button type="primary" onClick={() => this.props.history.go(-1)}>props go -1</button>
        <button type="primary" onClick={() => this.props.history.go(-2)}>props go -2</button>
        <button type="primary" onClick={() => window.history.go(-1)}>window go -1</button>
        <button type="primary" onClick={() => window.location.href = 'https://www.baidu.com'}>window baidu</button>
      </div>
    )
  }
}