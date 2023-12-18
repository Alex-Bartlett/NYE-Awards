import { s as supabase } from "./supabaseClient.js";
function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
const first = async ({ resolve, event }) => {
  const session = event.cookies.get("session");
  if (!session) {
    console.log("no session");
    return await resolve(event);
  }
  const userRes = await supabase.from("users").select("username, role, person_id").eq("user_auth_token", session).single();
  const user = userRes.data;
  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role,
      person_id: user.person_id
    };
  }
  return await resolve(event);
};
const second = async ({ resolve, event }) => {
  if (event.url.pathname.startsWith("/api")) {
    if (event.request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
  }
  const response = await resolve(event);
  if (event.url.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", `*`);
  }
  return response;
};
const handle = sequence(first, second);
export {
  handle
};
