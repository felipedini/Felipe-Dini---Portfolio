import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Debug: Verificar se as variáveis de ambiente estão carregadas
    console.log("=== DEBUG EMAILJS ===");
    console.log("SERVICE_ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("TEMPLATE_ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log("PUBLIC_KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    console.log("CONTACT_EMAIL:", import.meta.env.VITE_CONTACT_EMAIL);
    console.log("CONTACT_NAME:", import.meta.env.VITE_CONTACT_NAME);
    console.log("===================");

    try {
      console.log("Formulário enviado:", formData);
      
      // Verificar se todas as variáveis estão definidas
      if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || 
          !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 
          !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        throw new Error("Variáveis de ambiente do EmailJS não configuradas");
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: import.meta.env.VITE_CONTACT_NAME,
          from_email: formData.email,
          to_email: import.meta.env.VITE_CONTACT_EMAIL,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Sua mensagem foi enviada com sucesso!");
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao enviar mensagem:", error);
      console.error("Detalhes do erro:", error.message);
      console.error("Stack trace:", error.stack);
      showAlertMessage("danger", "Algo deu errado! Tente novamente.");
    }
  };
  return (
    <section id="contact" className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      {/* Empilhar botão e formulário verticalmente */}
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full mb-6">
          <a
            href="/Cv- Felipe Dini.docx"
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
            Se você está procurando construir um novo site, melhorar sua plataforma
            existente, ou dar vida a um projeto único, estou aqui para ajudar
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
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Enviar" : "Enviando..."}
          </button>
        </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
