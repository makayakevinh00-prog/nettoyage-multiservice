import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Star, Upload } from "lucide-react";

export function TestimonialForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    service: "",
    rating: 5,
    title: "",
    content: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitTestimonial = trpc.testimonials.submit.useMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitTestimonial.mutateAsync({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        service: formData.service,
        rating: formData.rating,
        title: formData.title,
        content: formData.content,
        imageBase64: imagePreview?.split(",")[1],
      });

      toast.success("Merci ! Votre témoignage a été soumis et sera modéré rapidement.");
      setFormData({
        clientName: "",
        clientEmail: "",
        service: "",
        rating: 5,
        title: "",
        content: "",
      });
      setImagePreview(null);
    } catch (error) {
      toast.error("Erreur lors de la soumission du témoignage.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Votre nom</Label>
          <Input
            id="name"
            type="text"
            placeholder="Jean Dupont"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Votre email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jean@example.com"
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="service">Service utilisé</Label>
          <select
            id="service"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            required
          >
            <option value="">Sélectionnez un service</option>
            <option value="Nettoyage Automobile">Nettoyage Automobile</option>
            <option value="Nettoyage Terrasse">Nettoyage Terrasse</option>
            <option value="Nettoyage Tapis">Nettoyage Tapis</option>
            <option value="Nettoyage Balcon">Nettoyage Balcon</option>
            <option value="Nettoyage Façade">Nettoyage Façade</option>
            <option value="Panneaux Solaires">Panneaux Solaires</option>
            <option value="Entretien Jardinage">Entretien Jardinage</option>
            <option value="Nettoyage Professionnel">Nettoyage Professionnel</option>
          </select>
        </div>

        <div>
          <Label>Votre note</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="focus:outline-none"
              >
                <Star
                  size={32}
                  className={`transition-colors ${
                    star <= formData.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="title">Titre du témoignage</Label>
        <Input
          id="title"
          type="text"
          placeholder="Ex: Service excellent et professionnel"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Votre témoignage</Label>
        <Textarea
          id="content"
          placeholder="Décrivez votre expérience avec ProClean Empire..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={5}
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Photo (optionnel)</Label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
            <Upload size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Ajouter une photo</span>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Aperçu"
              className="h-20 w-20 object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !formData.clientName || !formData.clientEmail || !formData.service || !formData.title || !formData.content}
        className="w-full"
      >
        {isSubmitting ? "Envoi en cours..." : "Soumettre mon témoignage"}
      </Button>
    </form>
  );
}
