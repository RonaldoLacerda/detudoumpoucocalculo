# Calculadoras Digitais

PROMPT DE DESENVOLVIMENTO — DE TUDO UM POUCO

MVP de Calculadoras Trabalhistas

1. PAPEL

Atue como um Engenheiro de Software Sênior, especialista em React, TypeScript, UX/UI, SEO técnico e aplicações web de alta performance.

Construa uma aplicação web real, funcional e pronta para publicação chamada DE TUDO UM POUCO.

Slogan: “Calculadoras trabalhistas simples, rápidas e gratuitas.”

O objetivo inicial é exclusivamente criar um MVP de calculadoras trabalhistas brasileiras. Não criar um portal genérico de ferramentas neste momento.

2. REGRA PRINCIPAL — MVP E ECONOMIA DE CRÉDITOS

Este projeto está sendo desenvolvido utilizando uma ferramenta de Vibe Coding com créditos gratuitos limitados.

Entregue primeiro um MVP funcional, pequeno e completo, utilizando o mínimo possível de geração, dependências e código.

NÃO criar funcionalidades secundárias, autenticação, painel administrativo, sistema de usuários, pagamentos, backend, APIs externas ou banco de dados.

Não instalar bibliotecas sem necessidade.

Não criar abstrações excessivas.

Não gerar funcionalidades futuras.

Priorize nesta ordem:
1. Funcionamento das calculadoras;
2. Interface responsiva;
3. SEO básico;
4. Preparação para anúncios;
5. Performance.

Se alguma melhoria não for necessária para o MVP, não a implemente.

3. TECNOLOGIA

Utilize:
- React
- TypeScript
- Vite
- CSS moderno ou Tailwind CSS somente se já estiver disponível ou se sua utilização não aumentar desnecessariamente a complexidade.

A aplicação deve ser predominantemente client-side.

TODOS os cálculos devem ocorrer no navegador.

Não criar servidor próprio para os cálculos.

4. BANCO DE DADOS — NÃO UTILIZAR

REGRA ABSOLUTA: este MVP NÃO deve utilizar banco de dados de nenhum tipo.

Não utilizar:
- Supabase;
- Firebase;
- MySQL;
- PostgreSQL;
- SQLite;
- MongoDB;
- qualquer outro banco.

Não criar backend apenas para armazenar informações.

As regras, constantes e configurações das calculadoras devem ficar em arquivos TypeScript organizados.

O site deve funcionar como uma aplicação estática/client-side que possa ser publicada em uma hospedagem simples.

Não armazenar dados pessoais ou informações digitadas pelos usuários.

5. OBJETIVO DO MVP

O usuário deve conseguir entrar diretamente em uma calculadora, preencher os dados e obter o resultado sem cadastro, login ou qualquer etapa desnecessária.

Fluxo:
Google → Calculadora → Preencher dados → Resultado.

6. CALCULADORAS DO MVP

Implementar somente estas calculadoras:

1. Calculadora de Salário Líquido
- salário bruto;
- dependentes;
- vale-transporte;
- outros descontos;
- INSS;
- IRRF;
- descontos;
- salário líquido.

2. Calculadora de Férias
- salário;
- dias de férias;
- venda de férias, quando aplicável;
- cálculo do adicional de 1/3;
- abono;
- descontos;
- valor estimado.

3. Calculadora de 13º Salário
- salário;
- meses trabalhados;
- cálculo do 13º proporcional;
- primeira/segunda parcela quando aplicável;
- descontos aplicáveis.

4. Calculadora de Rescisão
- salário;
- data de admissão;
- data de desligamento;
- motivo do desligamento;
- aviso prévio;
- férias vencidas;
- férias proporcionais;
- 13º proporcional;
- saldo de salário;
- FGTS/multa quando aplicável;
- total estimado.

5. Calculadora de Aviso Prévio
- salário;
- tempo de empresa;
- tipo de desligamento;
- quantidade de dias;
- valor estimado.

6. Calculadora de Hora Extra
- salário;
- jornada mensal;
- horas extras;
- adicional de 50%;
- adicional de 100%;
- percentual personalizado;
- valor da hora;
- valor total das horas extras.

7. Calculadora de Adicional Noturno
- salário;
- horas noturnas;
- percentual;
- resultado detalhado.

8. Calculadora de Salário por Hora
- salário;
- horas mensais;
- valor por hora;
- valor por dia;
- valor aproximado por minuto.

9. Calculadora de Dias Trabalhados
- salário;
- data inicial;
- data final;
- valor proporcional estimado.

10. Calculadora CLT x PJ
Comparação simples entre CLT e PJ.
Entradas:
- salário/valor mensal;
- benefícios;
- vale-alimentação;
- plano de saúde;
- impostos;
- contador;
- reserva para férias;
- reserva para 13º.
Mostrar comparação mensal e anual.

7. REGRAS TRABALHISTAS

Centralize todas as regras, constantes e parâmetros em arquivos TypeScript separados.

Não espalhar valores pelo código.

A estrutura deve permitir atualizar facilmente:
- faixas;
- percentuais;
- limites;
- regras;
- parâmetros de cálculo.

Os valores e regras devem ser tratados como configuráveis no código.

Antes da publicação, os cálculos devem ser revisados conforme a legislação brasileira vigente.

8. DESIGN

Criar uma interface moderna, limpa, profissional e confiável.

Prioridade mobile-first.

Características:
- layout simples;
- boa legibilidade;
- formulários objetivos;
- resultados destacados;
- poucos elementos visuais;
- sem animações desnecessárias;
- carregamento rápido.

O site deve parecer uma ferramenta séria de consulta trabalhista, não um sistema empresarial complexo.

9. PÁGINA INICIAL

Criar:
- Header;
- logo “De Tudo Um Pouco”;
- menu simples;
- Hero;
- descrição;
- campo de pesquisa simples;
- cards das principais calculadoras;
- Footer.

Título principal:
“Calculadoras trabalhistas gratuitas”

Subtítulo:
“Calcule salário líquido, férias, 13º, rescisão, horas extras e outros valores trabalhistas de forma simples e rápida.”

10. PÁGINAS E URLs

Cada calculadora deve possuir uma página própria e URL amigável:

/calculadora-salario-liquido
/calculadora-rescisao
/calculadora-ferias
/calculadora-13-salario
/calculadora-hora-extra
/calculadora-aviso-previo
/calculadora-adicional-noturno
/calculadora-salario-por-hora
/calculadora-dias-trabalhados
/calculadora-clt-pj

Cada página deve conter:
- H1;
- descrição;
- calculadora;
- resultado;
- explicação;
- exemplos;
- FAQ;
- calculadoras relacionadas.

11. SEO

Cada página deve possuir:
- title;
- meta description;
- H1;
- headings organizados;
- URL amigável;
- canonical;
- Open Graph básico;
- links internos;
- conteúdo útil e original.

Criar:
- sitemap.xml;
- robots.txt.

Não criar páginas artificiais ou conteúdo repetitivo apenas para SEO.

12. AVISO LEGAL

Nas calculadoras trabalhistas, exibir:

“Os resultados são estimativas calculadas com base nas informações fornecidas e nas regras consideradas pela ferramenta. O resultado pode variar conforme a situação individual, convenções coletivas e legislação vigente.”

Não apresentar resultados como garantia jurídica ou contábil.

13. ANÚNCIOS

Preparar a aplicação para Google AdSense, sem utilizar IDs fictícios.

Utilizar variáveis de ambiente, por exemplo:
VITE_ADSENSE_CLIENT_ID
VITE_ADSENSE_SLOT_TOP
VITE_ADSENSE_SLOT_RESULT
VITE_ADSENSE_SLOT_BOTTOM

Criar um componente reutilizável AdBanner.

Permitir posições:
- abaixo do cabeçalho;
- antes ou depois da calculadora;
- abaixo do resultado;
- final da página.

Se as variáveis não estiverem configuradas, o componente não deve quebrar a aplicação.

Não criar anúncios falsos.

14. ANALYTICS

Preparar opcionalmente Google Analytics através de:
VITE_GA_ID

Se não houver ID configurado, não carregar o Analytics.

Não criar qualquer sistema próprio de rastreamento ou banco de dados.

15. COMPONENTES

Criar somente componentes necessários e reutilizáveis:
- Header;
- Footer;
- CalculatorCard;
- CalculatorLayout;
- Input;
- Select;
- ResultCard;
- AdBanner;
- FAQ;
- Breadcrumb;
- Search;
- RelatedCalculators.

Evitar excesso de abstrações.

16. ARQUITETURA

Organizar o projeto de maneira simples:

src/
  components/
  calculators/
  pages/
  utils/
  constants/
  data/
  types/

Cada calculadora deve separar:
- interface;
- lógica de cálculo;
- tipos;
- regras específicas.

Não duplicar lógica.

17. VALIDAÇÃO E ERROS

Validar:
- campos vazios;
- números inválidos;
- datas inválidas;
- salário negativo;
- datas incompatíveis;
- campos obrigatórios.

Mostrar mensagens amigáveis.

Nunca mostrar erros técnicos ao usuário.

18. RESPONSIVIDADE E ACESSIBILIDADE

O site deve ser mobile-first e funcionar em:
- 320px;
- 360px;
- 390px;
- 414px;
- tablet;
- desktop.

Implementar:
- labels;
- foco visível;
- navegação por teclado;
- contraste adequado;
- mensagens acessíveis.

19. PERFORMANCE

Evitar dependências desnecessárias.

Não utilizar bibliotecas grandes quando uma implementação simples em TypeScript resolver.

Os cálculos devem ocorrer instantaneamente no navegador.

O site deve carregar rapidamente em conexão móvel.

20. ORDEM DE IMPLEMENTAÇÃO

Para economizar créditos, trabalhar nesta ordem:

ETAPA 1
- estrutura React + TypeScript;
- layout;
- Header/Footer;
- rotas;
- página inicial.

ETAPA 2
- componente genérico de calculadora;
- primeira calculadora funcional;
- sistema de resultados.

ETAPA 3
- salário líquido;
- férias;
- 13º.

ETAPA 4
- rescisão;
- aviso prévio;
- hora extra.

ETAPA 5
- adicional noturno;
- salário por hora;
- dias trabalhados;
- CLT x PJ.

ETAPA 6
- SEO;
- sitemap;
- robots.txt;
- anúncios;
- revisão responsiva;
- revisão de erros.

Sempre reutilizar o que já foi criado.

21. CRITÉRIOS DE ACEITAÇÃO

O MVP será considerado concluído quando:
- todas as 10 calculadoras funcionarem;
- os cálculos estiverem organizados e atualizáveis;
- o site funcionar perfeitamente no celular;
- cada calculadora tiver URL própria;
- SEO básico estiver configurado;
- sitemap e robots.txt existirem;
- anúncios estiverem preparados;
- não houver banco de dados;
- não houver backend desnecessário;
- não houver IDs fictícios;
- não houver botões sem função;
- não houver erros no console;
- não houver links quebrados;
- o projeto puder ser publicado como aplicação web.

22. REGRA FINAL

Não tente impressionar adicionando funcionalidades.

Impressione pela qualidade, simplicidade e funcionamento.

Este é um MVP.

Não criar banco de dados.
Não criar backend.
Não criar login.
Não criar painel administrativo.
Não criar sistema de usuários.
Não criar pagamentos.
Não criar funcionalidades futuras.

Use os créditos gratuitos de forma extremamente econômica.

Construa primeiro o núcleo funcional e somente depois melhorias essenciais.

O resultado final deve ser:

DE TUDO UM POUCO

Um site brasileiro, rápido, simples e profissional de calculadoras trabalhistas gratuitas.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://detudoumpoucocalculo.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a2ac79f6-4d01-4742-9a0b-8f0d7903873d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
