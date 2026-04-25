const SUPABASE_CONFIGS = {
  default: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  main: {
    url: import.meta.env.VITE_SUPABASE_MAIN_URL || import.meta.env.VITE_SUPABASE_URL,
    key:
      import.meta.env.VITE_SUPABASE_MAIN_ANON_KEY ||
      import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  ayla: {
    url: import.meta.env.VITE_SUPABASE_AYLA_URL || import.meta.env.VITE_SUPABASE_URL,
    key:
      import.meta.env.VITE_SUPABASE_AYLA_ANON_KEY ||
      import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
};

const supabaseClientPromises = new Map();

function getConfig(target = "default") {
  return SUPABASE_CONFIGS[target] || SUPABASE_CONFIGS.default;
}

export const isSupabaseConfigured = Boolean(
  SUPABASE_CONFIGS.default.url && SUPABASE_CONFIGS.default.key,
);

export const isSupabaseConfiguredFor = (target = "default") => {
  const config = getConfig(target);
  return Boolean(config.url && config.key);
};

export const getSupabaseClient = async (target = "default") => {
  if (!isSupabaseConfiguredFor(target)) return null;

  if (!supabaseClientPromises.has(target)) {
    const config = getConfig(target);
    const clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(config.url, config.key),
    );
    supabaseClientPromises.set(target, clientPromise);
  }

  return supabaseClientPromises.get(target);
};
