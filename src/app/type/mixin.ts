/* eslint-disable @typescript-eslint/no-explicit-any */
export type MixinFunction<T = any> = (...input: any[]) => T

export type MixinConstructor<T = object> = new (...input: any[]) => T

export type Mixin<T extends MixinFunction = MixinFunction> = InstanceType<
  ReturnType<T>
>
