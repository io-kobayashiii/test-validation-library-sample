export type FormItem<T extends PropertyKey> = {
  [P in T]: string | null;
} & { errorMessage: string | null };
