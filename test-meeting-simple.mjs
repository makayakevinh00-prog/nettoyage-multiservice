const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

async function testMeetingFormat() {
  try {
    // Chercher un contact
    const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ limit: 1 }),
    });

    const searchData = await searchResponse.json();
    const contactId = searchData.results?.[0]?.id;

    if (!contactId) {
      console.error('❌ Aucun contact trouvé');
      return;
    }

    console.log('✅ Contact trouvé:', contactId, '\n');

    const startTime = new Date();
    startTime.setDate(startTime.getDate() + 2);
    startTime.setHours(14, 30, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    console.log('🔄 Création d\'une réunion sans le champ "to"...\n');

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/meetings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          hs_engagement_type: 'MEETING',
          hs_meeting_title: 'Nettoyage Automobile - Test',
          hs_meeting_body: 'Service: Nettoyage Automobile\nAdresse: 123 Rue de Test, Paris\nPrix: 150€',
          hs_meeting_start_time: startTime.getTime().toString(),
          hs_meeting_end_time: endTime.getTime().toString(),
        },
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
      console.log('ID:', data.id);
      console.log('\n📋 Détails:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      const error = await response.text();
      console.log('\n❌ Erreur:', error);
    }
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testMeetingFormat();
