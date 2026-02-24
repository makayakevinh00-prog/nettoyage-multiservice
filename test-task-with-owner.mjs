const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

async function testTask() {
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

    console.log('🔄 Tentative 1: Avec hs_task_for (owner)...\n');

    const response1 = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          hs_task_title: 'Nettoyage Automobile - Test',
          hs_task_body: 'Service: Nettoyage Automobile\nAdresse: 123 Rue de Test, Paris\nPrix: 150€',
          hs_task_due_date: startTime.getTime().toString(),
          hs_task_status: 'NOT_STARTED',
          hs_task_priority: 'HIGH',
          hs_task_for: contactEmail,
        },
        associations: [
          {
            type: 'contact_to_task',
            id: contactId,
          },
        ],
      }),
    });

    console.log('📊 Statut:', response1.status, response1.statusText);

    if (response1.ok) {
      const data = await response1.json();
      console.log('\n✅ Tâche créée avec succès!');
      console.log('ID:', data.id);
      console.log('\n✅ Le rendez-vous est maintenant enregistré sur le compte du client!');
    } else {
      const error = await response1.text();
      console.log('\n❌ Erreur:', error);
    }
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testTask();
