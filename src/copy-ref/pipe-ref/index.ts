import { RefCallback, RefObject } from 'react';
import { PipeRefArgs } from '../types';
import { spreadPipeArgs } from '~stub-maker/copy-ref/helpers/spread-pipe-params';
import { pipeCallbackRef, PipeCallbackRefArgs } from '~stub-maker/copy-ref/pipe-callback-ref';
import { pipeObjectRef, PipeObjectRef } from '~stub-maker/copy-ref/pipe-object-ref';

export const pipeRef: {
	<T>(...args: PipeCallbackRefArgs<T>): RefCallback<T>;
	<T>(...args: PipeObjectRef<T>): RefObject<T>;
} = <T>(...args: PipeRefArgs<RefObject<T> | RefCallback<T>, T> | PipeObjectRef<T>): any => {
	const { source, target } = spreadPipeArgs(args);
	if (!source) return source;
	if (typeof source === 'function') {
		return pipeCallbackRef(source, target);
	} else {
		return pipeObjectRef(source, target);
	}
};
