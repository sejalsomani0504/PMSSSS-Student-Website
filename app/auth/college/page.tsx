'use client';

import { startTransition, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login, signup } from '@/utils/actions/auth';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {
    LoginFormData,
    loginSchema,
    SignupFormData,
    signupSchema,
} from '@/utils/types/forms';
import { useProgress } from 'react-transition-progress';
import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from 'next/navigation';

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState('login');
    const Router = useRouter();
    const startProgress = useProgress();
    const supabase = createClient();
    useEffect(() => {
        const awaitUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                Router.replace(`/?error=${error.message}`);
            }
            if (user) {
                Router.replace('/dashboard/college');
            }
        };
        awaitUser();
    });

    const Loginform = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const Signupform = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            aicteId: '',
        },
    });

    const onSignupSubmit: SubmitHandler<SignupFormData> = (data) => {
        startTransition(async () => {
            startProgress();
            signup(data);
            toast.success('Account created successfully');
            console.log(data);
        });
    };

    const onLoginSubmit: SubmitHandler<LoginFormData> = (data) => {
        startTransition(async () => {
            startProgress();
            login(data);
            toast.success('Logged in successfully');
            console.log(data);
        });
    };

    return (
        <main className="flex h-screen items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <Tabs
                    defaultValue="login"
                    className="w-full"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <TabsList className="grid grid-cols-2 border-b">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email and password to access your
                                account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Form {...Loginform}>
                                <form
                                    onSubmit={Loginform.handleSubmit(
                                        onLoginSubmit
                                    )}
                                >
                                    <FormField
                                        control={Loginform.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="my-2 space-y-2">
                                                <FormLabel htmlFor="email">
                                                    Email ID
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        placeholder="m@example.com"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    The Email assigned to the
                                                    representative.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={Loginform.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="my-2 space-y-2">
                                                <FormLabel htmlFor="password">
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        className="text-secondary"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="mt-6 w-full"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="signup">
                        <CardHeader>
                            <CardTitle>Create a new account</CardTitle>
                            <CardDescription>
                                Enter your email, password, and AICTE ID to sign
                                up.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Form {...Signupform}>
                                <form
                                    onSubmit={Signupform.handleSubmit(
                                        onSignupSubmit
                                    )}
                                >
                                    <FormField
                                        control={Signupform.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="my-2 space-y-2">
                                                <FormLabel htmlFor="email">
                                                    Email ID
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        placeholder="m@example.com"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    The Email assigned to the
                                                    representative.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={Signupform.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="my-2 space-y-2">
                                                <FormLabel htmlFor="password">
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        className="text-secondary"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={Signupform.control}
                                        name="aicteId"
                                        render={({ field }) => (
                                            <FormItem className="my-2 space-y-2">
                                                <FormLabel htmlFor="aicteid">
                                                    AICTE ID
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="aicteid"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    The AICTE ID assigned to the
                                                    college.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="mt-6 w-full"
                                        type="submit"
                                    >
                                        Sign Up
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </Card>
        </main>
    );
}
