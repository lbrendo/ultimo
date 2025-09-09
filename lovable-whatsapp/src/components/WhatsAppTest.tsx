import { useState } from "react";
import { useWhatsAppSend } from "../hooks/useWhatsAppSend";

export default function WhatsAppTest() {
  const { sendMessage, loading, error, success } = useWhatsAppSend();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    await sendMessage(phone, message);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Enviar mensagem WhatsApp</h2>
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Número com DDI (ex: 5511999999999)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Digite sua mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Mensagem enviada com sucesso!</p>}
    </div>
  );
}
