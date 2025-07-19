import { Minimize2 } from 'lucide-react'

export function UploadWidgetHeader() {
	return (
		<div className="flex w-full items-center justify-between border-zinc-800 border-b bg-white/2 p-4 py-2">
			<span className="font-medium text-sm">Upload files</span>

			<button type="button">
				<Minimize2 strokeWidth={1.5} className="size-4" />
			</button>
		</div>
	)
}
