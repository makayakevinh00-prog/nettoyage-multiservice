import dotenv from 'dotenv';
dotenv.config();

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

if (!HUBSPOT_API_KEY) {
  console.error('❌ HUBSPOT_API_KEY not set');
  process.exit(1);
}

async function createMeeting() {
  try {
    console.log('🔍 Test de création de réunion HubSpot...\n');

    // Chercher d'abord un contact existant
    console.log('📋 Recherche d\'un contact existant...');
    const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 1,
      }),
    });

    const searchData = await searchResponse.json();
    const contacts = searchData.results || [];

    if (contacts.length === 0) {
      console.log('❌ Aucun contact trouvé. Créons-en un d\'abord...\n');
      
      // Créer un contact test
      const createContactResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email: `test-meeting-${Date.now()}@example.com`,
            firstname: 'Test',
            lastname: 'Meeting',
          },
        }),
      });

      if (!createContactResponse.ok) {
        console.error('❌ Erreur création contact:', await createContactResponse.text());
        process.exit(1);
      }

      const contactData = await createContactResponse.json();
      console.log('✅ Contact créé:', contactData.id, '\n');
      return contactData.id;
    }

    const contactId = contacts[0].id;
    console.log('✅ Contact trouvé:', contactId, '\n');
    return contactId;
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

async function testMeetingCreation(contactId) {
  try {
    console.log('📤 Création d\'une réunion...\n');

    // Préparer les dates
    const startTime = new Date();
    startTime.setDate(startTime.getDate() + 2); // Dans 2 jours
    startTime.setHours(14, 30, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    console.log('📅 Date/heure de la réunion:', startTime.toISOString());
    console.log('⏱️  Heure de fin:', endTime.toISOString(), '\n');

    // Récupérer l'email du contact
    const contactResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const contactData = await contactResponse.json();
    const contactEmail = contactData.properties?.email || 'test@example.com';
    console.log('📧 Email du contact:', contactEmail, '\n');

    const properties = {
      hs_engagement_type: 'MEETING',
      hs_meeting_title: 'Nettoyage Automobile - Test Client',
      hs_meeting_body: 'Service: Nettoyage Automobile\nAdresse: 123 Rue de Test, Paris\nPrix: 150€\nOptions: Lustrage premium',
      hs_meeting_start_time: startTime.getTime().toString(),
      hs_meeting_end_time: endTime.getTime().toString(),
      hs_meeting_location: '123 Rue de Test, Paris',
      hs_meeting_to: contactEmail,
    };

    console.log('📊 Propriétés envoyées:');
    console.log(JSON.stringify(properties, null, 2), '\n');

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/meetings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties,
        associations: [
          {
            type: 'contact_to_meeting',
            id: contactId,
          },
        ],
      }),
    });

    console.log('📊 Statut:', response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log('\n✅ Réunion créée avec succès!');
      console.log('ID de la réunion:', data.id);
      console.log('\n📋 Détails complets:');
      console.log(JSON.stringify(data, null, 2));
      console.log('\n✅ Les réunions sont maintenant enregistrées sur le compte du client!');
    } else {
      const errorText = await response.text();
      console.error('\n❌ Erreur:', errorText);
      try {
        const errorData = JSON.parse(errorText);
        console.error('Détails:', JSON.stringify(errorData, null, 2));
      } catch (e) {
        // Ignore
      }
    }
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

async function main() {
  const contactId = await createMeeting();
  await testMeetingCreation(contactId);
}

main();
