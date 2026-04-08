import { useEffect, useState } from 'react';

export default function Maintenance() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculer le temps restant (2 jours = 172800 secondes)
    let totalSeconds = 2 * 24 * 60 * 60;

    const interval = setInterval(() => {
      totalSeconds--;

      if (totalSeconds <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <img src="/logo-proclean.png" alt="ProClean Empire" className="h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            ProClean <span className="text-blue-400">Empire</span>
          </h1>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            🚀 Nous sommes en maintenance
          </h2>
          <p className="text-lg text-gray-300 mb-2">
            Nous travaillons dur pour vous offrir une meilleure expérience !
          </p>
          <p className="text-gray-400">
            Notre nouveau site sera bientôt disponible avec des abonnements révolutionnaires et un système de réservation simplifié.
          </p>
        </div>

        {/* Chronomètre */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
          <p className="text-gray-300 text-sm mb-6">Réouverture dans :</p>
          <div className="grid grid-cols-4 gap-4">
            {/* Jours */}
            <div className="bg-blue-500/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-300 mt-2">Jours</div>
            </div>

            {/* Heures */}
            <div className="bg-blue-500/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-300 mt-2">Heures</div>
            </div>

            {/* Minutes */}
            <div className="bg-blue-500/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-300 mt-2">Minutes</div>
            </div>

            {/* Secondes */}
            <div className="bg-blue-500/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-300 mt-2">Secondes</div>
            </div>
          </div>
        </div>

        {/* Formulaire email */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <p className="text-gray-300 mb-4">Soyez notifié de la réouverture :</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              M'avertir
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-gray-400 text-sm">
          <p>Des questions ? Contactez-nous :</p>
          <p className="text-blue-400 font-semibold">contact@procleanempire.com</p>
        </div>
      </div>
    </div>
  );
}
