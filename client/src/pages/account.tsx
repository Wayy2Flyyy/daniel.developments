import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Shield, 
  LogOut, 
  Monitor, 
  Smartphone, 
  Trash2,
  Loader2,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Key,
  Mail,
  Lock,
  Globe,
  ChevronRight,
  User,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Check
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SessionInfo {
  id: string;
  isCurrent: boolean;
  lastSeenAt: string;
  createdAt: string;
  ipAddress: string | null;
  userAgent: string | null;
}

function getBrowserInfo(userAgent: string | null): { name: string; os: string } {
  if (!userAgent) return { name: "Unknown", os: "Unknown" };
  const ua = userAgent.toLowerCase();
  
  let name = "Browser";
  if (ua.includes("chrome") && !ua.includes("edg")) name = "Chrome";
  else if (ua.includes("firefox")) name = "Firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) name = "Safari";
  else if (ua.includes("edg")) name = "Edge";
  else if (ua.includes("opera")) name = "Opera";
  
  let os = "Desktop";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  
  return { name, os };
}

export default function AccountPage() {
  const { user, isLoading, isAuthenticated, logout, logoutAll, refresh } = useAuth();
  const [, setLocation] = useLocation();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const { toast } = useToast();
  
  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  
  // Change password state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Email verification state
  const [verifyingEmail, setVerifyingEmail] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated]);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/auth/sessions", { credentials: "include" });
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      setSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      await fetch(`/api/auth/sessions/${sessionId}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchSessions();
      toast({ title: "Session revoked", description: "The session has been ended." });
    } catch {
      toast({ title: "Error", description: "Failed to revoke session", variant: "destructive" });
    }
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ displayName: displayName.trim() || null }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }
      
      await refresh();
      setIsEditingProfile(false);
      toast({ title: "Profile updated", description: "Your display name has been saved." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
      return;
    }
    
    if (newPassword.length < 12) {
      toast({ title: "Error", description: "Password must be at least 12 characters", variant: "destructive" });
      return;
    }
    
    setChangingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }
      
      setShowPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      fetchSessions();
      toast({ title: "Password changed", description: "Other sessions have been logged out for security." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setChangingPassword(false);
    }
  };

  const verifyEmail = async () => {
    setVerifyingEmail(true);
    try {
      const res = await fetch("/api/auth/request-verification", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to verify email");
      }
      
      await refresh();
      toast({ title: "Email verified", description: "Your email has been verified successfully." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setVerifyingEmail(false);
    }
  };

  const getDeviceIcon = (userAgent: string | null) => {
    if (!userAgent) return Monitor;
    const ua = userAgent.toLowerCase();
    if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
      return Smartphone;
    }
    return Monitor;
  };

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const passwordRequirements = [
    { label: "At least 12 characters", met: newPassword.length >= 12 },
    { label: "Contains a number", met: /\d/.test(newPassword) },
    { label: "Contains uppercase", met: /[A-Z]/.test(newPassword) },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const isEmailVerified = !!user.emailVerifiedAt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <button 
            data-testid="link-back-home"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to store
          </button>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          </div>
          <p className="text-slate-400">Manage your profile, security, and sessions</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-lg shadow-cyan-500/5">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                Profile
              </h3>
              {!isEditingProfile ? (
                <Button
                  data-testid="button-edit-profile"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingProfile(true)}
                  className="text-slate-400 hover:text-white"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    data-testid="button-cancel-profile"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditingProfile(false);
                      setDisplayName(user.displayName || "");
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    data-testid="button-save-profile"
                    size="sm"
                    onClick={saveProfile}
                    disabled={savingProfile}
                    className="bg-cyan-500 hover:bg-cyan-600"
                  >
                    {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                    Save
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-cyan-500/20">
                {(displayName || user.email)[0].toUpperCase()}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label className="text-slate-400 text-sm">Display Name</Label>
                  {isEditingProfile ? (
                    <Input
                      data-testid="input-display-name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                      maxLength={50}
                      className="mt-1 bg-slate-900/50 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white font-medium mt-1">{user.displayName || "Not set"}</p>
                  )}
                </div>
                <div>
                  <Label className="text-slate-400 text-sm">Email</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <p data-testid="text-email" className="text-white">{user.email}</p>
                    {isEmailVerified ? (
                      <span className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        Unverified
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-300">Active</span>
                  <span className="text-slate-500">— Full access to purchases and downloads</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              Security Summary
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  {isEmailVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <p className="text-white font-medium">
                  {isEmailVerified ? "Verified" : "Unverified"}
                </p>
                {!isEmailVerified && (
                  <Button
                    data-testid="button-verify-email"
                    size="sm"
                    variant="ghost"
                    onClick={verifyEmail}
                    disabled={verifyingEmail}
                    className="mt-2 h-7 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-0"
                  >
                    {verifyingEmail ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
                    Verify Email <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Password</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-white font-medium">Set</p>
                <Button
                  data-testid="button-change-password"
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPasswordDialog(true)}
                  className="mt-2 h-7 text-xs text-slate-400 hover:text-white hover:bg-white/5 p-0"
                >
                  Change <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Key className="w-4 h-4" />
                    <span className="text-sm">2FA</span>
                  </div>
                  <XCircle className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-white font-medium">Disabled</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-2 h-7 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-0 cursor-not-allowed opacity-50"
                  disabled
                >
                  Coming soon
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Active Sessions
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Devices where you're currently signed in
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    data-testid="button-logout-all"
                    variant="outline"
                    size="sm"
                    onClick={() => logoutAll()}
                    className="text-red-400 border-red-400/30 hover:bg-red-400/10 hover:text-red-300 px-4"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out of all devices
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 text-white border-slate-700">
                  Immediately ends all active sessions
                </TooltipContent>
              </Tooltip>
            </div>

            {sessionsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
            ) : sessions.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No active sessions</p>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => {
                  const DeviceIcon = getDeviceIcon(session.userAgent);
                  const browserInfo = getBrowserInfo(session.userAgent);
                  return (
                    <div
                      key={session.id}
                      data-testid={`session-${session.id}`}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        session.isCurrent
                          ? "bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                          : "bg-slate-900/50 border border-slate-700/30 hover:border-slate-600/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          session.isCurrent 
                            ? "bg-cyan-500/20 text-cyan-400" 
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          <DeviceIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-white font-medium">
                              {browserInfo.name} on {browserInfo.os}
                            </span>
                            {session.isCurrent && (
                              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-medium border border-cyan-500/20">
                                Current session
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-400">
                            <span>{formatRelativeTime(session.lastSeenAt)}</span>
                            {session.ipAddress && (
                              <>
                                <span className="text-slate-600">•</span>
                                <span className="flex items-center gap-1">
                                  <Globe className="w-3 h-3" />
                                  {session.ipAddress}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              data-testid={`button-revoke-session-${session.id}`}
                              variant="ghost"
                              size="sm"
                              onClick={() => revokeSession(session.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-800 text-white border-slate-700">
                            End this session
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-cyan-400" />
              Account Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <div className="flex-1" />
              <div className="flex flex-col items-end">
                <Button
                  data-testid="button-logout"
                  variant="outline"
                  onClick={() => logout()}
                  className="border-red-400/30 text-red-400 hover:bg-red-400/10 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
                <span className="text-xs text-slate-500 mt-1">Ends the current session only</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 py-4 flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Security events are logged and monitored.
          </div>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              Change Password
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your current password and choose a new one. This will log out all other sessions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Current Password</Label>
              <div className="relative">
                <Input
                  data-testid="input-current-password"
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">New Password</Label>
              <Input
                data-testid="input-new-password"
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              {newPassword.length > 0 && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, i) => (
                    <div 
                      key={i}
                      className={`flex items-center gap-2 text-xs ${req.met ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      {req.met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {req.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Confirm New Password</Label>
              <Input
                data-testid="input-confirm-new-password"
                type={showPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`bg-slate-800 border-slate-600 text-white ${
                  confirmPassword.length > 0 && newPassword !== confirmPassword ? "border-red-500" : ""
                }`}
              />
              {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                <p className="text-xs text-red-400">Passwords don't match</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowPasswordDialog(false)}
              className="text-slate-400"
            >
              Cancel
            </Button>
            <Button
              data-testid="button-confirm-password-change"
              onClick={changePassword}
              disabled={changingPassword || !currentPassword || newPassword.length < 12 || newPassword !== confirmPassword}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              {changingPassword ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
