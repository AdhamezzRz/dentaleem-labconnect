import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Search, ArrowLeft } from "lucide-react";
import { mockMessages, mockCases } from "@/lib/mockData";

const Messages = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  // Group messages by case
  const messagesByCaseId = mockMessages.reduce((acc, msg) => {
    if (!acc[msg.caseId]) {
      acc[msg.caseId] = [];
    }
    acc[msg.caseId].push(msg);
    return acc;
  }, {} as Record<string, typeof mockMessages>);

  const conversations = Object.keys(messagesByCaseId).map((caseId) => {
    const caseData = mockCases.find((c) => c.id === caseId);
    const messages = messagesByCaseId[caseId];
    const lastMessage = messages[messages.length - 1];
    const unreadCount = messages.filter((m) => !m.read && m.senderRole !== "dentist").length;

    return {
      caseId,
      caseName: caseData?.id || caseId,
      labName: caseData?.labName || "Unknown Lab",
      lastMessage: lastMessage.message,
      timestamp: lastMessage.timestamp,
      unread: unreadCount,
      messages,
    };
  });

  const selectedConversation = conversations.find((c) => c.caseId === selectedCase);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Mock send - in real app would call API
    console.log("Sending:", messageText);
    setMessageText("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground">
              Chat with labs about your cases
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className={`lg:col-span-1 p-3 sm:p-4 flex flex-col ${selectedCase ? 'hidden lg:flex' : 'flex'}`}>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 bg-background"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 -mx-4 px-4">
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.caseId}
                    onClick={() => setSelectedCase(conv.caseId)}
                    className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-accent/50 ${
                      selectedCase === conv.caseId
                        ? "bg-accent"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 bg-primary/10">
                        <AvatarFallback className="text-primary font-semibold">
                          {conv.labName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {conv.labName}
                          </p>
                          {conv.unread > 0 && (
                            <Badge
                              variant="default"
                              className="h-5 min-w-[20px] px-1.5 bg-primary"
                            >
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {conv.caseName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className={`lg:col-span-2 flex flex-col ${selectedCase ? 'flex' : 'hidden lg:flex'}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-border flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-9 w-9"
                    onClick={() => setSelectedCase(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-10 w-10 bg-primary/10">
                    <AvatarFallback className="text-primary font-semibold">
                      {selectedConversation.labName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {selectedConversation.labName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Case: {selectedConversation.caseName}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((msg) => {
                      const isFromDentist = msg.senderRole === "dentist";
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${
                            isFromDentist ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] ${
                              isFromDentist
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            } rounded-2xl px-4 py-2`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isFromDentist
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Choose a case to view messages and chat with the lab
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
