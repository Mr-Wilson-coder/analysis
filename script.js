// Dashboard JavaScript for Admin Panel
class AdminDashboard {
    constructor() {
        this.currentTab = 'sales';
        this.currentPeriod = 'day';
        this.charts = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.initializeCircularProgress();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Time period switching
        document.querySelectorAll('.time-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                this.switchTimePeriod(period);
            });
        });
    }

    switchTab(tab) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}-content`).classList.add('active');

        this.currentTab = tab;
        this.updateCharts();
    }

    switchTimePeriod(period) {
        // Remove active class from all time buttons
        document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected button
        document.querySelector(`[data-period="${period}"]`).classList.add('active');

        this.currentPeriod = period;
        this.updateCharts();
    }

    getDataForPeriod(period, type) {
        const salesData = {
            day: [
                { label: 'Jan', value: 750 },
                { label: 'Feb', value: 1100 },
                { label: 'Mar', value: 300 },
                { label: 'Apr', value: 980 },
                { label: 'May', value: 600 },
                { label: 'Jun', value: 250 },
                { label: 'Jul', value: 850 },
                { label: 'Aug', value: 200 },
                { label: 'Sep', value: 300 },
                { label: 'Oct', value: 950 },
                { label: 'Nov', value: 650 },
                { label: 'Dec', value: 250 }
            ],
            week: [
                { label: 'Week 1', value: 2800 },
                { label: 'Week 2', value: 3200 },
                { label: 'Week 3', value: 2100 },
                { label: 'Week 4', value: 2950 },
                { label: 'Week 5', value: 3400 },
                { label: 'Week 6', value: 2650 },
                { label: 'Week 7', value: 3100 },
                { label: 'Week 8', value: 2850 }
            ],
            month: [
                { label: 'Q1', value: 8500 },
                { label: 'Q2', value: 12200 },
                { label: 'Q3', value: 9800 },
                { label: 'Q4', value: 15600 }
            ],
            year: [
                { label: '2020', value: 45000 },
                { label: '2021', value: 52000 },
                { label: '2022', value: 48000 },
                { label: '2023', value: 58000 },
                { label: '2024', value: 62000 }
            ]
        };

        const visitsData = {
            day: [
                { label: 'Jan', value: 450 },
                { label: 'Feb', value: 680 },
                { label: 'Mar', value: 320 },
                { label: 'Apr', value: 590 },
                { label: 'May', value: 420 },
                { label: 'Jun', value: 380 },
                { label: 'Jul', value: 520 },
                { label: 'Aug', value: 290 },
                { label: 'Sep', value: 410 },
                { label: 'Oct', value: 640 },
                { label: 'Nov', value: 480 },
                { label: 'Dec', value: 350 }
            ],
            week: [
                { label: 'Week 1', value: 1680 },
                { label: 'Week 2', value: 1920 },
                { label: 'Week 3', value: 1460 },
                { label: 'Week 4', value: 1750 },
                { label: 'Week 5', value: 2040 },
                { label: 'Week 6', value: 1590 },
                { label: 'Week 7', value: 1860 },
                { label: 'Week 8', value: 1710 }
            ],
            month: [
                { label: 'Q1', value: 5100 },
                { label: 'Q2', value: 7320 },
                { label: 'Q3', value: 5880 },
                { label: 'Q4', value: 9360 }
            ],
            year: [
                { label: '2020', value: 27000 },
                { label: '2021', value: 31200 },
                { label: '2022', value: 28800 },
                { label: '2023', value: 34800 },
                { label: '2024', value: 37200 }
            ]
        };

        return type === 'sales' ? salesData[period] : visitsData[period];
    }

    initializeCharts() {
        // Sales Chart
        this.createBarChart('salesChart', this.getDataForPeriod('day', 'sales'));
        
        // Visits Chart
        this.createBarChart('visitsChart', this.getDataForPeriod('day', 'visits'));
        
        // Traffic & Payments Charts
        this.createLineChart('trafficChart');
        this.createLineChart('trafficChart2');
    }

    createBarChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    borderWidth: 0,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    y: {
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b'
                        },
                        beginAtZero: true
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 4
                    }
                }
            }
        });
    }

    createLineChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const trafficData = [
            { time: '00:00', traffic: 85, payments: 75 },
            { time: '00:30', traffic: 45, payments: 25 },
            { time: '01:00', traffic: 35, payments: 78 },
            { time: '01:30', traffic: 85, payments: 48 },
            { time: '02:00', traffic: 25, payments: 65 },
            { time: '02:30', traffic: 15, payments: 45 },
            { time: '03:00', traffic: 35, payments: 105 },
            { time: '03:30', traffic: 75, payments: 65 },
            { time: '04:00', traffic: 85, payments: 45 },
            { time: '04:30', traffic: 95, payments: 25 },
            { time: '05:00', traffic: 20, payments: 95 },
            { time: '05:30', traffic: 50, payments: 78 },
            { time: '06:00', traffic: 80, payments: 85 },
            { time: '06:30', traffic: 60, payments: 20 },
            { time: '07:00', traffic: 45, payments: 95 },
            { time: '07:30', traffic: 75, payments: 15 }
        ];

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trafficData.map(item => item.time),
                datasets: [
                    {
                        label: 'Traffic',
                        data: trafficData.map(item => item.traffic),
                        borderColor: '#3b82f6',
                        backgroundColor: '#3b82f6',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Payments',
                        data: trafficData.map(item => item.payments),
                        borderColor: '#10b981',
                        backgroundColor: '#10b981',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    y: {
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b'
                        },
                        beginAtZero: true,
                        max: 110
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    updateCharts() {
        // Update main chart based on current tab and period
        const chartId = this.currentTab === 'sales' ? 'salesChart' : 'visitsChart';
        const data = this.getDataForPeriod(this.currentPeriod, this.currentTab);
        
        if (this.charts[chartId]) {
            this.charts[chartId].data.labels = data.map(item => item.label);
            this.charts[chartId].data.datasets[0].data = data.map(item => item.value);
            this.charts[chartId].update('active');
        }
    }

    initializeCircularProgress() {
        document.querySelectorAll('.circular-progress').forEach(progress => {
            const percentage = parseInt(progress.dataset.percentage);
            const circle = progress.querySelector('.progress-ring-fill');
            const circumference = 2 * Math.PI * 40; // radius = 40
            const offset = circumference - (percentage / 100) * circumference;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
            
            // Add animation class after a short delay
            setTimeout(() => {
                progress.classList.add('animate');
            }, 100);
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});ss