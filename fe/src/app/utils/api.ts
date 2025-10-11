export async function fetchProperties() {
  const res = await fetch("http://127.0.0.1:8000/api/prop/property/filter/", {
    cache: "no-store",
    headers: {
      accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}
