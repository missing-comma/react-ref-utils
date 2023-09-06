import { ForwardedRef, MutableRefObject, Ref, RefCallback, RefObject } from 'react';

export type RefLike<T> = Ref<T> | ForwardedRef<T>;
export type RefCallbackLike<T> = RefCallback<T> | ((instance: T | null) => void);
export type RefObjectLike<T> = RefObject<T> | MutableRefObject<T>;

export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
