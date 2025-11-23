import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Paperclip, Image as ImageIcon, FileText } from "lucide-react";

const LabMessages = () => {
  const [selectedChat, setSelectedChat] = useState("PO-2025-001");
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      caseId: "PO-2025-001",
      dentist: "Dr. Ahmed Helmy",
      clinic: "Smile Clinic Cairo",
      lastMessage: "Can you confirm the shade?",
      timestamp: "10 mins ago",
      unread: 2,
      stage: "Design",
    },
    {
      caseId: "PO-2025-002",
      dentist: "Dr. Sara Youssef",
      clinic: "Care Dental",
      lastMessage: "Perfect! Looks great",
      timestamp: "1 hour ago",
      unread: 0,
      stage: "Production",
    },
    {
      caseId: "PO-2025-003",
      dentist: "Dr. Walid Zaki",
      clinic: "Bright Smile",
      lastMessage: "When will this be ready?",
      timestamp: "2 hours ago",
      unread: 1,
      stage: "QC",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "dentist",
      senderName: "Dr. Ahmed Helmy",
      message: "Hi, I just submitted a new case for 2 zirconia crowns. Can you confirm receipt?",
      timestamp: "Yesterday, 4:30 PM",
      attachments: [],
    },
    {
      id: 2,
      sender: "lab",
      senderName: "You",
      message: "Yes, case received! We'll start the design tomorrow morning. ETA: 4 days.",
      timestamp: "Yesterday, 4:45 PM",
      attachments: [],
    },
    {
      id: 3,
      sender: "dentist",
      senderName: "Dr. Ahmed Helmy",
      message: "Great! Just to confirm, the patient prefers shade A2. Also, please ensure tight margins.",
      timestamp: "Today, 9:15 AM",
      attachments: [],
    },
    {
      id: 4,
      sender: "lab",
      senderName: "You",
      message: "Noted. A2 shade confirmed. We'll pay special attention to the margins.",
      timestamp: "Today, 9:20 AM",
      attachments: [],
    },
    {
      id: 5,
      sender: "lab",
      senderName: "You",
      message: "Design is ready! Please review and approve.",
      timestamp: "Today, 2:00 PM",
      attachments: [
        { type: "image", name: "design_preview_UR1.jpg" },
        { type: "file", name: "design_3d_model.stl" },
      ],
    },
    {
      id: 6,
      sender: "dentist",
      senderName: "Dr. Ahmed Helmy",
      message: "Can you confirm the shade? Want to make sure it's A2 not A3.",
      timestamp: "Today, 2:10 PM",
      attachments: [],
    },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Handle send logic here
    setMessageInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">Communicate with dentists about cases</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversation List */}
          <Card className="lg:col-span-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {conversations.map((conv) => (
                <div
                  key={conv.caseId}
                  onClick={() => setSelectedChat(conv.caseId)}
                  className={`p-4 cursor-pointer border-b hover:bg-accent/5 transition-colors ${
                    selectedChat === conv.caseId ? "bg-accent/10 border-l-4 border-l-primary" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {conv.dentist.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{conv.dentist}</p>
                        <p className="text-xs text-muted-foreground">{conv.clinic}</p>
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="ml-12">
                    <p className="text-xs text-foreground font-medium mb-1">Case {conv.caseId}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">{conv.timestamp}</p>
                      <Badge variant="outline" className="text-xs">{conv.stage}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">AH</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">Dr. Ahmed Helmy</p>
                  <p className="text-xs text-muted-foreground">Case PO-2025-001 • Design Stage</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Case Details
              </Button>
            </div>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "lab" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === "lab" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <p className="text-xs text-muted-foreground">{msg.senderName}</p>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.sender === "lab"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      {msg.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {msg.attachments.map((att, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-2 p-2 rounded-lg ${
                                msg.sender === "lab"
                                  ? "bg-primary-foreground/10"
                                  : "bg-background"
                              }`}
                            >
                              {att.type === "image" ? (
                                <ImageIcon className="h-4 w-4" />
                              ) : (
                                <FileText className="h-4 w-4" />
                              )}
                              <span className="text-xs">{att.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LabMessages;
