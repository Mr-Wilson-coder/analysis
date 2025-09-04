// Search data
const searchData = [
    { rank: 1, keyword: "search-keyword-0", users: 9, weeklyRange: 64, trend: "down" },
    { rank: 2, keyword: "search-keyword-1", users: 268, weeklyRange: 99, trend: "up" },
    { rank: 3, keyword: "search-keyword-2", users: 526, weeklyRange: 63, trend: "up" },
    { rank: 4, keyword: "search-keyword-3", users: 21, weeklyRange: 76, trend: "down" },
    { rank: 5, keyword: "search-keyword-4", users: 83, weeklyRange: 27, trend: "up" },
    { rank: 6, keyword: "search-keyword-5", users: 156, weeklyRange: 45, trend: "down" },
    { rank: 7, keyword: "search-keyword-6", users: 234, weeklyRange: 78, trend: "up" },
    { rank: 8, keyword: "search-keyword-7", users: 91, weeklyRange: 52, trend: "down" },
    { rank: 9, keyword: "search-keyword-8", users: 67, weeklyRange: 89, trend: "up" },
    { rank: 10, keyword: "search-keyword-9", users: 445, weeklyRange: 34, trend: "down" }
];

// Sales data by tab
const salesDataByTab = {
    ALL: [
        { category: "Home Appliances", percentage: 21.24, value: 244, color: "#3b82f6" },
        { category: "Beverages", percentage: 27.94, value: 321, color: "#10b981" },
        { category: "Personal Health", percentage: 27.07, value: 311, color: "#8b5cf6" },
        { category: "Accessories & Bags", percentage: 3.57, value: 41, color: "#f59e0b" },
        { category: "Mother & Baby Products", percentage: 10.53, value: 121, color: "#ef4444" },
        { category: "Others", percentage: 9.66, value: 111, color: "#06b6d4" }
    ],
    Online: [
        { category: "Home Appliances", percentage: 25.24, value: 290, color: "#3b82f6" },
        { category: "Beverages", percentage: 22.94, value: 264, color: "#10b981" },
        { category: "Personal Health", percentage: 31.07, value: 357, color: "#8b5cf6" },
        { category: "Accessories & Bags", percentage: 5.57, value: 64, color: "#f59e0b" },
        { category: "Mother & Baby Products", percentage: 8.53, value: 98, color: "#ef4444" },
        { category: "Others", percentage: 6.66, value: 77, color: "#06b6d4" }
    ],
    Stores: [
        { category: "Home Appliances", percentage: 18.24, value: 210, color: "#3b82f6" },
        { category: "Beverages", percentage: 32.94, value: 379, color: "#10b981" },
        { category: "Personal Health", percentage: 23.07, value: 265, color: "#8b5cf6" },
        { category: "Accessories & Bags", percentage: 2.57, value: 30, color: "#f59e0b" },
        { category: "Mother & Baby Products", percentage: 12.53, value: 144, color: "#ef4444" },
        { category: "Others", percentage: 10.66, value: 123, color: "#06b6d4" }
    ]
};

// Pagination state
let currentPage = 1;
const itemsPerPage = 5;
const totalPages = Math.ceil(searchData.length / itemsPerPage);

// Current tab state
let activeTab = 'ALL';

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderSearchTable();
    renderPagination();
    renderSalesChart();
    renderSalesLegend();
});

// Search table functions
function renderSearchTable() {
    const tbody = document.getElementById('search-table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = searchData.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    currentData.forEach(item => {
        const row = document.createElement('tr');
        
        const trendIcon = item.trend === 'up' 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline><polyline points="16,7 22,7 22,13"></polyline></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,17 13.5,8.5 8.5,13.5 2,7"></polyline><polyline points="16,17 22,17 22,11"></polyline></svg>';
        
        row.innerHTML = `
            <td class="rank-cell">${item.rank}</td>
            <td>${item.keyword}</td>
            <td>${item.users}</td>
            <td>
                <div class="trend-cell ${item.trend}">
                    <span>${item.weeklyRange}%</span>
                    ${trendIcon}
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Update pagination info
    const totalItems = searchData.length;
    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, totalItems);
    document.getElementById('pagination-info').textContent = `${startItem} - ${endItem} of ${totalItems}`;
}

function renderPagination() {
    const pageButtonsContainer = document.getElementById('page-buttons');
    pageButtonsContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        button.textContent = i;
        button.onclick = () => goToPage(i);
        pageButtonsContainer.appendChild(button);
    }
    
    // Update prev/next button states
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        goToPage(newPage);
    }
}

function goToPage(page) {
    currentPage = page;
    renderSearchTable();
    renderPagination();
}

// Sales chart functions
function renderSalesChart() {
    const currentData = salesDataByTab[activeTab];
    const svg = document.getElementById('donut-chart');
    const size = 200;
    const strokeWidth = 30;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;
    
    svg.innerHTML = '';
    
    // Background circle
    const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    backgroundCircle.setAttribute('cx', center);
    backgroundCircle.setAttribute('cy', center);
    backgroundCircle.setAttribute('r', radius);
    backgroundCircle.setAttribute('fill', 'none');
    backgroundCircle.setAttribute('stroke', '#f3f4f6');
    backgroundCircle.setAttribute('stroke-width', strokeWidth);
    svg.appendChild(backgroundCircle);
    
    let cumulativePercentage = 0;
    
    // Data segments
    currentData.forEach(item => {
        const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
        const strokeDashoffset = -cumulativePercentage * circumference / 100;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', center);
        circle.setAttribute('cy', center);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', item.color);
        circle.setAttribute('stroke-width', strokeWidth);
        circle.setAttribute('stroke-dasharray', strokeDasharray);
        circle.setAttribute('stroke-dashoffset', strokeDashoffset);
        circle.setAttribute('stroke-linecap', 'round');
        circle.style.transition = 'all 0.3s ease';
        
        svg.appendChild(circle);
        
        cumulativePercentage += item.percentage;
    });
    
    // Update total
    const total = currentData.reduce((sum, item) => sum + item.value, 0);
    document.getElementById('chart-total').textContent = total;
}

function renderSalesLegend() {
    const currentData = salesDataByTab[activeTab];
    const legend = document.getElementById('sales-legend');
    
    legend.innerHTML = '';
    
    currentData.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        legendItem.innerHTML = `
            <div class="legend-category">
                <div class="legend-color" style="background-color: ${item.color}"></div>
                <span class="legend-name">${item.category}</span>
            </div>
            <div class="legend-values">
                <span class="legend-percentage">${item.percentage}%</span>
                <span class="legend-value">¥${item.value}.00</span>
            </div>
        `;
        
        legend.appendChild(legendItem);
    });
}

function switchTab(tab) {
    // Update active tab
    activeTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        }
    });
    
    // Re-render chart and legend
    renderSalesChart();
    renderSalesLegend();
}