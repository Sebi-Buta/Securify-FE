import { Home, Terminal, Code2, Database, Shield, Moon, Sun, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useTheme } from "@/contexts/ThemeContext";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
	SidebarHeader,
	useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks";
import { useUser } from "@/lib/store/user";
import { useModules } from "@/lib/store/modules";

const navItems = [
	{ title: "Panou Principal", url: "/", icon: Home },
	{ title: "Bypass Autentificare", url: "/auth-bypass", icon: Terminal, badge: "SQLi" },
	{ title: "Laborator XSS", url: "/xss", icon: Code2 },
	{ title: "Scurgere de Date", url: "/data-leakage", icon: Database },
];

export function AppSidebar() {
	const { mode, setMode, theme, toggleTheme } = useTheme();
	const { state } = useSidebar();
	const { logout } = useAuth();
	const { resetModules, modulesCompleted } = useModules((state) => state);
	const user = useUser((state) => state.appUser);
	const collapsed = state === "collapsed";

	const handleLogout = () => {
		logout();
		resetModules();
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="p-4">
				{!collapsed && (
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
							<Shield className="h-4 w-4 text-primary-foreground" />
						</div>
						<span className="text-lg font-bold">
							Secur<span className="text-primary">ify</span>
						</span>
					</div>
				)}
				{collapsed && (
					<div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero mx-auto">
						<Shield className="h-4 w-4 text-primary-foreground" />
					</div>
				)}
			</SidebarHeader>

			<SidebarContent>
				{!collapsed && (
					<div className="px-4 pb-2">
						<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Mod</p>
						<div className="flex gap-1 rounded-lg bg-secondary p-1">
							<button
								onClick={() => setMode("attack")}
								className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
									mode === "attack"
										? "bg-card text-destructive shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								<span className="text-xs">💥</span> Atac
							</button>
							<button
								onClick={() => setMode("defense")}
								className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
									mode === "defense"
										? "bg-card text-info shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								<span className="text-xs">🛡️</span> Apărare
							</button>
						</div>
					</div>
				)}

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink
											to={item.url}
											end={item.url === "/"}
											className="hover:bg-sidebar-accent/50"
											activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
										>
											<item.icon className="h-4 w-4 mr-2 shrink-0" />
											{!collapsed && (
												<span className="flex-1 flex items-center justify-between">
													{item.title}
													{item.badge && (
														<span className="text-[10px] font-mono bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
															{item.badge}
														</span>
													)}
												</span>
											)}
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{!collapsed && (
					<div className="px-4 mt-4">
						<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Progres Învățare</p>
						<div className="flex items-center justify-between text-xs mb-1.5">
							<span className="text-primary font-medium">
								{modulesCompleted.length === 3 ? "Avansat" : "Începător"}
							</span>
							<span className="text-muted-foreground">{Math.round((modulesCompleted.length / 3) * 100)}%</span>
						</div>
						<Progress value={(modulesCompleted.length / 3) * 100} className="h-1.5" />
					</div>
				)}
			</SidebarContent>

			<SidebarFooter className="p-4 space-y-3">
				{!collapsed && (
					<button
						onClick={toggleTheme}
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
					>
						{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
						{theme === "dark" ? "Mod Luminos" : "Mod Întunecat"}
					</button>
				)}
				{collapsed && (
					<button onClick={toggleTheme} className="mx-auto text-muted-foreground hover:text-foreground">
						{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
					</button>
				)}
				<div className="flex items-center gap-2 w-full">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="bg-primary/10 text-primary text-xs">US</AvatarFallback>
					</Avatar>
					{!collapsed && (
						<div className="flex justify-between w-full items-center">
							<div className="text-xs">
								<div className="flex items-center justify-between">
									<p className="font-medium text-foreground">{user?.username || "Utilizator"}</p>
								</div>
								<p className="text-muted-foreground">Hacker Nivel 1</p>
							</div>
							{user && (
								<button
									onClick={handleLogout}
									className="text-muted-foreground hover:text-foreground ml-2 p-1 rounded transition-colors"
									title="Logout"
								>
									<LogOut className="h-5 w-5" />
								</button>
							)}
						</div>
					)}
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
