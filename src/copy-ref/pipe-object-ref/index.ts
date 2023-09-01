import { RefObject } from 'react';
import { PipeRefArgs } from '../types';
import { spreadPipeArgs } from '~stub-maker/copy-ref/helpers/spread-pipe-params';
import { assignToRefObject } from '~stub-maker/copy-ref/helpers/assign-ref-to-object';

export type PipeObjectRef<T> = PipeRefArgs<RefObject<T>, T>;

export const pipeObjectRef = <T>(...args: PipeObjectRef<T>): RefObject<T> => {
	const { source, target } = spreadPipeArgs(args);
	if (target) {
		if (typeof target === 'function') {
			target(source.current);
		} else {
			assignToRefObject(target, source.current);
		}
	}
	return source;
};
