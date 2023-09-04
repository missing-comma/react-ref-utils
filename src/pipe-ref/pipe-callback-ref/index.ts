import { RefCallback } from 'react';
import { PipeRefArgs } from '../types';
import { spreadPipeArgs } from '../helpers/spread-pipe-params';
import { assignToRefObject } from '../helpers/assign-ref-to-object';

export type PipeCallbackRefArgs<T> = PipeRefArgs<RefCallback<T>, T>;

export const pipeCallbackRef = <T>(...args: PipeCallbackRefArgs<T>): RefCallback<T> => {
	const { source, target } = spreadPipeArgs(args);
	if (!target) {
		return source;
	}
	return (instance: T | null) => {
		source(instance);
		if (typeof target === 'function') {
			target(instance);
		} else {
			assignToRefObject(target, instance);
		}
	};
};
