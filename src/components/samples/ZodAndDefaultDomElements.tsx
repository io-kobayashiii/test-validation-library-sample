import { useState } from 'react';
import { ZodError, z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, 'Username cannot be empty.'),
  email: z.string().email('Email is invalid.'),
});

export const ZodAndDefaultDomElements = () => {
  const [formError, setFormError] = useState<z.infer<typeof formSchema>>({
    username: '',
    email: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    try {
      formSchema.parse(Object.fromEntries(formData.entries()));
      setFormError({ username: '', email: '' });
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message;
        });
        setFormError(newErrors as z.infer<typeof formSchema>);
      }
    }
  };

  return (
    <form method="GET" action="/" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">Zod + Form element & onSubmit</h2>
      <div className="flex gap-6 mt-6">
        <label className="max-w-[160px] grow py-2">Username</label>
        <div className="grow">
          <input
            className="w-full rounded-md p-2 text-slate-900"
            name="username"
          />
          {formError.username && (
            <p className="mt-1 text-red-400 leading-none">
              {formError.username}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-6 mt-6">
        <label className="max-w-[160px] grow py-2">Email</label>
        <div className="grow">
          <input
            className="w-full rounded-md p-2 text-slate-900"
            name="email"
          />
          {formError.email && (
            <p className="mt-1 text-red-400 leading-none">{formError.email}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-800 text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
