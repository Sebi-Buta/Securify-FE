import { useState } from "react";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useLoginVulnerable, useLoginSecure, useAuth } from "@/hooks";
import { useModules } from "@/lib/store/modules";

const AuthBypass = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [secure, setSecure] = useState(true);

	const { mutate: loginVulnerable, isPending: isLoginVulnerablePending } = useLoginVulnerable();
	const { mutate: loginSecure, isPending: isLoginSecurePending } = useLoginSecure();
	const { login, logout } = useAuth();
	const { modulesCompleted, addModuleCompleted } = useModules((state) => state);

	const isLoading = isLoginVulnerablePending || isLoginSecurePending;

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		logout(); // Clear any existing auth state before attempting new login

		if ((!username || !password) && secure) {
			toast.error("Please enter username and password");
			return;
		}

		if (modulesCompleted.find((m) => m === "auth-bypass") === undefined) {
			addModuleCompleted("auth-bypass");
		}

		if (secure) {
			// Use secure login endpoint
			loginSecure(
				{ username, password },
				{
					onSuccess: (data) => {
						if (data.success) {
							login(data.user); // Update auth state with user data
							toast.success("🛡️ Autentificare securizată reușită!");
						} else {
							toast.error(data.message || "Authentication failed");
						}
					},
					onError: (err: any) => {
						toast.error(err.message || "Login failed");
					},
				},
			);
		} else {
			// Use vulnerable login endpoint - check for SQL injection patterns first
			// if (username.includes("' OR '1'='1") || username.includes("' OR 1=1--") || username.includes("'OR'1'='1")) {
			// 	toast.success("🎉 Injecție SQL reușită! Ai ocolit autentificarea.", { duration: 5000 });
			// 	return;
			// }

			loginVulnerable(
				{ username, password },
				{
					onSuccess: (data) => {
						if (data.success) {
							login(data.user);
							toast.success("Autentificare reușită (credențiale valide).");
						} else {
							toast.error(data.message || "Authentication failed");
						}
					},
					onError: (err: any) => {
						toast.error(err.message || "Login failed");
					},
				},
			);
		}
	};

	return (
		<div className="space-y-6">
			<Card className="border-0">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<div className="flex items-center gap-2 mb-1">
								<Lock className="h-5 w-5 text-primary" />
								<h1 className="text-2xl font-bold">Bypass Autentificare</h1>
							</div>
							<p className="text-sm text-muted-foreground">
								Învață cum atacatorii ocolesc ecranele de autentificare folosind Injecția SQL.
							</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm text-muted-foreground">Nivel Securitate:</span>
							<Switch checked={secure} onCheckedChange={setSecure} />
							<span className={`text-sm font-medium ${secure ? "text-success" : "text-destructive"}`}>
								{secure ? "Securizat" : "Vulnerabil"}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				<div className="lg:col-span-3">
					<Card>
						<CardContent className="p-8 flex items-center justify-center min-h-[400px]">
							<div className="w-full max-w-sm">
								<div className="text-center mb-6">
									<div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
										<User className="h-7 w-7 text-primary" />
									</div>
									<h2 className="text-xl font-semibold">Portal Securizat - Autentificare</h2>
									<p className="text-xs text-muted-foreground mt-1">
										Introduceți credențialele pentru a accesa panoul de administrare.
									</p>
								</div>
								<form onSubmit={handleLogin} className="space-y-4">
									<div className="space-y-1.5">
										<Label htmlFor="email" className="text-sm">
											Email sau Nume Utilizator
										</Label>
										<Input
											id="email"
											placeholder="admin@exemplu.com"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											disabled={isLoading}
										/>
									</div>
									<div className="space-y-1.5">
										<Label htmlFor="pass" className="text-sm">
											Parolă
										</Label>
										<div className="relative">
											<Input
												id="pass"
												type={showPassword ? "text" : "password"}
												placeholder="••••••••"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												disabled={isLoading}
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												disabled={isLoading}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</button>
										</div>
									</div>
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? "Authenticating..." : "Autentificare"}
									</Button>
									<p className="text-center text-[11px] text-muted-foreground">
										Protejat de CyberSim Auth v1.0
									</p>
								</form>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-2">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base flex items-center gap-2">📚 Ghid de Învățare</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 text-sm">
							<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
								<p className="font-semibold text-destructive mb-1">Vulnerabilitatea</p>
								<p className="text-muted-foreground text-xs leading-relaxed">
									Când inputul utilizatorului este concatenat direct într-o interogare SQL fără
									sanitizare, un atacator poate manipula structura interogării.
								</p>
							</div>
							<div>
								<p className="font-semibold mb-2">Codul din spatele scenei:</p>
								<pre className="bg-code-bg text-code-foreground p-3 rounded-lg text-xs overflow-x-auto font-mono">
									{`SELECT * FROM users
WHERE username = '$username'
AND password = '$password';`}
								</pre>
							</div>
							<div>
								<p className="font-semibold mb-2">Cum să hackuiești (Simulare):</p>
								<ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
									<li>
										În câmpul de utilizator, încearcă un payload care face condiția mereu adevărată.
									</li>
									<li>
										Payload: <code className="text-primary font-mono">admin' OR '1'='1</code>
									</li>
									<li>Introdu orice parolă aleatorie.</li>
									<li>Apasă Autentificare.</li>
								</ol>
							</div>
							<div className="bg-info/10 border border-info/20 rounded-lg p-3">
								<p className="font-semibold text-info mb-1">Cum să repari (Echipa Albastră):</p>
								<p className="text-xs text-muted-foreground">
									Folosește Interogări Parametrizate (Prepared Statements) în loc de concatenarea
									șirurilor. Activează modul „Securizat" de mai sus pentru a vedea în acțiune.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AuthBypass;
