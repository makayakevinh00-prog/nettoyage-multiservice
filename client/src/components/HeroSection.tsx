<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image with Overlay */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/hero-nettoyage-pro.jpg')",
    }}
  />
  
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50" />
  
  {/* Content - Centered */}
  <div className="relative z-10 container mx-auto px-4 text-center">
    <div className="max-w-3xl mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.svg" alt="ProClean Empire" className="h-16 mx-auto mb-6" />
      </div>
      
      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
        PROCLEAN<br />
        <span className="text-blue-400">EMPIRE</span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-2xl md:text-3xl text-gray-100 mb-4 font-light">
        Nettoyage Multiservice Premium
      </p>
      
      {/* Description */}
      <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
        Nous entretenons tous les sites où la propreté est capitale. 
        Voiture • Tapis • Terrasse • Balcon • Jardinage • Façade • Professionnel
      </p>
      
      {/* CTA Button */}
      <a href="#booking" className="inline-flex items-center justify-center px-10 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
        DEMANDER UN DEVIS
        <ArrowRight className="ml-2 w-5 h-5" />
      </a>
    </div>
  </div>
</section>
