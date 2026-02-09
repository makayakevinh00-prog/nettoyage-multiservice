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
