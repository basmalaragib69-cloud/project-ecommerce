"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginType } from '@/schema/login'
import { zodlogin } from '@/schema/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { signIn } from "next-auth/react"
import Link from 'next/link'
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react'

export default function Login() {
  const [isPending, setIsPending] = useState(false)
  const form = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(zodlogin)
  })

  const { handleSubmit } = form;
  const router = useRouter();

  async function registerlogin(value: loginType) {
    setIsPending(true)
    try {
      const res = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false,
        callbackUrl: "/"
      })

      if (res?.ok) {
        toast.success("Welcome back! Login successful")
        router.push("/")
        router.refresh()
      } else {
        toast.error(res?.error || "Invalid email or password")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center p-4 bg-gray-50/50'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8 md:p-10'>
          <div className='text-center mb-10'>
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-8 h-8 text-red-600" />
            </div>
            <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>Login</h1>
            <p className='text-gray-500 font-medium'>Access your account to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit(registerlogin)} className='space-y-6'>
            <FieldGroup className="space-y-5">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm font-medium h-13"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && <p className="text-red-500 text-xs mt-1 font-medium">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Password</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm font-medium h-13"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && <p className="text-red-500 text-xs mt-1 font-medium">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-red-100 transition-all transform active:scale-[0.98] text-base'
              type='submit'
              disabled={isPending}
            >
              {isPending ? <i className="fas fa-spinner fa-spin mr-2"></i> : "Sign In"}
            </Button>
          </form>

          <div className='mt-8 pt-6 border-t border-gray-50 text-center'>
            <p className='text-gray-500 text-sm font-medium'>
              Don&apos;t have an account?{' '}
              <Link href="/register" className='text-red-600 hover:text-red-700 font-bold inline-flex items-center gap-1 group'>
                Create account
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
