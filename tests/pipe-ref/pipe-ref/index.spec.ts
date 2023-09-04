import { pipeRef } from '~react-ref-utils/pipe-ref';
import { pipeCallbackRef } from '~react-ref-utils/pipe-ref/pipe-callback-ref';
import { pipeObjectRef } from '~react-ref-utils/pipe-ref/pipe-object-ref';
import { pipeRefFakes as fakes } from '~tests/pipe-ref/fakes';

jest.mock('~react-ref-utils/pipe-ref/pipe-callback-ref', () => ({ pipeCallbackRef: jest.fn() }));
jest.mock('~react-ref-utils/pipe-ref/pipe-object-ref', () => ({ pipeObjectRef: jest.fn() }));

const makeSut = () => {
	const stubs = {
		pipeObjectRef: pipeObjectRef as jest.Mock,
		pipeCallbackRef: pipeCallbackRef as jest.Mock,
	};
	return { sut: pipeRef, stubs };
};

describe('pipe-ref', () => {
	describe('should invoke pipeCallbackRef if source is callbackRef', () => {
		test('passing parameters as array', () => {
			const { sut, stubs } = makeSut();
			stubs.pipeCallbackRef.mockReturnValueOnce('callback-ref');

			const source = fakes.refCallback();
			const target = fakes.refCallback();

			const ref = sut(source, target);

			expect(ref).toBe('callback-ref');
			expect(stubs.pipeCallbackRef).toBeCalledWith(source, target);
		});

		test('passing parameters as object', () => {
			const { sut, stubs } = makeSut();
			stubs.pipeCallbackRef.mockReturnValueOnce('callback-ref');

			const source = fakes.refCallback();
			const target = fakes.refCallback();

			const ref = sut({ source, target });

			expect(ref).toBe('callback-ref');
			expect(stubs.pipeCallbackRef).toBeCalledWith(source, target);
		});
	});

	describe('should invoke pipeObjectRef if source is objectRef', () => {
		test('passing parameters as array', () => {
			const { sut, stubs } = makeSut();
			stubs.pipeObjectRef.mockReturnValueOnce('object-ref');

			const source = fakes.refObject('source');
			const target = fakes.refCallback();

			const ref = sut(source, target);

			expect(ref).toBe('object-ref');
			expect(stubs.pipeObjectRef).toBeCalledWith(source, target);
		});

		test('passing parameters as object', () => {
			const { sut, stubs } = makeSut();
			stubs.pipeObjectRef.mockReturnValueOnce('object-ref');

			const source = fakes.refObject('source');
			const target = fakes.refCallback();

			const ref = sut({ source, target });

			expect(ref).toBe('object-ref');
			expect(stubs.pipeObjectRef).toBeCalledWith(source, target);
		});
	});
});
