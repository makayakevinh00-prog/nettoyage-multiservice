import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface ServiceRatingProps {
  serviceName: string;
  onSubmit?: (rating: number, comment: string) => void;
}

export default function ServiceRating({ serviceName, onSubmit }: ServiceRatingProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Veuillez sélectionner une note");
      return;
    }

    onSubmit?.(rating, comment);
    
    toast.success("Merci pour votre avis ! 🌟");
    setRating(0);
    setComment("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Notez le service "{serviceName}"
      </h3>

      {/* Star Rating */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={`${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Rating Text */}
      {rating > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          {rating === 1 && "😞 Très insatisfait"}
          {rating === 2 && "😕 Insatisfait"}
          {rating === 3 && "😐 Satisfait"}
          {rating === 4 && "😊 Très satisfait"}
          {rating === 5 && "🤩 Excellent !"}
        </p>
      )}

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Partagez votre expérience (optionnel)..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
          submitted
            ? "bg-green-500 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {submitted ? "✓ Merci pour votre avis !" : "Soumettre mon avis"}
      </button>

      {/* Info */}
      <p className="text-xs text-gray-600 mt-3 text-center">
        Votre avis nous aide à améliorer nos services
      </p>
    </div>
  );
}
