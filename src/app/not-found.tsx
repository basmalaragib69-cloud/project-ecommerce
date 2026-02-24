import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4">
            <div className="max-w-xl w-full text-center">
                <div className="relative mb-8 flex justify-center">
                    <Image
                        src="/images/error.svg"
                        alt="404 Not Found"
                        width={600}
                        height={400}
                        className="w-full h-auto max-w-[500px]"
                        priority
                    />
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-200 hover:-translate-y-1"
                >
                    Back to Home Page
                </Link>
            </div>
        </div>
    );
}
