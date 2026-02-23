#!/usr/bin/env node

import dotenv from 'dotenv';

dotenv.config();

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

if (!HUBSPOT_API_KEY) {
  console.error('❌ HUBSPOT_API_KEY n\'est pas configurée');
  process.exit(1);
}

console.log('🔍 Test des permissions HubSpot...\n');

// Test 1: Vérifier la connexion
console.log('Test 1: Vérification de la connexion...');
try {
  const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    console.log('✅ Connexion réussie\n');
  } else {
    console.error(`❌ Erreur de connexion: ${response.status} ${response.statusText}`);
    const errorText = await response.text();
    console.error('Réponse:', errorText);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Erreur de connexion:', error);
  process.exit(1);
}

// Test 2: Tenter de créer un contact de test
console.log('Test 2: Tentative de création d\'un contact de test...');
try {
  const testEmail = `test-${Date.now()}@example.com`;
  const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        email: testEmail,
        firstname: 'Test',
        lastname: 'Contact',
      },
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(`✅ Contact créé avec succès: ${data.id}`);
    console.log(`   Email: ${testEmail}\n`);
    
    // Afficher les détails du contact créé
    console.log('📋 Détails du contact:');
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.error(`❌ Erreur lors de la création: ${response.status} ${response.statusText}`);
    const errorText = await response.text();
    console.error('Réponse d\'erreur:', errorText);
    
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

console.log('\n✅ Test terminé!');
