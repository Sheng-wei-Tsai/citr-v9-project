export default async function getPastOrders(page) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const response = await fetch(`/api/past-orders?page=${page}`)
    const data = await response.json();
    return data;
}