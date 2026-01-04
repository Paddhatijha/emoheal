"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Users,
  Activity,
  Settings,
  ArrowLeft,
  Trash2,
  Edit,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function AdminContent() {
  const { user } = useAuth()
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "user",
      status: "active",
      lastActive: "2 mins ago",
    },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user", status: "active", lastActive: "5 mins ago" },
    {
      id: "3",
      name: "Carol White",
      email: "carol@example.com",
      role: "guest",
      status: "inactive",
      lastActive: "2 days ago",
    },
    {
      id: "4",
      name: "David Brown",
      email: "david@example.com",
      role: "user",
      status: "active",
      lastActive: "1 hour ago",
    },
    {
      id: "5",
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "admin",
      status: "active",
      lastActive: "Just now",
    },
  ])

  const systemActivities = [
    { id: "1", type: "login", user: "Alice Johnson", action: "Logged in", timestamp: "2 mins ago", status: "success" },
    {
      id: "2",
      type: "detection",
      user: "Bob Smith",
      action: "Started facial emotion detection",
      timestamp: "5 mins ago",
      status: "success",
    },
    {
      id: "3",
      type: "error",
      user: "Carol White",
      action: "Failed login attempt",
      timestamp: "10 mins ago",
      status: "error",
    },
    {
      id: "4",
      type: "register",
      user: "David Brown",
      action: "New user registration",
      timestamp: "1 hour ago",
      status: "success",
    },
    { id: "5", type: "logout", user: "Emma Wilson", action: "Logged out", timestamp: "2 hours ago", status: "success" },
  ]

  const stats = [
    { label: "Total Users", value: users.length.toString(), icon: Users, color: "text-blue-500" },
    {
      label: "Active Sessions",
      value: users.filter((u) => u.status === "active").length.toString(),
      icon: Activity,
      color: "text-green-500",
    },
    { label: "System Activities", value: systemActivities.length.toString(), icon: Brain, color: "text-purple-500" },
  ]

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

  const handleEditUser = (userData: any) => {
    setSelectedUser(userData)
    setShowEditModal(true)
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
  }

  const handleChangeRole = (userId: string, newRole: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">EmoHeal Management</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{user?.name}</p>
            <Badge className="text-xs">Admin</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Account Management</CardTitle>
                <CardDescription>Manage and monitor all registered users</CardDescription>
              </div>
              <div className="w-64">
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((userData) => (
                <div
                  key={userData.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                      {userData.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{userData.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {userData.email}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        Last active: {userData.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={userData.role === "admin" ? "default" : "secondary"}>{userData.role}</Badge>
                    <Badge variant={userData.status === "active" ? "default" : "outline"}>{userData.status}</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleToggleStatus(userData.id)}>
                        {userData.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(userData)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(userData.id)}
                        disabled={userData.id === user?.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Activity Logs</CardTitle>
            <CardDescription>Monitor all system activities and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 border-l-4 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  style={{
                    borderLeftColor:
                      activity.status === "success" ? "#22c55e" : activity.status === "error" ? "#ef4444" : "#64748b",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {activity.status === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : activity.status === "error" ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <Activity className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by <span className="font-medium">{activity.user}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        activity.status === "success"
                          ? "default"
                          : activity.status === "error"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {activity.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {showEditModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowEditModal(false)}
        >
          <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Edit User</CardTitle>
              <CardDescription>Update user information and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input defaultValue={selectedUser.name} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue={selectedUser.email} type="email" />
                </div>
                <div>
                  <Label>Role</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    defaultValue={selectedUser.role}
                    onChange={(e) => handleChangeRole(selectedUser.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="guest">Guest</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => setShowEditModal(false)}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminContent />
    </ProtectedRoute>
  )
}
