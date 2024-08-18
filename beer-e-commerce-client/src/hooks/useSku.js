import {useQuery} from "@tanstack/react-query";

const fetchSku = async (skuId) => {
    if (!skuId) return null;
    const response = await fetch(`http://localhost:3000/api/stock-price/${skuId}`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
}

export default (skuId) => useQuery({
    queryKey: ['skus', skuId],
    queryFn: () => fetchSku(skuId),
    refetchInterval: 5000
});