import * as Progress from '@radix-ui/react-progress'

import { Download, ImageUp, Link2, RefreshCcw, X } from 'lucide-react'
import { motion } from 'motion/react'
import { type Upload, useUploads } from '../../store/upload'
import { Button } from '../ui/button'

interface UploadWidgetUploadItemProps {
	upload: Upload
	uploadId: string
}

export function UploadWidgetUploadItem({
	upload,
	uploadId,
}: UploadWidgetUploadItemProps) {
	const cancelUpload = useUploads((store) => store.cancelUpload)

	return (
		<motion.div
			className="relative flex flex-col gap-3 overflow-hidden rounded-lg bg-white/2 p-3 shadow-shape-content"
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
			}}
			transition={{ duration: 0.4 }}
		>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-1 font-medium text-xs">
					<ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
					<span>{upload.name}</span>
				</span>

				<span className="flex items-center gap-1.5 text-xxs text-zinc-400">
					<span className="line-through">{upload.file.size}</span>
					<div className="size-1 rounded-full bg-zinc-700" />
					<span>
						300KB
						<span className="ml-1 text-green-400">-94%</span>
					</span>
					<div className="size-1 rounded-full bg-zinc-700" />
					{upload.status === 'completed' && <span>100%</span>}
					{upload.status === 'uploading' && <span>45%</span>}
					{upload.status === 'failed' && (
						<span className="text-red-500">Failed</span>
					)}
					{upload.status === 'canceled' && (
						<span className="text-yellow-500">Canceled</span>
					)}
				</span>
			</div>

			<Progress.Root
				data-status={upload.status}
				className="group h-1 overflow-hidden rounded-full bg-zinc-800"
			>
				<Progress.Indicator
					className='h-1 bg-indigo-500 transition-all duration-300 ease-in-out group-[data-status="canceled"]:bg-yellow-500 group-[data-status="failed"]:bg-red-500'
					style={{ width: upload.status === 'uploading' ? '45%' : '100%' }}
				/>
			</Progress.Root>

			<div className="absolute top-2.5 right-2.5 flex items-center gap-1">
				<Button size="icon-sm" disabled={upload.status !== 'completed'}>
					<Download className="size-4" strokeWidth={1.5} />
					<span className="sr-only">Download compressed image</span>
				</Button>

				<Button size="icon-sm" disabled={upload.status !== 'completed'}>
					<Link2 className="size-4" strokeWidth={1.5} />
					<span className="sr-only">Copy remote URL</span>
				</Button>

				<Button
					size="icon-sm"
					disabled={!['canceled', 'failed'].includes(upload.status)}
				>
					<RefreshCcw className="size-4" strokeWidth={1.5} />
					<span className="sr-only">Retry upload</span>
				</Button>

				<Button
					disabled={upload.status !== 'uploading'}
					size="icon-sm"
					onClick={() => cancelUpload(uploadId)}
				>
					<X className="size-4" strokeWidth={1.5} />
					<span className="sr-only">Cancel upload</span>
				</Button>
			</div>
		</motion.div>
	)
}
