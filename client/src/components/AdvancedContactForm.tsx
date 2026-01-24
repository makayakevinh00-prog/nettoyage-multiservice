import { useState } from "react";
import { Upload, Send, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  city: string;
  description: string;
  photo: File | null;
}

const services = [
  "Nettoyage Automobile",
  "Nettoyage Tapis & Canapé",
  "Nettoyage Terrasse",
  "Nettoyage Balcon",
  "Nettoyage Jardinage",
  "Nettoyage Façade",
  "Nettoyage Piscine",
  "Nettoyage Panneaux Solaires",
  "Autre"
];

const cities = [
  "Paris (75)",
  "Seine-et-Marne (77)",
  "Yvelines (78)",
  "Essonne (91)",
  "Hauts-de-Seine (92)",
  "Seine-Saint-Denis (93)",
  "Val-de-Marne (94)",
  "Val-d'Oise (95)"
];

export default function AdvancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    city: "",
    description: "",
    photo: null
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La photo doit faire moins de 5MB");
        return;
      }

      setFormData(prev => ({
        ...prev,
        photo: file
      }));

      // Créer un aperçu
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceType || !formData.city) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire
      // En production, vous enverriez les données au serveur
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        city: "",
        description: "",
        photo: null
      });
      setPhotoPreview(null);
      setSubmitted(true);

      toast.success("Votre demande a été envoyée avec succès !");

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">Merci !</h3>
        <p className="text-green-700 mb-4">
          Votre demande de contact a été reçue. Notre équipe vous contactera sous 30 minutes.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          className="bg-green-600 hover:bg-green-700"
        >
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Formulaire de Contact Avancé</h2>
      <p className="text-gray-600 mb-8">Décrivez votre besoin en détail pour un devis précis</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Nom */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Jean Dupont"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="jean@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Téléphone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="06 12 34 56 78"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Type de prestation */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Type de prestation *
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Sélectionnez un service</option>
            {services.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ville / Département *
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Sélectionnez votre ville</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description du problème
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Décrivez en détail le problème (ex: tache de vin sur canapé, voiture très sale, terrasse moussue, etc.)"
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Upload Photo */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Joindre une photo (optionnel)
        </label>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="photo-input"
          />
          <label htmlFor="photo-input" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-semibold mb-1">
              Cliquez pour ajouter une photo
            </p>
            <p className="text-sm text-gray-500">
              ou glissez-déposez une image (max 5MB)
            </p>
          </label>
        </div>

        {/* Photo Preview */}
        {photoPreview && (
          <div className="mt-4 relative">
            <img
              src={photoPreview}
              alt="Aperçu"
              className="w-full max-h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setPhotoPreview(null);
                setFormData(prev => ({ ...prev, photo: null }));
              }}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
            >
              ✕
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Fichier : {formData.photo?.name}
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Nous vous garantissons une réponse sous 30 minutes. Vos données sont sécurisées et ne seront jamais partagées.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
      >
        <Send size={20} />
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
