import { useState } from "react";
import { Database, Download, CheckCircle2, XCircle, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useGetUsers, useCreateUser, useDeleteUser } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";

const DataLeakage = () => {
	const { data: users = [], isLoading, error } = useGetUsers();
	const { mutate: createUser, isPending: isCreating } = useCreateUser();
	const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
	const queryClient = useQueryClient();

	// Form state for creating new user
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");

	// State for toggle switches for each user (to show plain or encrypted password)
	const handleCreateUser = () => {
		if (!newUsername || !newPassword) {
			toast.error("Please enter both username and password");
			return;
		}

		createUser(
			{ username: newUsername, password: newPassword },
			{
				onSuccess: () => {
					toast.success("User created successfully!");
					setNewUsername("");
					setNewPassword("");
					queryClient.invalidateQueries({ queryKey: ["users"] });
				},
				onError: (err: any) => {
					toast.error(err.message || "Failed to create user");
				},
			},
		);
	};

	const handleDeleteUser = (userId: number) => {
		deleteUser(userId, {
			onSuccess: () => {
				toast.success("User deleted successfully!");
				queryClient.invalidateQueries({ queryKey: ["users"] });
			},
			onError: (err: any) => {
				toast.error(err.message || "Failed to delete user");
			},
		});
	};

	return (
		<div className=" space-y-6">
			<Card className="border-0">
				<CardContent className="p-6">
					<div className="flex items-center gap-2 mb-1">
						<Database className="h-5 w-5 text-primary" />
						<h1 className="text-2xl font-bold">Simulare Scurgere de Date</h1>
					</div>
					<p className="text-sm text-muted-foreground">
						Analizează baza de date a utilizatorilor pentru a vedea cum sunt stocate parolele (plain și encrypt).
					</p>
				</CardContent>
			</Card>

			{/* Create User Form */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-base flex items-center gap-2">
						<Plus className="h-4 w-4" /> Create New User
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2">
						<Input
							placeholder="Username"
							value={newUsername}
							onChange={(e) => setNewUsername(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleCreateUser()}
							disabled={isCreating}
						/>
						<Input
							placeholder="Password"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleCreateUser()}
							disabled={isCreating}
						/>
						<Button onClick={handleCreateUser} disabled={isCreating} className="shrink-0">
							{isCreating ? "Creating..." : "Create"}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Users Table */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<span className="font-mono text-xs bg-secondary px-2 py-1 rounded">users_table.sql</span>
							<span className="text-xs text-success font-medium animate-pulse-glow">● LIVE DATABASE</span>
						</div>
						<Button variant="outline" size="sm">
							<Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="text-center py-8 text-muted-foreground">Loading users...</div>
					) : error ? (
						<div className="text-center py-8 text-destructive">Error loading users</div>
					) : users.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">No users found. Create one to get started.</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">ID</TableHead>
									<TableHead>USERNAME</TableHead>
									<TableHead>PLAIN PASSWORD</TableHead>
									<TableHead>ENCRYPTED PASSWORD</TableHead>
									<TableHead className="w-12 text-center">ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user: any) => (
									<TableRow key={user.id}>
										<TableCell className="font-mono text-xs">{user.id}</TableCell>
										<TableCell className="font-medium">{user.username}</TableCell>
										<TableCell className="font-mono text-xs truncate max-w-[200px]">
											{user.password_plain || "N/A"}
										</TableCell>
										<TableCell className="font-mono text-xs text-primary truncate max-w-[200px]">
											{user.password ? user.password.substring(0, 30) + "..." : "N/A"}
										</TableCell>
										<TableCell className="text-center">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleDeleteUser(user.id)}
												disabled={isDeleting}
												className="text-destructive hover:text-destructive"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			{/* Security Lesson */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-base">Lecție: Hashing vs Criptare</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2 text-sm">
					<div className="flex items-start gap-2">
						<XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
						<span className="text-muted-foreground">Nu stoca niciodată parolele în text simplu.</span>
					</div>
					<div className="flex items-start gap-2">
						<XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
						<span className="text-muted-foreground">
							Stocarea ambelor forme (plain + encrypted) este doar pentru scopuri educaționale.
						</span>
					</div>
					<div className="flex items-start gap-2">
						<CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
						<span className="text-muted-foreground">
							Folosește algoritmi lenți de hashing precum bcrypt, Argon2 sau PBKDF2 cu salt.
						</span>
					</div>
				</CardContent>
			</Card>

			<div className="text-center text-xs text-muted-foreground pt-4 border-t border-border space-y-1">
				<p>
					<span className="font-semibold">Platforma Educațională CyberSim</span> © 2024
				</p>
				<p className="text-destructive/70">
					AVERTISMENT: Această platformă este doar în scop educativ. Testarea neautorizată a sistemelor pe care nu le dețineți
					este ilegală.
				</p>
			</div>
		</div>
	);
};

export default DataLeakage;
