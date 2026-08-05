"use client";

import { Button, FormField, Input } from "@taskflow/ui";
import { useActionState } from "react";
import { registerAction, type AuthActionState } from "../actions";

export default function RegisterPage() {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(
    registerAction,
    {}
  );

  return (
    <form className="flex flex-col gap-4" action={action}>
      {state.error ? <p className="text-sm text-red-500">{state.error}</p> : null}
      <FormField label="Name" htmlFor="name">
        <Input type="text" id="name" name="name" placeholder="Name" required />
      </FormField>
      <FormField label="Email" htmlFor="email">
        <Input type="email" id="email" name="email" placeholder="Email" required />
      </FormField>
      <FormField label="Password" htmlFor="password">
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          required
        />
      </FormField>
      <Button type="submit" disabled={pending}>
        {pending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
