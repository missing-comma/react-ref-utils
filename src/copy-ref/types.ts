import { ForwardedRef, Ref } from 'react'

export type RefLikeTarget<T> = ForwardedRef<T> | Ref<T>

export type PipeRefArgs<S, T> = [PipeRefArgs.Object<S,T>] | PipeRefArgs.Spread<S,T>

export declare namespace PipeRefArgs
{
	export type Object<S, T> = { source: S, target: RefLikeTarget<T> }
	export type Spread<S, T> = [source: S, target: RefLikeTarget<T>]
}
