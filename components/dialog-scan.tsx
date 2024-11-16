import React, { SetStateAction } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { baseAxios } from '@/lib/axios';
const DialogScan = ({
	open,
	setIsOpen,
	setText,
}: {
	open: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	setText: React.Dispatch<SetStateAction<string>>;
}) => {
	const [scannedVal, setScannedVal] = useState('');
	const handleShowMessage = async (scannedVal: string, password: string) => {
		const response = await baseAxios.post('/api/scan', {
			value: scannedVal.toString(),
			password,
		});
		if (response.data) {
			setText(response.data?.text);
			setIsOpen(false);
		}
	};
	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => setIsOpen(isOpen)}
		>
			<DialogContent className='flex flex-col items-center p-10 min-h-[50vh] md:min-h-[70vh]'>
				<Scanner
					onError={(err) => console.error(err)}
					allowMultiple
					onScan={(result) => {
						setScannedVal(result[0].rawValue);
					}}
				/>
				{scannedVal && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const formData = new FormData(e.currentTarget);
							handleShowMessage(
								scannedVal,
								(formData.get('password') as string) || ''
							);
						}}
						className='flex flex-col gap-4'
					>
						<Input
							id='password'
							name='password'
							type='password'
							required
							placeholder='Type your password'
						/>
						<Button>Submit</Button>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default DialogScan;
