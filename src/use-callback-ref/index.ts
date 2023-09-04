import { MutableRefObject, useRef } from 'react';

type Fn<A extends any[], R> = (...args: A) => R;

export const useCallbackRef = <A extends any[], R>(
	callback: Fn<A, R>
): MutableRefObject<Fn<A, R>> => {
	const ref = useRef<Fn<A, R>>(callback);
	ref.current = callback;
	return ref;
};
