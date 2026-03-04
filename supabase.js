// Supabase API integration for Magoye Family Archives
// Replace with your Supabase project URL and anon/public key
const SUPABASE_URL = 'https://your-project.supabase.co';
const BENARD_KEY = 'your-anon-key';

// Helper: fetch wrapper for Supabase REST API
async function supabaseFetch(table, method = 'GET', body = null, id = null) {
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  if (id) url += `?id=eq.${id}`;
  const options = {
    method,
    headers: {
      'apikey': BENARD_KEY,
      'Authorization': `Bearer ${BENARD_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(url, options);
  return await res.json();
}

// CRUD for updates
export async function getUpdates() {
  return await supabaseFetch('updates');
}
export async function addUpdate(update) {
  return await supabaseFetch('updates', 'POST', update);
}
export async function updateUpdate(id, update) {
  return await supabaseFetch('updates', 'PATCH', update, id);
}
export async function deleteUpdate(id) {
  return await supabaseFetch('updates', 'DELETE', null, id);
}

// CRUD for admin actions (example: logins, changes)
export async function getAdminActions() {
  return await supabaseFetch('admin_actions');
}
export async function addAdminAction(action) {
  return await supabaseFetch('admin_actions', 'POST', action);
}

// Usage: import these functions in your HTML/JS and call as needed
// Example: getUpdates().then(updates => { ... });
