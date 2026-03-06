import { useState } from "react";
import { Code2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
  raw: boolean;
}

const initialComments: Comment[] = [
  { id: 1, author: "Alice Smith", text: "Site excelent! Am învățat multe despre securitate cibernetică astăzi.", time: "acum 2 ore", raw: false },
  { id: 2, author: "Bob Jones", text: "Mă poate ajuta cineva cu nivelul de injecție SQL?", time: "acum 5 ore", raw: false },
];

const payloads = [
  "<script>alert('Hackuit')</script>",
  "<img src=x onerror=alert('Hackuit')>",
  "<body onload=alert('Hackuit')>",
];

const XssPlayground = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [input, setInput] = useState("");
  const [secure, setSecure] = useState(false);

  const postComment = () => {
    if (!input.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      author: "Utilizator Student",
      text: input,
      time: "Chiar acum",
      raw: !secure,
    };
    setComments((c) => [...c, newComment]);
    if (!secure && (input.includes("<script") || input.includes("onerror") || input.includes("onload"))) {
      toast.success("🎉 Payload XSS injectat! Verifică HTML-ul randat mai jos.");
    } else if (secure && (input.includes("<") || input.includes(">"))) {
      toast.info("🛡️ Tagurile HTML au fost escapate (mod securizat).");
    }
    setInput("");
  };

  return (
    <div className="max-w-5xl space-y-6">
      <Card className="border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Code2 className="h-5 w-5 text-primary" />
                <h1 className="text-2xl font-bold">Cross-Site Scripting (XSS)</h1>
              </div>
              <p className="text-sm text-muted-foreground">Injectează scripturi malițioase care se execută în browserele altor utilizatori.</p>
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
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">v1.2.4</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {c.author.split(" ").map(w => w[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{c.author}</p>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    {c.raw ? (
                      <p className="text-sm text-muted-foreground mt-0.5" dangerouslySetInnerHTML={{ __html: c.text }} />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-0.5">{c.text}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-border">
                <Textarea placeholder="Scrie un comentariu..." value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
                <div className="flex items-center justify-between mt-3">
                  <p className={`text-xs font-medium ${secure ? "text-success" : "text-destructive"}`}>
                    Tagurile HTML sunt {secure ? "ESCAPATE" : "PERMISE"}
                  </p>
                  <Button onClick={postComment} size="sm">Postează Comentariu</Button>
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
                Cross-Site Scripting (XSS) stocat apare când un script malițios este stocat permanent pe serverul țintă.
                Victima preia apoi scriptul malițios de pe server când randează pagina.
              </p>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                  <span className="font-medium text-foreground">Avertisment</span>
                </div>
                <p>În acest laborator, sistemul de comentarii nu sanitizează inputul. Orice HTML sau JS pe care îl tastezi va fi randat.</p>
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
                Pentru a preveni XSS, trebuie să „escapezi" datele nesigure înainte de a le insera într-un document HTML.
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
