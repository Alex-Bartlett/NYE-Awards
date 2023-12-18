import { f as fail, r as redirect } from "../../../../../../chunks/index.js";
import { s as supabase } from "../../../../../../chunks/supabaseClient.js";
import bcrypt from "bcrypt";
const roles = {
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  USER: "USER"
};
const load = async ({ locals }) => {
  const fetchUnregisteredPeople = async () => {
    const registeredUsersRes = await supabase.from("users").select("person_id");
    const registeredUsers = `(${registeredUsersRes.data.map((p) => p.person_id).join(",")})`;
    const { data, err } = await supabase.from("people").select(`
            id,
            name
            `).not("id", "in", registeredUsers);
    return data;
  };
  return {
    people: fetchUnregisteredPeople()
  };
};
const register = async ({ request }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");
  const personId = data.get("personId");
  if (!username || !password) {
    return fail(400, { invalid: true });
  }
  const usernameValid = await isUsernameUnique(username);
  if (!usernameValid) {
    return fail(400, { user: true });
  }
  await supabase.from("users").insert({
    username,
    password_hash: await bcrypt.hash(password, 10),
    user_auth_token: crypto.randomUUID(),
    role: roles.USER,
    person_id: personId
  }).select();
  throw redirect(303, "/");
};
async function isUsernameUnique(username) {
  const { data, err } = await supabase.from("users").select().ilike("username", username).single();
  return !data;
}
const actions = { register };
export {
  actions,
  load
};
