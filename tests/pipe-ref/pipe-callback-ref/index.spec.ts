import { pipeRefFakes as fakes } from '~tests/pipe-ref/fakes';
import { pipeCallbackRef } from '~react-ref-utils/pipe-ref';

const makeSut = () => ({ sut: pipeCallbackRef });

describe('pipe-callback-ref', () => {
	test('should property pipe callbackRefs', () => {
		const { sut } = makeSut();

		const source = fakes.refCallback();
		const target = fakes.refCallback();

		const ref = sut(source, target);

		const value = fakes.value('other');
		ref(value);

		expect(source).toBeCalledWith(value);
		expect(target).toBeCalledWith(value);
	});

	test('should property pipe objectRef', () => {
		const { sut } = makeSut();

		const source = fakes.refCallback();
		const target = fakes.refObject('target');

		const ref = sut(source, target);

		const value = fakes.value('other');
		ref(value);
		expect(target.current).toStrictEqual(value);
	});

	test('should return source if target is null', () => {
		const { sut } = makeSut();

		const source = fakes.refCallback();
		const ref = sut(source, null);

		expect(ref).toBe(source);

		const value = fakes.value('other');
		ref(value);
		expect(source).toBeCalledWith(value);
	});
});
