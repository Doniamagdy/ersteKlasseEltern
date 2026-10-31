import { useEffect, useState } from "react";

import apfel from "../../assets/apfel.png";
import sonne from "../../assets/sun.webp";
import meer from "../../assets/sea.avif";
import baum from "../../assets/baum.png";
import milch from "../../assets/milch.png";
import karotte from "../../assets/Karotte.png";
import lila from "../../assets/lila.png";
import platte from "../../assets/color-palette.png";
import regenbogen from "../../assets/regenbogen.png";

import { ColorArticles } from "../../shared/ColorArticles/ColorArticles";

import pinselRot from "../../assets/red.png";
import pinselBlau from "../../assets/blue.png";
import pinselGelb from "../../assets/yellow.png";
import pinselOrange from "../../assets/orange.png";
import pinselGruen from "../../assets/green.png";
import pinselLila from "../../assets/lila-color.png";
import pinselWeiß from "../../assets/weiß.png";

const sentences = [
  {
    id: 1,
    title: "der Apfel",
    sentence: "Der Apfel ist rot.",
    image: apfel,
    hex: "#ef4444",
  },
  {
    id: 2,
    title: "der Baum",
    sentence: "Der Baum ist grün.",
    image: baum,
    hex: "#22c55e",
  },
  {
    id: 3,
    title: "der Regenbogen",
    sentence: "Der Regenbogen ist bunt.",
    image: regenbogen,
    hex: "#a855f7",
  },
  {
    id: 4,
    title: "das Meer",
    sentence: "Das Meer ist blau.",
    image: meer,
    hex: "#3b82f6",
  },
  {
    id: 5,
    title: "die Sonne",
    sentence: "Die Sonne ist gelb.",
    image: sonne,
    hex: "#eab308",
  },
  {
    id: 6,
    title: "die Milch",
    sentence: "Die Milch ist weiß.",
    image: milch,
    hex: "#94a3b8",
  },
  {
    id: 7,
    title: "die Blume",
    sentence: "Die Blume ist lila.",
    image: lila,
    hex: "#a855f7",
  },
  {
    id: 8,
    title: "die Karotte",
    sentence: "Die Karotte ist orange.",
    image: karotte,
    hex: "#f97316",
  },
];

const colors = [
  {
    id: "color-rot",
    word: "rot",
    sentence: "rot",
    hex: "#ef4444",
    image: pinselRot,
  },
  {
    id: "color-grun",
    word: "grün",
    sentence: "grün",
    hex: "#22c55e",
    image: pinselGruen,
  },
  {
    id: "color-blau",
    word: "blau",
    sentence: "blau",
    hex: "#3b82f6",
    image: pinselBlau,
  },
  {
    id: "color-gelb",
    word: "gelb",
    sentence: "gelb",
    hex: "#eab308",
    image: pinselGelb,
  },
  {
    id: "color-weiss",
    word: "weiß",
    sentence: "weiß",
    hex: "#94a3b8",
    image: pinselWeiß,
  },
   {
    id: "color-lila",
    word: "lila",
    sentence: "lila",
    hex: "#a855f7",
    image: pinselLila,
  },
  {
    id: "color-orange",
    word: "orange",
    sentence: "orange",
    hex: "#f97316",
    image: pinselOrange,
  },
  
 
  
];

export default function Farben() {
  const [speakingId, setSpeakingId] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    return () => {
      synth?.cancel();
    };
  }, []);

  const handleSpeech = (item) => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    const synth = window.speechSynthesis;

    // Stop audio if the same card is clicked again
    if (speakingId === item.id) {
      synth.cancel();
      setSpeakingId(null);
      return;
    }

    // Stop any previous audio
    synth.cancel();

    const voices = synth.getVoices();

    const germanVoice =
      voices.find((voice) => voice.lang === "de-DE") ||
      voices.find((voice) => voice.lang.startsWith("de"));

    const utterance = new SpeechSynthesisUtterance(item.sentence);

    utterance.lang = "de-DE";
    utterance.rate = 0.85;
    utterance.pitch = 1;

    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(item.id);
    synth.speak(utterance);
  };

  return (
    <main
      dir="ltr"
      className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-bold tracking-[0.25em] text-orange-500 sm:text-base">
            Die Farben{" "}
            <img
              src={platte}
              alt="Color Palette"
              className="mb-2 inline-block h-9 w-9"
            />
          </p>
        </header>

        {/*
          Mobile / tablet: colors on top (grid), sentences below.
          Desktop (lg+): sentences on the left, tall color sidebar on the right.
        */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* ===== Sentences ===== */}
          <section className="min-w-0 flex-1">
            <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sentences.map((item) => {
                const isSpeaking = speakingId === item.id;

                return (
                  <article
                    key={item.id}
                    className="group flex min-w-0 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-md shadow-stone-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image on the left */}
                    <div className="relative w-[34%] shrink-0 overflow-hidden bg-stone-100 sm:w-[38%]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-emerald-800 shadow-sm">
                        🇩🇪
                      </div>
                    </div>

                    {/* Text on the right */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                        Deutsch für Kinder
                      </p>
                      <ColorArticles>
                        <h2 className="mt-2 break-words text-lg font-bold text-stone-900 sm:text-xl">
                          {item.title}
                        </h2>

                        <div className="mt-3">
                          <p className="break-words text-sm font-semibold leading-6 text-stone-800">
                            {item.sentence}
                          </p>
                        </div>
                      </ColorArticles>

                      {/* Speech Button */}
                      <button
                        type="button"
                        onClick={() => handleSpeech(item)}
                        aria-label={
                          isSpeaking
                            ? `Stop ${item.title} pronunciation`
                            : `Listen to ${item.sentence}`
                        }
                        className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 ${
                          isSpeaking
                            ? "bg-rose-600 text-white hover:bg-rose-700"
                            : "bg-orange-400 text-white hover:bg-orange-500"
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 shrink-0 fill-current"
                              aria-hidden="true"
                            >
                              <rect x="6" y="6" width="12" height="12" rx="2" />
                            </svg>
                            Stop
                          </>
                        ) : (
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5 shrink-0 fill-none stroke-current"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                              <path d="M19 5a10 10 0 0 1 0 14" />
                            </svg>
                            Hör zu!
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ===== Colors sidebar ===== */}
          <aside className="order-first shrink-0 lg:sticky lg:top-6 lg:order-last lg:w-56">
            <div className="rounded-3xl bg-white p-3 sm:p-4 shadow-md">
             

              {/*
                < sm : 2 columns (last one spans full width)
                sm–lg: 5 in one row
                lg+  : 1 column (tall sidebar)
              */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-1">
                {colors.map((c) => {
                  const isSpeaking = speakingId === c.id;

                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSpeech(c)}
                      aria-label={
                        isSpeaking ? `Stop ${c.word}` : `Listen to ${c.word}`
                      }
                      className="group flex min-w-0 flex-col items-center gap-1 overflow-hidden rounded-2xl bg-white p-2 shadow-md transition duration-300 last:col-span-2 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none sm:last:col-span-1 lg:flex-row lg:gap-3 lg:pr-3 lg:hover:-translate-y-0 lg:hover:-translate-x-1"
                      style={{
                        borderBottom: `6px solid ${c.hex}`,
                        boxShadow: isSpeaking
                          ? `0 0 0 3px ${c.hex}66`
                          : undefined,
                      }}
                    >
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${c.hex}22` }}
                      >
                        <img
                          src={c.image}
                          alt={c.word}
                          className="h-11 w-11 object-contain transition duration-500 group-hover:rotate-6 group-hover:scale-110"
                        />
                      </div>

                      <span
                        className="flex-1 truncate text-center text-lg font-extrabold sm:text-base md:text-lg lg:text-left lg:text-xl"
                        style={{
                          color: c.hex,
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {c.word}
                      </span>

                      <span className="text-stone-400" aria-hidden="true">
                        {isSpeaking ? "⏹" : "🔊"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
