import CryptoJs from 'crypto-js';
export async function POST(request: Request) {
	const { value, password } = await request.json();
	const bytes = CryptoJs.AES.decrypt(value, password);
	const originalText = bytes.toString(CryptoJs.enc.Base64);
	if (!originalText)
		return Response.json(
			{ message: 'Password or QR may not valid' },
			{ status: 400 }
		);
	return Response.json({ text: originalText, bytes });
}
