import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Image, Upload, File } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: "stl" | "xray" | "photo" | "pdf" | "other";
  uploadedBy: "dentist" | "lab" | "system";
  uploadDate: string;
  url: string;
}

interface FilesSectionProps {
  files: FileItem[];
  onUpload: () => void;
}

const getFileIcon = (type: string) => {
  const icons = {
    stl: FileText,
    xray: Image,
    photo: Image,
    pdf: FileText,
    other: File,
  };
  return icons[type as keyof typeof icons] || File;
};

const getFileTypeColor = (type: string) => {
  const colors = {
    stl: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    xray: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    photo: "bg-secondary/20 text-secondary-foreground border-secondary/30",
    pdf: "bg-red-500/10 text-red-600 border-red-500/20",
    other: "bg-muted text-muted-foreground",
  };
  return colors[type as keyof typeof colors] || colors.other;
};

const getUploaderColor = (uploader: string) => {
  const colors = {
    dentist: "bg-primary/10 text-primary border-primary/20",
    lab: "bg-secondary/20 text-secondary-foreground border-secondary/30",
    system: "bg-muted text-muted-foreground",
  };
  return colors[uploader as keyof typeof colors] || colors.system;
};

export const FilesSection = ({ files, onUpload }: FilesSectionProps) => {
  const groupedFiles = files.reduce((acc, file) => {
    const key = `${file.uploadedBy}-${file.type}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(file);
    return acc;
  }, {} as Record<string, FileItem[]>);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Uploaded Files
        </h2>
        <Button onClick={onUpload} size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Upload More
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length > 0 ? (
              files.map((file) => {
                const Icon = getFileIcon(file.type);
                return (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {file.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getFileTypeColor(file.type)}
                      >
                        {file.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getUploaderColor(file.uploadedBy)}
                      >
                        {file.uploadedBy}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No files uploaded yet
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
