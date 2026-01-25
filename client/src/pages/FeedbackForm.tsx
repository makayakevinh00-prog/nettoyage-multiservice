import { useState } from "react";
import { useSearchParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function FeedbackForm() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const email = searchParams.get("email");

  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    rating: 5,
    comment: "",
    serviceQuality: 5,
    punctuality: 5,
    professionalism: 5,
  });

  const mutation = trpc.feedback.submitFeedback.useMutation({
    onSuccess: () => {
      toast.success("Merci pour votre avis ! Nous l'apprécions beaucoup.");
      setFormData({
        name: "",
        email: email || "",
        rating: 5,
        comment: "",
        serviceQuality: 5,
        punctuality: 5,
        professionalism: 5,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de l'envoi");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) {
      toast.error("ID de réservation manquant");
      return;
    }
    mutation.mutate({
      bookingId: parseInt(bookingId),
      ...formData,
    });
  };

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Donnez-nous votre avis</CardTitle>
            <CardDescription>
              Votre feedback nous aide à améliorer nos services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-900">Évaluez votre expérience :</p>
                
                <StarRating
                  label="Note globale"
                  value={formData.rating}
                  onChange={(v) => setFormData({ ...formData, rating: v })}
                />
                
                <StarRating
                  label="Qualité du service"
                  value={formData.serviceQuality}
                  onChange={(v) => setFormData({ ...formData, serviceQuality: v })}
                />
                
                <StarRating
                  label="Ponctualité"
                  value={formData.punctuality}
                  onChange={(v) => setFormData({ ...formData, punctuality: v })}
                />
                
                <StarRating
                  label="Professionnalisme"
                  value={formData.professionalism}
                  onChange={(v) => setFormData({ ...formData, professionalism: v })}
                />
              </div>

              <div>
                <Label htmlFor="comment">Commentaire (optionnel)</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Partagez votre expérience avec ProClean Empire..."
                  rows={5}
                />
              </div>

              <Button type="submit" disabled={mutation.isPending} className="w-full">
                {mutation.isPending ? "Envoi..." : "Envoyer mon avis"}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Votre avis sera modéré avant publication
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
