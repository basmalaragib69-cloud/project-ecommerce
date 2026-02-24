export async function getRelatedProducts(id: string) {
    const res = await fetch(`${process.env.API}/products?category[in]=${id}`)
    const data = await res.json();
    return data;
}

