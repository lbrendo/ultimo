import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useWhatsAppSend() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (phone: string, message: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { data, error } = await supabase.functions.invoke("whatsapp-connect", {
        body: { phone, message },
      });

      if (error) throw error;
      setSuccess(true);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, success };
}
