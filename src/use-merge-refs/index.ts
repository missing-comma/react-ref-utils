import { useRef } from 'react';
import { IfAny, RefLike } from '~react-ref-utils/types';
import { handleMergeRefs } from '~react-ref-utils/use-merge-refs/handle-merge';

type Optional<T> = T | null | undefined;

type UseMergeRefs = {
	<T, R extends RefLike<T>>(source: R, ...targets: Optional<RefLike<T>>[]): IfAny<
		R,
		Optional<RefLike<T>>,
		R
	>;
	<T, R extends RefLike<T>>(source: Optional<R>, ...targets: Optional<RefLike<T>>[]): Optional<R>;
};

export const useMergeRefs: UseMergeRefs = <T>(
	source: RefLike<T> | undefined,
	...targets: Array<RefLike<T> | undefined>
): Optional<RefLike<T>> => {
	return useRef<Optional<RefLike<T>>>(handleMergeRefs(source, ...targets)).current;
};

export { handleMergeRefs };
