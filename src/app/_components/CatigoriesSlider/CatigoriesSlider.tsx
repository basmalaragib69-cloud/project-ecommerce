import React from 'react'
import CatigoriesSwipper from '../CatigoriesSwipper/CatigoriesSwipper'

export default async function CatigoriesSlider() {
const res = await fetch ("https://ecommerce.routemisr.com/api/v1/categories")
const {data} = await res.json()
console.log ({data})

  return <>
<CatigoriesSwipper catigories = {data}/>
  </>
}
