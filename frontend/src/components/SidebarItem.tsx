import type { ReactElement } from "react";

interface SidebarItemProps {
	text: string;
	icon: ReactElement;
	active?: boolean;
	onClick?: () => void;
}

export function SidebarItem({ text, icon, active = false, onClick }: SidebarItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={
				"w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors " +
				(active
					? "bg-[#ece9ff] text-[#5a4fb0]"
					: "text-slate-700 hover:bg-slate-100")
			}
		>
			<span className="text-slate-500">{icon}</span>
			<span className="font-medium">{text}</span>
		</button>
	);
}
