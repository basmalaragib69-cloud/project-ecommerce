export async function getAllBrands() {
    const res = await fetch(`${process.env.API}/brands`);
    const { data } = await res.json();
    return data;
}

export async function getBrandDetails(id: string) {
    const res = await fetch(`${process.env.API}/brands/${id}`);
    const { data } = await res.json();
    return data;
}

