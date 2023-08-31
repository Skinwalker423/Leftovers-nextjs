import { generateComponents } from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import type { OurFileRouter } from '../server/uploadthing';

export const { useUploadThing, uploadFiles } =
	generateReactHelpers<OurFileRouter>();

export const { UploadButton, UploadDropzone, Uploader } =
	generateComponents<OurFileRouter>();

export function isBase64Image(imageData: string) {
	const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
	return base64Regex.test(imageData);
}
