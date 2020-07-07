import { useReducer, useEffect, useState } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';

// defines the time for the animation between slides in milliseconds
const transitionTime = 400;
// defines the threshold when to accept a swipe
const threshold = 0.3;
// defines the limit for swiping (max. the next full and a bit)
const limit = 1.2;
// animation to be used when bouncing back
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
// animation to be used when automatically sliding
const smooth = `transform ${transitionTime}ms ease`;

const initialCarouselState = {
    offset: 0,
    desired: 0,
    active: 0,
};

function previous(length, current) {
  return (current - 1 + length) % length;
}

function next(length, current) {
  return (current + 1) % length;
}

function carouselReducer(state, action) {
  switch (action.type) {
    case 'jump':
      return {
        ...state,
        desired: action.desired,
      };
    case 'next':
      return {
        ...state,
        desired: next(action.length, state.active),
      };
    case 'prev':
      return {
        ...state,
        desired: previous(action.length, state.active),
      };
    case 'done':
      return {
        ...state,
        offset: NaN,
        active: state.desired,
      };
    case 'drag':
      return {
        ...state,
        offset: action.offset,
      };
    default:
      return state;
  }
}

function swiped(delta, dispatch, length, dir, container) {
  const t = container.clientWidth * threshold;
  const d = dir * delta;

  if (d >= t) {
    dispatch(dir > 0 ? { type: 'next', length } : { type: 'prev', length });
  } else {
    dispatch({
      type: 'drag',
      offset: 0,
    });
  }
}

export function useCarousel(length, interval, options = {}) {
  const { slidesPresented = 1 } = options;
  const shadowSlides = 2 * slidesPresented;
  const n = Math.max(1, Math.min(slidesPresented, length));
  const totalWidth = 100 / n;
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
  const [container, setContainer] = useState(undefined);
  const { ref, onMouseDown } = useSwipeable({
    onSwiping(e) {
      const sign = e.deltaX > 0 ? -1 : 1;
      dispatch({
        type: 'drag',
        offset: sign * Math.min(Math.abs(e.deltaX), limit * container.clientWidth),
      });
    },
    onSwipedLeft(e) {
      swiped(e.deltaX, dispatch, length, 1, container);
    },
    onSwipedRight(e) {
      swiped(e.deltaX, dispatch, length, -1, container);
    },
    trackMouse: true,
    trackTouch: true,
  });
  const handlers = {
    onMouseDown,
    ref(container) {
      setContainer(container && container.firstElementChild);
      return ref(container);
    },
  };

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'next', length }), interval);
    return () => clearTimeout(id);
  }, [state.offset, state.active]);

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime);
    return () => clearTimeout(id);
  }, [state.desired]);

  const style = {
    transform: 'translateX(0)',
    width: `${totalWidth * (length + shadowSlides)}%`,
    left: `-${(state.active + 1) * totalWidth}%`,
  };

  if (state.desired !== state.active) {
    const dist = Math.abs(state.active - state.desired);
    const pref = Math.sign(state.offset || 0);
    const dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active);
    const shift = (totalWidth * (pref || dir)) / (length + shadowSlides);
    style.transition = smooth;
    style.transform = `translateX(${shift}%)`;
  } else if (!isNaN(state.offset)) {
    if (state.offset !== 0) {
      style.transform = `translateX(${state.offset}px)`;
    } else {
      style.transition = elastic;
    }
  }

  return [state.active, n => dispatch({ type: 'jump', desired: n }), handlers, style];
}