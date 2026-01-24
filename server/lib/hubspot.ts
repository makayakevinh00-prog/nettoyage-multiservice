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

    // Préparer les propriétés du contact
    const properties: Record<string, string> = {
      email: contact.email,
    };

    if (contact.firstname) properties.firstname = contact.firstname;
    if (contact.lastname) properties.lastname = contact.lastname;
    if (contact.phone) properties.phone = contact.phone;
    if (contact.service) properties.service = contact.service;
    if (contact.booking_date) properties.booking_date = contact.booking_date;
    if (contact.booking_time) properties.booking_time = contact.booking_time;
    if (contact.booking_address) properties.booking_address = contact.booking_address;

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
      const updateResponse = await fetch(
        `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${existingContact.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties }),
        }
      );

      if (updateResponse.ok) {
        console.log(`✅ Contact HubSpot mis à jour: ${existingContact.id}`);
        return existingContact.id;
      }
    } else {
      // Créer un nouveau contact
      const createResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });

      if (createResponse.ok) {
        const data = await createResponse.json() as any;
        console.log(`✅ Contact HubSpot créé: ${data.id}`);
        return data.id;
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

    const properties: Record<string, string | number> = {
      dealname: deal.dealname,
      dealstage: deal.dealstage,
    };

    if (deal.amount) properties.amount = deal.amount;
    if (deal.closedate) properties.closedate = deal.closedate;
    if (deal.service) properties.service = deal.service;

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (response.ok) {
      const data = await response.json() as any;
      console.log(`✅ Deal HubSpot créé: ${data.id}`);
      return data.id;
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
    // Créer ou mettre à jour le contact
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

    // Créer un deal pour la réservation avec le prix total
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

    return { contactId, dealId };
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation avec HubSpot:', error);
    return { contactId: null, dealId: null };
  }
}
