"use client";

import { Button, FormField, Input } from "@taskflow/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "@taskflow/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  });

  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterSchema> = async (data: RegisterSchema) => {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
    const body = await res.json();
      setFormError(body.error ?? "Failed to register");
      return;
    }
    
    router.push("/login");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {formError && <p className="text-sm text-red-500">{formError}</p>}
      <FormField label="Name" htmlFor="name" error={errors.name?.message}>
        <Input type="text" id="name" placeholder="Name" {...register("name")} />
      </FormField>
      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input type="email" id="email" placeholder="Email" {...register("email")} />
      </FormField>
      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <Input type="password" id="password" placeholder="Password" {...register("password")} />
      </FormField>
      <Button type="submit">Register</Button>
    </form>
  );
}
