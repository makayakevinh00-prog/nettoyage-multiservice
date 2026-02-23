#!/usr/bin/env node

import dotenv from 'dotenv';

dotenv.config();

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

if (!HUBSPOT_API_KEY) {
  console.error('❌ HUBSPOT_API_KEY n\'est pas configurée');
  process.exit(1);
}

console.log('🔍 Test de création de Deal HubSpot...\n');

try {
  const dealData = {
    properties: {
      dealname: 'Test Deal - Nettoyage Automobile',
      dealstage: 'appointmentscheduled',
      amount: '150.00',
      closedate: new Date().getTime().toString(),
    },
  };

  console.log('📤 Envoi de la requête...');
  console.log('Stage utilisé: appointmentscheduled');
  console.log('Données:', JSON.stringify(dealData, null, 2));

  const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dealData),
  });

  console.log(`\n📊 Statut: ${response.status} ${response.statusText}`);

  if (response.ok) {
    const data = await response.json();
    console.log('✅ Deal créé avec succès!');
    console.log('ID du deal:', data.id);
    console.log('\n📋 Détails complets:');
    console.log(JSON.stringify(data, null, 2));
    console.log('\n✅ Les Deals peuvent maintenant être créés dans HubSpot!');
  } else {
    console.error('❌ Erreur lors de la création du deal');
    const errorText = await response.text();
    console.error('Réponse:', errorText);
    
    try {
      const errorData = JSON.parse(errorText);
      console.error('\n📋 Détails de l\'erreur:');
      console.error(JSON.stringify(errorData, null, 2));
    } catch (e) {
      // Pas du JSON
    }
  }
} catch (error) {
  console.error('❌ Erreur:', error);
}
