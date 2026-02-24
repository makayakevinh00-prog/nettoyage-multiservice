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
    const contactEmail = searchData.results?.[0]?.properties?.email;

    if (!contactId) {
      console.error('❌ Aucun contact trouvé');
      return;
    }

    console.log('✅ Contact trouvé:', contactId);
    console.log('📧 Email:', contactEmail, '\n');

    const startTime = new Date();
    startTime.setDate(startTime.getDate() + 2);
    startTime.setHours(14, 30, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    console.log('🔄 Tentative 1: Format JSON pour "to"...\n');

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
          to: JSON.stringify([{ email: contactEmail }]),
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
    } else {
      const error = await response.text();
      console.log('\n❌ Erreur:', error);
      
      console.log('\n🔄 Tentative 2: Format array pour "to"...\n');
      
      const response2 = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/meetings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            hs_engagement_type: 'MEETING',
            hs_meeting_title: 'Nettoyage Automobile - Test 2',
            hs_meeting_body: 'Service: Nettoyage Automobile\nAdresse: 123 Rue de Test, Paris\nPrix: 150€',
            hs_meeting_start_time: startTime.getTime().toString(),
            hs_meeting_end_time: endTime.getTime().toString(),
            to: [{ email: contactEmail }],
          },
          associations: [
            {
              type: 'contact_to_meeting',
              id: contactId,
            },
          ],
        }),
      });

      console.log('📊 Statut:', response2.status, response2.statusText);

      if (response2.ok) {
        const data = await response2.json();
        console.log('\n✅ Réunion créée avec succès!');
        console.log('ID:', data.id);
      } else {
        const error2 = await response2.text();
        console.log('\n❌ Erreur:', error2);
      }
    }
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testMeetingFormat();
