import { MutableRefObject, useRef } from 'react';

export const useConstantRef = <V>(constant: V): Readonly<MutableRefObject<V>> => {
	const ref = useRef<V>(constant);
	ref.current = constant;
	return ref;
};
