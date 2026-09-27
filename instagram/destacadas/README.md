# Historias Destacadas: The Amado Effect

Portadas en el mismo formato del diseño de Canva **"Tu Historia Íconos para Destacadas Minimalista Negro y Blanco"**
(1080×1920, fondo negro degradado, círculo gris, ícono de línea blanca y etiqueta en Montserrat Light).

## 1. Portadas listas (`portadas/`)

| Orden | Destacada | Archivo | Prioridad |
|---|---|---|---|
| 1 | Sobre mí | `01-sobre-mi.png` | 🔥 Ahora |
| 2 | Mis mentores | `02-mentores.png` | 🔥 Ahora |
| 3 | Testimonios | `03-testimonios.png` | 🔥 Ahora |
| 4 | The Amado Effect (programa) | `04-the-amado-effect.png` | Siguiente |
| 5 | Ebook / Recursos | `05-recursos.png` | Siguiente |
| 6 | Preguntas frecuentes | `06-preguntas-frecuentes.png` | Después |
| 7 | Código APEX | `07-codigo-apex.png` | Después |
| 8 | Horarios | `08-horarios.png` | Opcional |
| 9 | Avisos importantes | `09-avisos-importantes.png` | Opcional |

`00-vista-general.png` es la hoja resumen de todas las portadas.

> El círculo va centrado en la historia: Instagram recorta la portada al centro, así que no hay que moverla al subirla.

## 2. Guion de cada destacada (80/20: 5 historias cada una)

### Sobre mí: que te conozcan y confíen
1. **Foto tuya de frente + texto:** "Soy Jair. Ayudo a mujeres a atraer y construir relaciones auténticas."
2. **Tu historia (foto de antes o un momento clave):** "No siempre supe cómo conectar. Esto cambió cuando…"
3. **Lifestyle (viaje / fine dining / evento):** "Hoy vivo lo que enseño: presencia, conexión, libertad."
4. **Método en 3 palabras:** "Comunicación · Magnetismo · Autenticidad".
5. **CTA:** "¿Quieres trabajar conmigo? Escríbeme *AMADO* por DM" + sticker de enlace.

### Mis mentores: autoridad por asociación
1. **Portada:** "Las personas que me formaron".
2–4. **Una foto por mentor/evento** (fotos juntos, certificaciones, escenario): nombre + 1 línea de lo que aprendiste.
   Ej.: "Con [Mentor] aprendí que la atracción se comunica antes de hablar."
5. **Cierre:** "Todo esto lo condensé en The Amado Effect" + enlace.

### Testimonios: prueba social
1. **Portada:** "Lo que dicen quienes ya lo vivieron".
2–4. **Capturas de chat / reseñas / video corto** con estructura *Antes → Después*.
   Tapa nombres o pide permiso. Resalta la frase clave con el marcador de Instagram.
5. **CTA:** "¿Tú eres la siguiente historia? Escríbeme *QUIERO* por DM".

**Regla:** una idea por historia, texto dentro de la zona segura (deja ~250 px libres arriba y abajo).

## 3. Cómo subirlas en Instagram (5 minutos)

1. Pasa las portadas de `portadas/` al teléfono.
2. Publica las historias de cada destacada (o usa tu archivo de historias).
3. Perfil → **+ Nueva** destacada → selecciona las historias → Siguiente.
4. **Editar portada** → ícono de galería → elige la portada PNG → Listo.
5. Nombre corto (máx. ~10 caracteres visibles): `Sobre mí`, `Mentores`, `Testimonios`.
6. Ordena: Sobre mí → Mentores → Testimonios (las más recientes quedan a la izquierda; actualiza en orden inverso).

Para cambiar la portada de una destacada que ya existe: mantén presionada la destacada → **Editar destacada** → **Editar portada**.

## 4. Regenerar o agregar portadas

```bash
node instagram/destacadas/generar-portadas.mjs
```

Para agregar una nueva, añade una entrada en `COVERS` dentro de `generar-portadas.mjs` (etiqueta + ícono).
La fuente Montserrat Light está en `fuentes/` (licencia OFL).
