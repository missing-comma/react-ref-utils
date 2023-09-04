import { RefObject } from 'react';
import { PipeRefArgs } from '../types';
import { spreadPipeArgs } from '~react-ref-utils/pipe-ref/helpers/spread-pipe-params';
import { assignToRefObject } from '~react-ref-utils/pipe-ref/helpers/assign-ref-to-object';

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
