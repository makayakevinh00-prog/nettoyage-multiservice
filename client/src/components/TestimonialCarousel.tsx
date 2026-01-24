import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonials = [] } = trpc.testimonials.getApproved.useQuery();

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Ce que disent nos clients
        </h2>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex items-start gap-4 mb-6">
            {current.imageUrl && (
              <img
                src={current.imageUrl}
                alt={current.clientName}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {current.clientName}
              </h3>
              <p className="text-sm text-gray-600">{current.service}</p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < current.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            {current.title}
          </h4>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {current.content}
          </p>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goToPrevious}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={24} className="text-blue-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={24} className="text-blue-600" />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {currentIndex + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </div>
  );
}
