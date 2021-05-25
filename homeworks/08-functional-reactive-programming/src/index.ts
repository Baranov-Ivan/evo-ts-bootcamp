import { fromEvent, interval, merge } from "rxjs";
import { mapTo, map, tap, pairwise, startWith, scan } from "rxjs/operators";

import {
  positions,
  container,
  catImg,
  randomNumber,
  render,
  textBlock,
  showCat,
  startButton,
  disableButton,
  checkNumber
} from "./utils";

const score = 0;

const containerEvent$ = fromEvent(container, "click").pipe(mapTo(-1));

const catEvent$ = fromEvent(catImg, "click").pipe(
  tap((event: MouseEvent) => event.stopPropagation()),
  mapTo(1)
);

const counter$ = merge(catEvent$, containerEvent$).pipe(
  scan((acc, cur: number) => acc + cur, score)
);

const cat$ = interval(1000).pipe(
  startWith(0),
  map(() => positions[randomNumber()]),
  pairwise(),
  //tried to make neighbouring elements unique (imperative and not working)
  map(([prevElem, curElem]) => checkNumber(prevElem, curElem)),
  tap(render)
);

const subscriberMain = (): void => {
  cat$.subscribe();
  counter$.subscribe((val: any) => (textBlock!.innerHTML = val));
};

const start$ = fromEvent(startButton, "click")
  .pipe(
    tap(disableButton),
    tap(showCat),
    map(() => positions[randomNumber()]),
    tap(render),
    //tried to make some king of singletone. Not sure its good practice to do so.
    tap(subscriberMain)
  )
  .subscribe();
