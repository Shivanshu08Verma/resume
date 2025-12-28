import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Lock,
  Mail,
  Archive,
  CheckCircle,
  Clock,
  ShieldAlert,
  MailOpen,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type AdminStep = "hidden" | "trigger" | "auth" | "dashboard";
type FilterTab = "unread" | "read" | "archived";

interface Message {
  id: number;
  created_at: string;
  name: string;
  full_name?: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
}

export default function AdminOverlay() {
  const [step, setStep] = useState<AdminStep>("hidden");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>("unread");
  const { toast } = useToast();

  const toggleOverlay = () => {
    setStep((prev) => (prev === "hidden" ? "trigger" : "hidden"));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "M" || e.key === "m")) {
        e.preventDefault();
        toggleOverlay();
      }
    };

    let clickCount = 0;
    let clickTimer: ReturnType<typeof setTimeout>;

    const handleClick = () => {
      clickCount++;
      if (clickCount === 3) {
        toggleOverlay();
        clickCount = 0;
      }

      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 500);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
      clearTimeout(clickTimer);
    };
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    if (password === correctPassword) {
      setStep("dashboard");
      fetchMessages();
      setPassword("");
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect Password",
        variant: "destructive",
      });
    }
  };

  const updateMessageStatus = async (id: number, updates: Partial<Message>) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, ...updates } : m)));

    const { error } = await supabase
      .from("messages")
      .update(updates)
      .eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: "Update failed",
        variant: "destructive",
      });
      fetchMessages();
    }
  };

  const deleteMessage = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this message? This cannot be undone."
      )
    )
      return;

    setMessages(messages.filter((m) => m.id !== id));

    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Delete failed",
        variant: "destructive",
      });
      fetchMessages();
    } else {
      toast({ title: "Deleted", description: "Message permanently removed." });
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (activeTab === "unread") return !m.is_read && !m.is_archived;
    if (activeTab === "read") return m.is_read && !m.is_archived;
    if (activeTab === "archived") return m.is_archived;
    return true;
  });

  const counts = {
    unread: messages.filter((m) => !m.is_read && !m.is_archived).length,
    read: messages.filter((m) => m.is_read && !m.is_archived).length,
    archived: messages.filter((m) => m.is_archived).length,
  };

  if (step === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {step === "trigger" && (
        <div
          className="pointer-events-auto cursor-pointer animate-fade-in-up fixed bottom-6 right-6 z-[100]"
          onClick={() => setStep("auth")}
        >
          <div className="glass-card p-4 rounded-full border-primary/50 neon-glow hover:scale-105 transition-smooth bg-black/80 backdrop-blur-md flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-primary animate-pulse" />
            <span className="font-bold text-primary text-sm hidden sm:inline">
              Admin
            </span>
          </div>
        </div>
      )}

      {step === "auth" && (
        <div className="pointer-events-auto fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-xs sm:max-w-sm glass-card border-primary/30">
            <CardHeader className="relative pb-2">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => setStep("hidden")}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="text-center text-xl neon-text">
                Security Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-9 bg-black/50 border-primary/20 focus-visible:ring-primary h-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/80 text-black font-bold h-10"
                >
                  Access Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {step === "dashboard" && (
        <div className="pointer-events-auto fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col animate-fade-in">
          {/* Header */}
          <div className="glass-nav border-b border-primary/20 p-3 sm:p-4 sticky top-0 z-10 bg-black/90 backdrop-blur-xl">
            <div className="container mx-auto max-w-6xl flex flex-col gap-3">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold neon-text">
                    Messages
                  </h2>
                  {counts.unread > 0 && (
                    <Badge className="bg-primary text-black hover:bg-primary text-[10px] sm:text-xs h-5 px-1.5">
                      {counts.unread} New
                    </Badge>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep("hidden")}
                  className="md:hidden text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 w-full">
                <div className="grid grid-cols-3 sm:flex bg-secondary/20 p-1 rounded-lg gap-1">
                  {/* Unread Tab */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("unread")}
                    className={cn(
                      "rounded-md text-[10px] sm:text-xs md:text-sm h-8",
                      activeTab === "unread"
                        ? "bg-primary text-black shadow-sm"
                        : "text-gray-400 hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    Unread ({counts.unread})
                  </Button>
                  {/* Read Tab */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("read")}
                    className={cn(
                      "rounded-md text-[10px] sm:text-xs md:text-sm h-8",
                      activeTab === "read"
                        ? "bg-primary text-black shadow-sm"
                        : "text-gray-400 hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    Read ({counts.read})
                  </Button>
                  {/* Archived Tab */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("archived")}
                    className={cn(
                      "rounded-md text-[10px] sm:text-xs md:text-sm h-8",
                      activeTab === "archived"
                        ? "bg-primary text-black shadow-sm"
                        : "text-gray-400 hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    Archived ({counts.archived})
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep("hidden")}
                  className="hidden md:flex text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 smooth-scroll bg-gradient-to-b from-black/50 to-transparent">
            <div className="container mx-auto max-w-5xl space-y-4 pb-20">
              {loading ? (
                <div className="flex flex-col items-center justify-center mt-20 gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-primary text-sm animate-pulse">
                    Syncing Database...
                  </p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-500 gap-4 text-center px-4">
                  <div className="bg-white/5 p-4 rounded-full">
                    <MailOpen className="h-8 w-8 opacity-50" />
                  </div>
                  <p className="text-sm">No {activeTab} messages found.</p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "glass-card p-4 md:p-6 rounded-xl border transition-all duration-300 flex flex-col gap-4 animate-fade-in-up",
                      !msg.is_read
                        ? "border-primary/40 bg-primary/5 shadow-[0_0_15px_rgba(0,255,255,0.05)]"
                        : "border-white/5 opacity-80 hover:opacity-100"
                    )}
                  >
                    {/* Message Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-full">
                            {msg.full_name || msg.name || "Anonymous"}
                          </h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] h-5 px-1.5 border-opacity-50",
                              msg.is_read
                                ? "text-gray-400 border-gray-500"
                                : "text-primary border-primary"
                            )}
                          >
                            {activeTab === "archived"
                              ? "Archived"
                              : msg.is_read
                              ? "Read"
                              : "New"}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-primary/80 break-all">
                          {msg.email}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-500 text-[10px] sm:text-xs shrink-0 bg-black/20 px-2 py-1 rounded-full w-fit">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                        <span className="opacity-50">|</span>
                        <span>
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="bg-black/40 p-3 sm:p-4 rounded-lg border border-white/5">
                      <h4 className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                        Subject
                      </h4>
                      <p className="text-sm font-medium text-gray-200 mb-3 break-words">
                        {msg.subject}
                      </p>

                      <div className="w-full h-px bg-white/5 mb-3"></div>

                      <h4 className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                        Message
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
                        {msg.message}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 justify-end pt-2">
                      {!msg.is_archived && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className={cn(
                            "h-8 text-xs flex-1 sm:flex-none border border-transparent hover:border-white/10",
                            msg.is_read
                              ? "text-gray-400 hover:text-white"
                              : "text-primary hover:bg-primary/10"
                          )}
                          onClick={() =>
                            updateMessageStatus(msg.id, {
                              is_read: !msg.is_read,
                            })
                          }
                        >
                          {msg.is_read ? (
                            <>
                              <Mail className="h-3.5 w-3.5 mr-1.5" /> Mark
                              Unread
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />{" "}
                              Mark Read
                            </>
                          )}
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-xs flex-1 sm:flex-none text-gray-400 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5"
                        onClick={() =>
                          updateMessageStatus(msg.id, {
                            is_archived: !msg.is_archived,
                          })
                        }
                      >
                        {msg.is_archived ? (
                          <>
                            <Archive className="h-3.5 w-3.5 mr-1.5" /> Unarchive
                          </>
                        ) : (
                          <>
                            <Archive className="h-3.5 w-3.5 mr-1.5" /> Archive
                          </>
                        )}
                      </Button>

                      {/* Delete Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-xs flex-1 sm:flex-none text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                        onClick={() => deleteMessage(msg.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
