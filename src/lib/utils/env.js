// Build-time flags. VITE_DEV_MODE is "true" only on the tailnet-served dev
// replica of the site (run from the arnav-ai compose stack); it is never set
// for the production build. Import DEV_MODE from here for every dev-only
// behaviour so the switch lives in exactly one place.
export const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';
