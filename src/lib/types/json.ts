import { z } from "zod"

const JsonPrimitive = z.union([z.string(), z.number(), z.boolean(), z.null()])
// type JsonPrimitive = z.infer<typeof JsonPrimitive>
// export type Json = JsonPrimitive | { [key: string]: Json } | Json[]
export const JsonValue: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([JsonPrimitive, z.array(JsonValue), z.record(JsonValue)]),
)

export type JsonObject = { [Key in string]?: JsonValue }
export type JsonArray = JsonValue[]
export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonObject | JsonArray
