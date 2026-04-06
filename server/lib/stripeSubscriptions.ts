import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

export async function createSubscriptionCheckoutSession(
  userId: number,
  userEmail: string,
  userName: string,
  plan: "express" | "confort",
  successUrl: string,
  cancelUrl: string
) {
  const planPrices = {
    express: {
      price: 3000, // 30€ en centimes
      setupFee: 7000, // 70€ en centimes
      name: "Abonnement Express - Nettoyage Auto",
    },
    confort: {
      price: 6000, // 60€ en centimes
      setupFee: 9000, // 90€ en centimes
      name: "Abonnement Confort - Nettoyage Auto",
    },
  };

  const planInfo = planPrices[plan];

  try {
    // Créer ou récupérer le client Stripe
    const customers = await stripe.customers.search({
      query: `email:"${userEmail}"`,
    });

    let customerId: string;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        metadata: {
          userId: userId.toString(),
        },
      });
      customerId = customer.id;
    }

    // Créer une session de paiement avec abonnement
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: planInfo.name,
              description: `Frais de mise en propreté: ${planInfo.setupFee / 100}€`,
            },
            recurring: {
              interval: "month",
              interval_count: 1,
            },
            unit_amount: planInfo.price,
          },
          quantity: 1,
        },
        // Ajouter les frais de mise en propreté comme un paiement unique
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Frais de mise en propreté (1er mois uniquement)",
            },
            unit_amount: planInfo.setupFee,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId.toString(),
        plan: plan,
      },
    });

    return session;
  } catch (error) {
    console.error("[StripeSubscriptions] Error creating checkout session:", error);
    throw error;
  }
}

export async function handleSubscriptionWebhook(event: Stripe.Event) {
  switch (event.type) {
    case "customer.subscription.created":
      console.log("[Webhook] Subscription created:", event.data.object);
      break;

    case "customer.subscription.updated":
      console.log("[Webhook] Subscription updated:", event.data.object);
      break;

    case "customer.subscription.deleted":
      console.log("[Webhook] Subscription deleted:", event.data.object);
      break;

    case "invoice.payment_succeeded":
      console.log("[Webhook] Invoice paid:", event.data.object);
      break;

    case "invoice.payment_failed":
      console.log("[Webhook] Invoice payment failed:", event.data.object);
      break;

    default:
      console.log("[Webhook] Unhandled event type:", event.type);
  }
}
