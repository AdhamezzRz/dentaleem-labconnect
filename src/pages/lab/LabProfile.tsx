import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Award, Upload, Eye } from "lucide-react";

const LabProfile = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const services = [
    "Crown", "Veneer", "Bridge", "Implant", "Ortho Appliance", 
    "Clear Aligners", "PMMA Try-Ins", "Dentures"
  ];

  const materials = [
    "Zirconia", "Emax", "PMMA", "Layered Ceramics", "Metal"
  ];

  const technologies = [
    "CAD/CAM", "3D Printing", "Milling", "Layered Ceramics", 
    "Digital Wax-Up", "AI-Assisted Design"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Lab Profile Management</h1>
              <p className="text-muted-foreground mt-1">Manage how your lab appears in the marketplace</p>
            </div>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Lab Name</Label>
                      <Input placeholder="Precision Dental Lab" className="mt-2" />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Tell dentists about your lab..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Owner Name</Label>
                        <Input placeholder="Dr. Mohamed Ali" className="mt-2" />
                      </div>
                      <div>
                        <Label>Years in Operation</Label>
                        <Input type="number" placeholder="10" className="mt-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Contact Email</Label>
                        <Input type="email" placeholder="info@precisionlab.com" className="mt-2" />
                      </div>
                      <div>
                        <Label>Contact Phone</Label>
                        <Input placeholder="+20 123 456 7890" className="mt-2" />
                      </div>
                    </div>

                    <div>
                      <Label>Lab Cover Photo</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload lab cover photo
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recommended: 1200x400px
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label>Lab Logo</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/5 cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload lab logo
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recommended: 400x400px
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Services & Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Services Offered</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {services.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox id={service} />
                            <label htmlFor={service} className="text-sm text-foreground">
                              {service}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="mb-3 block">Materials Supported</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {materials.map((material) => (
                          <div key={material} className="flex items-center space-x-2">
                            <Checkbox id={material} />
                            <label htmlFor={material} className="text-sm text-foreground">
                              {material}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="mb-3 block">Technologies Used</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {technologies.map((tech) => (
                          <div key={tech} className="flex items-center space-x-2">
                            <Checkbox id={tech} />
                            <label htmlFor={tech} className="text-sm text-foreground">
                              {tech}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Delivery Coverage</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select coverage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Only</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Turnaround</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Pricing Tier</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Average Turnaround Time (days)</Label>
                      <Input type="number" placeholder="5" className="mt-2" />
                    </div>

                    <div className="space-y-4">
                      <Label className="block">Material Pricing</Label>
                      {[
                        { material: "Zirconia Crown", days: "4-5", price: "900" },
                        { material: "Emax Crown", days: "5-6", price: "1200" },
                        { material: "PMMA Try-In", days: "2-3", price: "400" },
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-3 items-end">
                          <div>
                            <Label className="text-xs">Material</Label>
                            <Input value={item.material} className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs">Turnaround (days)</Label>
                            <Input value={item.days} className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs">Price (EGP)</Label>
                            <Input value={item.price} className="mt-1" />
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        + Add Material
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lab Gallery</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-accent/5 cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload gallery images
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Show your best work, lab equipment, and facilities
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">Image {i}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-1">Gold Certified</Badge>
                    <p className="text-xs text-muted-foreground">
                      Compliant with international standards
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Profile Complete</span>
                    <span className="font-medium text-foreground">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Marketplace Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Profile Views</span>
                  <span className="text-lg font-semibold text-foreground">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <span className="text-lg font-semibold text-foreground">4.8 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Reviews</span>
                  <span className="text-lg font-semibold text-foreground">87</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm text-foreground mb-3">
                  💡 <strong>Pro Tip:</strong> Labs with complete profiles get 3x more inquiries from dentists.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabProfile;
