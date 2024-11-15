import React from 'react';
import FormSecreto from './form-secreto';

const MainScreen = () => {
	return (
		<div className='w-full max-w-lg m-auto p-5'>
			<h1 className='text-2xl font-semibold'>Welcome to Secreto !</h1>
			<FormSecreto className='mt-5' />
		</div>
	);
};

export default MainScreen;
