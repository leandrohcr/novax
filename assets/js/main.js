// =====================================================================
// CONTATO: preencha aqui e o site inteiro passa a usar esses dados.
// whatsapp: só números, com DDI e DDD. Ex.: "5531999998888"
// =====================================================================
const CONTATO = {
  whatsapp: "",
  email: "",
  instagram: "", // só o usuário, sem @
  razaoSocial: "", // aparece no rodapé, ex.: "NOVA X Marketing Digital LTDA"
  cnpj: "",
};

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Ano e dados legais no rodapé
  $$("[data-ano]").forEach((el) => (el.textContent = new Date().getFullYear()));
  const razao = [CONTATO.razaoSocial, CONTATO.cnpj && "CNPJ " + CONTATO.cnpj].filter(Boolean).join(" · ");
  $$("[data-razao]").forEach((el) => (el.textContent = razao ? " · " + razao : ""));
  $$("[data-email-texto]").forEach((el) => (el.textContent = CONTATO.email ? " ou pelo e-mail " + CONTATO.email : ""));

  // Links de contato
  const linkWhats = (texto) =>
    "https://wa.me/" + CONTATO.whatsapp + (texto ? "?text=" + encodeURIComponent(texto) : "");
  $$('[data-contato="whatsapp"]').forEach((a) => {
    if (!CONTATO.whatsapp) return;
    a.href = linkWhats("Olá! Vim pelo site da NOVA X.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$('[data-contato="instagram"]').forEach((a) => {
    if (!CONTATO.instagram) return;
    a.href = "https://instagram.com/" + CONTATO.instagram;
    a.target = "_blank";
    a.rel = "noopener";
    a.hidden = false;
  });
  $$('[data-contato="email"]').forEach((a) => {
    if (!CONTATO.email) return;
    a.href = "mailto:" + CONTATO.email;
    a.hidden = false;
  });

  // Topo com borda ao rolar
  const topo = $(".topo");
  const marcarTopo = () => topo && topo.classList.toggle("rolou", window.scrollY > 8);
  marcarTopo();
  window.addEventListener("scroll", marcarTopo, { passive: true });

  // Menu mobile
  const botao = $(".menu-btn");
  const menu = $("#menu");
  if (botao && menu) {
    const fechar = () => {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    };
    botao.addEventListener("click", () => {
      const abrir = !menu.classList.contains("aberto");
      menu.classList.toggle("aberto", abrir);
      botao.setAttribute("aria-expanded", String(abrir));
      botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    });
    $$("a", menu).forEach((a) => a.addEventListener("click", fechar));
    document.addEventListener("keydown", (e) => e.key === "Escape" && fechar());
  }

  // Entrada suave das seções
  if ("IntersectionObserver" in window) {
    const alvos = $$(".secao h2, .cartao, .servico, .metodo li, .lista, .linha-tempo, .form, .faq");
    const obs = new IntersectionObserver(
      (itens) =>
        itens.forEach((i) => {
          if (i.isIntersecting) {
            i.target.classList.add("visivel");
            obs.unobserve(i.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    alvos.forEach((el) => {
      el.classList.add("revelar");
      obs.observe(el);
    });
  }

  // Formulário de diagnóstico: monta a mensagem e abre o WhatsApp.
  // Nenhum dado fica guardado no site; ele vai direto para a conversa.
  const form = $("#form-diagnostico");
  if (!form) return;
  const msg = $(".form__msg", form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.classList.remove("erro");
    msg.textContent = "";

    let primeiroErro = null;
    $$("[required]", form).forEach((campo) => {
      const vazio = campo.type === "checkbox" ? !campo.checked : !campo.value.trim();
      const alvo = campo.type === "checkbox" ? campo.closest(".aceite") : campo;
      alvo.classList.toggle("erro", vazio);
      if (vazio && !primeiroErro) primeiroErro = campo;
    });
    if (primeiroErro) {
      msg.classList.add("erro");
      msg.textContent = "Preencha os campos destacados para continuar.";
      primeiroErro.focus();
      return;
    }

    const d = Object.fromEntries(new FormData(form));
    const texto = [
      "Olá! Quero o diagnóstico gratuito da NOVA X.",
      "",
      "Nome: " + d.nome,
      "WhatsApp: " + d.whatsapp,
      d.perfil ? "Instagram/site: " + d.perfil : null,
      "Nicho: " + d.nicho,
      "Momento: " + d.momento,
      "Faturamento mensal: " + d.faturamento,
      d.desafio ? "Maior desafio: " + d.desafio : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    if (CONTATO.whatsapp) {
      window.open(linkWhats(texto), "_blank", "noopener");
      msg.textContent = "Abrimos o WhatsApp com suas respostas. É só tocar em enviar.";
    } else if (CONTATO.email) {
      window.location.href =
        "mailto:" + CONTATO.email +
        "?subject=" + encodeURIComponent("Diagnóstico gratuito NOVA X") +
        "&body=" + encodeURIComponent(texto);
      msg.textContent = "Abrimos seu e-mail com as respostas. É só enviar.";
    } else {
      msg.classList.add("erro");
      msg.textContent = "Nosso canal de contato está sendo configurado. Tente novamente em breve.";
    }
  });

  form.addEventListener("input", (e) => {
    const alvo = e.target.type === "checkbox" ? e.target.closest(".aceite") : e.target;
    alvo && alvo.classList.remove("erro");
  });
})();
