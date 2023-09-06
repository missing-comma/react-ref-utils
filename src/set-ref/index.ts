import { assignToRefObject } from '~react-ref-utils/pipe-ref/helpers/assign-ref-to-object';
import { RefLike } from '~react-ref-utils/types';

export const setRef = <T>(ref: RefLike<T> | undefined | null, instance: T) => {
	if (!ref) return;
	if (typeof ref === 'function') {
		ref(instance);
	} else {
		assignToRefObject(ref, instance);
	}
};
