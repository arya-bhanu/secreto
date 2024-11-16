'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import DialogScan from '../dialog-scan';

export const Scan = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [text, setText] = useState('');
	return (
		<div className='mt-5'>
			<DialogScan
				open={isDialogOpen}
				setIsOpen={setIsDialogOpen}
				setText={setText}
			/>
			<div className='my-5'>
				<p className='text-sm'>Secret message:</p>
				<p>{text}</p>
			</div>
			<Button
				onClick={() => setIsDialogOpen(true)}
				className='w-full'
			>
				Scan QR
			</Button>
		</div>
	);
};
