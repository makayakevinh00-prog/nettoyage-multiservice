import { router, protectedProcedure, adminProcedure } from "../_core/trpc";
import { z } from "zod";
import { 
  getAllHubSpotContacts, 
  getAllHubSpotDeals, 
  createHubSpotContact,
  updateHubSpotContact,
  deleteHubSpotContact,
  getHubSpotContactById,
  getHubSpotDealById,
  updateHubSpotDeal,
  getHubSpotContactByEmail
} from "../lib/hubspot-admin";

export const hubspotRouter = router({
  // Contacts
  contacts: router({
    list: adminProcedure.query(async () => {
      return await getAllHubSpotContacts();
    }),

    getById: adminProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await getHubSpotContactById(input.id);
      }),

    getByEmail: adminProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        return await getHubSpotContactByEmail(input.email);
      }),

    create: adminProcedure
      .input(z.object({
        email: z.string().email(),
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createHubSpotContact(input);
      }),

    update: adminProcedure
      .input(z.object({
        id: z.string(),
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return await updateHubSpotContact(id, updates);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await deleteHubSpotContact(input.id);
      }),
  }),

  // Deals (Opportunités)
  deals: router({
    list: adminProcedure.query(async () => {
      return await getAllHubSpotDeals();
    }),

    getById: adminProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await getHubSpotDealById(input.id);
      }),

    update: adminProcedure
      .input(z.object({
        id: z.string(),
        dealstage: z.string().optional(),
        amount: z.number().optional(),
        closedate: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return await updateHubSpotDeal(id, updates);
      }),
  }),

  // Stats
  stats: router({
    summary: adminProcedure.query(async () => {
      const contacts = await getAllHubSpotContacts();
      const deals = await getAllHubSpotDeals();

      const totalRevenue = deals.reduce((sum, deal) => sum + (deal.amount || 0), 0);
      const avgDealValue = deals.length > 0 ? totalRevenue / deals.length : 0;

      return {
        totalContacts: contacts.length,
        totalDeals: deals.length,
        totalRevenue,
        avgDealValue,
        contactsBySource: contacts.reduce((acc: Record<string, number>, contact) => {
          const source = contact.source || 'unknown';
          acc[source] = (acc[source] || 0) + 1;
          return acc;
        }, {}),
        dealsByStage: deals.reduce((acc: Record<string, number>, deal) => {
          const stage = deal.dealstage || 'unknown';
          acc[stage] = (acc[stage] || 0) + 1;
          return acc;
        }, {}),
      };
    }),
  }),
});
