import { useState } from 'react';
import { ZodError, z } from 'zod';
import { FormItem } from '../../zod/types';

const formSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(1, 'Username cannot be empty.'),
  email: z.string().email('Email is invalid.'),
});

export const ZodAndControlledInputsForm = () => {
  const [username, setUsername] = useState<FormItem<'username'>>({
    username: '',
    errorMessage: null,
  });
  const [email, setEmail] = useState<FormItem<'email'>>({
    email: '',
    errorMessage: null,
  });
  return (
    <form>
      <h2 className="text-xl font-bold">Zod + Controlled inputs</h2>
      <div className="flex gap-6 mt-6">
        <label className="max-w-[160px] grow py-2">Username</label>
        <div className="grow">
          <input
            className="w-full rounded-md p-2 text-slate-900"
            name="username"
            onChange={(event) => {
              const nameSchema = formSchema.pick({ username: true });
              const { value } = event.target;
              try {
                nameSchema.parse({ username: value });
                setUsername({ username: value, errorMessage: null });
              } catch (error) {
                if (error instanceof ZodError) {
                  const [{ message }] = error.issues;
                  setUsername((state) => ({
                    ...state,
                    errorMessage: message,
                  }));
                }
              }
            }}
          />
          {username.errorMessage && (
            <p className="mt-1 text-red-400">{username.errorMessage}</p>
          )}
        </div>
      </div>
      <div className="flex gap-6 mt-6">
        <label className="max-w-[160px] grow py-2">Email</label>
        <div className="grow">
          <input
            className="w-full rounded-md p-2 text-slate-900"
            name="username"
            onChange={(event) => {
              const nameSchema = formSchema.pick({ email: true });
              const { value } = event.target;
              try {
                nameSchema.parse({ email: value });
                setEmail({ email: value, errorMessage: null });
              } catch (error) {
                if (error instanceof ZodError) {
                  const [{ message }] = error.issues;
                  setEmail((state) => ({
                    ...state,
                    errorMessage: message,
                  }));
                }
              }
            }}
          />
          {email.errorMessage && (
            <p className="mt-1 text-red-400">{email.errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
};
