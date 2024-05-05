import datetime
import os
import time
import random
import requests
import fpdf

# Definindo a URL base do backend
BASE_URL = "http://localhost:5000"

# Gera números aleatórios do backend
def generate_random_numbers():
    return [random.uniform(0, 30) for _ in range(30)]

def ensure_reports_directory():
    reports_dir = "reports"
    if not os.path.exists(reports_dir):
        os.makedirs(reports_dir)
    return reports_dir

# Classe para representar um usuário
class User:
    def __init__(self, userId, userName, userImg, age, contact, closeContacts, coordinates, data):
        self.userId = userId
        self.userName = userName
        self.userImg = userImg
        self.age = age
        self.contact = contact
        self.closeContacts = closeContacts
        self.coordinates = coordinates
        self.data = data

# Função para buscar dados específicos do usuário
def fetch_user_data(user_id):
    response = requests.get(f"{BASE_URL}/api/get-user-data/{user_id}")
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch user data from API: {response.status_code}")

# Função para buscar dados dos usuários
def fetch_users_data():
    response = requests.get(f"{BASE_URL}/api")
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch data from API: {response.status_code}")

# Função para converter dados JSON em objetos User
def parse_users_data(json_data):
    users = []
    for user in json_data:
        user_data = fetch_user_data(user['userId'])
        users.append(User(
            userId=user['userId'],
            userName=user['userName'],
            userImg=user['userImg'],
            age=user['age'],
            contact=user['contact'],
            closeContacts=user['closeContacts'],
            coordinates=user['coordinates'],
            data=user_data['data'] if 'data' in user_data else []
        ))
    return users

# Cria um PDF report
class PDF(fpdf.FPDF):
    def header(self):
        # Cabeçalho do documento
        self.set_font("Arial", 'B', size=16)
        current_time = datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        self.cell(0, 10, txt=f"30 Minutes Report - {current_time}", ln=True, align='C')
        self.ln(10)

    def footer(self):
        # Rodapé do documento
        self.set_y(-15)
        self.set_font("Arial", 'I', size=8)
        self.cell(0, 10, txt=f"Page {self.page_no()}", align='C')

    def add_user_info(self, user):
        # Adiciona informações do usuário ao PDF
        self.set_font("Arial", 'B', size=12)
        self.cell(0, 10, txt=f"User: {user.userName}", ln=True, align='L')
        self.set_font("Arial", size=10)
        self.cell(0, 10, txt=f"Age: {user.age}", ln=True, align='L')
        self.cell(0, 10, txt=f"Contact: {user.contact}", ln=True, align='L')
        if isinstance(user.coordinates, dict) and 'lat' in user.coordinates and 'lng' in user.coordinates:
            self.cell(0, 10, txt=f"Coordinates: {user.coordinates['lat']}, {user.coordinates['lng']}", ln=True, align='L')
        else:
            self.cell(0, 10, txt="Coordinates: Not Available", ln=True, align='L')
        self.cell(0, 10, txt=f"Close Contacts: {', '.join(user.closeContacts)}", ln=True, align='L')
        self.ln(5)

    def add_table(self, title, headers, data, col_widths):
        # Título da tabela
        self.set_font("Arial", 'B', size=12)
        self.cell(0, 10, txt=title, ln=True, align='L')
        self.ln(5)

        # Cabeçalho da tabela
        self.set_font("Arial", 'B', size=10)
        for header, width in zip(headers, col_widths):
            self.cell(width, 10, txt=header, border=1, align='C')
        self.ln()

        # Corpo da tabela
        self.set_font("Arial", size=8)
        for row in data:
            for item, width in zip(row, col_widths):
                self.cell(width, 5, txt=str(item), border=1, align='C')
            self.ln()

# Função para gerar o relatório PDF
def create_report():
    # Busca os dados dos usuários do backend
    json_data = fetch_users_data()

    # Converte os dados JSON em objetos User
    users = parse_users_data(json_data)

    # Gera números aleatórios do backend
    random_numbers = generate_random_numbers()

    # Cria uma instância do PDF e adiciona uma página
    pdf = PDF()
    pdf.add_page()

    # Adiciona os dados de cada usuário ao PDF
    for user in users:
        pdf.add_user_info(user)
        headers = ["Minutes", "Value"]
        data = [[i + 1, f"{num:.2f}"] for i, num in enumerate(random_numbers)]
        col_widths = [20, 40]
        pdf.add_table(f"BPM Data for {user.userName}", headers, data, col_widths)
        pdf.ln(10)

    # Gera um nome de arquivo único com base no timestamp
    timestamp = datetime.datetime.now().strftime("%d_%m_%Y_%H%M%S")
    reports_dir = ensure_reports_directory()
    file_name = os.path.join(reports_dir, f"Relatório_{timestamp}.pdf")

    # Salva o arquivo PDF
    pdf.output(file_name)
    print(f"Relatório gerado: {file_name}")

# Loop para gerar relatórios a cada 30 minutos
interval = 30 * 60  # 30 minutos em segundos

while True:
    create_report()
    time.sleep(interval)
