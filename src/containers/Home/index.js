import React from 'react'
import { Button } from 'containers/Page4/node_modules/containers/Page3/node_modules/antd'

export default class App extends React.Component {
  render() {
    const style = {
      position: 'absolute',
      height: 300,
      width: '100%',
      backgroundColor: 'antiquewhite'
    }
    return (
      <div style={style}>
        <Button type="primary" onClick={() => this.props.history.push('/page1')}>to page1</Button>
        <Button type="primary" onClick={() => window.history.replaceState({}, '', '/#/home?a=1')}>replaceState location href</Button>
        <Button type="primary" onClick={() => window.history.pushState({}, '', '/#/home?a=1')}>replaceState location href</Button>
      </div>
    )
  }
}