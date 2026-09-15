// Configuração
const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOr8GPQvTq_gA-nR63wKR2N1UGvT5wU6UxdjdUivpmUvj9V-ca90c9iUAT8TqYarSdPhsd2Q0yuoVw/pubhtml?gid=1153980615&single=true';
const UPDATE_INTERVAL = 30000; // 30 segundos

const BUS_CONFIG = {
  seatsPerRow: 4,
  totalSeats: 44,
  standingSpaces: 35,
  totalVagas: 79
};

let passengersData = {};
let lastUpdate = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initializeBus();
  loadData();
  setInterval(loadData, UPDATE_INTERVAL);
});

function initializeBus() {
  const seatsContainer = document.getElementById('seatsContainer');
  const standingContainer = document.getElementById('standingContainer');

  // Criar assentos numerados (01-44)
  for (let i = 1; i <= BUS_CONFIG.totalSeats; i++) {
    const btn = createSeatButton(i);
    seatsContainer.appendChild(btn);
  }

  // Criar vagas em pé (45-79)
  for (let i = BUS_CONFIG.totalSeats + 1; i <= BUS_CONFIG.totalVagas; i++) {
    const btn = createSeatButton(i);
    standingContainer.appendChild(btn);
  }
}

function createSeatButton(vagaNumber) {
  const btn = document.createElement('button');
  btn.className = 'seat-btn available';
  btn.textContent = String(vagaNumber).padStart(2, '0');
  btn.dataset.vaga = vagaNumber;
  btn.onclick = () => showDetails(vagaNumber);
  return btn;
}

async function loadData() {
  try {
    const response = await fetch(SHEETS_CSV_URL);
    const html = await response.text();
    
    // Extrair dados CSV da resposta HTML
    const csvData = parseGoogleSheetsHTML(html);
    processData(csvData);
    updateUI();
    showUpdateStatus();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    showUpdateStatus(false);
  }
}

function parseGoogleSheetsHTML(html) {
  // Extrair tabela HTML
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/);
  if (!tableMatch) return [];

  const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/g) || [];
  const data = [];

  rows.forEach((row, index) => {
    const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g) || [];
    const rowData = cells.map(cell => {
      return cell.replace(/<[^>]*>/g, '').trim();
    });
    data.push(rowData);
  });

  return data;
}

function processData(data) {
  passengersData = {};

  // Pular primeira linha (headers)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row.length < 2) continue;

    const vaga = parseInt(row[0]);
    if (isNaN(vaga) || vaga < 1 || vaga > BUS_CONFIG.totalVagas) continue;

    passengersData[vaga] = {
      vaga: vaga,
      nome: row[1] || '',
      telefone: row[2] || '',
      email: row[3] || '',
      maioridade: row[4] || '',
      autorizacao: row[5] || ''
    };
  }
}

function updateUI() {
  updateSeats();
  updateStats();
}

function updateSeats() {
  const buttons = document.querySelectorAll('.seat-btn');
  buttons.forEach(btn => {
    const vaga = parseInt(btn.dataset.vaga);
    if (passengersData[vaga]) {
      btn.classList.remove('available');
      btn.classList.add('occupied');
    } else {
      btn.classList.remove('occupied');
      btn.classList.add('available');
    }
  });
}

function updateStats() {
  const ocupadas = Object.keys(passengersData).length;
  const disponivel = BUS_CONFIG.totalVagas - ocupadas;
  const taxaOcupacao = Math.round((ocupadas / BUS_CONFIG.totalVagas) * 100);

  document.getElementById('ocupadas').textContent = ocupadas;
  document.getElementById('disponivel').textContent = disponivel;
  document.getElementById('taxaOcupacao').textContent = taxaOcupacao + '%';
}

function showDetails(vaga) {
  const panel = document.getElementById('detailsPanel');
  const content = document.getElementById('detailsContent');
  const passenger = passengersData[vaga];

  if (!passenger) {
    content.innerHTML = `
      <div class="detail-item" style="background: #e8f5e9; border-color: #28a745;">
        <p style="color: #28a745; font-weight: bold; margin: 0;">✓ Vaga ${String(vaga).padStart(2, '0')} - Disponível</p>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div class="detail-item">
        <span class="detail-label">Vaga</span>
        <span class="detail-value">${String(passenger.vaga).padStart(2, '0')}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Nome</span>
        <span class="detail-value">${passenger.nome}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Telefone</span>
        <span class="detail-value">${passenger.telefone || 'N/A'}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Email</span>
        <span class="detail-value">${passenger.email || 'N/A'}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Maioridade</span>
        <span class="status-badge ${passenger.maioridade.toLowerCase() === 'sim' ? 'sim' : 'nao'}">
          ${passenger.maioridade}
        </span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Autorização</span>
        <span class="status-badge ${passenger.autorizacao.toLowerCase() === 'sim' ? 'sim' : 'nao'}">
          ${passenger.autorizacao || 'N/A'}
        </span>
      </div>
    `;
  }

  panel.classList.add('show');
}

function closeDetails() {
  document.getElementById('detailsPanel').classList.remove('show');
}

function showUpdateStatus(success = true) {
  const statusEl = document.getElementById('updateStatus');
  const now = new Date().toLocaleTimeString('pt-BR');

  if (success) {
    statusEl.textContent = `✓ Atualizado em ${now}`;
    statusEl.classList.add('updated');
  } else {
    statusEl.textContent = `✕ Erro ao atualizar em ${now}`;
    statusEl.classList.remove('updated');
  }
}

// Fechar painel ao clicar fora
document.addEventListener('click', (e) => {
  const panel = document.getElementById('detailsPanel');
  if (panel.classList.contains('show') && 
      !panel.contains(e.target) && 
      !e.target.classList.contains('seat-btn')) {
    closeDetails();
  }
});