/* ============================================================
   ANTIGURU · CATÁLOGO DE TÉCNICAS DO GURU
   FONTE ÚNICA. Carregado por index.html e por tecnicas.html.

   Não duplique este conteúdo em nenhum dos dois arquivos.
   Duas cópias do mesmo fato divergem em silêncio, e foi assim
   que o caminho de compra ficou quebrado por dois meses.

   Usado em três lugares:
     1. a biblioteca completa, em tecnicas.html
     2. os links "Entenda essa técnica" dentro do resultado da análise
     3. o motor, que casa o id de cada flag com a técnica aqui
   ============================================================ */

window.AG_PADROES = [
  { id:'escassez', nome:'Escassez e urgência fabricada', gatilho:'"Últimas vagas", "só hoje", "restam 3", contador regressivo.',
    comoFunciona:'O cérebro sob pressão de tempo decide pior. Pula a análise e age pelo medo de perder. Por isso o prazo é curto e sempre acabando.',
    comoResistir:'Espere 48 horas. Oferta honesta sobrevive a você dormir sobre ela. Se a "última vaga" continuar lá depois, você descobriu que o prazo era teatro.' },
  { id:'ganho_garantido', nome:'Promessa de ganho garantido', gatilho:'"Ganhe R$X por dia", "renda garantida", "do zero ao primeiro milhão".',
    comoFunciona:'Vende certeza sobre algo que ninguém controla: mercado, esforço, sorte. A cifra específica cria imagem concreta na sua cabeça e faz a promessa parecer plano.',
    comoResistir:'Pergunte: garantido como? Peça por escrito. Ninguém sério garante resultado financeiro, porque ele não depende só de quem ensina.' },
  { id:'resultado_com_prazo', nome:'Resultado específico num prazo', gatilho:'"Fluência em 14 meses", "aprovado em 6 meses", "-10kg em 30 dias".',
    comoFunciona:'Aprendizado e transformação dependem do seu ritmo. Cravar um prazo transforma um processo incerto numa promessa fechada, que vende melhor, mas raramente se cumpre para todos.',
    comoResistir:'Desconfie de qualquer "X em N tempo". Pergunte de quantos alunos esse prazo foi real, e em que condições. Quase sempre era o melhor caso, não o comum.' },
  { id:'garantia_de_resultado', nome:'Garantia-isca', gatilho:'"Fluência garantida em contrato", "aprovação garantida ou dinheiro de volta".',
    comoFunciona:'A "garantia" tranquiliza, mas as letras miúdas costumam exigir presença perfeita, notas mínimas, provas de que você "aplicou tudo". É desenhada para nunca ser acionada.',
    comoResistir:'Leia as condições da garantia ANTES de pagar. Se forem difíceis de cumprir de propósito, a garantia é enfeite, não proteção.' },
  { id:'metodo_secreto', nome:'Método secreto', gatilho:'"Fórmula que ninguém conta", "o segredo dos que enriqueceram".',
    comoFunciona:'O "segredo" cria valor artificial e justifica o preço. Também blinda contra a checagem: como você duvida de algo que "ninguém mais sabe"?',
    comoResistir:'Conhecimento que funciona não precisa ser secreto. Precisa ser demonstrável. Procure a mesma informação de graça; quase sempre ela existe.' },
  { id:'promessa_velada', nome:'Promessa financeira velada', gatilho:'"Média de 8% ao mês", "alunos faturam R$10 mil", "resultado típico", "até 300% ao ano".',
    comoFunciona:'Joga um número de retorno específico sem dizer "garantido". Assim promete e se protege ao mesmo tempo. O número parece dado, mas é sempre o melhor caso mostrado como se fosse o comum. Você imagina o lucro; ninguém mostra quantos ficaram abaixo, ou no prejuízo.',
    comoResistir:'Todo retorno vem com risco. Quem mostra só o lucro está escondendo metade. Pergunte: de quantas pessoas esse número foi real? Qual o pior caso? Investimento sério informa o risco junto do ganho. Se a oferta só fala do que você ganha, ela está vendendo, não informando.' },

  { id:'estatistica_medo', nome:'Estatística-medo', gatilho:'"Apenas 1% consegue", "99% fracassam sozinhos".',
    comoFunciona:'Um número assustador te coloca no lado perdedor da conta, e o alívio (comprar) vem logo depois. O dado pode ser real, mas ali ele não informa. Pressiona.',
    comoResistir:'Repare quando um número aparece pouco antes do botão de compra. Ele está lá para assustar, não para ensinar. Estatística verdadeira não precisa de urgência ao lado.' },
  { id:'prova_nao_rastreavel', nome:'Prova social não-rastreável', gatilho:'Prints de ganhos, "milhares de alunos", depoimentos sem sobrenome.',
    comoFunciona:'Print e número são fáceis de fabricar e impossíveis de conferir de fora. A quantidade ("+5000 alunos") impressiona sem provar nada.',
    comoResistir:'Prova só vale se você puder verificar. Peça contato de quem terminou. Procure ex-alunos fora do funil. Depoimento que você não pode checar é decoração.' },
  { id:'ataque_ao_ceticismo', nome:'Ataque ao ceticismo', gatilho:'"Só não funciona pra quem tem mentalidade de pobre", "desculpinha".',
    comoFunciona:'Transforma sua dúvida legítima em defeito de caráter. Assim, se não der certo, a culpa é sua, e o vendedor sai ileso.',
    comoResistir:'Duvidar é saudável, não é fraqueza. Quem precisa te desqualificar por perguntar está fugindo da pergunta.' },
  { id:'suporte_vago', nome:'Suporte-isca', gatilho:'"Te pego pela mão", "suporte completo", "você nunca vai ficar sozinho".',
    comoFunciona:'Vende o alívio do acompanhamento, a parte que mais assusta em aprender algo sozinho. Você compra pensando que terá ajuda em cada passo. Depois, o suporte é um grupo lotado, um robô, ou simplesmente não existe. Você trava, abandona, e a culpa por "não ter aplicado" fica sendo sua.',
    comoResistir:'Antes de pagar, faça as perguntas exatas: o suporte é com quem, a pessoa ou um assistente? Em qual canal? Qual o prazo de resposta? Por quanto tempo? Peça por escrito. Se a resposta for vaga ou "é só chamar no grupo", você já sabe o que vai receber.' },

  { id:'pressao_emocional', nome:'Pressão sobre identidade', gatilho:'"Transforme sua vida", "chega de ser quem você é", "você merece".',
    comoFunciona:'Fala com a sua dor e a sua identidade em vez de descrever o produto. Quanto mais mexe em quem você é, menos precisa provar o que entrega.',
    comoResistir:'Separe a emoção do conteúdo. Pergunte, friamente: tirando a inspiração, o que exatamente eu recebo? Se a resposta for vaga, a oferta é vazia.' },

  { id:'quiz_que_vende', nome:'O quiz que vende', gatilho:'"Responda algumas perguntas e descubra seu perfil", quiz personalizado antes de mostrar o preço.',
    comoFunciona:'Você responde perguntas leves e pessoais, e a cada resposta se sente mais compreendido, acolhido. Sem perceber, investe minutos e cria expectativa. Quando o preço enfim aparece, você já está emocionalmente dentro, e desistir parece "desperdiçar" o tempo que gastou. A venda vem no pico do acolhimento, não da análise.',
    comoResistir:'Repare quando um teste "sobre você" termina numa venda. O quiz era o funil, não um serviço. Pergunte: o que exatamente esse app faz depois que eu pagar? Procure isso ANTES de responder o quiz. O acolhimento das perguntas não é prova de que o produto funciona.' },

  { id:'tecnologia_que_prende', nome:'A tecnologia que prende', gatilho:'App ou assinatura que promete resolver sua vida, com "teste grátis" e renovação automática.',
    comoFunciona:'Vende-se como solução, mas entrega mais peso: mais uma tela, mais uma assinatura, mais uma coisa pra gerenciar. Fácil de assinar, difícil de cancelar. No fim, você paga todo mês por algo que prometeu te ajudar e só te prendeu: mais tempo de tela, menos clareza.',
    comoResistir:'Antes de assinar, ache o botão de cancelar. Se for difícil de achar agora, será pior depois. Pergunte se isso resolve um problema real seu ou só adiciona mais uma obrigação. A melhor tecnologia te devolve tempo e liberdade, não cobra os dois de você.' },

  { id:'preco_por_dia', nome:'O preço fatiado', gatilho:'"Por apenas R$2,67 por dia", "menos que um cafezinho".',
    comoFunciona:'Quebrar o preço em "por dia" faz o número parecer minúsculo e esconde quanto sai do seu bolso de verdade a cada cobrança. R$2,67/dia soa inofensivo; R$223 a cada 4 semanas, para sempre, é outra conversa. O cérebro compara com o cafezinho, não com o total.',
    comoResistir:'Faça a conta cheia na hora: multiplique o valor "por dia" pelo período todo e pelo tanto de vezes que renova. Veja o número real. Preço honesto se mostra por inteiro. Quem fatia está contando com você não somar.' },

  { id:'autoridade_emprestada', nome:'Autoridade emprestada', gatilho:'"Baseado na metodologia de Harvard", "método de Stanford", "respaldado pela ciência".',
    comoFunciona:'Citar uma universidade ou instituição famosa empresta o prestígio dela sem provar vínculo nenhum. "Baseado em Harvard" não quer dizer que Harvard criou, aprovou ou conhece o produto. É a marca da autoridade usada como enfeite, para você confiar por associação.',
    comoResistir:'Peça a prova do vínculo: qual convênio, qual pesquisador, qual estudo publicado, com link. Se a resposta for só o nome da universidade repetido, não há vínculo, há empréstimo. Nome famoso sem prova é decoração, não credencial.' },

  { id:'depoimento_repetido', nome:'Depoimento clonado', gatilho:'O mesmo elogio, palavra por palavra, repetido várias vezes na página.',
    comoFunciona:'Repetir o mesmo depoimento cria a ilusão de volume. Parece que muita gente disse a mesma coisa, quando foi um texto colado várias vezes. Somado a "avaliações 5 estrelas" sem link verificável, dá impressão de multidão satisfeita sem prova real.',
    comoResistir:'Prova social real vem de pessoas diferentes, com palavras diferentes. Se os elogios se repetem idênticos, é fabricação. Procure avaliações fora do site, em lugares que a empresa não controla e não pode editar.' },

  { id:'recuperacao_do_investimento', nome:'O preço que "se paga sozinho"', gatilho:'"Recupere o valor investido em 30 dias", "não é gasto, é investimento", "se paga sozinho".',
    comoFunciona:'Transforma o preço em risco zero na sua cabeça antes de você checar se o resultado é real. Se o valor "volta sozinho", pagar parece não ter perda possível, e a pergunta importante (isso funciona mesmo?) fica para trás. Mas recuperar o investimento depende de você aplicar, ter capital, ter mercado, tudo que a oferta não controla.',
    comoResistir:'Trate o preço como um gasto que pode não voltar, e decida se cabe assim mesmo. Se a compra só faz sentido porque "se paga sozinho", a conta ainda não fechou. Peça os números reais: de cada 100 alunos, quantos recuperaram, em quanto tempo, com quanto investido a mais.' },

  { id:'garantia_com_barreira', nome:'A garantia que se protege de você', gatilho:'"Reembolso se você provar que aplicou tudo", "dinheiro de volta desde que siga o método inteiro".',
    comoFunciona:'Oferece reembolso e, na mesma frase, embute a condição que o esvazia: você tem que provar que executou cada passo. Quase ninguém consegue provar isso, então o alívio de "tem garantia" fica, mas a garantia de fato quase nunca é acionável. É proteção no marketing, barreira na prática.',
    comoResistir:'Leia a condição da garantia ANTES de pagar, e peça por escrito: o que exatamente conta como "aplicar tudo", quem julga isso, em quanto tempo o reembolso é feito. Se a régua for subjetiva ou difícil de propósito, a garantia é enfeite, não proteção.' }
];
