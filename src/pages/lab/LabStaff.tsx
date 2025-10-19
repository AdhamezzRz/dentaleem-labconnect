import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Search, Mail, Phone } from "lucide-react";

const LabStaff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const staff = [
    { 
      id: 1, 
      name: "Ahmed Mohamed", 
      role: "Designer", 
      email: "ahmed@precisionlab.com",
      phone: "+20 123 456 7890",
      activeCases: 5,
      completedCases: 84,
      status: "Active"
    },
    { 
      id: 2, 
      name: "Lina Hassan", 
      role: "Designer", 
      email: "lina@precisionlab.com",
      phone: "+20 123 456 7891",
      activeCases: 3,
      completedCases: 92,
      status: "Active"
    },
    { 
      id: 3, 
      name: "Mohamed Ali", 
      role: "Ceramist", 
      email: "mohamed@precisionlab.com",
      phone: "+20 123 456 7892",
      activeCases: 7,
      completedCases: 156,
      status: "Active"
    },
    { 
      id: 4, 
      name: "Sara Ibrahim", 
      role: "Ceramist", 
      email: "sara@precisionlab.com",
      phone: "+20 123 456 7893",
      activeCases: 4,
      completedCases: 123,
      status: "Active"
    },
    { 
      id: 5, 
      name: "Khaled Youssef", 
      role: "QC Manager", 
      email: "khaled@precisionlab.com",
      phone: "+20 123 456 7894",
      activeCases: 2,
      completedCases: 67,
      status: "Active"
    },
    { 
      id: 6, 
      name: "Nour Farid", 
      role: "QC Manager", 
      email: "nour@precisionlab.com",
      phone: "+20 123 456 7895",
      activeCases: 1,
      completedCases: 45,
      status: "Active"
    },
  ];

  const roleColors: Record<string, string> = {
    Designer: "bg-primary/10 text-primary",
    Ceramist: "bg-accent/20 text-accent",
    "QC Manager": "bg-yellow-100 text-yellow-700",
    "Courier Manager": "bg-purple-100 text-purple-700",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
              <p className="text-muted-foreground mt-1">Manage your lab team and workload</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Staff Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" className="mt-2" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="ceramist">Ceramist</SelectItem>
                        <SelectItem value="qc">QC Manager</SelectItem>
                        <SelectItem value="courier">Courier Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="+20 123 456 7890" className="mt-2" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                      Add Staff
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Staff</p>
                  <p className="text-3xl font-bold text-foreground">{staff.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Designers</p>
                <p className="text-3xl font-bold text-foreground">
                  {staff.filter(s => s.role === "Designer").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Technicians</p>
                <p className="text-3xl font-bold text-foreground">
                  {staff.filter(s => s.role === "Ceramist").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">QC Team</p>
                <p className="text-3xl font-bold text-foreground">
                  {staff.filter(s => s.role === "QC Manager").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-[300px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Active Cases</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[member.role]}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{member.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{member.activeCases}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.completedCases}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-accent">
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          View Tasks
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Workload Distribution */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Workload Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staff.map((member) => (
                <div key={member.id} className="flex items-center gap-4">
                  <div className="w-48">
                    <p className="font-medium text-sm text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">
                        {member.activeCases} active cases
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${(member.activeCases / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Assign Case
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabStaff;
