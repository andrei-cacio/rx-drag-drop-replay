(function (global) {

  function main () {
    var dragTarget = document.getElementById('dragTarget');
    var replyButton = document.getElementById('reply-btn');

    // Get the three major events
    var mouseup   = Rx.Observable.fromEvent(dragTarget, 'mouseup');
    var mousemove = Rx.Observable.fromEvent(document,   'mousemove');
    var mousedown = Rx.Observable.fromEvent(dragTarget, 'mousedown');
    var replyButtonClick = Rx.Observable.fromEvent(replyButton, 'click');

    const historyMoves = window.historyMoves = [];
    const histroyObs = Rx.Observable.interval(10);
    const bSubject = new Rx.Subject();

    var mousedrag = mousedown.flatMap(function (md) {

      // calculate offsets when mouse down
      var startX = md.offsetX, startY = md.offsetY;

      // Calculate delta with mousemove until mouseup
      return mousemove.map(function (mm) {
        mm.preventDefault();

        return {
          left: mm.clientX - startX,
          top: mm.clientY - startY,
          x: mm.clientX,
          y: mm.clientY
        };
      }).takeUntil(mouseup);
    });

    // Update position
    var subscription = mousedrag.subscribe(function (pos) {
      dragTarget.style.top = pos.top + 'px';
      dragTarget.style.left = pos.left + 'px';
    });

    bSubject.subscribe(pos => {
      // console.log(pos);
      dragTarget.style.top = pos.top + 'px';
      dragTarget.style.left = pos.left + 'px';
    }, () => {}, () => replyButton.disabled = false);

    mousedrag.subscribe(({ x, y }) => {
      document.getElementById('posY').innerHTML = y;
      document.getElementById('posX').innerHTML = x;
    });

    mousedrag.subscribe(({ left, top }) => {
      historyMoves.splice(0, 0, { left, top });
    });

    replyButtonClick.subscribe((e) => {
      e.target.disabled = true;

      var obs = histroyObs.take(historyMoves.length).map(i => historyMoves[i]);

      obs.subscribe(step => bSubject.onNext(step), () => {}, () => bSubject.onCompleted());
    });
  }

  main();

}(window));
