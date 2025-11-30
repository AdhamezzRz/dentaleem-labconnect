import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, User, Building2, Calendar, Package, 
  Upload, CheckCircle2, XCircle, Truck, MessageSquare,
  FileText, Image as ImageIcon
} from "lucide-react";

const LabCaseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const caseData = {
    id: "PO-2025-001",
    dentist: "Dr. Ahmed Helmy",
    clinic: "Smile Clinic Cairo",
    patient: "A.M.",
    material: "Zirconia Crown",
    count: 2,
    teethNumbers: "11, 21",
    priority: "Urgent",
    dueDate: "25 Jan 2025",
    status: "Design",
    paymentStatus: "Paid",
    notes: "Patient prefers lighter shade. Please ensure proper margin fit.",
  };

  const qcChecklist = [
    { id: "margins", label: "Margins Checked", checked: false },
    { id: "shade", label: "Shade Match", checked: false },
    { id: "fit", label: "Fit Accuracy", checked: false },
    { id: "surface", label: "Surface Finish", checked: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/lab/production-board">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Case {caseData.id}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant={caseData.priority === "Urgent" ? "destructive" : "secondary"}>
                    {caseData.priority}
                  </Badge>
                  <Badge variant="outline">{caseData.status}</Badge>
                  <Badge className="bg-accent text-accent-foreground">{caseData.paymentStatus}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Dentist
              </Button>
              <Button>Update Stage</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Mobile: Horizontal Scrolling Tabs */}
              <div className="overflow-x-auto -mx-3 px-3 mb-4 md:hidden">
                <TabsList className="inline-flex w-auto min-w-max">
                  <TabsTrigger value="overview" className="text-xs px-3">Overview</TabsTrigger>
                  <TabsTrigger value="design" className="text-xs px-3">Design</TabsTrigger>
                  <TabsTrigger value="production" className="text-xs px-3">Production</TabsTrigger>
                  <TabsTrigger value="qc" className="text-xs px-3">QC</TabsTrigger>
                  <TabsTrigger value="delivery" className="text-xs px-3">Delivery</TabsTrigger>
                </TabsList>
              </div>
              
              {/* Desktop: Full Width Tabs */}
              <TabsList className="hidden md:grid grid-cols-5 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="production">Production</TabsTrigger>
                <TabsTrigger value="qc">QC</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Dentist</Label>
                        <p className="font-medium text-foreground">{caseData.dentist}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Clinic</Label>
                        <p className="font-medium text-foreground">{caseData.clinic}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Patient</Label>
                        <p className="font-medium text-foreground">{caseData.patient}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Due Date</Label>
                        <p className="font-medium text-foreground">{caseData.dueDate}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Material</Label>
                        <p className="font-medium text-foreground">{caseData.material}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Teeth Numbers</Label>
                        <p className="font-medium text-foreground">{caseData.teethNumbers}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Notes from Dentist</Label>
                      <p className="text-sm text-foreground mt-2 p-3 bg-muted rounded-md">
                        {caseData.notes}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border rounded-lg p-3 hover:bg-accent/5 cursor-pointer">
                          <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-xs text-foreground font-medium">scan_{i}.stl</p>
                          <p className="text-xs text-muted-foreground">2.4 MB</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Design & Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Assign Designer</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select designer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ahmed">Ahmed - CAD Designer</SelectItem>
                          <SelectItem value="lina">Lina - Senior Designer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Upload Design Files</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          STL, OBJ, or images
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label>Design Notes</Label>
                      <Textarea 
                        placeholder="Add notes about the design..."
                        className="mt-2"
                      />
                    </div>

                    <Button className="w-full">Send for Dentist Approval</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="production" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Production Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Assign Technician</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select technician" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mohamed">Mohamed - Ceramist</SelectItem>
                          <SelectItem value="sara">Sara - Senior Technician</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Production Checklist</Label>
                      {["Milling Complete", "Glazing Complete", "Finishing Complete"].map((task) => (
                        <div key={task} className="flex items-center space-x-2">
                          <Checkbox id={task} />
                          <label htmlFor={task} className="text-sm text-foreground">
                            {task}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div>
                      <Label>Upload Production Photos</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload finished restoration photos
                        </p>
                      </div>
                    </div>

                    <Button className="w-full">Move to Quality Control</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="qc" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Control</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>QC Inspector</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="khaled">Khaled - QC Manager</SelectItem>
                          <SelectItem value="nour">Nour - QC Inspector</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>QC Checklist</Label>
                      {qcChecklist.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <Checkbox id={item.id} checked={item.checked} />
                          <label htmlFor={item.id} className="text-sm text-foreground">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div>
                      <Label>QC Verification Photo</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload QC verification photo
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label>QC Notes</Label>
                      <Textarea 
                        placeholder="Add any QC observations..."
                        className="mt-2"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" variant="default">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Pass QC
                      </Button>
                      <Button className="flex-1" variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Fail QC
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="delivery" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery & Courier</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Courier Name</Label>
                      <Input placeholder="Enter courier company name" />
                    </div>

                    <div>
                      <Label>Tracking Number</Label>
                      <Input placeholder="Enter tracking number" />
                    </div>

                    <div>
                      <Label>Upload Airway Bill</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                        <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload airway bill document
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label>Proof of Shipment</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload proof of shipment
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label>Delivery Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending Pickup</SelectItem>
                          <SelectItem value="transit">In Transit</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
                      <Truck className="mr-2 h-4 w-4" />
                      Confirm Shipment
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Dentist:</span>
                  <span className="font-medium text-foreground">{caseData.dentist}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Clinic:</span>
                  <span className="font-medium text-foreground">{caseData.clinic}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Due:</span>
                  <span className="font-medium text-foreground">{caseData.dueDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Items:</span>
                  <span className="font-medium text-foreground">{caseData.count}× {caseData.material}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "New", date: "Jan 20, 10:00 AM", status: "completed" },
                    { stage: "Design", date: "Jan 21, 2:30 PM", status: "current" },
                    { stage: "Production", date: "Pending", status: "pending" },
                    { stage: "QC", date: "Pending", status: "pending" },
                    { stage: "Delivery", date: "Pending", status: "pending" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`mt-1 w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-accent' :
                        item.status === 'current' ? 'bg-primary' :
                        'bg-muted'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.stage}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabCaseDetail;
