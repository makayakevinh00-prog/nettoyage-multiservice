/**
 * Utilitaires de validation pour les formulaires
 */

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Valider une adresse email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 320;
}

/**
 * Valider un numéro de téléphone français
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/;
  return phoneRegex.test(phone.replace(/[\s\-\.]/g, ''));
}

/**
 * Valider une chaîne de caractères
 */
export function validateString(value: string, minLength = 1, maxLength = 255): boolean {
  return !!value && value.length >= minLength && value.length <= maxLength;
}

/**
 * Valider un formulaire de réservation
 */
export function validateBookingForm(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // Valider le nom
  if (!validateString(data.name, 2, 100)) {
    errors.push({ field: 'name', message: 'Le nom doit contenir entre 2 et 100 caractères' });
  }

  // Valider l'email
  if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'L\'adresse email n\'est pas valide' });
  }

  // Valider le téléphone
  if (!validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Le numéro de téléphone n\'est pas valide' });
  }

  // Valider le service
  if (!validateString(data.service, 1, 50)) {
    errors.push({ field: 'service', message: 'Veuillez sélectionner un service' });
  }

  // Valider la date si fournie
  if (data.date) {
    const date = new Date(data.date);
    if (isNaN(date.getTime()) || date < new Date()) {
      errors.push({ field: 'date', message: 'La date doit être dans le futur' });
    }
  }

  // Valider l'adresse
  if (!validateString(data.address, 5, 255)) {
    errors.push({ field: 'address', message: 'L\'adresse doit contenir entre 5 et 255 caractères' });
  }

  return errors;
}

/**
 * Valider un formulaire de contact
 */
export function validateContactForm(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // Valider le nom
  if (!validateString(data.name, 2, 100)) {
    errors.push({ field: 'name', message: 'Le nom doit contenir entre 2 et 100 caractères' });
  }

  // Valider l'email
  if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'L\'adresse email n\'est pas valide' });
  }

  // Valider le téléphone
  if (data.phone && !validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Le numéro de téléphone n\'est pas valide' });
  }

  // Valider le message
  if (!validateString(data.message, 10, 1000)) {
    errors.push({ field: 'message', message: 'Le message doit contenir entre 10 et 1000 caractères' });
  }

  return errors;
}

/**
 * Sanitiser une chaîne de caractères
 */
export function sanitizeString(value: string): string {
  return value
    .replace(/[<>]/g, '') // Supprimer les balises HTML
    .replace(/javascript:/gi, '') // Supprimer les URLs javascript
    .trim();
}

/**
 * Sanitiser un objet
 */
export function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }
  
  return obj;
}
