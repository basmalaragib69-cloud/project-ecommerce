import Link from 'next/link';
import Image from 'next/image';
import { Brand } from "../../type/product.type";
import { getAllBrands } from '@/api/brands.api';

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Premium <span className="text-red-600">Brands</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We partner with the world&apos;s most trusted manufacturers to bring you quality products you can rely on.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-6'>
          {brands && brands.length > 0 ? (
            brands.map((brand: Brand) => (
              <div key={brand._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[280px]'>
                <Link href={`/brands/${brand._id}`}>
                  <div className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center">
                    <div className="w-full aspect-video flex items-center justify-center p-4">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={200}
                        height={100}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 w-full text-center">
                      <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors uppercase tracking-wider text-sm">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-400 italic">No brands found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

