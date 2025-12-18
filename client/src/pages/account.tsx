import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  User, 
  Shield, 
  LogOut, 
  Monitor, 
  Smartphone, 
  Trash2,
  Loader2,
  Package,
  Clock
} from "lucide-react";

interface SessionInfo {
  id: string;
  isCurrent: boolean;
  lastSeenAt: string;
  createdAt: string;
  ipAddress: string | null;
  userAgent: string | null;
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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

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
          <h1 className="text-3xl font-bold text-white mb-2">Account</h1>
          <p className="text-slate-400">Manage your account settings and sessions</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.displayName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </div>
              <div>
                <h2 
                  data-testid="text-display-name"
                  className="text-xl font-semibold text-white"
                >
                  {user.displayName || "User"}
                </h2>
                <p 
                  data-testid="text-email"
                  className="text-slate-400"
                >
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Account Status</span>
                </div>
                <p className="text-white font-medium capitalize">{user.status}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Email Verified</span>
                </div>
                <p className="text-white font-medium">
                  {user.emailVerifiedAt ? "Yes" : "Not yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Active Sessions
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Devices where you're currently logged in
                </p>
              </div>
              <Button
                data-testid="button-logout-all"
                variant="outline"
                size="sm"
                onClick={() => logoutAll()}
                className="text-red-400 border-red-400/30 hover:bg-red-400/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout everywhere
              </Button>
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
                  return (
                    <div
                      key={session.id}
                      data-testid={`session-${session.id}`}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        session.isCurrent
                          ? "bg-cyan-500/10 border border-cyan-500/20"
                          : "bg-slate-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <DeviceIcon className={`w-5 h-5 ${session.isCurrent ? "text-cyan-400" : "text-slate-400"}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">
                              {session.isCurrent ? "This device" : "Other device"}
                            </span>
                            {session.isCurrent && (
                              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400">
                            Last seen: {formatDate(session.lastSeenAt)}
                          </p>
                          {session.ipAddress && (
                            <p className="text-xs text-slate-500">IP: {session.ipAddress}</p>
                          )}
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <Button
                          data-testid={`button-revoke-session-${session.id}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeSession(session.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Package className="w-5 h-5" />
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Browse Products
                </Button>
              </Link>
              <Button
                data-testid="button-logout"
                variant="outline"
                onClick={() => logout()}
                className="border-red-400/30 text-red-400 hover:bg-red-400/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
