import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Plus, Trash2, Terminal, Eye, EyeOff, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminCredential {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function AdminSetup() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [admins, setAdmins] = useState<AdminCredential[]>([
    { username: "", password: "", showPassword: false },
    { username: "", password: "", showPassword: false },
    { username: "", password: "", showPassword: false },
  ]);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const res = await fetch("/api/admin/setup/status");
      const data = await res.json();
      if (data.isComplete) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Failed to check setup status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdmin = (index: number, field: keyof AdminCredential, value: string | boolean) => {
    setAdmins(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const isValid = (admin: AdminCredential) => {
    return admin.username.length >= 3 && admin.password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validAdmins = admins.filter(a => isValid(a)).map(a => ({
      username: a.username,
      password: a.password,
    }));

    if (validAdmins.length === 0) {
      toast({
        title: "Error",
        description: "Please configure at least one admin account",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admins: validAdmins }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Setup failed");
      }

      toast({
        title: "Setup Complete",
        description: `Created ${data.count} admin account(s)`,
      });

      navigate("/admin/login");
    } catch (error: any) {
      toast({
        title: "Setup Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Terminal className="h-8 w-8 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-slate-400 font-mono text-sm">&gt; checking_setup_status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-amber-500 font-mono text-xs tracking-wider">ONE_TIME_SETUP</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Setup</h1>
          <p className="text-slate-400">
            Configure your admin accounts. This can only be done once.
          </p>
        </div>

        <Card className="bg-slate-900/50 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-primary" />
              Create Admin Accounts
            </CardTitle>
            <CardDescription>
              Configure up to 3 admin accounts. Each needs a username (3+ chars) and password (8+ chars).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {admins.map((admin, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs text-primary">// ADMIN_{index + 1}</span>
                    {isValid(admin) && (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`username-${index}`} className="text-slate-300">
                        Username
                      </Label>
                      <Input
                        id={`username-${index}`}
                        data-testid={`input-admin-username-${index}`}
                        value={admin.username}
                        onChange={(e) => updateAdmin(index, "username", e.target.value)}
                        placeholder={`admin${index + 1}`}
                        className="bg-slate-900/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`password-${index}`} className="text-slate-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id={`password-${index}`}
                          data-testid={`input-admin-password-${index}`}
                          type={admin.showPassword ? "text" : "password"}
                          value={admin.password}
                          onChange={(e) => updateAdmin(index, "password", e.target.value)}
                          placeholder="••••••••"
                          className="bg-slate-900/50 border-white/10 text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                          onClick={() => updateAdmin(index, "showPassword", !admin.showPassword)}
                        >
                          {admin.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-white/10">
                <Button
                  type="submit"
                  data-testid="button-complete-setup"
                  disabled={isSubmitting || admins.filter(isValid).length === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Terminal className="h-4 w-4 mr-2 animate-pulse" />
                      Creating accounts...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Complete Setup ({admins.filter(isValid).length} account{admins.filter(isValid).length !== 1 ? "s" : ""})
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-slate-500 text-sm mt-6">
          Store these credentials securely. They cannot be recovered.
        </p>
      </div>
    </div>
  );
}
