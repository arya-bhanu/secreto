import CryptoJs from 'crypto-js';
export async function POST(request: Request) {
	const { value, password } = await request.json();
	try {
		const bytes = CryptoJs.AES.decrypt(value, password);
		const originalText = bytes.toString(CryptoJs.enc.Utf8);
		if (!originalText)
			return Response.json(
				{ message: 'Password or QR may not valid' },
				{ status: 400 }
			);
		return Response.json({ text: originalText, bytes });
	} catch (err) {
		console.error(err);
		return Response.json({ message: 'Wrong password' }, { status: 400 });
	}
}
