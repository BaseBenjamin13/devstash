import { cache } from "react";

import { prisma } from "@/lib/prisma";

// No auth yet — dashboard data is scoped to the seeded demo user for now.
// Swap this for the authenticated session user once NextAuth lands.
const DEMO_USER_EMAIL = "benmorgiewicz@gmail.com";

export const getCurrentUserId = cache(async (): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  return user?.id ?? null;
});
