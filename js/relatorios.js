document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar datas personalizadas
    const periodSelect = document.getElementById('report-period');
    const customDates = document.getElementById('custom-dates');
    
    periodSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customDates.style.display = 'block';
        } else {
            customDates.style.display = 'none';
        }
    });
    
    // Gerar relatório
    document.getElementById('generate-report').addEventListener('click', function() {
        // Aqui você implementaria a lógica para buscar dados reais da API
        // Por enquanto estamos usando dados fictícios
        alert('Relatório gerado para o período selecionado!');
    });
    
    // Gráfico de vendas
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Vendas diárias (R$)',
                data: [875, 1050, 1320, 1500, 1920, 1200, 585],
                backgroundColor: 'rgba(211, 84, 0, 0.2)',
                borderColor: 'rgba(211, 84, 0, 1)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de horários de pico
    const peakHoursCtx = document.getElementById('peakHoursChart').getContext('2d');
    const peakHoursChart = new Chart(peakHoursCtx, {
        type: 'bar',
        data: {
            labels: ['10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18'],
            datasets: [{
                label: 'Pedidos por horário',
                data: [12, 25, 35, 28, 15, 8, 10, 9],
                backgroundColor: 'rgba(230, 126, 34, 0.7)',
                borderColor: 'rgba(211, 84, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de métodos de pagamento
    const paymentMethodsCtx = document.getElementById('paymentMethodsChart').getContext('2d');
    const paymentMethodsChart = new Chart(paymentMethodsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Cartão', 'Dinheiro', 'PIX'],
            datasets: [{
                data: [62, 28, 10],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
});