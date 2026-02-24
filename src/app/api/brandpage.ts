
export async function getAllBrands() {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
        const response = await res.json();
        return response.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBrandDetails(id: string) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        const response = await res.json();
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}