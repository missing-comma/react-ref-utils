import { MutableRefObject, RefObject } from 'react';

export const assignToRefObject = <T>(target: RefObject<T>, value: T | null) => {
	const mutableTarget = target as MutableRefObject<T | null>;
	mutableTarget.current = value;
};
