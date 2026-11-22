# Nuestras películas

Web estática (GitHub Pages) + Firebase Firestore. Cada uno pone su nota y la app calcula la media.

## 1. Firebase (≈5 min)
1. https://console.firebase.google.com → **Crear proyecto** (sin Analytics).
2. **Compilación > Firestore Database > Crear base de datos** → modo producción, región `eur3` (Europa).
3. Pestaña **Reglas** → pega el contenido de `firestore.rules` → **Publicar**.
4. **Configuración del proyecto (⚙️) > Tus apps > `</>` Web** → registra la app → copia el objeto `firebaseConfig` en `config.js`.

## 2. TMDB (≈3 min)
1. Cuenta gratis en https://www.themoviedb.org
2. Ajustes > API > solicita clave (uso personal). Copia la **API Key (v3 auth)** en `config.js`.

## 3. Personaliza `config.js`
Cambia los nombres en `PEOPLE` por los vuestros.

## 4. Subir a GitHub Pages
1. Crea un repositorio nuevo en GitHub (público) y sube `index.html`, `config.js`, `firestore.rules` y este README.
2. **Settings > Pages > Source: Deploy from a branch > main / (root)**.
3. En un minuto tendrás la web en `https://TU_USUARIO.github.io/NOMBRE_REPO/`.

## 5. Usarla
Abrid el enlace, poned un código compartido (p. ej. `cine-secreto-2026`, mínimo 6 caracteres, mejor largo y poco obvio) y elegid quién sois.

## Nota de seguridad
La clave de Firebase y la de TMDB quedan visibles en la web (es normal en apps de cliente). La protección real es el código compartido: se usa como parte de la ruta de los datos y las reglas no permiten listar otros códigos. Elige uno difícil de adivinar.

---

## Funciones extra (versión 3)

Archivos nuevos que hay que subir junto a `index.html`: `manifest.json`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`.
`config.js` y `firestore.rules` no cambian (no hace falta tocar las reglas de Firebase).

- **☰ Menú:** estrenos, juegos, resumen del año, récords, importar, copia de seguridad, tema e instalación.
- **🎮 Juegos:** duelo de notas, “Adivina la nota” (marcador compartido) y quiz con vuestro historial.
- **🎁 Resumen del año** estilo “Wrapped” (toca a los lados o usa las flechas).
- **🏆 Récords, cines, gasto y sagas.** El gasto sale del campo “Precio total (€)” de cada visita.
- **🔥 Votación de pendientes:** cada uno da de 1 a 3 estrellas; se puede ordenar por interés.
- **🔔 Aviso de estrenos** (banner si hay alguno en 14 días) y **📅 Calendario (.ics)** desde “Próximos estrenos”.
- **📺 Dónde verla:** plataformas en España (JustWatch vía TMDB) en la ficha de cada película.
- **💾 Copia de seguridad** (JSON, restaurable) y exportación a Excel (CSV).
- **🌓 Tema** claro, oscuro o automático.
- **📲 Instalable** en el móvil: iPhone → Compartir → “Añadir a pantalla de inicio”; Android → menú ⋮ → “Instalar aplicación”.

---

## Grupos: varios códigos, cada uno con sus dos personas

Cada **código** es un grupo independiente (sus películas, sus notas, sus nombres y sus cines sugeridos).
Un grupo es de **dos personas**.

- Al entrar con un código **nuevo**, la app pide los dos nombres y crea el grupo.
- Al entrar con un código **existente**, solo hay que elegir quién eres.
- Los grupos que ya existían (sin configuración guardada) siguen con los nombres de `config.js` y se guardan solos la primera vez.
- Menú ☰ → **👥 Grupo: nombres y cines**: cambiar los nombres (las notas guardadas no se pierden) y la lista de cines sugeridos.

**Importante:** hay que publicar las reglas nuevas de `firestore.rules` en Firebase (Firestore → Reglas → Publicar).
Añaden permiso para `rooms/{código}/meta/config`, donde se guarda la configuración de cada grupo.
Sin ese paso, los grupos nuevos no se pueden crear (la app lo avisa).

## Apartados: series, videojuegos y conciertos
- Arriba hay pestañas: 🎬 Películas · 📺 Series · 🎮 Videojuegos · 🎤 Conciertos. Todo vive en la misma colección de Firebase (campo `kind`), así que **no hay que cambiar las reglas**.
- **Series**: se buscan en TMDB (misma clave). **Videojuegos**: se buscan en RAWG; añade `export const RAWG_API_KEY = "tu_clave";` a tu `config.js` (gratis en rawg.io/apidocs). Sin clave, los juegos se añaden a mano. **Conciertos**: a mano.
- **Con quién**: en ☰ → Grupo puedes añadir "otras personas" (Noe, Fran…). Cada ficha tiene su lista de participantes; cada persona solo ve las fichas que creó o donde está marcada. Cada participante tiene su nota (y MH) y se puede poner la de otro con confirmación.
- Ojo: es un filtro de la app, no seguridad real. Quien tenga el código y sepa programar podría leer todo. Para privacidad de verdad hacen falta cuentas con inicio de sesión.
