import cron from 'node-cron';
import { sendReminderEmails, sendOwnerReminderEmail } from './reminder';

let reminderJob: ReturnType<typeof cron.schedule> | null = null;

/**
 * Initialise le système de rappel de RDV
 * Exécute tous les jours à 10h du matin
 */
export function initializeReminderScheduler() {
  // Vérifier si le job est déjà en cours d'exécution
  if (reminderJob) {
    console.log('[ReminderScheduler] Le système de rappel est déjà actif');
    return;
  }

  try {
    // Planifier l'exécution tous les jours à 10h (10:00 AM)
    // Format cron: seconde minute heure jour mois jour-de-semaine
    reminderJob = cron.schedule('0 10 * * *', async () => {
      console.log('[ReminderScheduler] Exécution des rappels de RDV...');
      
      try {
        // Envoyer les rappels aux clients
        const clientReminders = await sendReminderEmails();
        console.log(`[ReminderScheduler] Rappels clients: ${clientReminders.sent} envoyés, ${clientReminders.failed} erreurs`);
        
        // Envoyer le résumé au propriétaire
        const ownerReminder = await sendOwnerReminderEmail();
        console.log(`[ReminderScheduler] Rappel propriétaire: ${ownerReminder ? 'Envoyé' : 'Aucun RDV'}`);
      } catch (error) {
        console.error('[ReminderScheduler] Erreur lors de l\'exécution des rappels:', error);
      }
    });

    console.log('[ReminderScheduler] ✅ Système de rappel activé (exécution quotidienne à 10h)');
    return reminderJob;
  } catch (error) {
    console.error('[ReminderScheduler] Erreur lors de l\'initialisation:', error);
    throw error;
  }
}

/**
 * Arrête le système de rappel
 */
export function stopReminderScheduler() {
  if (reminderJob) {
    reminderJob.stop();
    reminderJob = null;
    console.log('[ReminderScheduler] Système de rappel arrêté');
  }
}

/**
 * Exécute les rappels immédiatement (pour les tests)
 */
export async function executeRemindersNow() {
  console.log('[ReminderScheduler] Exécution immédiate des rappels...');
  
  try {
    const clientReminders = await sendReminderEmails();
    const ownerReminder = await sendOwnerReminderEmail();
    
    return {
      clientReminders,
      ownerReminder,
    };
  } catch (error) {
    console.error('[ReminderScheduler] Erreur lors de l\'exécution immédiate:', error);
    throw error;
  }
}
