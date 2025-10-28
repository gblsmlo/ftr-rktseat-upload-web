import * as Collapsible from '@radix-ui/react-collapsible'

import { Minimize2 } from 'lucide-react'
import { Button } from '../ui/button'

export function UploadWidgetHeader() {
	return (
		<div className="flex w-full items-center justify-between border-zinc-800 border-b bg-white/2 p-4 py-2">
			<Collapsible.Trigger asChild>
				<Button size="icon" className="-mr-2">
					<Minimize2 strokeWidth={1.5} className="size-4" />
				</Button>
			</Collapsible.Trigger>
		</div>
	)
}
