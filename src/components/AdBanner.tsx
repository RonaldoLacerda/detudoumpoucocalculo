import { useEffect, useRef } from "react";

const CLIENT_ID = import.meta.env["VITE_ADSENSE_CLIENT_ID"] as string | undefined;

type Slot = "top" | "result" | "bottom";

const SLOT_IDS: Record<Slot, string | undefined> = {
  top: import.meta.env["VITE_ADSENSE_SLOT_TOP"] as string | undefined,
  result: import.meta.env["VITE_ADSENSE_SLOT_RESULT"] as string | undefined,
  bottom: import.meta.env["VITE_ADSENSE_SLOT_BOTTOM"] as string | undefined,
};

/**
 * Bloco de anúncio opcional. Sem variáveis de ambiente configuradas,
 * o componente simplesmente não renderiza nada.
 */
export function AdBanner({ slot }: { slot: Slot }) {
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
    />
  );
}
