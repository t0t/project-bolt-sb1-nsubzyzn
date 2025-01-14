import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl mb-12">
          Me meto en el huerto de estar
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Aprendizaje contínuo de no saber</h2>
              <p className="text-neutral-600 mb-6">
              Entiendo y percibo el Proceso 01234 como un viaje de autodescubrimiento en el que observo un territorio holístico de creación, donde todo lo que soy se materializa a través de esta antena humana que constantemente resuena y vibra. A medida que cuento y me sumerjo en esta experiencia, me doy cuenta de cómo la información se manifiesta en cada momento, fluyendo de manera completa y evidente. En este proceso, reconozco que somos respuesta a todo lo que nos rodea, creando un vínculo dinámico entre nuestra esencia y el mundo en el que existimos.
              </p>
              <p className="text-neutral-600">
              Al observar la lógica de este momento, reconozco y comprendo el Proceso 01234, que se manifiesta ante mí como un territorio holístico de creación. En este espacio, todo lo que soy se cristaliza a través de esta antena humana en constante resonancia y vibración. Estoy en un estado de conteo continuo, lo que me permite darme cuenta de la realidad y expandir mi comprensión. En este fluir de información, todo ocurre en su totalidad, y al hacerlo, me doy cuenta de que somos respuesta a las circunstancias que nos rodean, integrando cada experiencia en un tejido dinámico de significado.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Darse cuenta lo es todo</h2>
              <ul className="space-y-4 text-neutral-600">
                <li>
                  <strong className="text-black">Cero:</strong> posibilidad potencial disponible cifra infinitud deseo vacío-fértil oculta silencio espacio disuelve inmanente gracia incognoscible la-nube insondable eterno simultáneo pregunta ignora nada olvida curiosidad oportunidad
                </li>
                <li>
                  <strong className="text-black">Uno:</strong> es hay funda orden pulsa unidad espíritu lógica fuente origen brilla conoce discierne respuesta universo matriz verdad emana confia raíz claridad revela implica creación existe vibra centro nuevo foco faro lugar llega fin
                </li>
                <li>
                  <strong className="text-black">Dos:</strong> Separa gesta fecunda conforma alma memoria resuena registra agua siente separa pantalla revestimiento vasija rompe imagen ilusión velo paradoja recuerda repite psique espeja parte ilusión descompone impronta reconoce
                </li>
                <li>
                  <strong className="text-black">Tres:</strong> Ambiente símbolo expande decir sentido poesía conexión lenguaje mente analogía código telepatía significa aire mapea contexto relaciona concatena media interpreta lee descifra reúne encuentro información capta cuenta
                </li>
                <li>
                  <strong className="text-black">Cuatro:</strong> Coagula ya nace función templo humano evolución tierra tránsito cristaliza entrenamiento vida forma ciclos tiempo transita constata prueba acción cuerpo completa proceso retorna recursos ocurre llega fin
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}