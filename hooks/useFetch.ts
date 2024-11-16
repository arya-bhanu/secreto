import { baseAxios } from '@/lib/axios';
import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
	const [loading, setIsLoading] = useState(true);
	const [data, setData] = useState<null | any>(null);
	const [err, setErr] = useState<null | any>(null);
	useEffect(() => {
		baseAxios
			.get(url)
			.then((data) => {
				setData(data?.data);
			})
			.catch((err) => setErr(err))
			.finally(() => setIsLoading(false));
	}, [url]);

	return { loading, data, err };
};

export default useFetch;
