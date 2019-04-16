**react-router-pageAnimation**

------

相比原生的动画，h5生硬的转场动画显得格格不入，限于h5场景的千变万化，想要了解到用户的操作行为也是变得异常困难，那么如何去做一个比较符合用户操作体验的转场动画呢？

经过反复的试错，得出一个比较合适的转场动画，拿去体验吧。
![]()

```js
git clone https://github.com/zhixiangw/react-router-pageAnimation.git
cd react-router-pageAnimation
npm i
npm start
```

------

### 具体思路

1. 如何知道用户的操作，是前进还是后退？
2. 前进后退知道后，如何使用过场动画实现页面路由切换的动画效果？

> 先回答第二个问题，如何实现路由切换的动画效果，这个问题其实很纯粹， react官方也提供了解决方案
>
> ```js
> react-transition-group
> ```
>
> [官方地址](<http://reactcommunity.org/react-transition-group/>)
>
> 如何与react-router结合起来使用，[具体方法](<https://reacttraining.com/react-router/web/example/animated-transitions>)

### 接下来着重看看如何知道用户的操作是前进和后退？

当一个链接地址输入到呈现在我们眼前，到底是先经历router render还是 hash change呢？下面经过尝试，列下面的表格我们便一目了然

| Props action | Router render | Hash change | 触发方法                                                     | Animation  |
| ------------ | ------------- | ----------- | ------------------------------------------------------------ | ---------- |
| PUSH         | 先            | 后          | props.history.push                                           | Slide-left |
| REPLACE      | 先            | 后          | props.history.replace                                        | Slide-left |
| POP          | 后            | 先          | props go/goback \| window go/goback \| window location href \| window replace \| browser back/forward | 请看下表   |

| pop 触发方法    | animation   |
| --------------- | ----------- |
| go/goback       | Slide-right |
| Window replace  | Slide-left  |
| Window href     | Slide-left  |
| Browser back    | Slide-right |
| Browser forward | Slide-left  |
| Forward         | Slide-left  |

还有俩个使router url变化，但是不会引起任何render或者hashchange事件的api，

> replaceState
>
> pushState

这俩个方法我们可以通过代码增强了解用户的操作，从而表现正确的效果。

### 那么如何区分 action 为 POP 的用户操作，并判断该表现的动画呢？

本地维护一个不准确的 historyStack ，用来判断用户操作后，需要的动画效果。为什么要维护呢？因为我们没法判断开发者使用的跳转方式是什么，window replace 和 window href 这俩个是表现一直的，我们没法区分。browser back 和 browser forward 也是没法区分的。我们只能通过本地项目内的 historyStack 来进行判断。至此，所有解决方案都已列出，具体实现请看git代码。
