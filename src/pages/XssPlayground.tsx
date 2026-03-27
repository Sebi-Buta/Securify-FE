import { useState } from "react";
import { Code2, AlertTriangle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useGetComments, useCreateComment, useDeleteComment, useAuth } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

const payloads = ["<script>alert('Hackuit')</script>", "<img src=x onerror=alert('Hackuit')>", "<body onload=alert('Hackuit')>"];

const XssPlayground = () => {
	const { data: comments = [], isLoading, error } = useGetComments();
	const { mutate: createComment, isPending: isCreating } = useCreateComment();
	const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const [input, setInput] = useState("");
	const [secure, setSecure] = useState(true);

	const postComment = () => {
		if (!user) {
			toast.error("You must be logged in to post a comment");
			return;
		}
		if (!input.trim()) {
			toast.error("Comment cannot be empty");
			return;
		}

		// Show XSS payload feedback
		if (!secure && (input.includes("<script") || input.includes("onerror") || input.includes("onload"))) {
			toast.success("🎉 Payload XSS injectat! Verifică HTML-ul randat mai jos.");
		} else if (secure && (input.includes("<") || input.includes(">"))) {
			toast.info("🛡️ Tagurile HTML au fost escapate (mod securizat).");
		}

		// Create comment via API
		createComment(
			{ author: user.username, content: input },
			{
				onSuccess: () => {
					toast.success("Comentariu postat!");
					setInput("");
					queryClient.invalidateQueries({ queryKey: ["comments"] });
				},
				onError: (err: any) => {
					toast.error(err.message || "Failed to post comment");
				},
			},
		);
	};

	const handleDeleteComment = (commentId: number | string) => {
		deleteComment(commentId, {
			onSuccess: () => {
				toast.success("Comentariu șters!");
				queryClient.invalidateQueries({ queryKey: ["comments"] });
			},
			onError: (err: any) => {
				toast.error(err.message || "Failed to delete comment");
			},
		});
	};

	return (
		<div className=" space-y-6">
			<Card className="border-0">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<div className="flex items-center gap-2 mb-1">
								<Code2 className="h-5 w-5 text-primary" />
								<h1 className="text-2xl font-bold">Cross-Site Scripting (XSS)</h1>
							</div>
							<p className="text-sm text-muted-foreground">
								Injectează scripturi malițioase care se execută în browserele altor utilizatori.
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
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Carte de Oaspeți Publică</CardTitle>
								<span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
									v1.2.4
								</span>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{isLoading ? (
								<div className="text-center py-8 text-muted-foreground">Loading comments...</div>
							) : error ? (
								<div className="text-center py-8 text-destructive">Error loading comments</div>
							) : comments && comments.length > 0 ? (
								comments.map((c: any) => (
									<div key={c.id} className="flex gap-3">
										<Avatar className="h-8 w-8 shrink-0">
											<AvatarFallback className="bg-primary/10 text-primary text-xs">
												{c.author
													.split(" ")
													.map((w: string) => w[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between">
												<p className="text-sm font-medium">{c.author}</p>
												<span className="text-xs text-muted-foreground">
													{c.created_at
														? new Date(c.created_at).toLocaleDateString()
														: "Now"}
												</span>
											</div>
											{secure ? (
												<p className="text-sm text-muted-foreground mt-0.5">
													{c.content}
												</p>
											) : (
												<p
													className="text-sm text-muted-foreground mt-0.5"
													dangerouslySetInnerHTML={{ __html: c.content }}
												/>
											)}
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleDeleteComment(c.id)}
											disabled={isDeleting}
											className="text-destructive hover:text-destructive"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								))
							) : (
								<div className="text-center py-8 text-muted-foreground">No comments yet. Be the first!</div>
							)}
							<div className="pt-4 border-t border-border">
								<Textarea
									placeholder="Scrie un comentariu..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
									rows={3}
									disabled={isCreating}
								/>
								<div className="flex items-center justify-between mt-3">
									<p className={`text-xs font-medium ${secure ? "text-success" : "text-destructive"}`}>
										Tagurile HTML sunt {secure ? "ESCAPATE" : "PERMISE"}
									</p>
									<Button onClick={postComment} size="sm" disabled={isCreating}>
										{isCreating ? "Posting..." : "Postează Comentariu"}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-2 space-y-4">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base">Înțelegerea XSS Stocat</CardTitle>
						</CardHeader>
						<CardContent className="text-xs text-muted-foreground space-y-3 leading-relaxed">
							<p>
								Cross-Site Scripting (XSS) stocat apare când un script malițios este stocat permanent pe
								serverul țintă. Victima preia apoi scriptul malițios de pe server când randează pagina.
							</p>
							<div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
								<div className="flex items-center gap-1.5 mb-1">
									<AlertTriangle className="h-3.5 w-3.5 text-warning" />
									<span className="font-medium text-foreground">Avertisment</span>
								</div>
								<p>
									În acest laborator, sistemul de comentarii nu sanitizează inputul. Orice HTML sau JS pe
									care îl tastezi va fi randat.
								</p>
							</div>
							<div>
								<p className="font-semibold text-foreground mb-1">Obiectivul Misiunii:</p>
								<p>Injectează un script care declanșează un popup alert cu mesajul „Hackuit".</p>
							</div>
							<div>
								<p className="font-semibold text-foreground mb-2">Încearcă aceste payload-uri:</p>
								<div className="space-y-2">
									{payloads.map((p) => (
										<button
											key={p}
											onClick={() => setInput(p)}
											className="w-full text-left bg-code-bg text-code-foreground font-mono text-xs p-2.5 rounded-lg hover:opacity-80 transition-opacity"
										>
											{p}
										</button>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base text-info">Strategie de Apărare (Echipa Albastră)</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-xs text-muted-foreground mb-3">
								Pentru a preveni XSS, trebuie să „escapezi" datele nesigure înainte de a le insera într-un
								document HTML.
							</p>
							<pre className="bg-code-bg text-code-foreground text-xs p-3 rounded-lg font-mono overflow-x-auto">
								{`// În loc de innerHTML
element.textContent = userInput;

// Sau folosește o bibliotecă de sanitizare
const clean = DOMPurify.sanitize(dirty);`}
							</pre>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default XssPlayground;
