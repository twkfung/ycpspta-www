export const isArray = (item: unknown) => Array.isArray(item)
export const isObject = (item: unknown) =>
  typeof item === "object" && !isArray(item) && item !== null
export const isFunction = (item: unknown) => typeof item === "function"
