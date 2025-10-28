import axios from 'axios'

interface UploadFileToStorageParams {
	file: File
}

interface UploadFileToStorageOpts {
	signal?: AbortSignal
}

export async function uploadFileToStorage(
	{ file }: UploadFileToStorageParams,
	opts?: UploadFileToStorageOpts,
): Promise<{ url: string }> {
	const data = new FormData()
	data.append('file', file)

	const response = await axios.post<{ url: string }>(
		'https://localhost:33333/uploads',
		data,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			signal: opts?.signal,
		},
	)

	return {
		url: response.data.url,
	}
}
