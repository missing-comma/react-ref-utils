import { pipeRefFakes as fakes } from '~tests/pipe-ref/fakes';
import { assignToRefObject } from '~react-ref-utils/pipe-ref/helpers/assign-ref-to-object';

const makeSut = () => ({ sut: assignToRefObject });

describe('pipeRef > helpers > assignToRefObject', () => {
	describe('should not should type error if target is ', () => {
		test('RefObject', () => {
			const { sut } = makeSut();

			const ref = fakes.refObject();
			const value = fakes.value();

			sut(ref, value);

			expect(true).toBe(true);
		});

		test('MutableRefObject', () => {
			const { sut } = makeSut();

			const ref = fakes.mutableRefObject();
			const value = fakes.value();

			sut(ref, value);

			expect(true).toBe(true);
		});
	});

	describe('ref.current should be property set to value', () => {
		test('RefObject', () => {
			const { sut } = makeSut();

			const ref = fakes.refObject();
			const value = fakes.value();

			sut(ref, value);

			expect(ref.current).toBe(value);
		});

		test('MutableRefObject', () => {
			const { sut } = makeSut();

			const ref = fakes.mutableRefObject();
			const value = fakes.value();

			sut(ref, value);

			expect(ref.current).toBe(value);
		});
	});

	describe('ref.current should be property set to null, if value is null', () => {
		test('RefObject', () => {
			const { sut } = makeSut();

			const ref = fakes.refObject();

			sut(ref, null);

			expect(ref.current).toBe(null);
		});

		test('MutableRefObject', () => {
			const { sut } = makeSut();

			const ref = fakes.mutableRefObject();

			sut(ref, null);

			expect(ref.current).toBe(null);
		});
	});
});
