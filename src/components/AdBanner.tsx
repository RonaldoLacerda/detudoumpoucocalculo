import { useEffect, useRef } from "react";

const CLIENT_ID = import.meta.env["VITE_ADSENSE_CLIENT_ID"] as string | undefined;

export type AdSlot = "top" | "result" | "bottom" | "left" | "right";

const SLOT_IDS: Record<AdSlot, string | undefined> = {
  top: import.meta.env["VITE_ADSENSE_SLOT_TOP"] as string | undefined,
  result: import.meta.env["VITE_ADSENSE_SLOT_RESULT"] as string | undefined,
  bottom: import.meta.env["VITE_ADSENSE_SLOT_BOTTOM"] as string | undefined,
  left: import.meta.env["VITE_ADSENSE_SLOT_LEFT"] as string | undefined,
  right: import.meta.env["VITE_ADSENSE_SLOT_RIGHT"] as string | undefined,
};

/**
 * Bloco de anúncio opcional. Sem variáveis de ambiente configuradas,
 * o componente simplesmente não renderiza nada.
 */
export function AdBanner({ slot }: { slot: AdSlot }) {
  const ref = useRef<HTMLModElement>(null);
  const slotId = SLOT_IDS[slot];

  useEffect(() => {
    if (!CLIENT_ID || !slotId || !ref.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      /* anúncio indisponível: a aplicação segue normalmente */
    }
  }, [slotId]);

  if (!CLIENT_ID || !slotId) return null;

  return (
    <ins
      ref={ref}
      className="adsbygoogle block w-full"
      style={{ display: "block" }}
      data-ad-client={CLIENT_ID}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest={import.meta.env.DEV ? "on" : undefined}
    />
  );
}
