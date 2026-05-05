import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { YoutubeIcon } from "../icons/Youtube";
import { TwitterIcon } from "../icons/Twitter";
import { BrainIcon } from "../icons/BrainIcon";
import { SidebarItem } from "./SidebarItem";

export type ContentFilter = "all" | "youtube" | "twitter";

interface SidebarProps {
  selectedFilter: ContentFilter;
  onFilterChange: (filter: ContentFilter) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
	isAuthenticated: boolean;
	onLogout: () => void;
}

export function Sidebar({ selectedFilter, onFilterChange, mobileOpen, onCloseMobile, isAuthenticated, onLogout }: SidebarProps) {
	return (
		<>
			{mobileOpen && <button onClick={onCloseMobile} className="md:hidden fixed inset-0 bg-black/35 z-30" aria-label="Close menu" />}
			<aside className={"fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 p-4 z-40 transition-transform duration-200 " + (mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")}>
			<div className="pb-6 border-b border-slate-100">
				<div className="flex items-center gap-3">
						<BrainIcon />
					<h2 className="text-2xl font-bold text-slate-800">Second Brain</h2>
				</div>
				<p className="text-sm text-slate-500">Organize your links and notes</p>
			</div>

			<nav className="pt-6 space-y-2">
				<SidebarItem text="All Content" icon={<ShareIcon />} active={selectedFilter === "all"} onClick={() => onFilterChange("all")} />
				<SidebarItem text="YouTube" icon={<YoutubeIcon />} active={selectedFilter === "youtube"} onClick={() => onFilterChange("youtube")} />
				<SidebarItem text="Twitter" icon={<TwitterIcon />} active={selectedFilter === "twitter"} onClick={() => onFilterChange("twitter")} />
				<SidebarItem text="Add New" icon={<PlusIcon />} />
				<SidebarItem text="Archive" icon={<CrossIcon />} />
			</nav>

			<div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-slate-100">
				{isAuthenticated ? (
					<button
						type="button"
						onClick={onLogout}
						className="block w-full text-center bg-[#7164c0] text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-[#5a4fb0] transition-colors"
					>
						Logout
					</button>
				) : (
					<div className="flex gap-2">
						<a href="/signin" className="flex-1">
							<span className="block w-full text-center bg-[#7164c0] text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-[#5a4fb0] transition-colors">
								Sign in
							</span>
						</a>
						<a href="/signup" className="flex-1">
							<span className="block w-full text-center bg-[#7164c0] text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-[#5a4fb0] transition-colors">
								Sign up
							</span>
						</a>
					</div>
				)}
			</div>
		</aside>
		</>
	);
}
