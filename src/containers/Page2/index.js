import React from 'react'

export default class Page2 extends React.Component {
  componentDidMount() {
    // this.props.history.replace('/page2?query=props1')
    // this.props.history.replace('/page2?query=props2')

    // window.location.replace(window.location.origin + '/#/page2?query=window1')
    // window.location.replace(window.location.origin + '/#/page2?query=window2')
    // window.location.replace(window.location.origin + '/#/page2?query=window3')
  }
  render() {
    return (
      <div className="page page2">
        <h1>Page 2</h1>
        <button onClick={() => this.props.history.push('/page3')}>props push to Page3</button>
        <button onClick={() => this.props.history.replace('/page3')}>props replace to Page3</button>
        <button onClick={() => window.location.replace(window.location.origin + '/#/page3')}>window replace to Page3</button>
        <button onClick={() => window.location.href = window.location.origin + '/#/page3'}>window href to Page3</button>
        <button onClick={() => {
          this.props.history.replace('/page2?query=props3')
          setTimeout(() => {
            window.location.href = window.location.origin + '/#/page3'
          }, 300);
        }}>props replace then window href to Page3</button>
      </div>
    )
  }
}