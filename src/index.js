import './styles.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { createBrowserHistory } from 'history'

import Page1 from 'containers/Page1'
import Page2 from 'containers/Page2'
import Page3 from 'containers/Page3'
import Page4 from 'containers/Page4'

// 一个不准确的 appHistoryStack，不对外暴露接口，不能当做历史记录参考
const appHistoryStack = [window.location.href]
const replaceState = history.replaceState
const pushState = history.pushState
let appAction = 'FORWARD'

history.replaceState = function() {
  setTimeout(() => appHistoryStack.splice(-1, 1, window.location.href), 0)
  replaceState.apply(history, arguments)
}
history.pushState = function() {
  setTimeout(() => appHistoryStack.push(window.location.href), 0)
  pushState.apply(history, arguments)
}

window.addEventListener('hashchange', (HashChangeEvent) => {
  const { newURL, oldURL } = HashChangeEvent
  const newURLIndex = appHistoryStack.indexOf(newURL)
  const oldURLIndex = appHistoryStack.indexOf(oldURL)
  if (newURLIndex === -1) {
    appHistoryStack.push(newURL)
  }
  if (newURLIndex === -1 || newURLIndex - oldURLIndex > 0) {
    appAction = 'FORWARD'
  } else {
    appAction = 'GOBACK'
  }
})

ReactDOM.render((
  <HashRouter history={createBrowserHistory()}>
    <Route render={({ location, history }) => {
      let animationClassName = ''
      if (['PUSH', 'REPLACE'].includes(history.action)) {
        animationClassName = 'slide-left'
      } else {
        animationClassName = appAction === 'FORWARD' ? 'slide-left' : 'slide-right'
      }
      return (
        <TransitionGroup className={animationClassName}>
          <CSSTransition key={location.pathname} classNames="animation" timeout={304}>
            <Switch location={location}>
              <Route exact path="/page1" component={Page1}/>
              <Route exact path="/page2" component={Page2}/>
              <Route exact path="/page3" component={Page3}/>
              <Route exact path="/page4" component={Page4}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )
    }}/>
  </HashRouter>
), document.getElementById('app'))