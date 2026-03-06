import { useState } from "react";
import { Database, Download, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const users = [
  { id: 1, username: "admin", email: "admin@cybersim.io", role: "Superadmin", hash: "5f4dcc3b5aa765d61d8327deb882...", status: "Activ" },
  { id: 2, username: "jdoe", email: "john.doe@company.com", role: "Utilizator", hash: "898f6bcd4621d373cade4e832627...", status: "Activ" },
  { id: 3, username: "asmith", email: "alice.s@provider.net", role: "Utilizator", hash: "5e884898da28047151d0e56f8dc6...", status: "În așteptare" },
  { id: 4, username: "dev_test", email: "dev@localhost", role: "Dezvoltator", hash: "21232f297a57a5a743894a0e4a80...", status: "Inactiv" },
];

const roleBadgeVariant = (role: string) => {
  if (role === "Superadmin") return "destructive" as const;
  if (role === "Dezvoltator") return "secondary" as const;
  return "outline" as const;
};

const statusColor = (s: string) => {
  if (s === "Activ") return "text-success";
  if (s === "În așteptare") return "text-warning";
  return "text-destructive";
};

const DataLeakage = () => {
  const [answer, setAnswer] = useState("");

  const verify = () => {
    if (answer.toLowerCase() === "password") {
      toast.success("🎉 Corect! Parola adminului era 'password'. MD5 este ușor de spart.");
    } else {
      toast.error("Nu chiar. Încearcă parole comune sau folosește un tabel de căutare MD5.");
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <Card className="border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Database className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Simulare Scurgere de Date</h1>
          </div>
          <p className="text-sm text-muted-foreground">Analizează un dump de bază de date scursă pentru a găsi informații sensibile ale utilizatorilor.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs bg-secondary px-2 py-1 rounded">users_table.sql</span>
              <span className="text-xs text-success font-medium animate-pulse-glow">● CONEXIUNE ACTIVĂ</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1.5" /> Exportă CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>UTILIZATOR</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>ROL</TableHead>
                <TableHead>HASH PAROLĂ (MD5)</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-mono text-xs">{u.id}</TableCell>
                  <TableCell className="font-medium">{u.username}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell><Badge variant={roleBadgeVariant(u.role)}>{u.role}</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-primary truncate max-w-[180px]">{u.hash}</TableCell>
                  <TableCell><span className={`text-sm font-medium ${statusColor(u.status)}`}>{u.status}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Provocare Spargere Parole</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Aceste parole sunt hash-uite folosind MD5 (un algoritm învechit și vulnerabil). Poți sparge parola adminului?
            </p>
            <div className="flex gap-2">
              <Input placeholder="Introdu parola spartă a adminului" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && verify()} />
              <Button onClick={verify} className="shrink-0">Verifică</Button>
            </div>
          </CardContent>
        </Card>

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
              <span className="text-muted-foreground">MD5 și SHA-1 sunt compromise și ușor de spart.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span className="text-muted-foreground">Folosește algoritmi lenți de hashing precum bcrypt, Argon2 sau PBKDF2 cu salt.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border space-y-1">
        <p><span className="font-semibold">Platforma Educațională CyberSim</span> © 2024</p>
        <p className="text-destructive/70">AVERTISMENT: Această platformă este doar în scop educativ. Testarea neautorizată a sistemelor pe care nu le dețineți este ilegală.</p>
      </div>
    </div>
  );
};

export default DataLeakage;
