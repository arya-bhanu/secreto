import React, { SetStateAction } from 'react';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
const DialogImage = ({
	open,
	setIsOpen,
	imageSrc,
}: {
	open: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	imageSrc: StaticImport | string;
}) => {
	function downloadImage() {
		const link = document.createElement('a');
		link.href = imageSrc as string;
		link.download = 'downloaded_qr.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => setIsOpen(isOpen)}
		>
			<DialogContent className='max-w-72 flex flex-col items-center'>
				<DialogTitle>QR Code</DialogTitle>
				<Image
					alt='qr'
					src={imageSrc}
					width={250}
					height={250}
				/>
				<DialogFooter className='w-full flex gap-3'>
					<Button
						onClick={downloadImage}
						type='button'
						variant='default'
					>
						Download
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DialogImage;
