import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarProps {
  onDateTimeSelect: (date: string, time: string) => void;
  minDate?: Date;
  maxDate?: Date;
  blockedDates?: string[];
}

export default function InteractiveCalendar({
  onDateTimeSelect,
  minDate = new Date(),
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
  blockedDates = [],
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(minDate));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Créneaux horaires disponibles (8h-20h, par 30 min)
  const timeSlots: TimeSlot[] = useMemo(() => {
    const slots: TimeSlot[] = [];
    for (let hour = 8; hour < 20; hour++) {
      for (let minute of [0, 30]) {
        const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        // Simuler une disponibilité (80% des créneaux disponibles)
        const available = Math.random() > 0.2;
        slots.push({ time, available });
      }
    }
    return slots;
  }, []);

  // Générer les jours du mois
  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDaysArray = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    // Jours vides du mois précédent
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Jours du mois
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const isDateAvailable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toISOString().split("T")[0];
    
    // Vérifier si la date est dans la plage
    if (date < minDate || date > maxDate) return false;
    
    // Vérifier si la date est bloquée
    if (blockedDates.includes(dateStr)) return false;
    
    // Vérifier si c'est un dimanche
    if (date.getDay() === 0) return false;
    
    return true;
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toISOString().split("T")[0];
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      onDateTimeSelect(selectedDate, time);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const days = getDaysArray();

  return (
    <div className="space-y-6">
      {/* Calendrier */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevMonth}
                disabled={currentDate <= minDate}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextMonth}
                disabled={currentDate >= maxDate}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Jours du mois */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} />;
              }

              const available = isDateAvailable(day);
              const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                .toISOString()
                .split("T")[0];
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => available && handleDateSelect(day)}
                  disabled={!available}
                  className={`
                    p-2 text-sm font-medium rounded-lg transition-all
                    ${!available ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                    ${isSelected ? "bg-blue-600 text-white" : ""}
                    ${available && !isSelected ? "bg-white border border-gray-300 hover:border-blue-600 hover:bg-blue-50 cursor-pointer" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Créneaux horaires */}
      {selectedDate && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Créneaux disponibles pour le {new Date(selectedDate).toLocaleDateString("fr-FR")}
              </h3>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`
                    p-2 text-sm font-medium rounded-lg transition-all
                    ${!slot.available ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                    ${selectedTime === slot.time ? "bg-blue-600 text-white" : ""}
                    ${slot.available && selectedTime !== slot.time ? "bg-white border border-gray-300 hover:border-blue-600 hover:bg-blue-50 cursor-pointer" : ""}
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>

            {selectedTime && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Créneau sélectionné : <strong>{selectedDate} à {selectedTime}</strong>
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Légende */}
      <div className="flex gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded" />
          <span>Indisponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded" />
          <span>Sélectionné</span>
        </div>
      </div>
    </div>
  );
}
