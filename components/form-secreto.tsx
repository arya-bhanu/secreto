'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import React from 'react';
import Create from './tabs-content/create';
import { Scan } from './tabs-content/scan';

const FormSecreto = ({ className }: { className?: string }) => {
	return (
		<Tabs
			className={className}
			defaultValue='create'
		>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='create'>Create Secret</TabsTrigger>
				<TabsTrigger value='scan'>Scan QR</TabsTrigger>
			</TabsList>
			<TabsContent value='create'>
				<Create className='mt-3' />
			</TabsContent>
			<TabsContent value='scan'>
				<Scan />
			</TabsContent>
		</Tabs>
	);
};

export default FormSecreto;
