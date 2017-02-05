# react-native-gesture-responder

A more convenient and powerful gesture responder than the official PanResponder.

Using this library, gestures are easy to detect:

* scroll distance
* pinch distance
* single tap
* double tab
* single tap confirmed (not followed by a double tap)

## Install

`npm install --save react-native-gesture-responder@latest`

## Documentation

```
import {createResponder} from 'react-native-gesture-responder';
...
componentWillMount() {
  this.gestureResponder = createResponder({
    onStartShouldSetResponder: (evt, gestureState) => true,
    onStartShouldSetResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetResponder: (evt, gestureState) => true,
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    onResponderGrant: (evt, gestureState) => {},
    onResponderMove: (evt, gestureState) => {},
    onResponderTerminationRequest: (evt, gestureState) => true,
    onResponderRelease: (evt, gestureState) => {},
    onResponderTerminate: (evt, gestureState) => {},
    
    onResponderSingleTapConfirmed: (evt, gestureState) => {}
    
    moveThreshold: 2
    debug: false
  });
}

render() {
  
  return (
    <View
      {...this.gestureResponder}>
		...
    </View>
  );
}
```

The API is quite same with the **[official gesture responder system](https://facebook.github.io/react-native/docs/gesture-responder-system.html)**. Differences are:

1. Every lifecycle callback is called with an additional argument **gestureState**, like the **[PanResponder](https://facebook.github.io/react-native/docs/panresponder.html)**.

2. **onResponderSingleTapConfirmed**: called after a single tap (not a double tap).

3. **moveThreshold**: default is 2. Use this to avoid too sensitive move events when simply tap the screen(mainly on Android).

4. **debug**: a boolean value. If true, lifecycle logs will be printed.

   ​

The **gestureState** object has the following(a super set of *PanResponder*):

* `stateId`
* `moveX` and `moveY`
* `x0` and `y0`
* `dx` and `dy`: **accumulated** distance of the gesture since the touch started(confusing names)
* `vx` and `vy`: per millisec(PanResponder is inconsistant with different react-native version, as [this issue](https://github.com/facebook/react-native/issues/8104) mentioned)
* `numberActiveTouches`
* `previousMoveX` and `previousMoveY`: you can use `moveX - previousMoveX` to calculate latest move distance
* `pinch` and `previousPinch`: useful number values when implementing zoom feature. Will be undefined if no pinch occured
* `singleTapUp`: a bool value indicating if a single tap up occured
* `doubleTapUp`: a bool value indicating if a double tap up occured




Refer to *Demo* folder for a simple demonstration, as below shows:

![](Demo/demo.gif)
