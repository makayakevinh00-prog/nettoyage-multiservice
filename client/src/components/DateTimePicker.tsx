import { useState } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const TIME_SLOTS = [
  { value: "08:00", label: "8h00 - Matin" },
  { value: "09:00", label: "9h00 - Matin" },
  { value: "10:00", label: "10h00 - Matin" },
  { value: "11:00", label: "11h00 - Matin" },
  { value: "12:00", label: "12h00 - Midi" },
  { value: "13:00", label: "13h00 - Début d'après-midi" },
  { value: "14:00", label: "14h00 - Après-midi" },
  { value: "15:00", label: "15h00 - Après-midi" },
  { value: "16:00", label: "16h00 - Après-midi" },
  { value: "17:00", label: "17h00 - Fin d'après-midi" },
  { value: "18:00", label: "18h00 - Soir" },
];

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const parsedDate = selectedDate ? new Date(selectedDate) : undefined;
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 90); // 3 mois à l'avance

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(format(date, "yyyy-MM-dd"));
      setIsDateOpen(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    onTimeChange(time);
    setIsTimeOpen(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Sélecteur de date */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium block">Date souhaitée *</label>
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12 border-2 border-gray-200 hover:border-blue-500",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              {selectedDate ? (
                format(new Date(selectedDate), "EEEE d MMMM yyyy", { locale: fr })
              ) : (
                <span>Choisir une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <DayPicker
              mode="single"
              selected={parsedDate}
              onSelect={handleDateSelect}
              disabled={(date) => isBefore(date, today) || date > maxDate}
              locale={fr}
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Sélecteur d'heure */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium block">Créneau horaire *</label>
        <Popover open={isTimeOpen} onOpenChange={setIsTimeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12 border-2 border-gray-200 hover:border-blue-500",
                !selectedTime && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              {selectedTime ? (
                TIME_SLOTS.find((slot) => slot.value === selectedTime)?.label || selectedTime
              ) : (
                <span>Choisir un créneau</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-2" align="start">
            <div className="grid gap-1 max-h-80 overflow-y-auto">
              {TIME_SLOTS.map((slot) => (
                <Button
                  key={slot.value}
                  variant={selectedTime === slot.value ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => handleTimeSelect(slot.value)}
                >
                  {slot.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
