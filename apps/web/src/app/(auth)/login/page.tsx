"use client";

import { Button, FormField, Input } from "@taskflow/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@taskflow/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        setLoginError(
          await res
            .json()
            .catch(() => {})
            .then((data) => data.error)
        );
        return;
      }
      router.push("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input type="email" id="email" placeholder="Email" {...register("email")} />
      </FormField>
      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <Input type="password" id="password" placeholder="Password" {...register("password")} />
      </FormField>
      {loginError && <div className="text-red-500">{loginError}</div>}
      <Button type="submit">Login</Button>
    </form>
  );
}
