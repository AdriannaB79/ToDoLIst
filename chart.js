
    // Selecionar o canvas onde o gráfico será renderizado
    let ctx = document.getElementById('taskChart').getContext('2d');

    // Inicializar os dados do gráfico
    let data = {
        labels: ['Total Tasks', 'Completed Tasks'],
        datasets: [{
            label: 'Tasks',
            data: [0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    };
