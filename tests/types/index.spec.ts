import { RefLike } from '~react-ref-utils/types';
import { fakes, Value } from '../fakes';
import { RefCallback } from 'react';

const makeSut = () => {
	return { sut: <T, R extends RefLike<T>>(value: R) => value };
};

describe.skip('ref-like-type', () => {
	test('should accept MutableRefObject', () => {
		const { sut } = makeSut();

		const ref = fakes.mutableRefObject();

		const output = sut(ref);
	});

	test('should accept Ref', () => {
		const { sut } = makeSut();

		const ref = fakes.mutableRefObject();

		const output = sut(ref);
	});

	test('should accept RefObject', () => {
		const { sut } = makeSut();

		const ref = fakes.refObject();

		const output = sut(ref);
	});

	test('should accept RefCallback', () => {
		const { sut } = makeSut();

		const ref = fakes.refCallback() as RefCallback<Value>;

		const output = sut(ref);
	});

	test('should accept ForwardedRef', () => {
		const { sut } = makeSut();

		const ref = fakes.forwardedRef();

		const output = sut(ref);
	});

	test('should accept null', () => {
		const { sut } = makeSut();

		const output = sut(null);
	});
});
