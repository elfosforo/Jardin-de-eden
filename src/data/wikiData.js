import { AlertTriangle, FlaskConical, Scissors, Droplets, Leaf, Sun, Moon, Activity, Eye, Search, Zap, Wind, Info } from 'lucide-react';

export const wikiCategories = ['TODO', 'HOW TO', 'S.O.S.', 'CONSEJOS'];

export const wikiArticles = [
  // 1-19: EXISTENTES Y REASIGNADOS
  {
    id: 1,
    title: 'ARAÑA ROJA: EL ASESINO INVISIBLE',
    category: 'S.O.S.',
    snippet: 'Puntos blancos en las hojas y telas de araña finas. Actúa rápido antes de que arruinen tu cosecha.',
    content: `SÍNTOMAS: Pequeñas manchas amarillas o blancas en las hojas. Si la infección es avanzada, verás finas telarañas en los cogollos y tallos.\n\nDIAGNÓSTICO: La araña roja prospera en ambientes secos y cálidos. Suelen ubicarse en el envés (parte de abajo) de las hojas.\n\nSOLUCIÓN URBANA:\n1. Sube la humedad de tu indoor inmediatamente (odian el agua).\n2. Rocía aceite de Neem combinado con jabón potásico en horas de oscuridad (nunca con luz directa).\n3. Repite el proceso cada 3 días durante al menos 2 semanas para romper su ciclo reproductivo.`,
    icon: AlertTriangle
  },
  {
    id: 2,
    title: 'DEFICIENCIA DE NITRÓGENO',
    category: 'S.O.S.',
    snippet: 'Tus hojas más bajas se están volviendo amarillas pálidas y se caen. Así es como la salvas.',
    content: `SÍNTOMAS: Las hojas más viejas (las de abajo) comienzan a perder su color verde, volviéndose completamente amarillas y eventualmente marchitándose.\n\nDIAGNÓSTICO: El nitrógeno es móvil. Cuando a la planta le falta, mueve el nitrógeno de las hojas viejas a los brotes nuevos. Ocurre comúnmente en la fase de estiramiento pre-floración.\n\nSOLUCIÓN URBANA:\n1. Aplica un fertilizante rico en Nitrógeno (N) en tu próximo riego. \n2. Si necesitas resultados de emergencia, haz un riego foliar (rocía las hojas directamente) con una solución de nitrógeno diluida al 20%.\n3. Ajusta tu pH: a veces el nitrógeno está en la tierra, pero un pH inadecuado impide que la planta lo absorba (Mantén el pH entre 6.0 y 6.5 en tierra).`,
    icon: FlaskConical
  },
  {
    id: 3,
    title: 'LST: DOBLADO DE BAJO ESTRÉS',
    category: 'HOW TO',
    snippet: 'Rompe la dominancia apical sin dañar tu planta. Multiplica tus puntas principales.',
    content: `¿QUÉ ES?: LST (Low Stress Training) significa amarrar y doblar las ramas para que crezcan en horizontal en lugar de vertical.\n\nVENTAJA: Al poner la rama principal a la misma altura que las secundarias, la luz llega a todas por igual, creando múltiples colas principales gigantes.\n\nCÓMO HACERLO (Paso a paso):\n1. Espera a que la planta tenga al menos 4 nudos de altura.\n2. Usa alambre con cobertura plástica (para no cortar el tallo).\n3. Dobla el tallo principal suavemente hasta unos 90 grados.\n4. Asegura la base del tallo en la dirección opuesta para que no arranques las raíces.\n5. Reajusta los amarres cada 3-4 días mientras la planta crece.`,
    icon: Scissors
  },
  {
    id: 4,
    title: 'SOBRE-RIEGO VS FALTA DE RIEGO',
    category: 'S.O.S.',
    snippet: 'Aprende a diferenciar por qué tu planta está caída. Un error aquí puede ser fatal.',
    content: `¿CÓMO DIFERENCIARLOS?\nA simple vista, ambas hacen que la planta se vea triste y caída, pero tienen detalles clave:\n\nFALTA DE RIEGO (Sub-riego):\n- Las hojas se ven caídas PERO se sienten de papel, delgadas y sin vida.\n- El tallo principal suele perder rigidez en la punta.\n- La maceta no pesa absolutamente nada.\n\nSOBRE-RIEGO:\n- Las hojas están caídas pero se sienten FIRMES y pesadas (están llenas de agua).\n- Se curvan en forma de "garra" hacia abajo.\n- La maceta pesa muchísimo.\n\nLA REGLA DE ORO:\nMete el dedo 3 centímetros en el sustrato. Si está húmedo, NO riegues. Levanta la maceta: aprende a reconocer su peso cuando está seca.`,
    icon: Droplets
  },
  {
    id: 5,
    title: 'RIEGO Y NUTRICIÓN EN ETAPA DE BROTE',
    category: 'CONSEJOS',
    snippet: 'La regla de oro para recién nacidas: no las quemes.',
    content: `En etapa de brote: No utilices ningún tipo de nutriente o fertilizante, solo agua.\n\nLas plántulas recién germinadas tienen suficientes reservas en sus cotiledones y raíces jóvenes para sobrevivir sus primeros días. Darles fertilizante en esta etapa las quemará instantáneamente (toxicidad por nutrientes). Usa solo agua con pH regulado.`,
    icon: Droplets
  },
  {
    id: 6,
    title: 'REGLA DE RIEGO EN TIERRA',
    category: 'CONSEJOS',
    snippet: 'El error más común de los novatos: regar demasiado.',
    content: `Regla de riego en tierra: No riegues hasta que la tierra esté seca.\n\nPara asegurarte, levanta la maceta. Si se siente pesada, aún tiene agua en el fondo. Si se siente ligera como el cartón, es hora de regar. Las raíces necesitan oxígeno tanto como agua; dejar que el sustrato se seque evita la pudrición radicular.`,
    icon: Droplets
  },
  {
    id: 7,
    title: 'HIDROPONÍA: REGLA DEL 50%',
    category: 'CONSEJOS',
    snippet: 'Cómo rellenar tus tanques sin intoxicar tus raíces.',
    content: `Hidroponía: Al rellenar los tanques, hazlo utilizando una concentración de nutrientes al 50% de lo indicado por el fabricante, y mantén un pH ideal de 5.8.\n\nLos fabricantes suelen exagerar las dosis. Es mejor pecar de precavido y observar cómo responde la planta. Un pH de 5.8 en DWC o hidroponía asegura la máxima absorción de macro y micro nutrientes.`,
    icon: FlaskConical
  },
  {
    id: 8,
    title: 'EVOLUCIÓN DEL PH EN TIERRA',
    category: 'CONSEJOS',
    snippet: 'El pH no es estático. Así debes variarlo a lo largo del cultivo.',
    content: `Evolución del pH en tierra:\n- Durante el crecimiento: Mantén el pH entre 5.5 y 6.0.\n- Prefloración: Súbelo gradualmente de 5.8 a 6.2.\n- Durante la floración: Puede llegar hasta 6.5.\n\nUn estándar ideal general y seguro si cultivas en tierra es 6.3 a lo largo de casi todo el ciclo. Ajustar el pH permite que la planta absorba fósforo y potasio más eficientemente en floración.`,
    icon: FlaskConical
  },
  {
    id: 9,
    title: 'REGLA DEL DOBLE DE CAPACIDAD (MACETAS)',
    category: 'CONSEJOS',
    snippet: 'Cómo y cuándo hacer los trasplantes para un sistema radicular explosivo.',
    content: `Comienza germinando en una maceta pequeña del tamaño de un yogur (aproximadamente 0,13 L).\n\nCuando asomen las primeras hojas reales y las raíces llenen ese vasito, es momento del trasplante. La nueva maceta debe tener SIEMPRE el doble de capacidad de la actual para no perjudicar el desarrollo radicular. Trasplantes escalonados (ej: 0.13L -> 1L -> 3L -> 11L) crean una red de raíces mucho más densa.`,
    icon: Leaf
  },
  {
    id: 10,
    title: 'LA REGLA DEL "NO TRASPLANTE"',
    category: 'CONSEJOS',
    snippet: 'Existen momentos críticos donde un trasplante matará o estresará tu planta.',
    content: `NUNCA trasplantes cuando:\n1. La planta esté a pleno sol (horas de calor intenso). Hazlo al atardecer o con luces apagadas.\n2. El pan de raíces esté demasiado mojado (se desmoronará y romperás las raíces).\n3. NUNCA durante la etapa de floración. El estrés del trasplante frenará el desarrollo de los cogollos permanentemente.`,
    icon: AlertTriangle
  },
  {
    id: 11,
    title: 'HUMEDAD RELATIVA PERFECTA',
    category: 'CONSEJOS',
    snippet: 'Guía exacta de humedad para cada etapa del cultivo.',
    content: `Ajusta tu humidificador/deshumidificador progresivamente según estas métricas exactas:\n\n- Recién germinadas (Esquejes/Plántulas): 80 - 90% HR\n- Crecimiento vegetativo: 65 - 75% HR\n- Pre-floración: 50 - 65% HR\n- Plena floración: 45 - 55% HR\n\nMantener la floración por debajo del 50% en las últimas semanas es vital para evitar problemas graves de moho (botrytis).`,
    icon: Droplets
  },
  {
    id: 12,
    title: 'PARÁMETROS DE TEMPERATURA Y ESTRÉS',
    category: 'CONSEJOS',
    snippet: 'Evita que tus plantas se quemen o se congelen.',
    content: `La temperatura ideal oscila entre los 20 °C y 25 °C, sin bajar nunca de los 18 °C ni pasar los 28 °C.\n\nAjusta la altura del foco para que las puntas de las plantas no superen los 25 °C. Puedes comprobarlo poniendo tu mano a la altura de las puntas; si te quema a ti, le quema a la planta.\n\nRegla de la oscilación térmica: La diferencia de temperatura entre el día y la noche NUNCA debe ser igual o superior a 10 °C.`,
    icon: Sun
  },
  {
    id: 13,
    title: 'DESCENSO NOCTURNO EN FLORACIÓN',
    category: 'CONSEJOS',
    snippet: 'El secreto para cogollos más compactos y densos.',
    content: `Durante la etapa de floración, una caída controlada de la temperatura durante la noche de entre 3 a 5 °C (aprox. 5 a 10 °F) es extremadamente beneficiosa.\n\nEsto ayuda a regular la respiración de la planta, simula la llegada del otoño, y crea flores mucho más compactas, densas y resinosas. Incluso puede provocar la aparición de tonos morados/púrpuras en genéticas predispuestas.`,
    icon: Moon
  },
  {
    id: 14,
    title: 'HORARIOS DEL FOTOPERIODO',
    category: 'CONSEJOS',
    snippet: 'Configuración exacta del temporizador de luces.',
    content: `Fase Vegetativa: Debes aportar 18 horas de luz y 6 de oscuridad (algunos cultivadores usan 20/4 o incluso 24/0 para autos, pero 18/6 es lo más seguro y natural).\n\nFase de Floración: Estrictamente 12 horas de luz y 12 horas de oscuridad.\n\nREGLA DE ORO: Las plantas deben estar en oscuridad ABSOLUTA y continua durante sus 12 horas de noche. ¡No las mires, no enciendas linternas ni interrumpas el ciclo o podrías estresarlas y convertirlas en hermafroditas!`,
    icon: Sun
  },
  {
    id: 15,
    title: 'LA REGLA DE LOS 5 NUDOS',
    category: 'CONSEJOS',
    snippet: 'Cuándo empezar a doblar y entrenar tus plantas.',
    content: `Si vas a aplicar Entrenamiento de Bajo Estrés (LST) o realizar tu primera poda apical, la regla es estricta: espera a que la planta haya desarrollado al menos 5 nudos (pares de hojas reales) antes de empezar a doblar las ramas o cortar.\n\nHacerlo antes puede retrasar severamente el crecimiento de una plántula que aún no tiene raíces fuertes para soportar el estrés.`,
    icon: Scissors
  },
  {
    id: 16,
    title: 'LOLLIPOPPING: REGLA DEL 20-30%',
    category: 'HOW TO',
    snippet: 'Elimina lo que no sirve para engordar la copa.',
    content: `En la tercera semana de floración (cuando termina el estiramiento inicial), debes realizar la técnica "Lollipopping".\n\nConsiste en podar o eliminar exactamente el 20-30% inferior de la planta (ramas pequeñas, hojas pochas y brotes que reciben poca luz). Esto obliga a la planta a redirigir toda su energía y nutrientes hacia la copa superior, generando cogollos gigantes en vez de palomitas (popcorn buds) en la base.`,
    icon: Scissors
  },
  {
    id: 17,
    title: 'CÁLCULO EXACTO DE EXTRACCIÓN (m³/h)',
    category: 'CONSEJOS',
    snippet: 'Fórmula matemática para elegir tu extractor de aire.',
    content: `No elijas tu extractor al azar. Necesitas renovar el aire para controlar la humedad y el CO2.\n\nLa métrica es: Multiplica el volumen de tu sala de cultivo (largo x ancho x alto en metros) por 60.\n\nEjemplo: Si tu sala o armario mide 1.5m x 1.5m x 2m (Volumen = 4.5 m³).\nFórmula: 4.5 x 60 = 270 m³/h.\nEsa es la potencia exacta que necesita tu extractor principal. Añade un 20% extra si usas filtro de carbón activo.`,
    icon: Activity
  },
  {
    id: 18,
    title: 'MÉTRICAS EXACTAS PARA SECADO',
    category: 'HOW TO',
    snippet: 'No arruines meses de trabajo secando mal.',
    content: `Secado: Cuelga los cogollos (o las ramas enteras) boca abajo. El proceso debe durar entre 3 a 14 días (idealmente cerca de 10-14 días para un secado lento y de calidad).\n\nDebes mantener el cuarto en ESTRICTA OSCURIDAD.\n- Temperatura: de 15 °C a 25 °C (Ideal 18-20°C).\n- Humedad Relativa: Anclada entre el 55% y el 65%.\n\nUsa ventiladores para mover el aire, pero NUNCA apuntes un ventilador directamente a los cogollos, o se secarán por fuera y quedarán húmedos por dentro.`,
    icon: Leaf
  },
  {
    id: 19,
    title: 'MÉTRICAS EXACTAS PARA CURADO',
    category: 'HOW TO',
    snippet: 'El toque maestro para el mejor sabor y olor.',
    content: `Una vez que las ramitas secundarias se quiebren al doblarlas (en vez de doblarse como goma), mete los cogollos en frascos de vidrio de cierre hermético.\n\nGuárdalos por un periodo de 2 semanas a 3 meses en un lugar oscuro y fresco.\n\nDurante las primeras 2 semanas: Abre los frascos (Eructado / Burping) diariamente durante 10-15 minutos para renovar el aire y dejar escapar la humedad residual.\nDespués de la segunda semana: Ábrelos 2 o 3 veces por semana.\nMantén el interior del frasco al 55-62% de humedad (usa sobres reguladores de humedad si es necesario).`,
    icon: FlaskConical
  },

  // NEW ARTICLES: HOW TO (20-26)
  {
    id: 20,
    title: 'CÓMO GERMINAR SIN FALLAR',
    category: 'HOW TO',
    snippet: 'La técnica de la servilleta húmeda y la oscuridad vs plantar directo en tierra.',
    content: `PASO A PASO PARA GERMINAR:\n1. Consigue un tupper de plástico limpio.\n2. Coloca dos capas de papel de cocina (servilleta) en el fondo.\n3. Humedece el papel con agua limpia (solo húmedo, NO empapado que gotee).\n4. Coloca las semillas dejando espacio entre ellas.\n5. Cubre con otras dos capas de papel húmedo.\n6. Cierra el tupper y guárdalo en un lugar oscuro y cálido (ej. sobre la nevera o un módem).\n7. En 24-72h verás salir la raíz blanca (radícula). Trasplanta a la tierra con la raíz hacia abajo.`,
    icon: Leaf
  },
  {
    id: 21,
    title: 'CÓMO CALIBRAR TU MEDIDOR DE PH',
    category: 'HOW TO',
    snippet: 'El mantenimiento de los electrodos para no obtener lecturas falsas.',
    content: `Un medidor descalibrado te mentirá y arruinará tu cultivo por bloqueo de nutrientes.\n\nCÓMO CALIBRAR:\n1. Consigue sobres de calibración (generalmente vienen en pH 4.01 y 6.86).\n2. Diluye el polvo en la cantidad exacta de agua destilada que indica el sobre (usualmente 250ml).\n3. Enciende el medidor, mételo en la solución 6.86 y presiona el botón "CAL" (o usa el destornillador) hasta que la pantalla marque exactamente 6.86.\n4. Enjuaga en agua limpia, seca, y repite con el de 4.01.\n\nCONSEJO DE VIDA: Nunca guardes el medidor seco. Deja unas gotas de líquido de almacenamiento KCL en la tapa para que la sonda no muera.`,
    icon: FlaskConical
  },
  {
    id: 22,
    title: 'CÓMO HACER EL LAVADO DE RAÍCES',
    category: 'HOW TO',
    snippet: 'Cuánta agua usar exactamente y por qué hacerlo antes de cosechar.',
    content: `El Flushing (Lavado) se hace 10-15 días antes del corte para obligar a la planta a consumir sus reservas, mejorando el sabor y quitando el rasgo "químico" al fumar.\n\nLA FÓRMULA:\nDebes regar la planta con el TRIPLE de agua de la capacidad de su maceta. Todo en un mismo día.\nEjemplo: Maceta de 11L -> Usa 33L de agua limpia (sin nutrientes, solo pH ajustado).\n\nEl agua empezará a drenar oscura por debajo (arrastrando sales) y terminará saliendo casi transparente. A partir de este día, riega solo con agua hasta el corte.`,
    icon: Droplets
  },
  {
    id: 23,
    title: 'CÓMO HACER LA PODA APICAL',
    category: 'HOW TO',
    snippet: 'El corte maestro para crear dos cabezas principales.',
    content: `El Topping rompe la "dominancia apical", haciendo que la planta deje de crecer como un pino de navidad y se vuelva un arbusto redondo.\n\nPASO A PASO:\n1. Espera a que la planta tenga al menos 5 nudos completos.\n2. Con tijeras esterilizadas con alcohol, ubica el brote principal más alto.\n3. Córtalo limpiamente justo por encima del último nudo.\n4. Las dos ramitas que quedaban justo debajo del corte se convertirán ahora en las DOS nuevas puntas principales.\n\n¡Nunca le hagas poda apical a una autofloreciente a menos que seas experto! Las estresa demasiado y su ciclo de vida es muy corto.`,
    icon: Scissors
  },
  {
    id: 24,
    title: 'CÓMO IDENTIFICAR MACHOS Y HEMBRAS',
    category: 'HOW TO',
    snippet: 'Aprende a ver los pistilos blancos vs las "bolsas" de polen.',
    content: `CÓMO Y CUÁNDO:\nAl pasar a floración (o en pre-floración a las 4-6 semanas en autos), mira los nudos de la planta (donde las ramas se unen al tallo principal).\n\nHEMBRA (LA BUENA):\nVerás que sale un pequeño cáliz con forma de lágrima del cual asoman DOS PELITOS BLANCOS (pistilos). ¡Estás a salvo!\n\nMACHO (EL ASESINO):\nVerás unas pequeñas bolitas que parecen huevitos verdes colgando de un palito (como racimos de uvas miniatura). MÁTALO INMEDIATAMENTE y tíralo lejos. Si esas bolsas se abren, soltarán polen y todas tus hembras se llenarán de semillas en vez de cogollos resinosos.`,
    icon: Eye
  },
  {
    id: 25,
    title: 'CÓMO ARMAR UNA MALLA SCROG',
    category: 'HOW TO',
    snippet: 'Cómo "tejer" las ramas por una red para crear un techo uniforme.',
    content: `SCROG (Screen of Green) es la técnica definitiva para aprovechar el 100% de tu luz interior.\n\nCÓMO HACERLO:\n1. Coloca una red firme a unos 20-30 cm por encima de las macetas.\n2. A medida que las ramas crecen y pasan la red, dóblalas suavemente y mételas por debajo del siguiente agujero.\n3. Sigue tejiendo horizontalmente hasta que la red esté cubierta un 70% en fase vegetativa.\n4. Pasa a floración. La planta se estirará hacia arriba de la red de manera uniforme.\n5. El resultado: En vez de un cogollo principal alto y varios pequeños abajo, tendrás decenas de colas principales del mismo tamaño.`,
    icon: Activity
  },
  {
    id: 26,
    title: 'EL MOMENTO EXACTO DEL CORTE (TRICOMAS)',
    category: 'HOW TO',
    snippet: 'Uso de lupa: tricomas transparentes, lechosos y ámbar.',
    content: `No cortes basado en el tiempo que dice el banco, ni por los pelitos naranjas. El único método real es mirar los tricomas (los cristales de resina) con una lupa 60x o microscopio.\n\nFASES DEL TRICOMA:\n- TRANSPARENTES (Como vidrio): Inmaduros. Si cortas aquí, la hierba no pega o da ansiedad.\n- LECHOSOS (Color blanco turbio/plástico): Pico de THC máximo. Efecto mental y eufórico intenso.\n- ÁMBAR (Color miel oscuro): El THC se oxida y se convierte en CBN. Efecto corporal pesado, narcótico, te deja pegado al sofá.\n\nCORTE IDEAL COMÚN: Cuando veas 80% lechosos y 20% ámbar.`,
    icon: Eye
  },

  // NEW ARTICLES: S.O.S. (27-33)
  {
    id: 27,
    title: 'MOSCA DEL SUSTRATO (FUNGUS GNATS)',
    category: 'S.O.S.',
    snippet: 'Bichos negros volando de la tierra por exceso de humedad.',
    content: `SÍNTOMAS: Ves pequeñas mosquitas negras caminando por la tierra o volando cerca de la maceta al regarla.\n\nEL PELIGRO: Las moscas adultas son inofensivas, pero sus larvas viven dentro de la tierra mojada y se alimentan de las raíces microscópicas de tu planta, deteniendo su crecimiento.\n\nSOLUCIÓN URBANA:\n1. ¡DEJA DE REGAR TANTO! Deja que la capa superior (los primeros 3-5 cm) se seque por completo.\n2. Cubre la superficie de la tierra con una capa de "Tierra de Diatomeas" o arena de sílice fina. Al salir, los bichos se rasgan y mueren.\n3. Usa trampas cromáticas amarillas para atrapar a los adultos que vuelan.`,
    icon: AlertTriangle
  },
  {
    id: 28,
    title: 'BOTRYTIS (MOHO GRIS)',
    category: 'S.O.S.',
    snippet: 'El terror de la floración. Pudrición desde el centro del cogollo.',
    content: `SÍNTOMAS: De la nada, notas que una hoja que sale directamente del cogollo principal se marchita o se seca y cae fácil si tiras de ella. Al abrir un poco el cogollo, ves moho gris, marrón y una textura blanda y podrida en el centro.\n\nCAUSA: Humedad superior al 60% durante la etapa final de floración combinada con mala ventilación y cogollos muy gordos.\n\nSOLUCIÓN URBANA:\n1. Apaga los ventiladores antes de cortar (para no esparcir esporas).\n2. Corta el cogollo infectado EN SU TOTALIDAD (incluso la parte buena cercana). Mejor perder un cogollo que toda la cosecha.\n3. Tíralo en una bolsa cerrada. NUNCA TE FUMES ESO (es peligroso para tus pulmones).\n4. Baja la humedad a 45% y mejora el flujo de aire al máximo.`,
    icon: AlertTriangle
  },
  {
    id: 29,
    title: 'OÍDIO (MOHO BLANCO POLVORIENTO)',
    category: 'S.O.S.',
    snippet: 'Manchas de polvo blanco sobre las hojas como si hubiera nevado.',
    content: `SÍNTOMAS: Aparecen manchas blancas y circulares en la parte superior de las hojas, similares a harina o talco esparcido.\n\nCAUSA: Oscilaciones brutales de temperatura, alta humedad sin flujo de aire constante, y plantas hacinadas (muy juntas).\n\nSOLUCIÓN URBANA:\n1. Mejora la extracción inmediatamente y no bajes la temperatura de noche drásticamente.\n2. Remedio foliar: Mezcla leche entera (1 parte) con agua limpia (9 partes) y rocía bajo luz apagada. Las proteínas de la leche matan el hongo al exponerse a la luz del día siguiente.\n3. También sirve: Agua con 1 cucharada de bicarbonato de sodio por litro.`,
    icon: AlertTriangle
  },
  {
    id: 30,
    title: 'DEFICIENCIA DE CALCIO / MAGNESIO (CAL-MAG)',
    category: 'S.O.S.',
    snippet: 'Manchas color óxido en las hojas bajo luces LED potentes.',
    content: `SÍNTOMAS:\n- MAGNESIO: Las hojas viejas se vuelven amarillas, PERO las venas de la hoja se mantienen de un verde oscuro (Clorosis intervenal).\n- CALCIO: Aparecen manchas pequeñas necróticas color óxido o marrón en hojas nuevas y medias.\n\nDIAGNÓSTICO: Extremadamente común al usar luces LED modernas muy potentes, o al regar con agua filtrada (ósmosis inversa o destilada) que carece de minerales base.\n\nSOLUCIÓN URBANA:\nAñade un suplemento comercial de "Cal-Mag" (Calcio + Magnesio) a tu solución de riego según el fabricante. Ajusta el pH en 6.2 para asegurar su correcta absorción.`,
    icon: FlaskConical
  },
  {
    id: 31,
    title: 'QUEMADURA POR FERTILIZANTE (EXCESO)',
    category: 'S.O.S.',
    snippet: 'Puntas de las hojas quemadas, crujientes y apuntando hacia arriba.',
    content: `SÍNTOMAS: Las puntas de casi todas las hojas se vuelven amarillas, luego marrones, y se quiebran si las tocas. Las hojas pueden tornarse de un verde hiper-oscuro brillante (garra de nitrógeno).\n\nDIAGNÓSTICO: Te emocionaste dándole comida. Acumulaste demasiadas sales en el sustrato (EC altísima).\n\nSOLUCIÓN URBANA:\n1. Suspende INMEDIATAMENTE todos los fertilizantes.\n2. Haz un riego copioso solo con agua a pH regulado hasta que veas que drena bastante agua por debajo de la maceta (para limpiar el exceso de sales).\n3. La planta tardará 1-2 semanas en recuperarse. Retoma la nutrición al 25% de la dosis anterior.`,
    icon: Zap
  },
  {
    id: 32,
    title: 'ESTRÉS LUMÍNICO (FOXTAILING)',
    category: 'S.O.S.',
    snippet: 'Cogollos deformes en forma de cola de zorro por exceso de luz o calor.',
    content: `SÍNTOMAS: Las hojas superiores se "acanalam" (se doblan hacia arriba como tacos o canoas). Los cogollos empiezan a crecer espigas delgadas por los lados, rompiendo la forma compacta original (foxtailing).\n\nCAUSA: Tu foco está demasiado cerca, literalmente friendo la planta, o la temperatura de la sala superó los 30°C constantes en floración.\n\nSOLUCIÓN URBANA:\n1. Sube tu foco de inmediato. Si no tienes altura, redúcele la potencia al panel LED (dimmer).\n2. Asegura que haya flujo de aire cruzado pasando entre el foco y la copa de las plantas para disipar la capa de calor.`,
    icon: Sun
  },
  {
    id: 33,
    title: 'BLOQUEO DE NUTRIENTES (LOCKOUT)',
    category: 'S.O.S.',
    snippet: 'La planta se muere de hambre llena de comida.',
    content: `SÍNTOMAS: Muestras múltiples deficiencias juntas (hojas amarillas, manchas de calcio, crecimiento estancado) a pesar de que le estás dando una buena línea de nutrientes.\n\nCAUSA: El pH de tu suelo está bloqueado por exceso de sales minerales. Si el pH cae por debajo de 5.5 o sube a 7.5 en tierra, las raíces se "sellan" y la planta no puede "comer" por más fertilizante que le eches.\n\nSOLUCIÓN URBANA:\n1. No eches más fertilizantes. Mide el pH del agua de drenaje (lo que sale por el plato debajo de la maceta).\n2. Haz un Lavado de Raíces para resetear el suelo (usa 3 litros de agua limpia por cada litro de tierra).\n3. El último litro del lavado hazlo con una solución nutritiva muy suave al pH ideal (6.2).`,
    icon: Activity
  },

  // NEW ARTICLES: CONSEJOS (34-39)
  {
    id: 34,
    title: 'EL TRUCO DEL AGUA REPOSADA',
    category: 'CONSEJOS',
    snippet: 'Por qué SIEMPRE debes dejar reposar el agua del grifo/llave.',
    content: `El agua que sale del grifo de tu casa está cargada de Cloro y, en muchas ciudades, Cloramina. El cloro mata todas las bacterias. Esto incluye a los microorganismos beneficiosos de tu suelo y daña los finos pelos radiculares de la planta.\n\nLA REGLA:\nLlena un balde o botella ancha, destápala, y déjala reposar al menos 24 a 48 horas. El cloro es un gas disuelto que se evaporará de manera natural. Si tienes prisa, usa una bomba de aire de pecera para acelerar la evaporación a 12 horas.`,
    icon: Droplets
  },
  {
    id: 35,
    title: 'LA REGLA DE LAS 48 HORAS DE OSCURIDAD',
    category: 'CONSEJOS',
    snippet: 'Oscuridad total antes de cortarla para un golpe final de resina.',
    content: `Justo antes de la cosecha, algunos cultivadores experimentados apagan las luces completamente durante 48 a 72 horas.\n\n¿POR QUÉ?: En la naturaleza, la planta produce resina (tricomas) como un escudo protector solar. Además, el THC y terpenos se degradan con luz potente y se regeneran de noche. Darle 2 días enteros de oscuridad absoluta induce un pico final de producción defensiva de resina y reduce la clorofila, mejorando el sabor final.`,
    icon: Moon
  },
  {
    id: 36,
    title: 'EL MITO DE QUITARLE LAS HOJAS (DEFOLIACIÓN)',
    category: 'CONSEJOS',
    snippet: 'No quites hojas grandes "para que le dé luz al cogollo".',
    content: `El error más común del novato es pelar la planta creyendo que los cogollos necesitan ver directamente el foco para engordar.\n\nLA VERDAD:\nLas hojas grandes (Fan Leaves) son los paneles solares de la planta. Producen la energía a través de la fotosíntesis que luego es enviada a las flores. Arrancar hojas sanas es quitarle su fuente de energía y causarle estrés severo.\n\nCUÁNDO SÍ CORTAR:\nSolo corta hojas muertas, amarillas de la zona inferior, o aquellas que realmente estén tapando directamente un brote fuerte secundario y no puedan ser simplemente "metidas debajo" usando la mano.`,
    icon: Scissors
  },
  {
    id: 37,
    title: 'EL VENTILADOR OSCILANTE',
    category: 'CONSEJOS',
    snippet: 'Nunca apuntes un ventilador fijamente a la planta.',
    content: `EL PROBLEMA:\nDejar un ventilador potente fijo apuntando todo el día a una misma planta causará "Quemadura por Viento" (Wind Burn). Las hojas se engarzarán, se verán arrugadas como papel de lija, y detendrán su crecimiento.\n\nLA REGLA:\nEl ventilador debe OSCILAR (moverse de lado a lado) para crear una suave brisa intermitente. La planta debe "bailar" suavemente, no luchar por su vida en un huracán. Esa brisa ligera fortalece los tallos drásticamente simulando el exterior.`,
    icon: Wind
  },
  {
    id: 38,
    title: 'TAMAÑO DE MACETA Y TAMAÑO DE PLANTA',
    category: 'CONSEJOS',
    snippet: 'Cuántos litros de tierra necesitas según el tiempo del cultivo.',
    content: `El tamaño final de la maceta definirá el tamaño de la planta, y a su vez, cuánto tiempo puedes tenerla creciendo sin que sus raíces se ahorquen a sí mismas.\n\nREGLA GENERAL EN INTERIOR:\n- Autoflorecientes: Macetas definitivas de 11L o 15L (nunca las trasplantes).\n- Feminizadas Fotoperiódicas:\n  > 3-4 semanas de crecimiento: Maceta final de 7L a 11L.\n  > 5-8 semanas de crecimiento: Maceta final de 15L a 20L.\n\nPara exteriores gigantes se usan directamente 50L, 80L o directo en suelo madre.`,
    icon: Leaf
  },
  {
    id: 39,
    title: 'SEMILLAS A GRANEL VS BANCOS RECONOCIDOS',
    category: 'CONSEJOS',
    snippet: 'Por qué la genética representa el 80% del éxito.',
    content: `EL CONSEJO FINAL:\nPuedes tener las mejores luces, los fertilizantes más caros, temperatura perfecta y hacer todo según las reglas, pero si tu semilla proviene del prensado de la calle o de una tienda sin reputación a granel, la planta tendrá mala estructura, hermafroditismo, o poca producción.\n\nLA REGLA:\nInvierte en semillas de bancos reputados (Barneys Farm, Dutch Passion, Sweet Seeds, Royal Queen Seeds, etc). La genética marca el "techo máximo" del potencial de la planta; tu trabajo solo es no arruinarlo para dejar que llegue a ese techo.`,
    icon: Info
  }
];
