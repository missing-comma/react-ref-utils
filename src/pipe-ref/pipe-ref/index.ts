import { RefCallback, RefObject } from 'react';
import { PipeRefArgs } from '../types';
import { spreadPipeArgs } from '~react-ref-utils/pipe-ref/helpers/spread-pipe-params';
import { pipeCallbackRef, PipeCallbackRefArgs } from '~react-ref-utils/pipe-ref/pipe-callback-ref';
import { pipeObjectRef, PipeObjectRef } from '~react-ref-utils/pipe-ref/pipe-object-ref';

export const pipeRef: {
	<T>(...args: PipeCallbackRefArgs<T | null>): RefCallback<T>;
	<T>(...args: PipeObjectRef<T>): RefObject<T>;
} = <T>(...args: PipeRefArgs<RefObject<T> | RefCallback<T | null>, T> | PipeObjectRef<T>): any => {
	const { source, target } = spreadPipeArgs(args);
	if (!source) return source;
	if (typeof source === 'function') {
		return pipeCallbackRef(source, target);
	} else {
		return pipeObjectRef(source, target);
	}
};
