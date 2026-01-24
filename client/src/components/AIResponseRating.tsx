import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AIResponseRatingProps {
  messageId: string;
  onRate: (messageId: string, rating: "helpful" | "unhelpful") => void;
}

export function AIResponseRating({ messageId, onRate }: AIResponseRatingProps) {
  const [rated, setRated] = useState<"helpful" | "unhelpful" | null>(null);

  const handleRate = (rating: "helpful" | "unhelpful") => {
    setRated(rating);
    onRate(messageId, rating);
    
    if (rating === "helpful") {
      toast.success("Merci ! Votre avis nous aide à améliorer nos réponses.");
    } else {
      toast.info("Nous allons améliorer cette réponse. Merci pour votre retour !");
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2 text-sm">
      <span className="text-gray-500">Utile ?</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleRate("helpful")}
        className={`p-1 ${
          rated === "helpful"
            ? "bg-green-100 text-green-600"
            : "hover:bg-gray-100"
        }`}
      >
        <ThumbsUp size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleRate("unhelpful")}
        className={`p-1 ${
          rated === "unhelpful"
            ? "bg-red-100 text-red-600"
            : "hover:bg-gray-100"
        }`}
      >
        <ThumbsDown size={16} />
      </Button>
    </div>
  );
}
