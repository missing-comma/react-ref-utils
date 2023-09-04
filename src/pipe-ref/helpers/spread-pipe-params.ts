import { PipeRefArgs } from '../types';

export const spreadPipeArgs = <S, T>(args: PipeRefArgs<S, T>): PipeRefArgs.Object<S, T> => {
	if (args.length === 1) {
		const [{ source, target }] = args;
		return { source, target };
	} else {
		const [source, target] = args;
		return { source, target };
	}
};
