export async function callApi(method: string, url: string, path: string, data?: any) {
  const res = await fetch(url + path, {
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
    },
    method,
  });
  return await res.json();
}
