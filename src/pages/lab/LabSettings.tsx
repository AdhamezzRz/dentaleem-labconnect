import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  CreditCard,
  Package,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const LabSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-foreground">Lab Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your lab configuration</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full max-w-4xl">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Lab Name</Label>
                  <Input defaultValue="Precision Dental Lab" className="mt-2" />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    defaultValue="State-of-the-art dental lab specializing in CAD/CAM prosthetics"
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Email</Label>
                    <Input type="email" defaultValue="info@precisionlab.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>Contact Phone</Label>
                    <Input defaultValue="+20 123 456 7890" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Lab Address
                  </Label>
                  <Textarea
                    defaultValue="123 Medical Street, Nasr City, Cairo, Egypt"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Operating Hours
                  </Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Input placeholder="Monday - Friday" defaultValue="9:00 AM - 6:00 PM" />
                    <Input placeholder="Saturday" defaultValue="9:00 AM - 2:00 PM" />
                  </div>
                </div>

                <Button onClick={handleSave}>Save General Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Settings */}
          <TabsContent value="technical" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Materials & Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Supported Materials</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Zirconia", "E-max", "PMMA", "Layered Ceramics", "Metal", "Composite"].map(
                      (material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox id={material} defaultChecked />
                          <label htmlFor={material} className="text-sm text-foreground">
                            {material}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Technologies</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "CAD/CAM",
                      "3D Printing",
                      "Milling Machines",
                      "Digital Scanners",
                      "Layering Ovens",
                      "AI-Assisted Design",
                    ].map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <Checkbox id={tech} defaultChecked />
                        <label htmlFor={tech} className="text-sm text-foreground">
                          {tech}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Equipment List (Optional)</Label>
                  <Textarea
                    placeholder="List your key equipment and machines..."
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <Button onClick={handleSave}>Save Technical Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Settings */}
          <TabsContent value="business" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Default Turnaround Time (days)</Label>
                  <Input type="number" defaultValue="5" className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Average turnaround for standard cases
                  </p>
                </div>

                <div>
                  <Label>Remake Policy</Label>
                  <Textarea
                    defaultValue="Free remakes within 30 days for manufacturing defects"
                    className="mt-2 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label>Return Policy</Label>
                  <Textarea
                    defaultValue="Returns accepted within 7 days of delivery"
                    className="mt-2 min-h-[80px]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Accept International Orders</p>
                    <p className="text-xs text-muted-foreground">
                      Allow dentists from other countries to place orders
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Auto-Accept Orders</p>
                    <p className="text-xs text-muted-foreground">
                      Automatically accept orders without manual approval
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button onClick={handleSave}>Save Business Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">New Case Notifications</p>
                    <p className="text-xs text-muted-foreground">Get notified when new cases arrive</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Design Approval Requests</p>
                    <p className="text-xs text-muted-foreground">
                      Notify when dentist approves or requests changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Payment Notifications</p>
                    <p className="text-xs text-muted-foreground">Get notified on payments received</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Chat Messages</p>
                    <p className="text-xs text-muted-foreground">Notify on new chat messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Case Stage Updates</p>
                    <p className="text-xs text-muted-foreground">
                      Notify when cases move to different stages
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Weekly Summary Email</p>
                    <p className="text-xs text-muted-foreground">
                      Receive weekly performance summary
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button onClick={handleSave}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security & Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Change Password</Label>
                  <div className="space-y-3 mt-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button className="mt-3" variant="outline">
                    Update Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">
                      Add extra security to your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div>
                  <Label>Active Sessions</Label>
                  <div className="mt-2 space-y-2">
                    {[
                      { device: "Chrome on Windows", location: "Cairo, Egypt", current: true },
                      { device: "Safari on iPhone", location: "Cairo, Egypt", current: false },
                    ].map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">{session.device}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.location} {session.current && "• Current session"}
                          </p>
                        </div>
                        {!session.current && (
                          <Button variant="ghost" size="sm">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>API Keys (Coming Soon)</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Generate API keys for third-party integrations
                  </p>
                  <Button className="mt-2" variant="outline" disabled>
                    Manage API Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing & Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-foreground">Payout Account</p>
                      <p className="text-xs text-muted-foreground">Where you receive payments</p>
                    </div>
                    <Badge className="bg-accent">Verified</Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      Bank: <span className="text-foreground">National Bank of Egypt</span>
                    </p>
                    <p className="text-muted-foreground">
                      Account: <span className="text-foreground">****1234</span>
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Update Bank Account
                  </Button>
                </div>

                <div>
                  <Label>Payment Terms</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    30% deposit at order, 70% on delivery confirmation
                  </p>
                </div>

                <div>
                  <Label>Tax Information</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Input placeholder="Tax ID / VAT Number" />
                    <Input placeholder="Tax Certificate" />
                  </div>
                </div>

                <div>
                  <Label>Invoice Details</Label>
                  <Textarea
                    placeholder="Additional information to include on invoices"
                    className="mt-2 min-h-[80px]"
                  />
                </div>

                <Button onClick={handleSave}>Save Billing Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LabSettings;
