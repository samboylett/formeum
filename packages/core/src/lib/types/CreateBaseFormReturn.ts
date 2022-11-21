import { createBaseForm } from "../createBaseForm";

export type CreateBaseFormReturn<Values extends unknown> = ReturnType<typeof createBaseForm<Values>>;
