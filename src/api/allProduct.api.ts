export async function allProducts() {
    const res = await fetch(`${process.env.API}/products`)
    const { data } = await res.json()
    return data
}
