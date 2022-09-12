export type StringMap<T> = { [K in keyof T]: K };

export type HandlerFunction =
  | ((args?: object) => Promise<void>)
  | ((args?: object) => void);
