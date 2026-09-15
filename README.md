# Mega Help 26 🎗️ — Controle de Vagas de Ônibus

Aplicação web interativa para gestão e visualização em tempo real das vagas do ônibus para o evento **Mega Help 26** (Trajeto: Mario Casassanta → Pavilhão do Anhembi).

## 🚀 Funcionalidades

- **Mapa Visual do Ônibus:** Divisão clara entre assentos numerados (01–44) e vagas em pé (45–79).
- **Integração Dinâmica:** Consome dados em tempo real de uma planilha do Google Sheets publicada como CSV.
- **Painel de Detalhes:** Clique em qualquer vaga ocupada para visualizar nome, telefone, e-mail e status de maioridade/autorização.
- **Design Responsivo:** Interface otimizada para dispositivos móveis e desktop.
- **Atualizações em Tempo Real:** Recarrega dados automaticamente a cada 30 segundos.

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica e acessível
- **CSS3** — Variáveis CSS, CSS Grid, Flexbox, Design Responsivo
- **JavaScript Vanilla (ES6+)** — Fetch API, Async/Await, Manipulação de DOM

## 📋 Como Usar

### 1. Preparar a Planilha Google Sheets

1. Acesse sua planilha Google Sheets
2. Vá em **Arquivo → Compartilhar → Publicar na web**
3. Selecione a aba desejada e formato **CSV**
4. Copie o link gerado

### 2. Configurar a URL da Planilha

No arquivo `index.html`, localize a variável `SHEETS_CSV_URL` e substitua pelo link da sua planilha:

```javascript
const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOr8GPQvTq_gA-nR63wKR2N1UGvT5wU6UxdjdUivpmUvj9V-ca90c9iUAT8TqYarSdPhsd2Q0yuoVw/pubhtml?gid=1153980615&single=true';
```

### 3. Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/rogerinho98/mega-help-26.git

# Acesse a pasta
cd mega-help-26

# Abra o arquivo index.html no navegador
# Opção 1: Double-click no arquivo
# Opção 2: Use um servidor local (recomendado)
python -m http.server 8000
# Ou com Node.js
npx http-server
```

Acesse `http://localhost:8000` (ou a porta indicada) no navegador.

## 📊 Formato de Dados Esperado

A planilha Google Sheets deve conter as seguintes colunas:

| Coluna | Descrição |
|--------|-----------|
| **Vaga** | Número da vaga (01-79) |
| **Nome** | Nome do passageiro |
| **Telefone** | Telefone de contato |
| **Email** | E-mail do passageiro |
| **Maioridade** | Sim/Não (Maior de idade) |
| **Autorização** | Sim/Não (Autorização de responsável, se menor) |

### Exemplo:

```
Vaga,Nome,Telefone,Email,Maioridade,Autorização
01,João Silva,11999999999,joao@email.com,Sim,
05,Maria Santos,11888888888,maria@email.com,Não,Sim
```

## 🎨 Customização

### Cores Personalizadas

Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --dark-color: #212529;
  --light-color: #f8f9fa;
}
```

### Layout do Ônibus

Modifique os valores em `script.js`:

```javascript
const BUS_CONFIG = {
  seatsPerRow: 4,
  totalSeats: 44,
  standingSpaces: 35,
  updateInterval: 30000 // 30 segundos
};
```

## 🔄 Atualizações Automáticas

O aplicativo recarrega dados automaticamente a cada 30 segundos. Para alterar o intervalo:

```javascript
const UPDATE_INTERVAL = 30000; // em milissegundos
```

## 🐛 Troubleshooting

### "Erro ao carregar dados da planilha"
- Verifique se a planilha está publicada como CSV
- Confirme se a URL está correta
- Teste a URL diretamente no navegador

### "Vagas não aparecem"
- Verifique se as colunas da planilha correspondem aos nomes esperados
- Confirme se há dados na planilha

### "Dados não atualizam"
- Verifique o console do navegador (F12) para erros
- Confirme a conexão com a internet

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- ✅ Desktop (1920x1080 e superiores)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 📝 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 🤝 Contribuições

Sugestões e contribuições são bem-vindas! Abra uma issue ou pull request.

## 📧 Suporte

Para dúvidas ou problemas, entre em contato:
- **Email:** rogeriofilho100@gmail.com
- **GitHub:** [@rogerinho98](https://github.com/rogerinho98)

---

**Desenvolvido com ❤️ para o Mega Help 26**
