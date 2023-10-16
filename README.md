||||
| :- | :-: | -: |

**Virtual Velocity: Racing Unleashed**

**Documento de Diseño**


![Logo URJC](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/URJC_logo.svg/1280px-URJC_logo.svg.png)


![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.001.png)





**Realizado por:**  

Néstor Bermejillo: <n.bermejillo.2021@alumnos.urjc.es>

Antonio Bernal: <a.bernal.2021@alumnos.urjc.es>

Ángel Luis Rodríguez: <al.rodriguez.2021@alumnos.urjc.es>

Alejandro Tobías: <a.tobias.2021@alumnos.urjc.es>

Pablo Prior: <p.prior.2019@alumnos.urjc.es>

Universidad Rey Juan Carlos: <infor@urjc.es>

**Índice**

[1. Introducción	2](#_toc1309472035)

[1.1. Concepto	2](#_toc1371977719)

[1.2. Características	2](#_toc1084118000)

[1.3. Género	3](#_toc247888069)

[1.4. Público objetivo	3](#_toc10160261)

[1.5. Jugabilidad	3](#_toc1418753267)

[1.6. Estilo Visual	4](#_toc1728037008)

[1.7. Alcance	5](#_toc1875948294)

[2. Gameplay y Mecánicas	5](#_toc392857229)

[2.1. Controles	5](#_toc1199572066)

[2.2. Tipos de vehículos	6](#_toc835786111)

[2.3. Power-Ups	7](#_toc147469173)

[2.4. Circuitos	8](#_toc1101091840)

[2.5. Físicas	9](#_toc232338455)

[3. Requerimientos Tecnológicos	9](#_toc792935284)

[3.1. Herramientas utilizadas en el juego	10](#_toc376122019)

[3.2. Herramientas en el diseño del juego	10](#_toc1843407605)

[4. Parte frontal del juego	10](#_toc668451493)

[4.1. PEGI	10](#_toc1958933244)

[5. Arte	11](#_toc802558874)

[5.1. Arte 2D	11](#_toc488848280)

[6. Música y efectos de sonido	12](#_toc175372400)

[7. Miembros y roles	13](#_toc1547280483)

[7.1. Roles	13](#_toc409737379)

[7.2. GitHub	13](#_toc1115843365)

[7.3. Correos	13](#_toc2032803579)








# <a name="_toc1309472035"></a>**1. Introducción**

En este documento de diseño se presenta el videojuego *Virtual Velocity: Racing Unleashed*. Este título de carreras en 2D con vista cenital para PC y desarrollado en JavaScript, tendrá diferentes y variadas mecánicas para hacer disfrutar a los jugadores. Sirva este escrito como referencia y presentación del propio videojuego.

## <a name="_toc1371977719"></a>**1.1. Concepto**

En *Virtual Velocity: Racing Unleashed* se podrá controlar nuestro propio coche de carreras personalizable para poder así sentir y disfrutar la adrenalina de conducir, pero con un toque más animado y arcade. Aquí, se permitirá competir en solitario o junto a otro usuario gracias al juego en línea multijugador. Gracias al uso de Power-Ups y ventajas otorgadas, cada jugador deberá dar el número de vueltas estipulado en el menor tiempo posible.

## <a name="_toc1084118000"></a>**1.2. Características**

Las principales características de *Virtual Velocity: Racing Unleashed* son: 

- **Experiencia de conducción arcade:** se ofrecerá una experiencia de conducción más dinámica y osada en contrapartida a una simulación más realista. Los controles serán intuitivos y accesibles para facilitar y fomentar toda la experiencia jugable a los usuarios.
- **Frenetismo:** Las carreras rápidas y frenéticas hará que siempre sepa a poco jugar un número de partidas concreto.
- **Personalización:** Los jugadores podrán personalizar su propio coche de carreras con una gama de opciones, que van desde la selección de colores y diseños hasta diferentes formas de conducción de cada vehículo.
##
## <a name="_toc247888069"></a>**1.3. Género**

Es una combinación de varios géneros:

- **Carreras**: En este juego se puede competir en circuitos contra otro rival como si fuese una carrera profesional.

- **Arcade:** Se añade al género de carreras una variante más casual, recreativa y retro que le aportará un toque más divertido. Se dispondrá de Power-Ups, obstáculos y aleatoriedad.

Análogamente, el videojuego entraría dentro de otros subgéneros como: 

- **Multijugador en línea**: La inclusión de modos multijugador hace que se declare este subgénero.
- Acción: Con la utilización de algunos Power-Ups y elementos especiales, entraría un factor de batalla y utilización de herramientas.

## <a name="_toc10160261"></a>**1.4. Público objetivo**

Al contar con partidas cortas y ciertamente frenéticas, *Virtual Velocity: Racing Unleashed* abarca una gran cantidad de edades a las que va dirigido. Tanto personas más jóvenes y con más tiempo para jugar, como personas más adultas que disponen de un tiempo más reducido, podrán disfrutar del número de partidas que deseen sin que esto afecte a la experiencia y jugabilidad.

## <a name="_toc1418753267"></a>**1.5. Jugabilidad**

En cada circuito y/o partida del videojuego, se tratará, no solo de ganar la carrera, sino también de la forma más divertida posible, siendo este el objetivo a conseguir. Es por ello que se valdrá de los siguiente:

- **Modo multijugador en línea:** Los jugadores podrán competir en solitario o unirse a otros usuarios en emocionantes carreras multijugador en línea. Esto permitirá a los jugadores a medir sus habilidades de conducción contra otras personas, ya sea en local o desde diferentes dispositivos.

- **Movimiento:** Se dispondrá de los controles básicos de movimiento para llegar a la meta lo antes posible, esto permitirá centrarse más fácilmente en recoger y usar los elementos de la pista y sus ventajas.

- **Diversidad de pistas y entornos:** El videojuego ofrecerá una variedad de pistas, desde circuitos tradicionales hasta trazados más urbanos o rurales. Cada una de ellas presentará un desafío de conducción diferente. 

- **Power-ups y elementos especiales:** Para añadir un toque único y emocionante a las carreras, *Virtual Velocity* podría incluir Power-Ups y elementos especiales que los jugadores pueden recoger y usar durante cada carrera. Esto puede hacer que cambie el trascurso y la estrategia de cada partida.
## <a name="_toc1728037008"></a>**1.6. Estilo Visual**

Se ha decidido que el estilo general de *Virtual Velocity: Racing Unleashed* sea a modo pixel art. Se optará por un tono más animado y menos realista siguiendo las mecánicas y jugabilidad del videojuego.

![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.002.png)

Estilo visual a asemejarse - [Fuente](https://www.istockphoto.com/es/ilustraciones/pixel-car)

## <a name="_toc1875948294"></a>**1.7. Alcance**

El videojuego saldrá de inicio con diferentes pistas, coches y diseños, pero no se descarta la introducción de actualizaciones al cabo del tiempo para mejorar y dar más vida a la experiencia.

# <a name="_toc392857229"></a>**2. Gameplay y Mecánicas**

En este apartado se tratará más a fondo la jugabilidad y los distintos elementos básicos y factores que hay en el videojuego. Para ello, se desarrollarán y explicarán los siguientes apartados
##
## <a name="_toc1199572066"></a>**2.1. Controles**

Para *Virtual Velocity: Racing Unleashed* se van a necesitar unos controles básicos para poder moverse a través de los diferentes menús del videojuego como es lógico. Esto se podrá hacer gracias al ratón.

Asimismo, centrándonos en el propio gameplay, se dispondrá de unos controles de movimiento con los que se les permitirá a los jugadores moverse por la pista/circuito. 

En el modo local, si los dos jugadores están jugando en el mismo dispositivo, los movimientos para cada uno serán:

- **J1**: teclas W, A, S, D (acelerar, izquierda, frenar, derecha)
- **J2**: teclas I, J, K, L (acelerar, izquierda, frenar, derecha)

Paralelamente, al disponer de los nombrados Power-Ups, se tendrá un botón de acción de los mismos. Para accionarlos y utilizarlos, se deberá pulsar:

- **J1**: tecla E
- **J2**: tecla O

Finalmente, cada cierto tiempo, el vehículo de cada jugador dispondrá de un pequeño turbo que le ayude a ir más rápido por el circuito. Este se irá recargando poco a poco y supondrá otra ventaja para el jugador. Se podrá utilizar de la siguiente manera:

- **J1**: tecla R
- **J2**: tecla P 

## <a name="_2.2._tipos_de"></a><a name="_toc835786111"></a>**2.2. Tipos de vehículos**

Como se ha comentado anteriormente, en *Virtual Velocity: Racing Unleashed* se dará la opción de manejar distintos tipos de vehículos. En un principio habrá 3 tipos diferentes de manejables, que se irán introduciendo en contenidos adicionales de futuras versiones del videojuego:

- **Coche deportivo (Cyclone):** Será el vehículo más equilibrado del videojuego, combinará velocidad, manejo y fuerza en unas estadísticas estándares para el inicio del mismo.

- **Moto (Zenith):** El vehículo más rápido con diferencia, pero el más difícil de manejar, tendrá un cierto desequilibrio en su conducción y se desestabilizará casi al mínimo contacto con otros elementos y/o vehículos.

- **Camión (IronClad)**: Vehículo pesado donde los haya, pero muy divertido de llevar. Será el más lento de los 3 pero arrasará con todos elementos del circuito y no sufrirá penalizaciones al chocar.

## <a name="_2.3._power-ups"></a><a name="_toc147469173"></a>**2.3. Power-Ups**

- **Nitro Boost:** El vehículo de cada jugador dispondrá de un pequeño turbo que le ayude a ir más rápido por el circuito. Este se irá recargando poco a poco y supondrá otra ventaja para el jugador, no constituye un Power-Up adquirido directamente de la pista.

- **Escudo de energía**: Crea una barrera temporal alrededor del coche del jugador que lo protege de los daños, colisiones con otros vehículos o elementos de la pista e inmunidad contra otros Power-Ups.

- **Pistola de congelación**: Congela al oponente durante unos segundos, lo que le impide moverse y le deja vulnerables a ataques.

- **Moco pegajoso**: Coloca un moco en la zona de la pista que se quiera que, cuando se pasa por encima, detiene a los vehículos cercanos durante un instante y les aplica una deceleración al volver a arrancar, lo que puede ser útil para despejar el camino o desestabilizar a los competidores.

- **Rayo de encogimiento**: Encoge temporalmente al coche de un oponente, reduciendo su velocidad y manejo del vehículo.

- **Tormenta eléctrica**: Invoca una tormenta de relámpagos que afecta al coche rival en la pista, ralentizándolo o incluso desactivando temporalmente sus sistemas para no poder usar los Power-Ups que se recojan.

- ¿Enjambre de drones: Despliega un escuadrón de drones que siguen al jugador y pueden atacar a los oponentes cercanos con pequeñas descargas?

- **Repulsión magnética**: Activa un campo magnético que repele a los vehículos cercanos, lo que puede ser útil para evitar colisiones o crear el espacio suficiente para pasar sin problema.

- **Inversión**: Hace que el coche del jugador rival vea invertidos sus controles de movimiento durante unos segundos, lo que producirá desconcierto y nerviosismo al oponente.

- **Teletransportación**: Permite al jugador teletransportarse instantáneamente a la otra parte de la pista, lo que puede utilizarse para evitar obstáculos o superar a los competidores.

- **Cambiazo**: Intercambia la posición del coche del jugador con la del oponente, lo que puede utilizarse estratégicamente para superar a competidores más adelantados y quitarles toda la ventaja. Este Power-Up tendrá una ratio de aparición mucho menor que el resto.


## <a name="_2.4._circuitos"></a><a name="_toc1101091840"></a>**2.4. Circuitos**

En un principio se contará con 3 circuitos jugables dentro de *Virtual Velocity: Racing Unleashed*. Éstos combinarán diferentes trazadas, obstáculos y variedades en el entorno visual del jugador, ya sea actual o más tradicional. Con el tiempo se irán introduciendo nuevos circuitos en posibles expansiones. Los circuitos jugables en un medio plazo serían los siguientes:

- **Circuito urbano nocturno**: Un circuito que serpentea por las calles de una ciudad iluminada por neones y luces, con curvas cerradas y atajos a través de callejones oscuros.

- **Circuito de playa:** Un trazado a lo largo de una bonita costa con curvas suaves, tramos de arena y pasarelas de madera, con el mar a un lado y un paseo marítimo animado al otro.

- **Pista en la selva**: Una carrera a través de densa vegetación tropical, con curvas cerradas.

- **Circuito futurista**: Un circuito en una metrópolis futurista con autopistas flotantes, túneles de alta tecnología.

- **Circuito de desierto extraterrestre**: Una pista en un desierto alienígena con terreno rocoso y cráteres.

- **Circuito de montaña nevada**: Una pista que sube y baja por las montañas cubiertas de nieve y con curvas peligrosas.

- **Circuito en fábrica abandonada**: Una carrera en una fábrica en desuso, con obstáculos industriales, pasillos estrechos y la sensación de explorar un lugar abandonado.

- **Pista en las alcantarillas**: Una carrera a través de las alcantarillas de una ciudad, se podrán encontrar ríos de agua sucia, paredes sucias y mohosas y un sitio lúgubre en general.

- **Circuito en el bosque encantado**: Un trazado en un bosque mágico con caminos de tierra, setas gigantes y cascadas de agua cristalina.

## <a name="_toc232338455"></a>**2.5. Físicas**

En *Virtual Velocity: Racing Unleashed* tendremos una vista cenital en todo momento del circuito en el que se está corriendo. En él, como se ha comentado, habrá distintos elementos que supongan obstáculos para los jugadores. Éstos pueden ser impedimentos en forma de objetos sólidos en el camino, que ralenticen los vehículos de los usuarios. Estos objetos tendrán estéticas acordes a cada circuito. Además, los circuitos dispondrán de barreras con las que también se podrá chocar los jugadores, al igual que entre los vehículos que estén sobre el circuito. 

Las colisiones serían:

- Jugador - Objetos del circuito

- Jugador – Barreras 

- Jugador - Jugador

# <a name="_toc792935284"></a>**3. Requerimientos Tecnológicos**

## <a name="_toc376122019"></a>**3.1. Herramientas utilizadas en el juego**

El juego deberá implementarse con las tecnologías principales abordadas en la asignatura:

- Lado del servidor: Java con SpringBoot.
- Lado del cliente: JavaScript con el framework Phaser 3.

Asimismo, se utilizará lo siguiente para el desarrollo del videojuego

- Microsoft Visual Studio 2022.
- GitHub

## <a name="_toc1843407605"></a>**3.2. Herramientas en el diseño del juego**

Para realizar los diferentes diseño y prototipos del videojuego se usarán diferentes herramientas de dibujado y edición como:

- Photoshop 2023

# <a name="_toc668451493"></a>**4. Parte frontal del juego**

En la carátula y menú principal del videojuego se enseñará la siguiente información: Pegi, logo de empresa, logo del videojuego y título del mismo con su correspondiente tipografía y diseño.

## <a name="_toc1958933244"></a>**4.1. PEGI**

*Virtual Velocity* es un juego pensado para todas las edades en el que no se representa nada de violencia en las carreras.

El juego tendrá una tienda en la que se puedan comprar skins y diseños exclusivos para los coches. ¿No está claro si desde el día de lanzamiento?

![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.003.jpeg)                        ![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.004.jpeg)

# <a name="_toc802558874"></a>**5. Arte**

El estilo visual de *Virtual Velocity: Racing Unleashed* está diseñado para complementar la experiencia de juego. Como ya se ha mencionado previamente, se ha optado por un estilo de arte *pixel art,* que combina con la jugabilidad animada y arcade del juego. Este enfoque estilístico ha sido elegido para dar al juego un aspecto atractivo y único, manteniendo al mismo tiempo una sensación retro.

Todos los gráficos serán pixel art, tanto vehículos, personajes, circuitos como elementos del entorno, así como la interfaz de usuario (UI). Esta última cuenta con elementos como el indicador de velocidad, los mapas de pista y las posiciones de los jugadores legibles. Además, se ha elegido una fuente de texto adecuada para mantener la cohesión visual.

La paleta de colores es vibrante, lo que añade profundidad y emoción a los de las carreras. Los diseños de los vehículos reflejan su personalidad y estilo, permitiendo a los jugadores conectarse con sus elecciones, además de contar con múltiples opciones de personalización.

## <a name="_toc488848280"></a>**5.1. Arte 2D**

Explayarse todo lo que se quiera y meter diseño, bocetos o cosas ya hechas como referencia, ya sea de los [vehículos](#_2.2._tipos_de), [pistas,](#_2.4._circuitos) [iconos de Power-Ups](#_2.3._power-ups)...

Inspiración/referencias (en sucio):

![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.005.png)![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.006.png)

<https://www.artstation.com/artwork/L26G0R>	<https://www.123rf.com/photo_41826971_pixel-art-game-cars-collection-vector-illustration.html>

![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.007.png)![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.008.png)

<https://groovymcgee.itch.io/car-game-pixel-art>	<https://www.pinterest.cl/pin/AWAuqbZ7iO41AmLsg242xPrq-ZvK_2DSh8gEzwq_-RcoP_iNtF_P5gM/>

![](Aspose.Words.1ef4df2d-da37-4393-ba0f-857d04603b1d.009.png)

<https://mario-kart.fandom.com/es/wiki/Circuito_Mario_3>

Bocetos:


# <a name="_toc175372400"></a>**6. Música y efectos de sonido**

Los sonidos y músicas requeridos para el desarrollo del videojuego los descargaremos de páginas libres y sin Copyright:

- <https://freesound.org/>
- <https://pixabay.com/es/sound-effects/>
- <https://www.fiftysounds.com/es/>

# <a name="_toc1547280483"></a>**7. Miembros y roles**

## <a name="_toc409737379"></a>**7.1. Roles**

**Néstor Bermejillo González:** Programación de mecánicas
**Antonio Bernal de Celis:** Arte y diseño.
**Ángel Luis Rodríguez Otero:** Arte y diseño
**Alejandro Tobías Márquez:** Programación de objetos y potenciadores.
**Pablo Prior Molina:** Programación de interfaces.

## <a name="_toc1115843365"></a>**7.2. GitHub**

Repositorio: <https://github.com/NBGonzalez/JuegosEnRed>

## <a name="_toc2032803579"></a>**7.3. Correos**

Universidad Rey Juan Carlos: <infor@urjc.es>

Néstor Bermejillo: <n.bermejillo.2021@alumnos.urjc.es>

Antonio Bernal: <a.bernal.2021@alumnos.urjc.es>

Ángel Luis Rodríguez: <al.rodriguez.2021@alumnos.urjc.es>

Alejandro Tobías: <a.tobias.2021@alumnos.urjc.es>

Pablo Prior: <p.prior.2019@alumnos.urjc.es>

||||
| :- | :-: | -: |
