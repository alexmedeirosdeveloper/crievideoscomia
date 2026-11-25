# Crie Vídeos com IA — Landing Page 2.0

Projeto estático HTML, CSS, JavaScript e Bootstrap (CSS local). Versão separada do arquivo original.

## Teste e publicação
1. Extraia o ZIP e abra index.html ou sirva a pasta por HTTP (por exemplo, `python -m http.server 8000`).
2. Publique index.html, privacidade.html e a pasta assets na raiz de um ambiente de homologação. Faça backup do site atual antes de substituir qualquer arquivo em produção.
3. Todos os 8 CTAs têm href direto para o link de afiliado original da Cakto. Se mudar o link, altere todos os hrefs em index.html e o campo affiliateUrl em assets/js/config.js. Nenhum popup de compra.
4. Pixel original preservado, com PageView após consentimento e evento personalizado CheckoutClick nos CTAs. Não dispara Purchase nem InitiateCheckout artificialmente. Valide esses eventos na Cakto e na Meta com o gestor. A escolha de consentimento pode alterar a comparabilidade das métricas anteriores.
5. As duas demonstrações locais são demo-04 e demo-08; outras seis são externas, e a apresentação usa HLS externo. O carregamento é por interação; verifique disponibilidade dos URLs em produção. Recomenda-se obter cópias autorizadas locais dos demais vídeos.
6. A página de privacidade é uma minuta operacional: completar identificação do responsável, canal de contato, política de retenção e demais informações aplicáveis antes da publicação. Confirmar autorização de uso de imagens, depoimentos e vídeos, e as condições atuais da oferta, formas de pagamento e duração de acesso.

## Validação realizada
- 8 CTAs com URL original idêntica; 8 demonstrações, 13 capturas, 7 módulos, 4 bônus e 11 perguntas.
- Referências locais verificadas; scripts passaram em `node --check`.
- Imagens utilizadas convertidas para WebP, carregamento lazy abaixo da dobra; vídeo e HLS sob demanda. Fontes de sistema para evitar dependências externas.
- Teste visual/interativo em Chromium não concluído: ambiente bloqueou navegação local HTTP e file://. Não houve medição de Lighthouse, teste de checkout real ou teste do Pixel em produção. A próxima etapa deve fazer esses testes em homologação, incluindo mobile, Facebook/Instagram, Pix/cartão e atribuição da comissão.
