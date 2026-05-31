import { getMainframeDashboardStats } from "@/lib/mainframe-dashboard";
import DashboardClient from "@/components/mainframe/DashboardClient";

// Do NOT use force-dynamic here.
// force-dynamic causes Next.js to dispatch an RSC router action on every history
// navigation (including back-button), which fires BEFORE the client router has
// re-initialized from the bfcache shell — producing the
// "Router action dispatched before initialization" crash.
//
// Instead we rely on the client-side pageshow(persisted) + visibilitychange
// listeners inside DashboardClient to re-fetch live data on back-navigation.
// The server render provides a fast initial payload; subsequent navigations
// are handled purely client-side, which is exactly what App Router is designed for.

export default async function MainframePage() {
  let initialStats = null;

  try {
    initialStats = await getMainframeDashboardStats();
  } catch {
    // DashboardClient handles the null case with a client-side fetch fallback
  }

  return <DashboardClient initialStats={initialStats} />;
}
