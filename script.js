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
const LOCAL_REGISTRATIONS_KEY = 'mega-help-26-registrations';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initializeBus();
  loadData();
  setInterval(loadData, UPDATE_INTERVAL);
  document.getElementById('seatSearch').addEventListener('input', filterSeats);
  document.getElementById('openRegistration').addEventListener('click', openRegistration);
  document.getElementById('closeRegistration').addEventListener('click', closeRegistration);
  document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
  document.getElementById('maioridade').addEventListener('change', toggleAuthorization);
  document.getElementById('registrationModal').addEventListener('click', event => {
    if (event.target.id === 'registrationModal') closeRegistration();
  });
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

  getLocalRegistrations().forEach(registration => {
    passengersData[registration.vaga] = registration;
  });
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
  document.getElementById('heroDisponivel').textContent = disponivel;
}

function filterSeats(event) {
  const query = event.target.value.trim().replace(/^0+/, '');
  document.querySelectorAll('.seat-btn').forEach(button => {
    const vaga = button.dataset.vaga;
    button.classList.toggle('hidden', query !== '' && !vaga.includes(query));
  });
}

function getLocalRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_REGISTRATIONS_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function openRegistration() {
  populateRegistrationSeats();
  const modal = document.getElementById('registrationModal');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.querySelector('#registrationForm input[name="nome"]').focus();
}

function closeRegistration() {
  const modal = document.getElementById('registrationModal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

function populateRegistrationSeats() {
  const select = document.getElementById('registrationSeat');
  const availableSeats = Array.from({ length: BUS_CONFIG.totalVagas }, (_, index) => index + 1)
    .filter(vaga => !passengersData[vaga]);
  select.innerHTML = '<option value="">Selecione uma vaga disponível</option>';
  availableSeats.forEach(vaga => {
    const option = document.createElement('option');
    option.value = vaga;
    option.textContent = `Vaga ${String(vaga).padStart(2, '0')}${vaga <= BUS_CONFIG.totalSeats ? ' · assento' : ' · em pé'}`;
    select.appendChild(option);
  });
}

function toggleAuthorization(event) {
  const field = document.getElementById('authorizationField');
  field.classList.toggle('required-field', event.target.value === 'Não');
  field.querySelector('input').required = event.target.value === 'Não';
}

async function handleRegistration(event) {
  event.preventDefault();
  const form = event.target;
  const formMessage = document.getElementById('formMessage');
  const formData = new FormData(form);
  const registration = Object.fromEntries(formData.entries());
  registration.vaga = Number(registration.vaga);
  registration.autorizacao = registration.autorizacao || '';

  if (passengersData[registration.vaga]) {
    formMessage.textContent = 'Essa vaga acabou de ser ocupada. Escolha outra.';
    formMessage.className = 'form-message error';
    populateRegistrationSeats();
    return;
  }

  const registrations = getLocalRegistrations().filter(item => item.email !== registration.email);
  registrations.push(registration);
  localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(registrations));
  passengersData[registration.vaga] = registration;
  updateUI();
  formMessage.textContent = 'Cadastro confirmado. Preparando seu bilhete...';
  formMessage.className = 'form-message success';
  await generateTicket(registration);
  form.reset();
  toggleAuthorization({ target: document.getElementById('maioridade') });
  closeRegistration();
}

async function generateTicket(registration) {
  if (!window.jspdf || !window.QRCode) {
    throw new Error('Bibliotecas do bilhete indisponíveis');
  }
  const qrData = JSON.stringify({ evento: 'Mega Help 26', nome: registration.nome, vaga: registration.vaga, rota: 'Mario Casassanta - Pavilhão do Anhembi' });
  const qrImage = await QRCode.toDataURL(qrData, { width: 220, margin: 1, color: { dark: '#12231f', light: '#fffefa' } });
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: 'mm', format: [90, 150] });
  pdf.setFillColor(217, 243, 106); pdf.rect(0, 0, 90, 42, 'F');
  pdf.setTextColor(18, 35, 31); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(18); pdf.text('MEGA HELP', 10, 16);
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.text('26 · BILHETE DE EMBARQUE', 10, 23); pdf.text('ROTA 01 · 15 AGO 2026', 10, 31);
  pdf.setFontSize(8); pdf.text('PASSAGEIRO', 10, 54); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(14); pdf.text(registration.nome.slice(0, 30), 10, 62);
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.text('VAGA', 10, 76); pdf.text('SAÍDA', 47, 76); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(20); pdf.text(String(registration.vaga).padStart(2, '0'), 10, 87); pdf.setFontSize(10); pdf.text('Mario Casassanta', 47, 84); pdf.text('Pavilhão do Anhembi', 47, 91);
  pdf.addImage(qrImage, 'PNG', 25, 98, 40, 40); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.text('Apresente este QR Code no embarque', 18, 145);
  pdf.save(`mega-help-26-${registration.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.pdf`);
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