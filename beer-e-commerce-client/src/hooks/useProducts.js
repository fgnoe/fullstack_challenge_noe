import {useQuery} from "@tanstack/react-query";

const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
}

export default () => useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
});