export async function getProductDetails(id: string) {

    const res = await fetch(`${process.env.API}/products/${id}`)
    const { data } = await res.json()
    return data
}
