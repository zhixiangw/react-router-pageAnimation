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
const setStorage = false
const appHistoryStack = setStorage && sessionStorage.getItem('appHistoryStack') && JSON.parse(sessionStorage.getItem('appHistoryStack')) || [window.location.href]
const replaceState = history.replaceState
const pushState = history.pushState
let appAction = 'FORWARD'
let onAnimation = false
let animationClassName = ''

history.replaceState = function() {
  setTimeout(() => {
    const newHref = window.location.href.split('?')[0]
    appHistoryStack.splice(appHistoryStack.indexOf(newHref), 1, newHref)
  }, 0)
  replaceState.apply(history, arguments)
}
history.pushState = function() {
  setTimeout(() => appHistoryStack.push(window.location.href.split('?')[0]), 0)
  pushState.apply(history, arguments)
}

window.addEventListener('hashchange', (HashChangeEvent) => {
  const { newURL, oldURL } = HashChangeEvent
  const newURLHash = newURL.split('?')[0]
  const oldURLHash = oldURL.split('?')[0]
  if (newURLHash !== oldURLHash) {
    const newURLIndex = appHistoryStack.indexOf(newURLHash)
    const oldURLIndex = appHistoryStack.indexOf(oldURLHash)
    if (newURLIndex === -1) {
      appHistoryStack.push(newURLHash)
    }
    if (newURLIndex === -1 || newURLIndex - oldURLIndex > 0) {
      appAction = 'FORWARD'
    } else {
      appAction = 'GOBACK'
    }
  } else {
    appHistoryStack.splice(newURLHash, 1, newURLHash)
  }
})

ReactDOM.render((
  <HashRouter history={createBrowserHistory()}>
    <Route render={({ location, history }) => {
      if (['PUSH', 'REPLACE'].includes(history.action)) {
        animationClassName = onAnimation && animationClassName ? animationClassName : 'slide-left'
      } else {
        animationClassName = appAction === 'FORWARD' ? 'slide-left' : 'slide-right'
      }
      return (
        <TransitionGroup className={animationClassName}>
          <CSSTransition
            key={location.pathname}
            classNames="animation"
            timeout={304}
            onEnter={() => {
              onAnimation = true
            }}
            onEntered={() => {
              onAnimation = false
              sessionStorage.setItem('appHistoryStack', JSON.stringify(appHistoryStack))
            }} >
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