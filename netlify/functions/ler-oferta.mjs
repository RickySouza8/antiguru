/* ============================================================
   ANTIGURU · ler-oferta
   Busca a página de vendas e devolve o texto.
   O browser não pode fazer isto (CORS). Esta função pode.

   Regra da casa: quando não conseguir ler, DIZER que não
   conseguiu. Nunca devolver meia-página fingindo que é a página.
   ============================================================ */

const LIMITE_BYTES = 2_500_000;   // 2.5 MB
const TIMEOUT_MS   = 12_000;
const MIN_UTIL     = 220;         // abaixo disto, não dá para analisar

/* --- SSRF: não deixamos a função virar proxy para rede interna --- */
function urlSegura(u) {
  let url;
  try { url = new URL(u); } catch { return 'Isso não parece um endereço válido.'; }
  if (!/^https?:$/.test(url.protocol)) return 'Só consigo ler endereços que começam com http:// ou https://';
  const h = url.hostname.toLowerCase();
  if (
    h === 'localhost' || h === '0.0.0.0' || h.endsWith('.local') || h.endsWith('.internal') ||
    /^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h) || /^169\.254\./.test(h) || /^\[?::1\]?$/.test(h)
  ) return 'Esse endereço é de rede interna. Não leio endereços privados.';
  return null;
}

function decode(s) {
  return s
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&[a-z]+;/gi, ' ');
}

function extrair(html) {
  const pega = (rx) => { const m = html.match(rx); return m ? decode(m[1]).trim() : ''; };

  const titulo =
    pega(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i) ||
    pega(/<title[^>]*>([\s\S]*?)<\/title>/i);

  const desc =
    pega(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)/i) ||
    pega(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i);

  // fora tudo o que não é texto que a pessoa lê
  let corpo = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(head|nav|footer)[\s\S]*?<\/\1>/gi, ' ');

  // quebras onde havia blocos, para o texto não virar uma papa
  corpo = corpo
    .replace(/<\/(p|div|li|h[1-6]|section|article|tr|blockquote)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');

  corpo = decode(corpo)
    .replace(/[ \t\u00a0]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .split('\n').map(l => l.trim()).filter(Boolean).join('\n')
    .trim();

  // CNPJ, se estiver na página (rodapé costuma ter)
  const mc = html.match(/\b(\d{2}[.\s]?\d{3}[.\s]?\d{3}[/\s]?\d{4}[-\s]?\d{2})\b/);
  const cnpj = mc ? mc[1] : '';

  // preço, o primeiro que aparecer
  const mp = corpo.match(/R\$\s?\d{1,3}(?:[.\s]\d{3})*(?:,\d{2})?/);
  const valor = mp ? mp[0].replace(/\s+/g, ' ') : '';

  return { titulo, desc, corpo, cnpj, valor };
}

export default async (req) => {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
    });

  let alvo = '';
  try {
    const body = await req.json();
    alvo = (body.url || '').trim();
  } catch { return json({ ok: false, erro: 'Pedido inválido.' }, 400); }

  if (!alvo) return json({ ok: false, erro: 'Faltou o endereço.' }, 400);
  if (/^[a-z][a-z0-9+.-]*:/i.test(alvo) && !/^https?:\/\//i.test(alvo)) {
    return json({ ok: false, erro: 'Só consigo ler endereços que começam com http:// ou https://' }, 400);
  }
  if (!/^https?:\/\//i.test(alvo)) alvo = 'https://' + alvo;

  const mau = urlSegura(alvo);
  if (mau) return json({ ok: false, erro: mau }, 400);

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(alvo, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        // dizemos quem somos. Um produto sobre honestidade não se disfarça.
        'user-agent': 'AntiGuruBot/1.0 (+https://antiguru.netlify.app) leitura de página de vendas a pedido do utilizador',
        'accept': 'text/html,application/xhtml+xml',
        'accept-language': 'pt-BR,pt;q=0.9'
      }
    });
  } catch (e) {
    clearTimeout(t);
    const fora = e.name === 'AbortError';
    return json({
      ok: false,
      erro: fora
        ? 'A página demorou demais a responder. Pode estar fora do ar, ou pode estar a bloquear leitura automática.'
        : 'Não consegui chegar a esse endereço. Confira se está certo, ou cole o texto à mão.',
      colar: true
    });
  }
  clearTimeout(t);

  if (!res.ok) {
    const bloqueio = [401, 403, 429].includes(res.status);
    return json({
      ok: false,
      erro: bloqueio
        ? 'A página recusou a leitura (erro ' + res.status + '). Muita página de vendas bloqueia robôs — de propósito. Copie o texto e cole aqui.'
        : 'A página respondeu com erro ' + res.status + '. Confira o endereço, ou cole o texto à mão.',
      colar: true
    });
  }

  const ct = res.headers.get('content-type') || '';
  if (!/text\/html|application\/xhtml/i.test(ct)) {
    return json({ ok: false, erro: 'Esse endereço não é uma página web (é ' + (ct.split(';')[0] || 'formato desconhecido') + '). Cole o texto da oferta.', colar: true });
  }

  const buf = await res.arrayBuffer();
  if (buf.byteLength > LIMITE_BYTES) {
    return json({ ok: false, erro: 'A página é grande demais para eu ler. Cole a parte que interessa.', colar: true });
  }

  const html = new TextDecoder('utf-8').decode(buf);
  const { titulo, desc, corpo, cnpj, valor } = extrair(html);

  const texto = [desc, corpo].filter(Boolean).join('\n\n').trim();

  /* A parte honesta: se veio pouco texto, o mais provável é que a página
     seja montada por JavaScript. Não fingimos ter lido. */
  if (texto.length < MIN_UTIL) {
    return json({
      ok: false,
      parcial: true,
      titulo,
      erro: 'Cheguei à página, mas quase não veio texto. Isso costuma acontecer quando a página é montada por JavaScript no navegador — o que eu recebo é o esqueleto vazio. Não vou analisar meia página e chamar isso de análise. Abra o link, selecione tudo (Ctrl+A), copie e cole aqui.',
      colar: true
    });
  }

  return json({
    ok: true,
    url: res.url,
    titulo,
    valor,
    cnpj,
    texto: texto.slice(0, 14000),
    truncado: texto.length > 14000,
    lido_em: new Date().toISOString()
  });
};
