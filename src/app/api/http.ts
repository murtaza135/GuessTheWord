export default async function http(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);
  return response.ok
    ? response
    : Promise.reject(new Error("Fetch Error"));
}