import { RefLike } from '~react-ref-utils/types';
import { useMergeRefs } from '~react-ref-utils/use-merge-refs';
import { fakes, Value } from '../fakes';

jest.mock('react', () => ({ useRef: jest.fn((v) => ({ current: v })) }));

const v = (key: string) => ({ key });

const makeSut = () => {
	return { sut: useMergeRefs };
};

const makeTargets = () => {
	return [
		fakes.mutableRefObject(),
		fakes.refCallback(),
		fakes.ref(),
		fakes.refObject(),
		undefined,
		null,
	];
};

const expectTargets = (targets: Array<RefLike<Value> | null | undefined>) => {
	return {
		toAllBeEqualTo: (value: any) => {
			targets.forEach((target) => {
				if (target) {
					if (typeof target === 'function') {
						expect(target).toHaveBeenCalledWith(value);
					} else {
						expect(target.current).toStrictEqual(value);
					}
				}
			});
		},
		not: {
			toAllBeEqualTo: (value: any) => {
				targets.forEach((target) => {
					if (target) {
						if (typeof target === 'function') {
							expect(target).not.toHaveBeenCalledWith(value);
						} else {
							expect(target.current).not.toStrictEqual(value);
						}
					}
				});
			},
		},
	};
};

describe('use-merge-ref', () => {
	describe('when source is a callback', () => {
		test('should return callback', () => {
			const { sut } = makeSut();
			const targets = makeTargets();

			const source = fakes.refCallback();

			const ref = sut(source, ...targets);
			expect(typeof ref).toBe('function');
		});

		test('should properly assign ref values to targets when invoking the output function', () => {
			const { sut } = makeSut();
			const targets = makeTargets();
			const value = v('callback-ref');

			sut(fakes.refCallback(), ...targets)(value);
			expectTargets(targets).toAllBeEqualTo(value);
		});

		test('should properly assign ref values to source when invoking the output function', () => {
			const { sut } = makeSut();
			const targets = makeTargets();
			const value = v('callback-ref');

			const source = fakes.refCallback();

			sut(source, ...targets)(value);
			expect(source).toHaveBeenCalledWith(value);
		});
	});

	describe('when source is an object', () => {
		test('should return an object', () => {
			const { sut } = makeSut();
			const targets = makeTargets();

			const source = fakes.mutableRefObject();

			const ref = sut(source, ...targets);
			expect(ref).toBeDefined();
			expect(ref).not.toBeNull();
			expect(typeof ref).toBe('object');
			expect(ref.current).toBeDefined();
		});

		test('should properly assign ref values to targets when assigning to the output ref', () => {
			const { sut } = makeSut();
			const targets = makeTargets();
			const value = v('object-ref');

			sut(fakes.mutableRefObject(), ...targets).current = value;
			expectTargets(targets).toAllBeEqualTo(value);
		});

		test('should properly assign ref values to source when assigning to the output ref', () => {
			const { sut } = makeSut();
			const targets = makeTargets();
			const value = v('object-ref');

			const source = fakes.mutableRefObject();

			sut(source, ...targets).current = value;
			expect(source.current).toStrictEqual(value);
		});

		test("output ref's initial value should be equal to the first object ref found", () => {
			const { sut } = makeSut();
			const targets = makeTargets();

			const source = fakes.mutableRefObject();

			const output = sut(source, ...targets);
			expect(output.current).toStrictEqual(source.current);
		});
	});

	describe('when source is undefined', () => {
		test('should return undefined', () => {
			const { sut } = makeSut();
			const targets = makeTargets();

			const ref = sut(undefined, ...targets);
			expect(ref).toBeUndefined();
		});
	});

	describe('when source is null', () => {
		test('should return null', () => {
			const { sut } = makeSut();
			const targets = makeTargets();

			const ref = sut(null, ...targets);
			expect(ref).toBeNull();
		});
	});
});
