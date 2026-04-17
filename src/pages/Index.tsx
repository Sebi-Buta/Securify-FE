import { CheckCircle2, AlertTriangle, Trophy, ArrowRight, Wrench, Code2, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useModules } from "@/lib/store/modules";

const labs = [
	{ title: "Bypass Autentificare SQL Injection", difficulty: "Începător", time: "2 min", icon: Wrench, to: "/auth-bypass" },
	{ title: "XSS Stocat în Comentarii", difficulty: "Intermediar", time: "3 min", icon: Code2, to: "/xss" },
	{ title: "Analiza Scurgerii de Date", difficulty: "Avansat", time: "5 min", icon: Database, to: "/data-leakage" },
];

const Dashboard = () => {
	const modulesCompleted = useModules((state) => state.modulesCompleted);

	return (
		<div className=" space-y-6">
			<Card className="border-0 overflow-hidden relative">
				<div className="absolute inset-0 gradient-hero opacity-5" />
				<CardContent className="p-8 relative">
					<div className="flex items-center gap-2 mb-4">
						<span className="inline-flex items-center gap-1.5 text-xs font-medium bg-success/10 text-success px-2.5 py-1 rounded-full">
							<span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
							Sistem Operațional
						</span>
					</div>
					<h1 className="text-3xl font-extrabold tracking-tight mb-3">Bine ai venit în Mediul Securify</h1>
					<p className="text-muted-foreground max-w-xl mb-6 leading-relaxed">
						Un mediu sigur și controlat pentru demonstrarea vulnerabilităților web comune. Comută între modul{" "}
						<span className="font-semibold text-destructive">Atac (Echipa Roșie)</span> și{" "}
						<span className="font-semibold text-info">Apărare (Echipa Albastră)</span> pentru a înțelege ambele perspective.
					</p>
					<div className="flex gap-3">
						<Button asChild>
							<Link to="/auth-bypass">
								Începe Antrenamentul <ArrowRight className="ml-1 h-4 w-4" />
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link to="/data-leakage">Vezi Documentația</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">Laboratoare Disponibile</CardTitle>
							<span className="text-xs text-primary cursor-pointer hover:underline">Vezi toate</span>
						</div>
					</CardHeader>
					<CardContent className="space-y-1 pt-0">
						{labs.map((lab) => (
							<Link
								key={lab.title}
								to={lab.to}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
							>
								<div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
									<lab.icon className="h-4 w-4 text-primary" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium truncate">{lab.title}</p>
									<p className="text-xs text-muted-foreground">
										Dificultate: {lab.difficulty} · {lab.time}
									</p>
								</div>
								<ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
							</Link>
						))}
					</CardContent>
				</Card>

				<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
					<Card>
						<CardContent className="p-5">
							<div className="flex items-center justify-between mb-2">
								<p className="text-sm text-muted-foreground">Module Completate</p>
								<CheckCircle2 className="h-5 w-5 text-success" />
							</div>
							<p className="text-3xl font-bold">
								{modulesCompleted.length}
								<span className="text-muted-foreground text-lg">/3</span>
							</p>
							{modulesCompleted.length > 0 && (
								<p className="text-xs text-success mt-1">+{modulesCompleted.length} astăzi</p>
							)}
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-5">
							<div className="flex items-center justify-between mb-2">
								<p className="text-sm text-muted-foreground">Vulnerabilități Găsite</p>
								<AlertTriangle className="h-5 w-5 text-destructive" />
							</div>
							<p className="text-3xl font-bold">
								{3 - modulesCompleted.length}{" "}
								<span className="text-sm font-normal text-muted-foreground">
									Critice: {3 - modulesCompleted.length < 0 ? 0 : 3 - modulesCompleted.length}
								</span>
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
