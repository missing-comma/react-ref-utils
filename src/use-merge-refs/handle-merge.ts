import { MutableRefObject } from 'react';
import { setRef } from '~react-ref-utils/set-ref';
import { IfAny, RefCallbackLike, RefLike, RefObjectLike } from '~react-ref-utils/types';

type Optional<T> = T | null | undefined;

class RefCallbackObject<T> implements MutableRefObject<T> {
	private currentValue: T;
	private readonly refs: Array<Optional<RefLike<T>>>;
	constructor(source: RefObjectLike<T>, refs: Array<Optional<RefLike<T>>>) {
		this.currentValue = source.current as any;
		this.refs = [source, ...refs];
	}

	public get current() {
		return this.currentValue;
	}

	public set current(instance: T) {
		this.refs.forEach((target) => setRef(target, instance));
		this.currentValue = instance;
	}
}

type HandleMergeRefs = {
	<T, R extends RefLike<T>>(source: R, ...targets: Array<Optional<RefLike<T>>>): IfAny<
		R,
		Optional<RefLike<T>>,
		R
	>;
	<T, R extends RefLike<T>>(
		source: Optional<R>,
		...targets: Array<Optional<RefLike<T>>>
	): Optional<R>;
};

export const handleMergeRefs: HandleMergeRefs = <T>(
	source: RefLike<T> | undefined | null,
	...targets: Array<Optional<RefLike<T>>>
): Optional<RefLike<T>> => {
	if (source === undefined) return undefined;
	if (source === null) return null;
	if (typeof source === 'function') {
		const callback: RefCallbackLike<T> = (instance: T) => {
			setRef(source, instance);
			targets.forEach((target) => setRef(target, instance));
		};
		return callback;
	}
	if (typeof source === 'object') {
		const object: RefObjectLike<T> = new RefCallbackObject(source, targets);
		return object;
	}
	throw new Error(`Invalid ref type, received ${typeof source}`);
};
