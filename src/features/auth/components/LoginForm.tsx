// features/auth/components/LoginForm.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // redirect otomatis
    } catch {
      // pesan error sudah di-set di useAuth
    }
  };

  return (
    <div className="w-full max-w-125 rounded-[32px] border border-pink-100 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(219,39,119,0.18)] sm:p-10">
      <div className="flex justify-center items-center gap-3 mb-7 select-none">
        <span  
        style={{
        fontFamily: "'Playfair Display Variable', sans-serif",
        }} 
        className="text-5xl text-pastel-blue-text font-extrabold tracking-wide"
        >
          Ikigai
          <span className="text-pastel-pink-text"> Carry</span>
        </span>
        </div>

      <form onSubmit={handleSubmit} className="mt-10" noValidate>
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-13 rounded-2xl px-4 text-[15px]"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup className="h-13 rounded-2xl">
              <InputGroupInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="px-4 text-[15px] placeholder:text-[#9b94ad]"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          {error && (
            <FieldError className="rounded-xl bg-pink-50 px-4 py-3 text-sm text-pastel-pink-text">
              {error}
            </FieldError>
          )}

          <Button
            type="submit"
            disabled={isLoading || !email || !password}
            className="h-14 w-full rounded-2xl bg-pastel-pink-text text-base font-semibold text-white"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
