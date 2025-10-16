import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Paperclip, StickyNote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender: string;
  role: "dentist" | "lab";
  message: string;
  timestamp: string;
  attachment?: string;
}

interface Note {
  id: string;
  content: string;
  timestamp: string;
}

interface CommunicationSectionProps {
  messages: Message[];
  notes: Note[];
  unreadCount?: number;
  onSendMessage: (message: string) => void;
  onSaveNote: (note: string) => void;
}

export const CommunicationSection = ({
  messages,
  notes,
  unreadCount = 0,
  onSendMessage,
  onSaveNote,
}: CommunicationSectionProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [newNote, setNewNote] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the lab",
    });
  };

  const handleSaveNote = () => {
    if (!newNote.trim()) return;
    onSaveNote(newNote);
    setNewNote("");
    toast({
      title: "Note Saved",
      description: "Your private note has been saved",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Communication & Notes
        </h2>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            {unreadCount} New
          </Badge>
        )}
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="notes">
            <StickyNote className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto border border-border rounded-lg p-4 space-y-3 bg-muted/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "dentist" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.role === "dentist"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold">{msg.sender}</span>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {msg.role}
                    </Badge>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                  {msg.attachment && (
                    <div className="mt-2 text-xs opacity-80 flex items-center gap-1">
                      <Paperclip className="h-3 w-3" />
                      {msg.attachment}
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs mt-1">Start a conversation with the lab</p>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[80px]"
            />
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          {/* Private Notes */}
          <div className="h-[400px] overflow-y-auto border border-border rounded-lg p-4 space-y-3 bg-muted/20">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded"
              >
                <p className="text-sm text-foreground">{note.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(note.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <StickyNote className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notes yet</p>
                  <p className="text-xs mt-1">Add private notes for yourself</p>
                </div>
              </div>
            )}
          </div>

          {/* Note Input */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Add a private note (only visible to you)..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[80px]"
            />
            <Button size="icon" onClick={handleSaveNote}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
