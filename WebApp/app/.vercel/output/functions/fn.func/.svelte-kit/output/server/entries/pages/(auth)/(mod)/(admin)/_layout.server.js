import { r as redirect } from "../../../../../chunks/index.js";
const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, "/login");
  }
  if (locals.user.role !== "ADMIN") {
    throw redirect(303, "/");
  }
  return {
    user: locals.user
  };
};
export {
  load
};
