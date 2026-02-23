/**
 * HubSpot CRM Integration
 * Synchronise les réservations et contacts avec HubSpot
 */

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  service?: string;
  booking_date?: string;
  booking_time?: string;
  booking_address?: string;
}

interface HubSpotDeal {
  dealname: string;
  dealstage: string;
  amount?: number;
  closedate?: number;
  contact_email?: string;
  service?: string;
}

/**
 * Teste la connexion à HubSpot
 */
export async function testHubSpotConnection(): Promise<boolean> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return false;
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log('✅ Connexion HubSpot réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion HubSpot:', error);
    return false;
  }
}

/**
 * Crée ou met à jour un contact dans HubSpot
 */
export async function createOrUpdateHubSpotContact(contact: HubSpotContact): Promise<string | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return null;
    }

    // Préparer les propriétés du contact au format API v3 (array de { name, value })
    const propertiesArray: Array<{ name: string; value: string }> = [
      { name: 'email', value: contact.email },
    ];

    if (contact.firstname) propertiesArray.push({ name: 'firstname', value: contact.firstname });
    if (contact.lastname) propertiesArray.push({ name: 'lastname', value: contact.lastname });
    if (contact.phone) propertiesArray.push({ name: 'phone', value: contact.phone });

    console.log(`[HubSpot] Propriétés du contact: ${JSON.stringify(propertiesArray)}`);

    // Chercher d'abord si le contact existe
    const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
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
                value: contact.email,
              },
            ],
          },
        ],
        limit: 1,
      }),
    });

    const searchData = await searchResponse.json() as any;
    const existingContact = searchData.results?.[0];

    if (existingContact) {
      // Mettre à jour le contact existant
      console.log(`[HubSpot] Contact existant trouvé: ${existingContact.id}`);
      const updateResponse = await fetch(
        `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${existingContact.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties: propertiesArray }),
        }
      );

      if (updateResponse.ok) {
        console.log(`✅ Contact HubSpot mis à jour: ${existingContact.id}`);
        return existingContact.id;
      } else {
        const errorData = await updateResponse.json() as any;
        console.error(`❌ Erreur mise à jour contact: ${updateResponse.status}`, errorData);
      }
    } else {
      // Créer un nouveau contact
      console.log(`[HubSpot] Nouveau contact à créer pour ${contact.email}`);
      const createResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties: propertiesArray }),
      });

      if (createResponse.ok) {
        const data = await createResponse.json() as any;
        console.log(`✅ Contact HubSpot créé: ${data.id}`);
        return data.id;
      } else {
        const errorData = await createResponse.json() as any;
        console.error(`❌ Erreur création contact: ${createResponse.status}`, errorData);
        console.error(`[HubSpot] Réponse d'erreur complète:`, errorData);
      }
    }

    return null;
  } catch (error) {
    console.error('❌ Erreur lors de la création/mise à jour du contact HubSpot:', error);
    return null;
  }
}

/**
 * Crée un deal (opportunité) dans HubSpot
 */
export async function createHubSpotDeal(deal: HubSpotDeal): Promise<string | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return null;
    }

    const propertiesArray: Array<{ name: string; value: string | number }> = [
      { name: 'dealname', value: deal.dealname },
      { name: 'dealstage', value: deal.dealstage },
    ];

    if (deal.amount) propertiesArray.push({ name: 'amount', value: deal.amount });
    if (deal.closedate) propertiesArray.push({ name: 'closedate', value: deal.closedate });

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: propertiesArray }),
    });

    if (response.ok) {
      const data = await response.json() as any;
      console.log(`✅ Deal HubSpot créé: ${data.id}`);
      return data.id;
    } else {
      const errorData = await response.json() as any;
      console.error(`❌ Erreur création deal: ${response.status}`, errorData);
    }

    return null;
  } catch (error) {
    console.error('❌ Erreur lors de la création du deal HubSpot:', error);
    return null;
  }
}

/**
 * Associe un contact à un deal dans HubSpot
 */
export async function associateContactToDeal(contactId: string, dealId: string): Promise<boolean> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return false;
    }

    const response = await fetch(
      `${HUBSPOT_API_URL}/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          associationCategory: 'HUBSPOT_DEFINED',
          associationType: 'deal_to_contact',
        }),
      }
    );

    if (response.ok) {
      console.log(`✅ Contact ${contactId} associé au deal ${dealId}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error('❌ Erreur lors de l\'association contact-deal:', error);
    return false;
  }
}

/**
 * Crée une tâche (task) HubSpot pour le rappel
 */
export async function createTask(
  contactId: string,
  taskData: {
    hs_task_title: string;
    hs_task_body: string;
    hs_task_due_date: string; // format YYYY-MM-DD
    hs_task_status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    hs_task_priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }
): Promise<string | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return null;
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: [
          { name: 'hs_task_title', value: taskData.hs_task_title },
          { name: 'hs_task_body', value: taskData.hs_task_body },
          { name: 'hs_task_due_date', value: new Date(taskData.hs_task_due_date).getTime().toString() },
          { name: 'hs_task_status', value: taskData.hs_task_status },
          { name: 'hs_task_priority', value: taskData.hs_task_priority },
        ],
        associations: [
          {
            type: 'contact_to_task',
            id: contactId,
          },
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json() as any;
      console.log(`✅ Tâche HubSpot créée: ${data.id}`);
      return data.id;
    }

    return null;
  } catch (error) {
    console.error('❌ Erreur lors de la création de la tâche HubSpot:', error);
    return null;
  }
}

/**
 * Synchronise une réservation avec HubSpot (version améliorée avec options détaillées)
 */
export async function syncBookingToHubSpot(bookingData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceOption?: string;
  date: string;
  time: string;
  address: string;
  totalPrice?: number; // en euros
  message?: string;
}): Promise<{ contactId: string | null; dealId: string | null }> {
  try {
    console.log(`[HubSpot] Début de la synchronisation pour ${bookingData.email}`);
    console.log(`[HubSpot] Clé API configurée: ${!!HUBSPOT_API_KEY}`);
    
    // Créer ou mettre à jour le contact
    console.log(`[HubSpot] Création/mise à jour du contact...`);
    const contactId = await createOrUpdateHubSpotContact({
      email: bookingData.email,
      firstname: bookingData.name.split(' ')[0],
      lastname: bookingData.name.split(' ').slice(1).join(' '),
      phone: bookingData.phone,
      service: bookingData.service,
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      booking_address: bookingData.address,
    });

    console.log(`[HubSpot] Contact ID: ${contactId}`);
    
    // Créer un deal pour la réservation avec le prix total
    console.log(`[HubSpot] Création du deal...`);
    const dealId = await createHubSpotDeal({
      dealname: `${bookingData.service} - ${bookingData.name}`,
      dealstage: 'negotiation', // Stage de négociation
      amount: bookingData.totalPrice || 0, // Montant du devis
      closedate: new Date(bookingData.date).getTime(),
      service: bookingData.service,
    });

    // Associer le contact au deal
    if (contactId && dealId) {
      await associateContactToDeal(contactId, dealId);
    }

    // Créer une tâche de rappel pour 24h avant
    if (contactId) {
      const reminderDate = new Date(bookingData.date);
      reminderDate.setDate(reminderDate.getDate() - 1);

      await createTask(contactId, {
        hs_task_title: `Rappel : ${bookingData.service} - ${bookingData.name}`,
        hs_task_body: `Rendez-vous demain à ${bookingData.time} pour ${bookingData.service} à ${bookingData.address}`,
        hs_task_due_date: reminderDate.toISOString().split('T')[0],
        hs_task_status: 'NOT_STARTED',
        hs_task_priority: 'HIGH',
      });
    }

    console.log(`[HubSpot] Deal ID: ${dealId}`);
    console.log(`[HubSpot] ✅ Synchronisation terminée (Contact: ${contactId}, Deal: ${dealId})`);
    
    return { contactId, dealId };
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation avec HubSpot:', error);
    console.error('[HubSpot] Détails complets:', JSON.stringify(error, null, 2));
    return { contactId: null, dealId: null };
  }
}
