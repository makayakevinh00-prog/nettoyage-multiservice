/**
 * HubSpot Admin Functions
 * Gestion complète des contacts et deals HubSpot
 */

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

interface HubSpotContact {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  source?: string;
  createdAt?: number;
  updatedAt?: number;
}

interface HubSpotDeal {
  id: string;
  dealname: string;
  dealstage: string;
  amount?: number;
  closedate?: number;
  contact?: string;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Récupère tous les contacts HubSpot
 */
export async function getAllHubSpotContacts(): Promise<HubSpotContact[]> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return [];
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.results.map((item: any) => ({
      id: item.id,
      email: item.properties.email,
      firstname: item.properties.firstname,
      lastname: item.properties.lastname,
      phone: item.properties.phone,
      company: item.properties.company,
      source: item.properties.hs_lead_status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching HubSpot contacts:', error);
    return [];
  }
}

/**
 * Récupère un contact HubSpot par ID
 */
export async function getHubSpotContactById(id: string): Promise<HubSpotContact | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return null;
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      email: data.properties.email,
      firstname: data.properties.firstname,
      lastname: data.properties.lastname,
      phone: data.properties.phone,
      company: data.properties.company,
      source: data.properties.hs_lead_status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching HubSpot contact:', error);
    return null;
  }
}

/**
 * Récupère un contact HubSpot par email
 */
export async function getHubSpotContactByEmail(email: string): Promise<HubSpotContact | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return null;
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
        limit: 1,
      }),
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data.results.length === 0) return null;

    const item = data.results[0];
    return {
      id: item.id,
      email: item.properties.email,
      firstname: item.properties.firstname,
      lastname: item.properties.lastname,
      phone: item.properties.phone,
      company: item.properties.company,
      source: item.properties.hs_lead_status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching HubSpot contact by email:', error);
    return null;
  }
}

/**
 * Crée un contact HubSpot
 */
export async function createHubSpotContact(contact: Partial<HubSpotContact>): Promise<HubSpotContact | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return null;
    }

    const properties: Record<string, string> = {};
    if (contact.email) properties.email = contact.email;
    if (contact.firstname) properties.firstname = contact.firstname;
    if (contact.lastname) properties.lastname = contact.lastname;
    if (contact.phone) properties.phone = contact.phone;
    if (contact.company) properties.company = contact.company;

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      email: data.properties.email,
      firstname: data.properties.firstname,
      lastname: data.properties.lastname,
      phone: data.properties.phone,
      company: data.properties.company,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    return null;
  }
}

/**
 * Met à jour un contact HubSpot
 */
export async function updateHubSpotContact(id: string, updates: Partial<HubSpotContact>): Promise<HubSpotContact | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return null;
    }

    const properties: Record<string, string> = {};
    if (updates.firstname) properties.firstname = updates.firstname;
    if (updates.lastname) properties.lastname = updates.lastname;
    if (updates.phone) properties.phone = updates.phone;
    if (updates.company) properties.company = updates.company;

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      email: data.properties.email,
      firstname: data.properties.firstname,
      lastname: data.properties.lastname,
      phone: data.properties.phone,
      company: data.properties.company,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error('Error updating HubSpot contact:', error);
    return null;
  }
}

/**
 * Supprime un contact HubSpot
 */
export async function deleteHubSpotContact(id: string): Promise<boolean> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return false;
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting HubSpot contact:', error);
    return false;
  }
}

/**
 * Récupère tous les deals HubSpot
 */
export async function getAllHubSpotDeals(): Promise<HubSpotDeal[]> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return [];
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.results.map((item: any) => ({
      id: item.id,
      dealname: item.properties.dealname,
      dealstage: item.properties.dealstage,
      amount: parseFloat(item.properties.amount) || 0,
      closedate: item.properties.closedate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching HubSpot deals:', error);
    return [];
  }
}

/**
 * Récupère un deal HubSpot par ID
 */
export async function getHubSpotDealById(id: string): Promise<HubSpotDeal | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return null;
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      dealname: data.properties.dealname,
      dealstage: data.properties.dealstage,
      amount: parseFloat(data.properties.amount) || 0,
      closedate: data.properties.closedate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching HubSpot deal:', error);
    return null;
  }
}

/**
 * Met à jour un deal HubSpot
 */
export async function updateHubSpotDeal(id: string, updates: Partial<HubSpotDeal>): Promise<HubSpotDeal | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return null;
    }

    const properties: Record<string, any> = {};
    if (updates.dealstage) properties.dealstage = updates.dealstage;
    if (updates.amount) properties.amount = updates.amount.toString();
    if (updates.closedate) properties.closedate = updates.closedate;

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      dealname: data.properties.dealname,
      dealstage: data.properties.dealstage,
      amount: parseFloat(data.properties.amount) || 0,
      closedate: data.properties.closedate,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error('Error updating HubSpot deal:', error);
    return null;
  }
}


/**
 * Crée un deal (opportunité) HubSpot
 */
export async function createHubSpotDeal(deal: {
  dealname: string;
  amount: number;
  dealstage?: string;
  closedate?: string;
  contactId?: string;
}): Promise<HubSpotDeal | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return null;
    }

    const properties: Record<string, any> = {
      dealname: deal.dealname,
      amount: deal.amount.toString(),
      dealstage: deal.dealstage || 'closedwon',
      pipeline: 'default',
    };

    if (deal.closedate) {
      properties.closedate = deal.closedate;
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HubSpot create deal error: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json() as any;

    // Associer le deal au contact si contactId fourni
    if (deal.contactId) {
      try {
        await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals/${data.id}/associations/contacts/${deal.contactId}/deal_to_contact`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(`[HubSpot] Deal ${data.id} associé au contact ${deal.contactId}`);
      } catch (assocError) {
        console.error('[HubSpot] Erreur association deal-contact:', assocError);
      }
    }

    return {
      id: data.id,
      dealname: data.properties.dealname,
      dealstage: data.properties.dealstage,
      amount: parseFloat(data.properties.amount) || 0,
      closedate: data.properties.closedate,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error('Error creating HubSpot deal:', error);
    return null;
  }
}

/**
 * Ajoute une note à un contact HubSpot
 */
export async function addNoteToHubSpotContact(contactId: string, noteBody: string): Promise<boolean> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY not set');
      return false;
    }

    // Créer la note
    const noteResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          hs_note_body: noteBody,
          hs_timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!noteResponse.ok) {
      const errorText = await noteResponse.text();
      console.error(`HubSpot create note error: ${noteResponse.status} - ${errorText}`);
      return false;
    }

    const noteData = await noteResponse.json() as any;

    // Associer la note au contact
    await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/notes/${noteData.id}/associations/contacts/${contactId}/note_to_contact`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`[HubSpot] Note ajoutée au contact ${contactId}`);
    return true;
  } catch (error) {
    console.error('Error adding note to HubSpot contact:', error);
    return false;
  }
}

/**
 * Synchronise une réservation payée avec HubSpot :
 * - Crée ou met à jour le contact
 * - Crée une opportunité (deal) avec le montant
 * - Ajoute une note avec les détails de la réservation
 */
export async function syncReservationToHubSpot(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  prestation?: string;
  date: string;
  time: string;
  address: string;
  amount: number;
  message?: string;
  type: 'reservation' | 'subscription';
  plan?: string;
}): Promise<void> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.log('[HubSpot] API key not configured, skipping sync');
      return;
    }

    console.log(`[HubSpot] Synchronisation de la réservation pour ${data.email}...`);

    // 1. Créer ou trouver le contact
    const nameParts = data.name.split(' ');
    const firstname = nameParts[0] || data.name;
    const lastname = nameParts.slice(1).join(' ') || '';

    let contact = await createHubSpotContact({
      email: data.email,
      firstname,
      lastname,
      phone: data.phone,
    });

    // Si le contact existe déjà (erreur 409), chercher par email
    if (!contact) {
      try {
        const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filterGroups: [{
              filters: [{
                propertyName: 'email',
                operator: 'EQ',
                value: data.email,
              }],
            }],
          }),
        });

        if (searchResponse.ok) {
          const searchData = await searchResponse.json() as any;
          if (searchData.results && searchData.results.length > 0) {
            contact = {
              id: searchData.results[0].id,
              email: data.email,
              firstname,
              lastname,
            };
            // Mettre à jour le téléphone si fourni
            if (data.phone) {
              await updateHubSpotContact(contact.id, { phone: data.phone });
            }
          }
        }
      } catch (searchError) {
        console.error('[HubSpot] Erreur recherche contact:', searchError);
      }
    }

    if (!contact) {
      console.error('[HubSpot] Impossible de créer ou trouver le contact');
      return;
    }

    console.log(`[HubSpot] Contact: ${contact.id} (${data.email})`);

    // 2. Créer le deal (opportunité)
    const serviceNames: Record<string, string> = {
      automobile: 'Nettoyage Automobile',
      terrasse: 'Nettoyage Terrasse',
      tapis: 'Nettoyage Tapis & Canapés',
      balcon: 'Nettoyage Balcon',
      facade: 'Nettoyage Façade',
      jardinage: 'Entretien Jardinage',
    };

    const serviceName = serviceNames[data.service] || data.service;
    const dealName = data.type === 'subscription'
      ? `Abonnement ${data.plan === 'express' ? 'Express' : 'Confort'} - ${data.name}`
      : `${serviceName} - ${data.name} - ${data.date}`;

    const deal = await createHubSpotDeal({
      dealname: dealName,
      amount: data.amount / 100, // Convertir centimes en euros
      dealstage: 'closedwon',
      closedate: new Date().toISOString(),
      contactId: contact.id,
    });

    if (deal) {
      console.log(`[HubSpot] Deal créé: ${deal.id} - ${dealName}`);
    }

    // 3. Ajouter une note avec les détails
    const noteContent = data.type === 'subscription'
      ? `📦 Nouvel abonnement souscrit\n\nPlan: ${data.plan === 'express' ? 'Express (30€/mois)' : 'Confort (60€/mois)'}\nMontant payé: ${(data.amount / 100).toFixed(2)}€\nDate de souscription: ${new Date().toLocaleDateString('fr-FR')}\n\nContact:\n- Tél: ${data.phone}\n- Email: ${data.email}`
      : `🧹 Réservation payée\n\nService: ${serviceName}\nPrestation: ${data.prestation || 'Standard'}\nDate: ${data.date}\nHeure: ${data.time}\nAdresse: ${data.address}\nMontant: ${(data.amount / 100).toFixed(2)}€\n\nMessage client: ${data.message || 'Aucun'}\n\nContact:\n- Tél: ${data.phone}\n- Email: ${data.email}`;

    await addNoteToHubSpotContact(contact.id, noteContent);

    console.log(`[HubSpot] Synchronisation terminée pour ${data.email}`);
  } catch (error) {
    console.error('[HubSpot] Erreur lors de la synchronisation:', error);
  }
}
