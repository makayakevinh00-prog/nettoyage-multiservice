import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Edit2, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function AdminHubSpot() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchEmail, setSearchEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Queries
  const { data: contacts, isLoading: contactsLoading, refetch: refetchContacts } = trpc.hubspot.contacts.list.useQuery();
  const { data: deals, isLoading: dealsLoading, refetch: refetchDeals } = trpc.hubspot.deals.list.useQuery();
  const { data: stats } = trpc.hubspot.stats.summary.useQuery();

  // Mutations
  const createContactMutation = trpc.hubspot.contacts.create.useMutation({
    onSuccess: () => {
      toast.success("Contact créé avec succès");
      refetchContacts();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const updateContactMutation = trpc.hubspot.contacts.update.useMutation({
    onSuccess: () => {
      toast.success("Contact mis à jour");
      setEditingId(null);
      refetchContacts();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const deleteContactMutation = trpc.hubspot.contacts.delete.useMutation({
    onSuccess: () => {
      toast.success("Contact supprimé");
      refetchContacts();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const updateDealMutation = trpc.hubspot.deals.update.useMutation({
    onSuccess: () => {
      toast.success("Opportunité mise à jour");
      refetchDeals();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const filteredContacts = contacts?.filter((c) =>
    c.email.toLowerCase().includes(searchEmail.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tableau de Bord HubSpot</h1>
          <p className="text-muted-foreground">Gérez vos contacts et opportunités commerciales</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalContacts}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Opportunités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDeals}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)}€</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Valeur Moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgDealValue.toFixed(2)}€</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="deals">Opportunités</TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Contacts</CardTitle>
                <CardDescription>Créez, modifiez ou supprimez des contacts HubSpot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <Label>Rechercher par email</Label>
                  <Input
                    placeholder="Entrez un email..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                </div>

                {/* Create Contact Form */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Créer un nouveau contact
                  </h3>
                  <CreateContactForm onSubmit={(data) => createContactMutation.mutate(data)} />
                </div>

                {/* Contacts List */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Contacts ({filteredContacts.length})</h3>
                  {contactsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  ) : filteredContacts.length === 0 ? (
                    <p className="text-muted-foreground">Aucun contact trouvé</p>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {filteredContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{contact.firstname} {contact.lastname}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingId(contact.id)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteContactMutation.mutate({ id: contact.id })}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Opportunités Commerciales</CardTitle>
                <CardDescription>Suivez vos deals et opportunités</CardDescription>
              </CardHeader>
              <CardContent>
                {dealsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : !deals || deals.length === 0 ? (
                  <p className="text-muted-foreground">Aucune opportunité trouvée</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {deals.map((deal) => (
                      <div key={deal.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{deal.dealname}</p>
                            <p className="text-sm text-muted-foreground">Étape: {deal.dealstage}</p>
                          </div>
                          <p className="text-lg font-bold text-green-600">{deal.amount?.toFixed(2)}€</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newStage = deal.dealstage === "negotiation" ? "closedwon" : "negotiation";
                              updateDealMutation.mutate({
                                id: deal.id,
                                dealstage: newStage,
                              });
                            }}
                          >
                            Mettre à jour l'étape
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CreateContactForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("L'email est requis");
      return;
    }
    onSubmit(formData);
    setFormData({ email: "", firstname: "", lastname: "", phone: "", company: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Email *</Label>
          <Input
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Prénom</Label>
          <Input
            placeholder="Jean"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
        </div>
        <div>
          <Label>Nom</Label>
          <Input
            placeholder="Dupont"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />
        </div>
        <div>
          <Label>Téléphone</Label>
          <Input
            placeholder="06 12 34 56 78"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label>Entreprise</Label>
        <Input
          placeholder="Nom de l'entreprise"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full">
        Créer le contact
      </Button>
    </form>
  );
}
