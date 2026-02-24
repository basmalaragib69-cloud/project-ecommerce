"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RegisterType, zodvalue } from '@/schema/register'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'
import { User, Mail, Lock, Phone, UserPlus, ArrowRight } from 'lucide-react'

export default function Register() {
  const [isPending, setIsPending] = useState(false)
  const form = useForm<RegisterType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(zodvalue)
  })

  const { handleSubmit } = form;
  const router = useRouter();

  async function registervalue(value: RegisterType) {
    setIsPending(true)
    try {
      const res = await axios.post(`${process.env.API}/auth/signup`, value)
      if (res.data.message === "success") {
        toast.success("Account created successfully! Please login.")
        router.push("/login")
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>
      const message = axiosError.response?.data?.message || "Registration failed"
      toast.error(message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='min-h-[90vh] flex items-center justify-center p-4 bg-gray-50/50 py-12'>
      <div className='w-full max-w-xl'>
        <div className='bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8 md:p-12'>
          <div className='text-center mb-10'>
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UserPlus className="w-8 h-8 text-red-600" />
            </div>
            <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>Create Account</h1>
            <p className='text-gray-500 font-medium'>Join our community and start shopping</p>
          </div>

          <form onSubmit={handleSubmit(registervalue)} className='space-y-5'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm font-medium h-13"
                        placeholder="John Doe"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && <p className="text-red-500 text-xs mt-1 font-medium">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm font-medium h-13"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </div>
                    {fieldState.invalid && <p className="text-red-500 text-xs mt-1 font-medium">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm font-medium h-13"
                        placeholder="+20 123 456 7890"
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

              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Confirm</FieldLabel>
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
            </div>

            <Button
              className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-red-100 transition-all transform active:scale-[0.98] text-base mt-4'
              type='submit'
              disabled={isPending}
            >
              {isPending ? <i className="fas fa-spinner fa-spin mr-2"></i> : "Create Account"}
            </Button>
          </form>

          <div className='mt-8 pt-6 border-t border-gray-50 text-center'>
            <p className='text-gray-500 text-sm font-medium'>
              Already have an account?{' '}
              <Link href="/login" className='text-red-600 hover:text-red-700 font-bold inline-flex items-center gap-1 group'>
                Sign in
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
