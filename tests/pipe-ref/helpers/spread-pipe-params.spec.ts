import { pipeRefFakes as fakes } from '~tests/pipe-ref/fakes';
import { spreadPipeArgs } from '~react-ref-utils/pipe-ref/helpers/spread-pipe-params';

const makeSut = () => ({ sut: spreadPipeArgs });

describe('spread-pipe-args', () => {
	test('should properly parse arguments as array', () => {
		const { sut } = makeSut();

		const source = fakes.ref('source');
		const target = fakes.ref('target');

		const args = sut([source, target]);

		expect(args.source).toStrictEqual(source);
		expect(args.target).toStrictEqual(target);
	});

	test('should properly parse arguments as array', () => {
		const { sut } = makeSut();

		const source = fakes.ref('source');
		const target = fakes.ref('target');

		const args = sut([{ source, target }]);

		expect(args.source).toStrictEqual(source);
		expect(args.target).toStrictEqual(target);
	});
});
