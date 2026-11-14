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

## Como publicar em www.agencianovax.com.br (grátis)

O site fica hospedado no GitHub Pages. O domínio continua na GoDaddy; só os registros de DNS mudam. O arquivo `CNAME` na raiz do repositório já diz ao GitHub qual é o domínio.

### 1. GitHub: publicar
1. Junte (merge) o pull request na branch `main`.
2. Em **Settings → Pages**, escolha **Source: Deploy from a branch**, branch **main**, pasta **/ (root)** e clique em **Save**.
3. No campo **Custom domain**, confira se aparece `www.agencianovax.com.br` (se estiver vazio, digite e clique em **Save**).

### 2. GoDaddy: apontar o domínio
Em **Meus produtos → agencianovax.com.br → DNS** (Gerenciar DNS):

1. Desligue qualquer **Encaminhamento (Forwarding)** do domínio e apague o registro `A` do `@` que aponta para "Parked" ou para outro IP.
2. Crie 4 registros `A`, nome `@`, TTL padrão:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Edite (ou crie) o registro `CNAME` de nome `www` com valor `leandrohcr.github.io`.
4. Não mexa em registros `MX` ou `TXT` de e-mail, se existirem.

> Se a página de DNS da GoDaddy disser que os nameservers não são da GoDaddy, os registros precisam ser criados onde o DNS está (por exemplo, no Registro.br).

### 3. HTTPS
Depois que o DNS propagar (de minutos a algumas horas), volte em **Settings → Pages**. Quando aparecer "DNS check successful", marque **Enforce HTTPS**. O certificado é gratuito e pode levar até 1 hora para sair.

### 4. Opcional: proteger o domínio
Em **github.com → foto → Settings → Pages → Add a domain**, digite `agencianovax.com.br`. O GitHub mostra um registro `TXT` para criar na GoDaddy. Isso impede que outra conta do GitHub use o domínio.

Toda alteração enviada para `main` é publicada sozinha.

## Itens para completar

- [x] WhatsApp no `main.js`
- [ ] E-mail, Instagram, razão social e CNPJ no `main.js`
- [ ] Foto do Thales: salvar em `assets/img/thales.jpg` e trocar o `<div class="pessoa__foto">` por `<img class="pessoa__foto" src="assets/img/thales.jpg" alt="Thales">`
- [ ] Bio do Thales com 1 ou 2 números reais de lançamentos
- [ ] Case de cliente (com autorização por escrito do expert) quando houver
- [ ] Atualizar a linha do tempo "construída em público" conforme as etapas forem concluídas

## Ver localmente

```
python3 -m http.server 8000
```

E abrir `http://localhost:8000`.
