import { addEventToGoogleCalendar } from './server/lib/google-calendar';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
  console.log('🚀 Test de connexion Google Calendar...');
  
  const testBooking = {
    name: 'Test Manus',
    email: 'makayakevinh00@gmail.com',
    phone: '0600000000',
    service: 'automobile',
    date: '2025-12-30',
    time: '10:00',
    address: '123 Rue de Test, Paris',
    message: 'Ceci est un test d\'intégration automatique.'
  };

  const result = await addEventToGoogleCalendar(testBooking);
  
  if (result) {
    console.log('✅ Test réussi ! L\'événement a été créé.');
  } else {
    console.log('❌ Le test a échoué. Vérifiez les logs ci-dessus.');
  }
}

test();
