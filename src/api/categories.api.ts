export async function getAllCategories() {
    const res = await fetch(`${process.env.API}/categories`);
    const { data } = await res.json();
    return data;
}

export async function getCategoryDetails(id: string) {
    const res = await fetch(`${process.env.API}/categories/${id}`);
    const { data } = await res.json();
    return data;
}

