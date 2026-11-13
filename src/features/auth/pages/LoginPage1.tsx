import { ShoppingBag } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm1';

export default function LoginPage() {

  return (
     <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <ShoppingBag className='me-2' />
          <h1 className='text-xl font-medium text-black'>Ikigai Workspace</h1>
        </div>
        <Card className='max-w-sm px-3 gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>Sign in</CardTitle>
          <CardDescription>
           Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      </div>
    </div>
  );
}