"use client";

import { useState, useCallback } from "react";

interface GeolocationState {
  loading: boolean;
  error: string | null;
  position: { lat: number; lng: number } | null;
  permissionGranted: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    position: null,
    permissionGranted: false,
  });

  const requestPermission = useCallback(async (): Promise<boolean> => {
    // Geolocation requires HTTPS (except localhost)
    if (
      typeof window !== "undefined" &&
      window.location.protocol === "http:" &&
      !window.location.hostname.match(/^(localhost|127\.0\.0\.1)$/)
    ) {
      setState((prev) => ({
        ...prev,
        error:
          "o site precisa de HTTPS pra usar a localizacao. o browser bloqueia em HTTP.",
      }));
      return false;
    }

    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "O teu dispositivo nao suporta geolocalizacao.",
      }));
      return false;
    }

    return new Promise((resolve) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setState({
            loading: false,
            error: null,
            position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
            permissionGranted: true,
          });
          resolve(true);
        },
        (err) => {
          let errorMsg = "Nao foi possivel obter a localizacao.";
          if (err.code === err.PERMISSION_DENIED) {
            errorMsg =
              "Precisamos de acesso a tua localizacao para a aventura! Por favor, permite o acesso nas definicoes.";
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMsg = "Localizacao indisponivel. Tenta novamente.";
          } else if (err.code === err.TIMEOUT) {
            errorMsg = "Tempo esgotado ao obter a localizacao. Tenta novamente.";
          }
          setState({
            loading: false,
            error: errorMsg,
            position: null,
            permissionGranted: false,
          });
          resolve(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  const getCurrentPosition = useCallback(async (): Promise<{
    lat: number;
    lng: number;
  } | null> => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocalizacao nao suportada.",
      }));
      return null;
    }

    return new Promise((resolve) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setState((prev) => ({
            ...prev,
            loading: false,
            position,
            permissionGranted: true,
          }));
          resolve(position);
        },
        (err) => {
          let errorMsg = "Nao foi possivel obter a localizacao.";
          if (err.code === err.PERMISSION_DENIED) {
            errorMsg = "Acesso a localizacao negado.";
          } else if (err.code === err.TIMEOUT) {
            errorMsg = "Tempo esgotado. Tenta novamente.";
          }
          setState((prev) => ({ ...prev, loading: false, error: errorMsg }));
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 5000,
        }
      );
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    requestPermission,
    getCurrentPosition,
    clearError,
  };
}
