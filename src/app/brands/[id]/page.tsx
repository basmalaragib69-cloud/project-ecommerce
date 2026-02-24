import { getBrandDetails } from "@/app/api/brandpage";
import Image from "next/image";



export default async function BrandDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = await getBrandDetails(id);
  console.log(brand);

  if (!brand) return <div className="p-10 text-center"></div>;

  return (
    <div className='mt-10 container mx-auto p-4'>
      <div className='flex flex-wrap border rounded-lg p-6 bg-white shadow'>
        <div className='w-full md:w-1/4'>
          <Image src={brand.image} alt={brand.name} width={400} height={400} className="w-full" />
        </div>
        <div className='w-full md:w-3/4 md:ps-10'>
          <h1 className='text-3xl font-bold text-indigo-600'>{brand.name}</h1>
          <p className='mt-4 text-gray-700'>Slug: {brand.slug}</p>
        </div>
      </div>
    </div>
  );
}