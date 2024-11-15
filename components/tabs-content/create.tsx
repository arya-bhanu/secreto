'use client';
import React from 'react';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import clsx from 'clsx';
const Create = ({ className }: { className?: string }) => {
	const formSchema = z.object({
		message: z.string({ message: 'Enter your message' }),
		password: z.string({ message: 'Enter your password' }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: '',
			password: '',
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form
				className={clsx(className, 'flex flex-col gap-4')}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Enter your message</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Message...'
										{...field}
										rows={10}
									/>
								</FormControl>
								<FormDescription>
									Enter your message that you want to keep secret
								</FormDescription>
								<FormMessage />
							</FormItem>
							<FormItem>
								<FormLabel>Enter your password</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Password'
									/>
								</FormControl>
								<FormDescription>
									Enter your password for encryt your message
								</FormDescription>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
			</form>
		</Form>
	);
};

export default Create;
