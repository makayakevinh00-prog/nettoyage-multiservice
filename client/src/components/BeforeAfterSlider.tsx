import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  title: string;
  description?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  title,
  description,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg shadow-lg cursor-col-resize bg-gray-200 h-96"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={after}
          alt="Après"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden h-full"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={before}
            alt="Avant"
            className="w-full h-full object-cover"
            style={{ width: `${100 / (sliderPosition / 100)}%` }}
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
            <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
              <ChevronLeft size={16} />
              <span>Avant</span>
              <span className="mx-1">|</span>
              <span>Après</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-semibold">
          AVANT
        </div>
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-semibold">
          APRÈS
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        💡 Glissez le curseur pour voir la différence
      </p>
    </div>
  );
}
