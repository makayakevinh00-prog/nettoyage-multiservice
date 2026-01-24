import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Star, Check, Trash2 } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminTestimonials() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Vous devez être administrateur pour accéder à cette page.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              Retour à l\'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Modération des témoignages
        </h1>

        <div className="grid gap-6">
          <PendingTestimonials />
          <ApprovedTestimonials />
        </div>
      </div>
    </div>
  );
}

function PendingTestimonials() {
  const { data: testimonials = [], refetch } = trpc.admin?.getPendingTestimonials?.useQuery?.() || { data: [] };
  const approveMutation = trpc.admin?.approveTestimonial?.useMutation?.();
  const deleteMutation = trpc.admin?.deleteTestimonial?.useMutation?.();

  const handleApprove = async (id: number) => {
    try {
      await approveMutation?.mutateAsync?.({ id });
      toast.success("Témoignage approuvé");
      refetch?.();
    } catch (error) {
      toast.error("Erreur lors de l'approbation");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
      try {
        await deleteMutation?.mutateAsync?.({ id });
        toast.success("Témoignage supprimé");
        refetch?.();
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Témoignages en attente ({testimonials?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        {!testimonials || testimonials.length === 0 ? (
          <p className="text-gray-500">Aucun témoignage en attente</p>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial: any) => (
              <div key={testimonial.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.clientName}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {testimonial.title}
                </h4>
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                {testimonial.imageUrl && (
                  <img
                    src={testimonial.imageUrl}
                    alt="Témoignage"
                    className="w-full max-w-xs h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(testimonial.id)}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} />
                    Approuver
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(testimonial.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ApprovedTestimonials() {
  const { data: testimonials = [], refetch } = trpc.admin?.getApprovedTestimonials?.useQuery?.() || { data: [] };
  const deleteMutation = trpc.admin?.deleteTestimonial?.useMutation?.();

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
      try {
        await deleteMutation?.mutateAsync?.({ id });
        toast.success("Témoignage supprimé");
        refetch?.();
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Témoignages approuvés ({testimonials?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        {!testimonials || testimonials.length === 0 ? (
          <p className="text-gray-500">Aucun témoignage approuvé</p>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial: any) => (
              <div key={testimonial.id} className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.clientName}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {testimonial.title}
                </h4>
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                {testimonial.imageUrl && (
                  <img
                    src={testimonial.imageUrl}
                    alt="Témoignage"
                    className="w-full max-w-xs h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(testimonial.id)}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
