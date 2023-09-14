"use client";

import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Nome deve ter no mínimo 2 caracteres",
      })
      .nonempty({
        message: "Nome é obrigatório",
      }),
    username: z
      .string()
      .min(2, {
        message: "Usuário deve ter no mínimo 2 caracteres",
      })
      .nonempty({
        message: "Usuário é obrigatório",
      }),
    password: z.string().min(6, {
      message: "Senha deve ter no mínimo 6 caracteres",
    }),
    confirmPassword: z.string().nonempty({
      message: "Confirmação de senha é obrigatória",
    }),
    role: z.enum(["admin", "user", "almoxarife"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });
const Roles = ["admin", "user", "almoxarife"] as const;
const RegisterClient = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/register", values);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-2 container space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar função" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.toLocaleUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar a senha</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 flex justify-end space-x-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={isLoading}
          >
            Voltar
          </Button>
          <Button type="submit" size="sm" disabled={isLoading}>
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterClient;
