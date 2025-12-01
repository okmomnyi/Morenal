import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button/Button";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white lg:text-6xl">
              About MORENAL
            </h1>
            <p className="mb-4 text-xl italic text-gray-600 dark:text-gray-400 lg:text-2xl">
              Elegance in every Purchase
            </p>
            <div className="w-24 h-1 mx-auto mb-8 bg-brand-500"></div>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              At MORENAL, we believe that shopping should be an experience of elegance,
              quality, and sophistication. Every product we curate is selected with care
              to bring you the finest in premium goods.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  MORENAL was founded with a simple yet powerful vision: to create an
                  online shopping destination where elegance meets accessibility. We
                  believe that everyone deserves access to premium, high-quality products
                  that enhance their lifestyle.
                </p>
                <p>
                  Our journey began with a commitment to curating only the finest products
                  from around the world. Each item in our collection is carefully selected
                  to meet our exacting standards of quality, design, and craftsmanship.
                </p>
                <p>
                  Today, MORENAL serves thousands of customers who appreciate the finer
                  things in life. We continue to grow, but our core values remain the
                  same: elegance, quality, and exceptional customer service.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                  alt="MORENAL Shopping Experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Value 1 */}
            <div className="p-8 text-center bg-white rounded-2xl dark:bg-gray-900 shadow-sm">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 dark:bg-brand-900/20">
                <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Quality First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We never compromise on quality. Every product meets our rigorous
                standards before it reaches you.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-8 text-center bg-white rounded-2xl dark:bg-gray-900 shadow-sm">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 dark:bg-brand-900/20">
                <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Customer Care
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your satisfaction is our priority. We're here to ensure your shopping
                experience is exceptional.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-8 text-center bg-white rounded-2xl dark:bg-gray-900 shadow-sm">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 dark:bg-brand-900/20">
                <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Trust & Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Shop with confidence. Your data is secure, and we stand behind every
                purchase you make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Why Choose MORENAL?
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
              <div className="mb-3 text-3xl">🚚</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Fast Delivery
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quick and reliable shipping to your doorstep
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
              <div className="mb-3 text-3xl">✨</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Premium Quality
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Only the finest products make it to our store
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
              <div className="mb-3 text-3xl">💳</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Secure Payment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Safe and encrypted payment processing
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
              <div className="mb-3 text-3xl">🎯</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Easy Returns
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hassle-free returns within 30 days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-500 to-brand-600">
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            Experience Elegance Today
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Join thousands of satisfied customers who trust MORENAL
          </p>
          <Link href="/shop">
            <Button
              size="md"
              className="!bg-white !text-brand-600 hover:!bg-gray-100 !font-semibold !px-10 !py-6 !text-lg"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
