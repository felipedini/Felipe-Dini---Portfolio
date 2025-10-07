import { useState } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const whatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5511920424735";
  const buildWhatsAppUrl = () => {
    // Usar \n para quebras de linha e montar URL com URLSearchParams
    const text = `Olá, sou ${formData.name} (${formData.email}).\n\n${formData.message}`;
    const params = new URLSearchParams({ text });
    return `https://wa.me/${whatsAppNumber}?${params.toString()}`;
  };
  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl();
    window.open(url, "_blank");
    showAlertMessage("success", "Abrindo WhatsApp com sua mensagem...");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleWhatsApp();
  };
  return (
    <section id="contact" className="relative flex flex-col items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      {/* Botão fora e acima da box */}
      <div className="flex items-center justify-center w-full mb-6">
        <a
          href={`${import.meta.env.BASE_URL}Cv- Felipe Dini.docx`}
          download
          className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-radial from-lavender to-royal hover-animation"
        >
          Baixar Currículo
        </a>
      </div>
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Vamos Conversar</h2>
          <p className="font-normal text-neutral-400">
            Estou em busca de uma oportunidade de trabalho na área de tecnologia.
            Se você procura alguém comprometido, com visão de dados e automação,
            vamos conversar e ver como posso contribuir com sua equipe.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Seu Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="Rogerio Silva"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="rogerio.silva@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Digite sua mensagem..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-royal to-lavender hover-animation"
          >
            Enviar via WhatsApp
          </button>
        </form>
        </div>
    </section>
  );
};

export default Contact;
