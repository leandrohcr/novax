# Site NOVA X

Site institucional da NOVA X, agência de lançamentos e funis perpétuos para infoprodutores.

Site estático (HTML, CSS e JavaScript puros), sem build e sem custo de hospedagem. Publicado pelo GitHub Pages.

## Estrutura

```
index.html          Página principal (oferta, serviços, método, FAQ, formulário)
privacidade.html    Política de privacidade (LGPD)
404.html            Página de erro
assets/css/         Estilos
assets/js/main.js   Contatos do site + menu + formulário
assets/img/         Logo, símbolo, favicon e imagem de compartilhamento
docs/identidade.md  Guia de identidade visual
```

## Antes de divulgar: preencher os contatos

Abra `assets/js/main.js` e preencha o bloco `CONTATO` no topo:

```js
const CONTATO = {
  whatsapp: "5531999998888",   // DDI + DDD + número, só dígitos
  email: "contato@...",
  instagram: "novax...",       // sem @
  razaoSocial: "...",
  cnpj: "...",
};
```

Com o WhatsApp preenchido, o formulário de diagnóstico abre uma conversa com as respostas já escritas. Sem WhatsApp, ele usa o e-mail. O site não guarda nenhum dado.

## Como publicar no GitHub Pages (grátis)

1. Junte (merge) o pull request na branch `main`.
2. No GitHub, abra o repositório e vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Source: Deploy from a branch**, branch **main**, pasta **/ (root)** e clique em **Save**.
4. Em 1 a 2 minutos o site fica no ar em `https://leandrohcr.github.io/novax/`.

Toda alteração enviada para `main` é publicada sozinha.

> Repositório privado só publica no Pages em plano pago do GitHub. Com o repositório público, o Pages é gratuito.

## Quando tiver domínio próprio

1. Compre o domínio (ex.: `novax.com.br` no Registro.br, cerca de R$ 40 por ano).
2. Em **Settings → Pages → Custom domain**, digite o domínio e salve. Marque **Enforce HTTPS** quando liberar.
3. No Registro.br, crie os registros DNS:
   - 4 registros `A` para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro `CNAME` para `www` apontando para `leandrohcr.github.io`
4. Em `index.html`, troque o endereço da `og:image` para o novo domínio.

## Itens para completar

- [ ] Contatos no `main.js` (WhatsApp, e-mail, Instagram, razão social e CNPJ)
- [ ] Foto do Thales: salvar em `assets/img/thales.jpg` e trocar o `<div class="pessoa__foto">` por `<img class="pessoa__foto" src="assets/img/thales.jpg" alt="Thales">`
- [ ] Bio do Thales com 1 ou 2 números reais de lançamentos
- [ ] Case de cliente (com autorização por escrito do expert) quando houver
- [ ] Atualizar a linha do tempo "construída em público" conforme as etapas forem concluídas

## Ver localmente

```
python3 -m http.server 8000
```

E abrir `http://localhost:8000`.
