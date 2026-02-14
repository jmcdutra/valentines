"use client";

import { useState } from "react";
import { MapPin, Navigation, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { haversineDistance, formatDistance } from "@/lib/utils";

interface LocationCheckProps {
  targetLat: number;
  targetLng: number;
  targetName: string;
  radius: number;
  verified: boolean;
  devMode: boolean;
  getCurrentPosition: () => Promise<{ lat: number; lng: number } | null>;
  loading: boolean;
  onVerified: () => void;
}

export default function LocationCheck({
  targetLat,
  targetLng,
  targetName,
  radius,
  verified,
  devMode,
  getCurrentPosition,
  loading: geoLoading,
  onVerified,
}: LocationCheckProps) {
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; dist: number } | null>(null);

  const handleCheck = async () => {
    if (devMode) {
      onVerified();
      return;
    }

    setChecking(true);
    setResult(null);

    const pos = await getCurrentPosition();
    if (!pos) {
      setChecking(false);
      setResult({ ok: false, dist: -1 });
      return;
    }

    const dist = haversineDistance(pos.lat, pos.lng, targetLat, targetLng);
    const ok = dist <= radius;
    setResult({ ok, dist });
    if (ok) onVerified();
    setChecking(false);
  };

  if (verified) {
    return (
      <div
        className="p-4 rounded-lg flex items-center gap-3 animate-scale"
        style={{ background: "var(--success-bg)", border: "1px solid var(--success)" }}
      >
        <CheckCircle2 size={20} className="text-[var(--success)] shrink-0" />
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--success)" }}>
            localizacao confirmada
          </p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {targetName}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        className="btn btn-outline w-full"
        onClick={handleCheck}
        disabled={checking || geoLoading}
      >
        {checking || geoLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            verificando...
          </>
        ) : devMode ? (
          <>
            <Navigation size={16} />
            pular (dev mode)
          </>
        ) : (
          <>
            <MapPin size={16} />
            verificar localizacao
          </>
        )}
      </button>

      {result && !result.ok && (
        <div
          className="mt-3 p-3.5 rounded-lg text-sm flex items-start gap-2.5 animate-fade"
          style={{ background: "var(--error-bg)", color: "var(--error)" }}
        >
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>
            {result.dist === -1
              ? "nao consegui pegar a localizacao. verifica as permissoes."
              : `voce ta a ${formatDistance(result.dist)} de distancia. continua ate ${targetName}!`}
          </span>
        </div>
      )}
    </div>
  );
}
