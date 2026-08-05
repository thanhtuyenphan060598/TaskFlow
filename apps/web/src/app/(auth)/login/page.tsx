"use client";

import { Button, FormField, Input } from "@taskflow/ui";
import { useActionState } from "react";
import { loginAction, type AuthActionState } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(
    loginAction,
    {}
  );

  return (
    <form className="flex flex-col gap-4" action={action}>
      <FormField label="Email" htmlFor="email">
        <Input type="email" id="email" name="email" placeholder="Email" required />
      </FormField>
      <FormField label="Password" htmlFor="password">
        <Input type="password" id="password" name="password" placeholder="Password" required />
      </FormField>
      {state.error ? <div className="text-red-500">{state.error}</div> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
