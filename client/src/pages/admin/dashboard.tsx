import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, Terminal, Users, Package, ShoppingCart, Activity, 
  LogOut, Trash2, Edit, Plus, Ban, Check, Eye, RefreshCw,
  DollarSign, TrendingUp, Clock, AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { apiRequest } from "@/lib/queryClient";
import type { Product, Order, User } from "@shared/schema";

interface Analytics {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: Order[];
}

interface SessionInfo {
  id: string;
  userId: string;
  userEmail: string;
  userDisplayName: string | null;
  lastSeenAt: string;
  createdAt: string;
  ipAddress: string | null;
  userAgent: string | null;
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isLoading: authLoading, logout } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    features: "",
    type: "product",
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      navigate("/admin/login");
    }
  }, [user, authLoading, navigate]);

  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics>({
    queryKey: ["/api/admin/analytics"],
    enabled: !!user && user.role === "admin",
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!user && user.role === "admin" && activeTab === "users",
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    enabled: !!user && user.role === "admin" && activeTab === "products",
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
    enabled: !!user && user.role === "admin" && activeTab === "orders",
  });

  const { data: sessions = [], isLoading: sessionsLoading } = useQuery<SessionInfo[]>({
    queryKey: ["/api/admin/sessions"],
    enabled: !!user && user.role === "admin" && activeTab === "sessions",
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PATCH", `/api/admin/users/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/analytics"] });
      toast({ title: "User updated" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/analytics"] });
      toast({ title: "User deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PATCH", `/api/admin/orders/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/analytics"] });
      toast({ title: "Order updated" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const revokeSessionMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/sessions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sessions"] });
      toast({ title: "Session revoked" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/analytics"] });
      setIsProductDialogOpen(false);
      resetProductForm();
      toast({ title: "Product created" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest("PATCH", `/api/admin/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      setIsProductDialogOpen(false);
      setEditingProduct(null);
      resetProductForm();
      toast({ title: "Product updated" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/analytics"] });
      toast({ title: "Product deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      features: "",
      type: "product",
    });
  };

  const openProductDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        description: product.description,
        price: String(product.price / 100),
        category: product.category,
        image: product.image,
        features: product.features.join("\n"),
        type: product.type,
      });
    } else {
      setEditingProduct(null);
      resetProductForm();
    }
    setIsProductDialogOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: productForm.name,
      description: productForm.description,
      price: Math.round(parseFloat(productForm.price) * 100),
      category: productForm.category,
      image: productForm.image,
      features: productForm.features.split("\n").filter(f => f.trim()),
      type: productForm.type,
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Terminal className="h-8 w-8 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-slate-400 font-mono text-sm">&gt; loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Control Panel</h1>
              <p className="text-xs text-slate-400 font-mono">Logged in as {user.displayName || user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-slate-400 hover:text-white text-sm">
              View Site →
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-400 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-900/50 border border-white/10 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-primary">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-primary">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-primary">
              <Eye className="h-4 w-4 mr-2" />
              Sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-900/50 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Users</p>
                      <p className="text-3xl font-bold text-white">{analytics?.totalUsers ?? 0}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Products</p>
                      <p className="text-3xl font-bold text-white">{analytics?.totalProducts ?? 0}</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Orders</p>
                      <p className="text-3xl font-bold text-white">{analytics?.totalOrders ?? 0}</p>
                    </div>
                    <div className="h-12 w-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold text-emerald-400">
                        {formatCurrency(analytics?.totalRevenue ?? 0)}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-emerald-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics?.recentOrders?.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No orders yet</p>
                ) : (
                  <div className="space-y-3">
                    {analytics?.recentOrders?.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Order #{order.id}</p>
                          <p className="text-slate-400 text-sm">{order.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-400 font-medium">{formatCurrency(order.total)}</p>
                          <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-slate-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-8">
                    <Terminal className="h-6 w-6 animate-pulse text-primary mx-auto mb-2" />
                    <p className="text-slate-400 font-mono text-sm">&gt; loading_users...</p>
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No users found</p>
                ) : (
                  <div className="space-y-3">
                    {users.map((u: any) => (
                      <div key={u.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold">
                            {u.displayName?.[0]?.toUpperCase() || u.email[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-medium">{u.displayName || "No name"}</p>
                            <p className="text-slate-400 text-sm">{u.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                            {u.role}
                          </Badge>
                          <Badge variant={u.status === "active" ? "outline" : "destructive"}>
                            {u.status}
                          </Badge>
                          {u.id !== user.id && (
                            <div className="flex gap-2">
                              <Select
                                value={u.status}
                                onValueChange={(status) => updateUserMutation.mutate({ id: u.id, data: { status } })}
                              >
                                <SelectTrigger className="w-[120px] bg-slate-900 border-white/10">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="locked">Locked</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => deleteUserMutation.mutate(u.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Products</h2>
              <Button onClick={() => openProductDialog()} className="bg-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card className="bg-slate-900/50 border-white/10">
              <CardContent className="pt-6">
                {productsLoading ? (
                  <div className="text-center py-8">
                    <Terminal className="h-6 w-6 animate-pulse text-primary mx-auto mb-2" />
                    <p className="text-slate-400 font-mono text-sm">&gt; loading_products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No products found</p>
                ) : (
                  <div className="space-y-3">
                    {products.map((product: Product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-white font-medium">{product.name}</p>
                            <p className="text-slate-400 text-sm">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-emerald-400 font-bold">{formatCurrency(product.price)}</p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openProductDialog(product)}
                              className="border-white/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => deleteProductMutation.mutate(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card className="bg-slate-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Order Management</CardTitle>
                <CardDescription>View and manage all orders</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <Terminal className="h-6 w-6 animate-pulse text-primary mx-auto mb-2" />
                    <p className="text-slate-400 font-mono text-sm">&gt; loading_orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No orders found</p>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order: Order) => (
                      <div key={order.id} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-white font-medium">Order #{order.id}</p>
                            <p className="text-slate-400 text-sm">{order.email}</p>
                            <p className="text-slate-500 text-xs">{formatDate(order.createdAt.toString())}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-emerald-400 font-bold text-lg">{formatCurrency(order.total)}</p>
                            <Select
                              value={order.status}
                              onValueChange={(status) => updateOrderMutation.mutate({ id: order.id, status })}
                            >
                              <SelectTrigger className="w-[140px] bg-slate-900 border-white/10">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="border-t border-white/5 pt-3">
                          <p className="text-slate-400 text-sm mb-2">Items:</p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item: any, i: number) => (
                              <Badge key={i} variant="outline" className="text-slate-300">
                                {item.name} x{item.quantity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card className="bg-slate-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Active Sessions</CardTitle>
                <CardDescription>Monitor and revoke user sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionsLoading ? (
                  <div className="text-center py-8">
                    <Terminal className="h-6 w-6 animate-pulse text-primary mx-auto mb-2" />
                    <p className="text-slate-400 font-mono text-sm">&gt; loading_sessions...</p>
                  </div>
                ) : sessions.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No active sessions</p>
                ) : (
                  <div className="space-y-3">
                    {sessions.map((session: SessionInfo) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{session.userDisplayName || session.userEmail}</p>
                          <p className="text-slate-400 text-sm">{session.userEmail}</p>
                          <div className="flex gap-3 text-xs text-slate-500 mt-1">
                            <span>IP: {session.ipAddress || "Unknown"}</span>
                            <span>Last seen: {formatDate(session.lastSeenAt)}</span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => revokeSessionMutation.mutate(session.id)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Revoke
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update product details" : "Create a new product listing"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Name</Label>
                <Input
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="bg-slate-800 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Price (USD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="bg-slate-800 border-white/10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Category</Label>
                <Select
                  value={productForm.category}
                  onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-white/10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Templates">Web Templates</SelectItem>
                    <SelectItem value="Developer Tools">Developer Tools</SelectItem>
                    <SelectItem value="Game Scripts">Game Scripts</SelectItem>
                    <SelectItem value="Applications">Applications</SelectItem>
                    <SelectItem value="Misc">Misc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Type</Label>
                <Select
                  value={productForm.type}
                  onValueChange={(value) => setProductForm({ ...productForm, type: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Image URL</Label>
              <Input
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                className="bg-slate-800 border-white/10"
                placeholder="https://..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Description</Label>
              <Textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="bg-slate-800 border-white/10 min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Features (one per line)</Label>
              <Textarea
                value={productForm.features}
                onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                className="bg-slate-800 border-white/10 min-h-[100px]"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary">
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
