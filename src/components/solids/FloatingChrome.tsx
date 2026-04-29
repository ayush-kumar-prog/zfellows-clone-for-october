import { MessageCircle } from "lucide-react";

export function FloatingChrome() {
  return (
    <button className="solids-chat" aria-label="Chat">
      <span className="solids-chat__dot" aria-hidden="true" />
      <MessageCircle size={18} strokeWidth={2.2} />
      <span>Chat</span>
    </button>
  );
}
