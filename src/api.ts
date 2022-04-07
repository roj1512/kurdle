export const apiUrl = "https://kurdle.deno.dev";
// export const apiUrl = "http://localhost:3000";

async function invokeRequest(path: string, init?: RequestInit) {
  const { ok, result } = await (await fetch(`${apiUrl}${path}`, init)).json();
  if (!ok) {
    throw new Error(String(result));
  }
  return result;
}

export async function fetchId(): Promise<number> {
  return await invokeRequest("/id");
}

export async function compare(
  word: string
): Promise<{ valid: boolean; comparison: number[] }> {
  return await invokeRequest(`/compare?word=${encodeURIComponent(word)}`);
}
