import { MutableRefObject, Ref, RefCallback, RefObject, ForwardedRef } from 'react';
import { faker } from '@faker-js/faker';

export type Value = { key: string };

const makeFakeKey = (key?: string): string => {
	if (key !== undefined) return key;
	return faker.lorem.words({ min: 2, max: 5 });
};
const makeFakeValue = (key?: string): Value => ({ key: makeFakeKey(key) });

const makeFakeRef = (key?: string) => ({ current: { key: makeFakeKey(key) } });

const makeFakeRefs = {
	ref: (key?: string): Ref<Value> => makeFakeRef(key),
	refObject: (key?: string): RefObject<Value> => makeFakeRef(key),
	mutableRefObject: (key?: string): MutableRefObject<Value> => makeFakeRef(key),
	forwardedRef: (key?: string): ForwardedRef<Value> => makeFakeRef(key),
	refCallback: (): RefCallback<Value> & jest.Mock<void, [instance: Value | null]> => jest.fn(),
};

export const fakes = {
	...makeFakeRefs,
	value: makeFakeValue,
	key: makeFakeKey,
};
