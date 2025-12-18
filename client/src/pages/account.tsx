import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
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
  ChevronRight
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const { user, isLoading, isAuthenticated, logout, logoutAll } = useAuth();
  const [, setLocation] = useLocation();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

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
    } catch {
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <p className="text-slate-400">Manage your account security and sessions</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-lg shadow-cyan-500/5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-cyan-500/20">
                {user.displayName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 
                    data-testid="text-display-name"
                    className="text-2xl font-bold text-white"
                  >
                    {user.displayName || "User"}
                  </h2>
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
                <p 
                  data-testid="text-email"
                  className="text-slate-400 mb-3"
                >
                  {user.email}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-slate-300">Active</span>
                  </div>
                  <div className="text-slate-500">
                    Your account has full access to purchases and downloads.
                  </div>
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
                    size="sm"
                    variant="ghost"
                    className="mt-2 h-7 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-0"
                  >
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
                  size="sm"
                  variant="ghost"
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
                  className="mt-2 h-7 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-0"
                >
                  Enable <ChevronRight className="w-3 h-3 ml-1" />
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
    </div>
  );
}
