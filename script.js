// Configuração
const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOr8GPQvTq_gA-nR63wKR2N1UGvT5wU6UxdjdUivpmUvj9V-ca90c9iUAT8TqYarSdPhsd2Q0yuoVw/pubhtml?gid=1153980615&single=true';
const UPDATE_INTERVAL = 30000; // 30 segundos

const BUS_CONFIG = {
  seatsPerRow: 4,
  totalSeats: 44,
  standingSpaces: 35,
  totalVagas: 79
};

const PRELOADED_PASSENGERS = [
  [1, 'Mariana Gomes', 'marianagrillosalmaso@gmail.com', '11 98467-6057', 'Sim'], [2, 'Rogerio Gomes', 'rogeriofilho100@gmail.com', '11 97056-7553', 'Sim'],
  [3, 'Renato de Moura Magalhães Rodrigues', 'renato.pianossa@gmail.com', '11 94898-2558', 'Não'], [4, 'Paulo Henrique Vega Ariza', 'renato.pianossa@gmail.com', '11 94989-2558', 'Não'],
  [5, 'Camilla Cardoso Sena', 'camillacardososena0@gmail.com', '11 96037-9387', 'Não'], [6, 'Ana Luiza Fiqueredo Teodoro de Camargo', 'analuizateodoro@gmail.com', '11 96776-3886', 'Não'],
  [7, 'Maria Clara Sepedro Gomes', 'mc9297650@gmail.com', '11 97673-4531', 'Não'], [8, 'Caio Gonçalves Zanardi', 'Caiogzanardi2@gmail.com', '11 98036-8455', 'Não'],
  [9, 'Gabrielly Cardoso Sena', 'gabriellycardososena82@gmail.com', '11 96037-1517', 'Não'], [10, 'Vitória de Araújo Macedo', 'vitoriaraujomacedo@gmail.com', '11 93907-7773', 'Não'],
  [11, 'Kayky Rubio de Assis Fernandez', 'kayky.fernandez.09@gmail.com', '11 97201-1020', 'Não'], [12, 'Ana Clara Cano Malaquias', 'acanomalaquias@gmail.com', '11 91318-1983', 'Não'],
  [13, 'Geovanna Silva Brito', 'Geovannasilvabrito85@gmail.com', '11 94842-9239', 'Não'], [14, 'Isabelly Barbosa da Silva', 'belly.barbosas02@gmail.com', '11 92592-2680', 'Não'],
  [15, 'Maria Eduarda de Oliveira Antunes', 'mariaeduardaantunes3003@gmail.com', '11 98094-3658', 'Não'], [16, 'Arthur de Sousa Cruz', 'arthurdsc2011@gmail.com', '11 99467-1075', 'Não'],
  [17, 'Mateus Eduardo Pereira da Silva', 'melo121santos@gmail.com', '11 99451-4280', 'Não'], [18, 'Isabella Gomes Ribeiro', 'isabellagomesribeiro098@gmail.com', '11 97666-4833', 'Não'],
  [19, 'Paula Vitoria Barkauskas Vieira', 'vitoria8focada@gmail.com', '11 93918-9339', 'Não'], [20, 'Carlos Eduardo Pires Lima', 'carloseduardopireslima1909@gmail.com', '11 93704-7049', 'Não'],
  [21, 'Fernando Terleskie Andreazzi', 'Ftandreazzi@gmail.com', '11 95783-7606', 'Não'], [22, 'Samuel Chrisostomo Santos', 'samuelchrisostomo262@gmail.com', '11 96925-6791', 'Não'],
  [23, 'Adrian Gustavo da Silva', 'adriangustavodasilva0912@gmail.com', '11 97779-3284', 'Não'], [24, 'Luma Vitória Bezerra de Jesus', 'lumatiktok0112@gmail.com', '11 93728-4316', 'Não'],
  [25, 'Arthur de Souza Ferreira', 'arthurdesouzaferreiea14@gmail.com', '11 91508-0708', 'Não'], [26, 'Arthur Pavão Ramos', 'ar60651398@gmail.com', '11 99205-5331', 'Não'],
  [27, 'Paulo Henrique Vega Ariza (2)', 'paulohenriquevega06@gmail.com', '11 94503-7514', 'Não'], [28, 'Guilherme de Oliveira Antunes', 'oguiantunes01@gmail.com', '11 97450-3688', 'Não'],
  [29, 'Wendel Pereira de Jesus', 'wendelpereir1@gmail.com', '11 91848-5455', 'Não'], [30, 'Mirelle Xavier Rodrigues Siqueira', 'mirellersiqueira@gmail.com', '11 95656-5070', 'Não'],
  [31, 'João Felipe Batista Pinto', 'joaofelipebatistapinto@gmail.com', '11 96251-0801', 'Não'], [32, 'Isabella de Castro Palma', 'bellaska9@gmail.com', '11 92161-2129', 'Não'],
  [33, 'Rafaella Vendramini', 'rafaellavendramini752@gmail.com', '11 94947-8122', 'Não'], [34, 'Isaque Santos de Melo Rocha', 'lm768351@gmail.com', '11 95179-4452', 'Não'],
  [35, 'Pietra Ricardo Chaves', 'pietraricardochaves@gmail.com', '11 97829-0970', 'Não'], [36, 'Artur Farias Queiroz', 'arturfariasqueiroz@gmail.com', '11 96642-8231', 'Não'],
  [37, 'Davi Pereira Magalhães', 'davipmagalhaes.2009@gmail.com', '11 98980-9438', 'Não'], [38, 'Maria Paula Garcia de Souza', 'mariapaulagarciadesouza2@gmail.com', '11 98214-5091', 'Não'],
  [39, 'Pedro Henrique Barazini Maurano', 'Pedrobarazini@gmail.com', '11 91317-6916', 'Não'], [40, 'Luca Machado Uchôa', 'lucauchoamachado@gmail.com', '11 95093-6475', 'Não'],
  [41, 'Sara Luz Virgulino de Melo', 'saraluz.vm@gmail.com', '11 98533-5721', 'Não'], [42, 'Isabella Carafini da Silva', 'Isacarafini@gmail.com', '11 95490-2859', 'Não'],
  [43, 'Bruno Eduardo Lima da Silva', 'eduardo31102009l@gmail.com', '11 94564-2536', 'Não'], [44, 'Mellina Xavier Rodrigues Siqueira', 'mellinaxavier@gmail.com', '11 93278-0591', 'Não'],
  [45, 'Rafaela Santos Roque', 'Rafinhafofinha0650@gmail.com', '11 98815-8132', 'Não'], [46, 'Isabelle Barbosa de Oliveira', 'isabellaoliveira5489@gamal.com', '11 95134-9331', 'Não'],
  [47, 'Kauê Henry Fernandes Leite da Silva', 'Khenry2701@gmail.com', '11 97800-8099', 'Não'], [48, 'Lucas de Castro Palma', 'lucascastroska8@gmail.com', '11 97439-2384', 'Não'],
  [49, 'Isabela Vitoriano De Oliveira', 'isabelavitorianodeooiveira@gmail.com', '11 94941-1734', 'Não'], [50, 'Rodolfo Oliveira Galhardi', 'rodolfooliveira.g11@gmail.com', '11 98798-4224', 'Não'],
  [51, 'Arthur Ferreira da Silva', 'arthurferreira261009@gmail.com', '11 95873-4059', 'Não'], [52, 'Felipe Ferreira Fernandes Dias', 'felipeferreira2009@gmail.com', '11 98839-1084', 'Não']
];

let passengersData = Object.fromEntries(PRELOADED_PASSENGERS.map(([vaga, nome, email, telefone, maioridade]) => [vaga, { vaga, nome, email, telefone, maioridade, autorizacao: '' }]));
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
  const seatWrapper = document.createElement('div');
  seatWrapper.className = 'seat-wrapper';

  const btn = document.createElement('button');
  btn.className = 'seat-btn available';
  btn.textContent = String(vagaNumber).padStart(2, '0');
  btn.dataset.vaga = vagaNumber;
  btn.onclick = () => handleSeatClick(vagaNumber);

  const passengerName = document.createElement('span');
  passengerName.className = 'seat-passenger-name';
  passengerName.dataset.vagaName = vagaNumber;
  passengerName.setAttribute('aria-live', 'polite');

  seatWrapper.append(btn, passengerName);
  return seatWrapper;
}

function handleSeatClick(vaga) {
  showDetails(vaga);
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
    updateUI();
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
  passengersData = Object.fromEntries(PRELOADED_PASSENGERS.map(([vaga, nome, email, telefone, maioridade]) => [vaga, { vaga, nome, email, telefone, maioridade, autorizacao: '' }]));

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
    const nameLabel = document.querySelector(`[data-vaga-name="${vaga}"]`);
    if (passengersData[vaga]) {
      btn.classList.remove('available');
      btn.classList.add('occupied');
      nameLabel.textContent = passengersData[vaga].nome;
      nameLabel.title = passengersData[vaga].nome;
    } else {
      btn.classList.remove('occupied');
      btn.classList.add('available');
      nameLabel.textContent = 'Disponível';
      nameLabel.removeAttribute('title');
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
  const qrData = `mega-help-26://bilhete/vaga-${String(registration.vaga).padStart(2, '0')}`;
  const qrImage = await createQrDataUrl(qrData);
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: 'mm', format: [250, 190] });
  const navy = [11, 36, 79];
  const yellow = [250, 197, 24];
  const ink = [18, 35, 66];
  const light = [247, 248, 250];
  const rightColumnX = 187;
  const passengerName = registration.nome || 'Passageiro';
  const isMinor = String(registration.maioridade).toLowerCase() === 'não';

  pdf.setFillColor(...light); pdf.rect(0, 0, 250, 190, 'F');
  pdf.setFillColor(...navy); pdf.roundedRect(1, 1, 248, 36, 5, 5, 'F');
  pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(21); pdf.text('MEGA HELP 26', 12, 18);
  pdf.setFontSize(7); pdf.text('BILHETE DE VIAGEM', 12, 27);
  pdf.setTextColor(...yellow); pdf.setFontSize(18); pdf.text('Boa viagem!', 12, 34);
  pdf.setTextColor(255, 255, 255); pdf.setFontSize(7); pdf.text('Nº DA VIAGEM', 142, 12);
  pdf.setTextColor(...yellow); pdf.setFontSize(15); pdf.text('19092025', 142, 22);
  pdf.setTextColor(255, 255, 255); pdf.setFontSize(7); pdf.text('ROTA 01 · TRANSPORTE OFICIAL', 142, 31);

  pdf.setTextColor(...ink); pdf.setFontSize(8); pdf.text('PASSAGEIRO', 12, 51);
  pdf.setFontSize(17); pdf.setFont('helvetica', 'bold');
  pdf.text(pdf.splitTextToSize(passengerName, 150), 12, 61);
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.text(registration.telefone || 'Telefone não informado', 12, 76);
  pdf.text(registration.email || 'E-mail não informado', 12, 83);
  pdf.setDrawColor(190, 196, 205); pdf.line(12, 90, 177, 90);

  pdf.setTextColor(...navy); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.text('VIAGEM', 12, 101);
  pdf.setFont('helvetica', 'normal'); pdf.setTextColor(...ink); pdf.setFontSize(8); pdf.text('SAÍDA', 12, 111); pdf.text('CHEGADA', 91, 111);
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(11); pdf.text('Mario Casassanta', 12, 119); pdf.text('Pavilhão do Anhembi', 91, 119);
  pdf.setDrawColor(...navy); pdf.setLineWidth(0.5); pdf.line(72, 116, 85, 116); pdf.line(82, 113, 85, 116); pdf.line(82, 119, 85, 116);
  pdf.setDrawColor(190, 196, 205); pdf.line(12, 128, 177, 128);

  pdf.setTextColor(...navy); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.text('DATA', 12, 140); pdf.text('EMBARQUE', 91, 140);
  pdf.setTextColor(...ink); pdf.setFontSize(13); pdf.text('19/09', 12, 149); pdf.text('09h00', 91, 149);
  pdf.setDrawColor(190, 196, 205); pdf.line(12, 158, 177, 158);
  pdf.setFillColor(255, 249, 224); pdf.roundedRect(8, 163, 169, 19, 2, 2, 'F');
  pdf.setTextColor(...navy); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.text('OBSERVAÇÕES', 14, 172);
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.text(isMinor ? 'Menor de idade: levar autorização assinada.' : 'Apresente este bilhete no embarque.', 63, 172);

  pdf.setFillColor(255, 255, 255); pdf.rect(rightColumnX, 1, 62, 188, 'F');
  pdf.setFillColor(...navy); pdf.roundedRect(rightColumnX + 5, 8, 52, 18, 3, 3, 'F');
  pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(10); pdf.text('ASSENTO', rightColumnX + 18, 18);
  pdf.setTextColor(...ink); pdf.setFontSize(31); pdf.text(String(registration.vaga).padStart(2, '0'), rightColumnX + 18, 49);
  pdf.setDrawColor(190, 196, 205); pdf.line(rightColumnX + 7, 57, 243, 57);
  pdf.setTextColor(...navy); pdf.setFontSize(7); pdf.text('Nº DA VIAGEM', rightColumnX + 10, 67);
  pdf.setTextColor(...ink); pdf.setFontSize(13); pdf.text('19092025', rightColumnX + 10, 77);
  pdf.addImage(qrImage, 'PNG', rightColumnX + 11, 88, 40, 40);
  pdf.setTextColor(...navy); pdf.setFontSize(7); pdf.text('Apresente este bilhete', rightColumnX + 12, 136); pdf.text('no embarque', rightColumnX + 12, 141);
  pdf.setFillColor(...navy); pdf.roundedRect(rightColumnX + 5, 157, 52, 23, 3, 3, 'F');
  pdf.setTextColor(255, 255, 255); pdf.setFontSize(7); pdf.text('CONFIRA SEUS PERTENCES', rightColumnX + 10, 168); pdf.setTextColor(...yellow); pdf.text('BOA VIAGEM!', rightColumnX + 20, 176);

  pdf.save(`mega-help-26-${passengerName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.pdf`);
}

function createQrDataUrl(value) {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    try {
      new QRCode(container, {
        text: value,
        width: 220,
        height: 220,
        colorDark: '#12231f',
        colorLight: '#fffefa',
        correctLevel: QRCode.CorrectLevel ? QRCode.CorrectLevel.L : 0
      });

      const canvas = container.querySelector('canvas');
      const image = container.querySelector('img');
      if (canvas) {
        resolve(canvas.toDataURL('image/png'));
      } else if (image) {
        image.onload = () => resolve(image.src);
        image.onerror = () => reject(new Error('Não foi possível criar o QR Code'));
      } else {
        reject(new Error('QR Code não gerado'));
      }
    } finally {
      setTimeout(() => container.remove(), 0);
    }
  });
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
      <button class="ticket-btn" type="button" onclick="downloadTicket(${vaga})">Baixar bilhete PDF novamente ↓</button>
    `;
  }

  panel.classList.add('show');
}

async function downloadTicket(vaga) {
  const passenger = passengersData[vaga];
  if (!passenger) return;
  try {
    await generateTicket(passenger);
  } catch (error) {
    console.error('Erro ao gerar bilhete:', error);
    const content = document.getElementById('detailsContent');
    const errorMessage = document.createElement('p');
    errorMessage.className = 'form-message error';
    errorMessage.textContent = `Não foi possível gerar o PDF: ${error.message || 'erro desconhecido'}`;
    content.appendChild(errorMessage);
  }
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