import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

type Fase = "intro" | "question" | "fakeYes" | "chase" | "reveal" | "accepted";

type FakeButtonState = {
  id: number;
  label: string;
  visible: boolean;
  disabled?: boolean;
};

const mensajesIntentos = [
  "tienes que esforzarte más",
  "¿seguro que quieres esto?",
  "demuéstralo",
  "casi",
  "ok… sigues intentando",
];

const intentosParaDesbloquear = 8;

export default function Deric() {
  const [fase, setFase] = useState<Fase>("intro");
  const [fakeButtons, setFakeButtons] = useState<FakeButtonState[]>([
    { id: 1, label: "me apunto", visible: true },
    { id: 2, label: "me apunto", visible: true },
    { id: 3, label: "me apunto", visible: true },
  ]);
  const [mostrarTextoBroma, setMostrarTextoBroma] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [botonQuieto, setBotonQuieto] = useState(false);
  const [posicionBoton, setPosicionBoton] = useState({ x: 50, y: 50 });

  const chaseAreaRef = useRef<HTMLDivElement | null>(null);
  const buttonSizeRef = useRef({ width: 150, height: 56 });

  const mensajeActual = useMemo(() => {
    if (intentos === 0) return "tienes que alcanzarlo";
    return mensajesIntentos[(intentos - 1) % mensajesIntentos.length];
  }, [intentos]);

  useEffect(() => {
    if (fase === "reveal") {
      const end = Date.now() + 2000;

      const burst = () => {
        confetti({
          particleCount: 80,
          spread: 90,
          startVelocity: 35,
          scalar: 0.9,
          origin: { y: 0.6 },
        });
      };

      burst();

      const interval = window.setInterval(() => {
        if (Date.now() > end) {
          window.clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 40,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
        });

        confetti({
          particleCount: 40,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
        });
      }, 280);

      return () => window.clearInterval(interval);
    }
  }, [fase]);

  const irAChase = () => {
    setTimeout(() => {
      setFase("chase");
      setPosicionBoton({ x: 52, y: 58 });
    }, 500);
  };

  const manejarFakeButton = (id: number) => {
    setMostrarTextoBroma(true);

    setFakeButtons((prev) =>
      prev.map((btn) => {
        if (btn.id !== id) return btn;

        if (btn.id === 1) {
          return { ...btn, visible: false };
        }

        if (btn.id === 2) {
          return { ...btn, label: "casi", disabled: true };
        }

        return { ...btn, label: "intenta otra vez", disabled: true };
      })
    );

    const visibles = fakeButtons.filter((btn) => btn.visible).length;
    if (visibles <= 3) {
      window.setTimeout(irAChase, 950);
    }
  };

  const moverBoton = () => {
    if (botonQuieto) return;

    const container = chaseAreaRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const padding = 12;
    const maxX = Math.max(padding, rect.width - buttonSizeRef.current.width - padding);
    const maxY = Math.max(padding, rect.height - buttonSizeRef.current.height - padding);

    const nextX = Math.random() * maxX;
    const nextY = Math.random() * maxY;

    setPosicionBoton({ x: nextX, y: nextY });
    setIntentos((prev) => {
      const next = prev + 1;
      if (next >= intentosParaDesbloquear) {
        setBotonQuieto(true);
      }
      return next;
    });
  };

  const onTrapButtonPress = () => {
    if (botonQuieto) {
      setFase("reveal");
      return;
    }
    moverBoton();
  };

  const renderDecoracion = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[14%] opacity-20"
        animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="h-10 w-10 text-rose-300" fill="currentColor" />
      </motion.div>

      <motion.div
        className="absolute right-[12%] top-[18%] opacity-20"
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="h-9 w-9 text-pink-300" />
      </motion.div>

      <motion.div
        className="absolute bottom-[16%] left-[10%] h-24 w-24 rounded-full bg-white/20 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[10%] right-[8%] h-28 w-28 rounded-full bg-rose-200/30 blur-2xl"
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-[10%] h-3 w-3 rounded-full bg-pink-200/70"
        animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      <motion.div
        className="absolute left-[24%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-rose-200/70"
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4.3, repeat: Infinity }}
      />
    </div>
  );

  const botonPrincipal =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent";
  const botonClaro =
    "bg-white/80 text-rose-700 shadow-lg shadow-rose-200/50 backdrop-blur-md hover:bg-white";
  const botonOscuro =
    "bg-rose-500 text-white shadow-lg shadow-rose-300/50 hover:bg-rose-600";

  return (
    <div className="font-serif relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-200 via-pink-100 to-orange-50 px-4 py-8 text-slate-800">
      {renderDecoracion()}

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <AnimatePresence mode="wait">
          {fase === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-full max-w-2xl rounded-[2rem] border border-white/40 bg-white/30 p-8 shadow-2xl shadow-rose-200/40 backdrop-blur-xl md:p-12"
            >
              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-full border border-white/50 bg-white/50 p-4 shadow-md backdrop-blur-md">
                  <Heart className="h-10 w-10 text-rose-400" fill="currentColor" />
                </div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center text-3xl font-semibold leading-tight text-rose-800 md:text-5xl"
              >
                Tengo una pregunta muy importante…
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-rose-900/75 md:text-lg"
              >
                Pero antes necesito que entres en modo serio, aunque sea por unos segundos.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => setFase("question")}
                  className={`${botonPrincipal} ${botonOscuro}`}
                >
                  abrir la pregunta
                </button>
              </motion.div>
            </motion.section>
          )}

          {fase === "question" && (
            <motion.section
              key="question"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-3xl rounded-[2rem] border border-white/40 bg-white/30 p-8 shadow-2xl shadow-rose-200/40 backdrop-blur-xl md:p-12"
            >
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-white/55 p-3 shadow-md">
                  <Sparkles className="h-8 w-8 text-pink-400" />
                </div>
              </div>

              <h2 className="text-center text-3xl font-semibold text-rose-800 md:text-5xl">
                ¿Puedo ser tu novia?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-center text-base text-rose-900/70 md:text-lg">
                Piensa bien tu respuesta. O al menos finge que la estás pensando.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setFakeButtons([
                      { id: 1, label: "me apunto", visible: true },
                      { id: 2, label: "me apunto", visible: true },
                      { id: 3, label: "me apunto", visible: true },
                    ]);
                    setMostrarTextoBroma(false);
                    setFase("fakeYes");
                  }}
                  className={`${botonPrincipal} ${botonOscuro} min-w-[150px]`}
                >
                  me apunto
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={`${botonPrincipal} ${botonClaro} min-w-[150px]`}
                >
                  qué atrevida
                </motion.button>
              </div>
            </motion.section>
          )}

          {fase === "fakeYes" && (
            <motion.section
              key="fakeYes"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-3xl rounded-[2rem] border border-white/40 bg-white/30 p-8 shadow-2xl shadow-rose-200/40 backdrop-blur-xl md:p-12"
            >
              <h2 className="text-center text-3xl font-semibold text-rose-800 md:text-5xl">
                ¿Puedo ser tu novia?
              </h2>

              <AnimatePresence>
                {mostrarTextoBroma && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-center text-base font-medium text-rose-700 md:text-lg"
                  >
                    no iba a ser tan fácil
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <AnimatePresence>
                  {fakeButtons.map(
                    (btn) =>
                      btn.visible && (
                        <motion.button
                          key={btn.id}
                          layout
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6, y: -18 }}
                          whileHover={btn.disabled ? undefined : { scale: 1.03 }}
                          whileTap={btn.disabled ? undefined : { scale: 0.96 }}
                          onMouseEnter={() => {
                            if (btn.id === 1 && !btn.disabled) {
                              manejarFakeButton(btn.id);
                            }
                          }}
                          onClick={() => manejarFakeButton(btn.id)}
                          className={`${botonPrincipal} ${
                            btn.id === 3 ? botonClaro : botonOscuro
                          } min-w-[150px] ${btn.disabled ? "cursor-default opacity-90" : ""}`}
                        >
                          {btn.label}
                        </motion.button>
                      )
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {fase === "chase" && (
            <motion.section
              key="chase"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-4xl rounded-[2rem] border border-white/40 bg-white/30 p-6 shadow-2xl shadow-rose-200/40 backdrop-blur-xl md:p-10"
            >
              <div className="mb-4 text-center">
                <h2 className="text-3xl font-semibold text-rose-800 md:text-5xl">
                  Ahora sí, atrápalo
                </h2>
                <motion.p
                  key={mensajeActual}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-base font-medium text-rose-700 md:text-lg"
                >
                  {mensajeActual}
                </motion.p>
              </div>

              <div
                ref={chaseAreaRef}
                className="relative mt-6 h-[420px] w-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-gradient-to-br from-white/40 via-rose-50/50 to-pink-100/40 shadow-inner"
              >
                <motion.div
                  animate={{
                    x: posicionBoton.x,
                    y: posicionBoton.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: botonQuieto ? 180 : 320,
                    damping: botonQuieto ? 22 : 18,
                    mass: 0.7,
                  }}
                  className="absolute left-0 top-0"
                >
                  <button
                    onMouseEnter={() => {
                      if (!botonQuieto) moverBoton();
                    }}
                    onClick={onTrapButtonPress}
                    onTouchStart={() => {
                      if (!botonQuieto) moverBoton();
                    }}
                    className={`${botonPrincipal} ${
                      botonQuieto ? botonOscuro : botonClaro
                    } min-w-[150px]`}
                  >
                    {botonQuieto ? "bueno pues" : "aquí aquí"}
                  </button>
                </motion.div>

                <div className="absolute inset-x-0 bottom-4 px-4 text-center text-sm text-rose-900/60">
                  intentos: {intentos}
                </div>
              </div>
            </motion.section>
          )}

          {fase === "reveal" && (
            <motion.section
              key="reveal"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="w-full max-w-2xl rounded-[2rem] border border-white/50 bg-white/35 p-8 text-center shadow-2xl shadow-rose-200/40 backdrop-blur-xl md:p-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/60 shadow-lg"
              >
                <Heart className="h-10 w-10 text-rose-400" fill="currentColor" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-3xl font-semibold text-rose-800 md:text-5xl"
              >
                Está bien, te lo has ganado
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-rose-900/75 md:text-lg"
              >
                Después de tanta insistencia, ya no puedo seguir fingiendo que esto no estaba planeado desde el principio.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => setFase("accepted")}
                  className={`${botonPrincipal} ${botonOscuro}`}
                >
                  sí, ahora sí
                </button>
              </motion.div>
            </motion.section>
          )}

          {fase === "accepted" && (
            <motion.section
              key="accepted"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-full max-w-3xl rounded-[2rem] border border-white/50 bg-white/35 p-8 shadow-2xl shadow-rose-200/40 backdrop-blur-xl md:p-12"
            >
              <div className="mb-6 flex justify-center">
                <div className="rounded-full border border-white/50 bg-white/60 p-4 shadow-md">
                  <Heart className="h-10 w-10 text-rose-400" fill="currentColor" />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-semibold text-rose-800 md:text-5xl">
                  ya eres oficialmente mi novio
                </h2>

                <p className="text-lg font-medium text-rose-700 md:text-xl">
                  me gustas muchísimo
                </p>

                <p className="text-base text-rose-900/75 md:text-lg">
                  gracias por seguir el juego
                </p>

                <p className="text-base text-rose-900/75 md:text-lg">
                  valió la pena insistir
                </p>

                <div className="mx-auto mt-8 max-w-2xl rounded-[1.5rem] border border-white/50 bg-white/45 p-6 shadow-inner">
                  <p className="text-base leading-relaxed text-rose-900/80 md:text-lg">
                    muahaha
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}