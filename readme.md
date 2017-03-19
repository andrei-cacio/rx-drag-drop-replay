# RxJS drag and drop with replay button example

I wanated to play around with RxJs a bit and I was browsing threw their [examples](https://github.com/Reactive-Extensions/RxJS/tree/master/examples) and I stumbled upon the [drag and drop example](https://github.com/Reactive-Extensions/RxJS/tree/master/examples/dragndrop). I wanted to enhance the example by storing the history of the dragged element's path and adding the support to replay the exact way the element moved.

# Demo

To see this in action click [here](http://htmlpreview.github.io/?https://github.com/andrei-cacio/rx-drag-drop-replay/blob/master/dragndrop.html)

# RxJS technologies used:

- [operators](http://reactivex.io/documentation/operators.html)
    - [takeUntil](http://reactivex.io/documentation/operators/takeuntil.html)
    - [flatMap](http://reactivex.io/documentation/operators/flatmap.html)
    - [map](http://reactivex.io/documentation/operators/map.html)
    - [fromEvent](http://reactivex.io/documentation/operators/from.html)
- [subject](http://reactivex.io/documentation/subject.html)

# Todos
- [ ] refactore the code
- [ ] add RxJS as a dependency
- [ ] add webpack