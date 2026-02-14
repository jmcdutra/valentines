"use client";

import { useState } from "react";
import { Coffee, MapPin, ArrowRight, Check, Settings } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  onPermissionGranted: () => Promise<boolean>;
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export default function WelcomeScreen({
  onStart,
  onPermissionGranted,
}: WelcomeScreenProps) {
  const [step, setStep] = useState<"intro" | "permission" | "ready">("intro");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [denied, setDenied] = useState(false);

  const handlePermission = async () => {
    setLoading(true);
    setError(null);
    setDenied(false);
    const ok = await onPermissionGranted();
    setLoading(false);
    if (ok) {
      setStep("ready");
    } else {
      setDenied(true);
      if (isIOS()) {
        setError(
          "no iOS, vai em Ajustes > Safari > Localizacao e muda pra \"Permitir\" ou \"Perguntar\". depois volta aqui e tenta de novo."
        );
      } else {
        setError(
          "preciso da sua localizacao pra essa aventura funcionar. permite o acesso e tenta de novo."
        );
      }
    }
  };

  const handleSkip = () => {
    setStep("ready");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">

        {step === "intro" && (
          <div className="animate-enter stagger">
            <div className="flex justify-center mb-10 animate-enter">
              <div className="peephole">
                <Coffee size={28} className="text-[var(--warm)]" />
              </div>
            </div>

            <h1
              className="text-3xl font-bold text-center mb-2 animate-enter"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              princesa,
            </h1>

            <p
              className="text-center mb-10 animate-enter"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--text-secondary)", fontSize: "17px" }}
            >
              preparei uma coisa pra voce!
            </p>

            <div className="card p-5 mb-8 animate-enter">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                uma aventura pelo Porto com a nossa serie favorita.
                em cada parada voce responde uma pergunta de Friends e
                descobre a proxima pista. no final tem uma surpresa.
              </p>
            </div>

            <button
              className="btn btn-primary w-full animate-enter"
              onClick={() => setStep("permission")}
            >
              começar
              <ArrowRight size={16} />
            </button>

            <p className="text-center mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
              &ldquo;Welcome to the real world. It sucks.
              You&apos;re gonna love it!&rdquo; - Monica Geller
            </p>
          </div>
        )}

        {step === "permission" && (
          <div className="animate-enter">
            <div className="flex justify-center mb-10">
              <div className="peephole">
                <MapPin size={28} className="text-[var(--purple)]" />
              </div>
            </div>

            <h2
              className="text-xl font-bold text-center mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              preciso da sua localizacao
            </h2>

            <p className="text-center text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              pra confirmar que voce ta no lugar certo em cada etapa.
              sem isso nao funciona!
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: "var(--error-bg)", border: "1px solid var(--error)", color: "var(--error)" }}>
                {isIOS() && denied && (
                  <div className="flex items-center gap-2 mb-2 font-semibold">
                    <Settings size={14} />
                    <span>ajustes do iOS</span>
                  </div>
                )}
                {error}
              </div>
            )}

            <button
              className="btn btn-primary w-full"
              onClick={handlePermission}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  buscando...
                </>
              ) : (
                <>
                  <MapPin size={16} />
                  permitir localizacao
                </>
              )}
            </button>

            {denied && (
              <button
                className="btn btn-outline w-full mt-3"
                onClick={handleSkip}
              >
                pular por agora
                <ArrowRight size={16} />
              </button>
            )}

            {denied && (
              <p className="text-center mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
                voce vai poder permitir quando precisar verificar a localizacao.
              </p>
            )}
          </div>
        )}

        {step === "ready" && (
          <div className="animate-enter">
            <div className="flex justify-center mb-10">
              <div className="peephole" style={{ borderColor: "var(--success)" }}>
                <Check size={28} className="text-[var(--success)]" />
              </div>
            </div>

            <h2
              className="text-xl font-bold text-center mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--success)" }}
            >
              tudo pronto
            </h2>

            <p className="text-center text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              localizacao ativa. sao 5 etapas ate a surpresa final. bora?
            </p>

            <button className="btn btn-warm w-full" onClick={onStart}>
              vamos la
              <ArrowRight size={16} />
            </button>

            <p className="text-center mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
              &ldquo;So no one told you life was gonna be this way...&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
