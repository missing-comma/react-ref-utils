import { RefObject } from 'react';
import { pipeObjectRef } from '~react-ref-utils/pipe-ref';

import { Value, pipeRefFakes as fakes } from '~tests/pipe-ref/fakes';

const assignRef = (ref: RefObject<Value>, value: Value) => ((ref.current as any) = value);
const makeSut = () => ({ sut: pipeObjectRef });

describe('pipe-object-ref', () => {
	test('should property pipe callbackRefs', () => {
		const { sut } = makeSut();

		const source = fakes.refObject('source');
		const target = fakes.refCallback('target');

		const ref = sut(source, target);

		const value = fakes.value('other');
		assignRef(ref, value);

		expect(source.current).toStrictEqual(value);
		expect(target).toBeCalledWith(value);
	});

	test('should property pipe objectRef', () => {
		const { sut } = makeSut();

		const source = fakes.refObject('source');
		const target = fakes.refObject('target');

		const ref = sut(source, target);

		const value = fakes.value('other');
		assignRef(ref, value);

		expect(source.current).toStrictEqual(value);
		expect(target.current).toStrictEqual(value);
	});

	test('should return source if target is null', () => {
		const { sut } = makeSut();

		const source = fakes.refObject('source');
		const ref = sut(source, null);

		expect(ref).toBe(source);

		const value = fakes.value('other');
		assignRef(ref, value);

		expect(source.current).toStrictEqual(value);
	});
});
