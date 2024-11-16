'use client';
import React, { useState } from 'react';
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
import { Button } from '../ui/button';
import { baseAxios } from '@/lib/axios';
import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from '@radix-ui/react-icons';
import DialogImage from '../dialog-image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const Create = ({ className }: { className?: string }) => {
	const [isPassShown, setIsPassShown] = useState(false);
	const [dialogImage, setDialogImage] = useState<string | StaticImport>('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const formSchema = z.object({
		message: z.string().min(1, { message: 'Your message cannot be empty' }),
		password: z
			.string()
			.min(4, { message: 'Your password must be at least 4 characters' }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: '',
			password: '',
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const response = await baseAxios.post(
			'/api/generate-qr',
			{
				value: values.message,
				password: values.password,
			},
			{ responseType: 'blob' }
		);
		if (response.data) {
			setIsDialogOpen(true);
			const url = URL.createObjectURL(response.data);
			setDialogImage(url);
		}
	}

	function resetForm() {
		form.reset();
	}
	return (
		<Form {...form}>
			<form
				className={clsx(className, 'flex flex-col gap-4')}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<DialogImage
					open={isDialogOpen}
					setIsOpen={setIsDialogOpen}
					imageSrc={dialogImage}
				/>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
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
					)}
				/>
				<div>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter your password</FormLabel>
								<div className='flex items-center gap-2'>
									<FormControl>
										<Input
											{...field}
											placeholder='Password'
											type={isPassShown ? 'text' : 'password'}
										/>
									</FormControl>
									<Button
										type='button'
										variant={'default'}
										size={'icon'}
										onClick={() => setIsPassShown((prev) => !prev)}
									>
										{isPassShown ? <EyeClosedIcon /> : <EyeOpenIcon />}
									</Button>
								</div>
								<FormDescription>
									Enter your password for encryt your message
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex items-center gap-2'>
					<Button className='flex-1' type='submit'>Encrypt</Button>
					<Button
						onClick={resetForm}
						size={'icon'}
						type='button'
					>
						<ReloadIcon />
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Create;
