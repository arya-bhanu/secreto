import QRCode from 'qrcode';
import CryptoJs from 'crypto-js';
export async function POST(request: Request) {
	const { value, password } = await request.json();
	const cipherText = CryptoJs.AES.encrypt(value, password).toString();
	const qrCodeText = await QRCode.toDataURL(cipherText);
	const base64Image = qrCodeText.split(';base64,').pop();

	if (!base64Image) {
		return Response.json({ error: 'Invalid base64 data' }, { status: 500 });
	}

	const imageBuffer = Buffer.from(base64Image, 'base64');
	return new Response(imageBuffer, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000',
		},
	});
}
