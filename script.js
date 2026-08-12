function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('themeIcon');
    const darkToggle = document.getElementById('darkModeToggle');

    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
        if (darkToggle) darkToggle.classList.add('active');
        localStorage.setItem('theme', 'light');
    } else {
        icon.className = 'fas fa-moon';
        if (darkToggle) darkToggle.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    }
    

    updateChartColors();
}



function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('themeIcon');
    const darkToggle = document.getElementById('darkModeToggle');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (icon) icon.className = 'fas fa-sun';
        if (darkToggle) darkToggle.classList.add('active');
    } else {
        document.body.classList.remove('light-mode');
        if (icon) icon.className = 'fas fa-moon';
        if (darkToggle) darkToggle.classList.remove('active');
    }
}



function openSidebar() {
    document.getElementById('sidebar').classList.add('show');
    document.getElementById('sidebarOverlay').classList.add('show');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
}



function showPage(pageId, element) {
   
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

   
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }

    
    const pageTitles = {
        dashboard: 'Dashboard',
        products: 'Products',
        orders: 'Orders',
        customers: 'Customers',
        settings: 'Settings'
    };
    const iconMap = {
        dashboard: 'fa-th-large',
        products: 'fa-box',
        orders: 'fa-shopping-cart',
        customers: 'fa-users',
        settings: 'fa-cog'
    };
    const title = pageTitles[pageId] || 'Dashboard';
    const icon = iconMap[pageId] || 'fa-th-large';
    document.querySelector('.page-title').innerHTML = `<i class="fas ${icon}"></i> ${title}`;

    
    closeSidebar();
}



function toggleNotification() {
    const toggle = document.getElementById('notificationToggle');
    toggle.classList.toggle('active');
    
    const isEnabled = toggle.classList.contains('active');
    localStorage.setItem('notifications', isEnabled ? 'enabled' : 'disabled');
}



function loadSavedNotification() {
    const savedPref = localStorage.getItem('notifications');
    const toggle = document.getElementById('notificationToggle');
    
    if (savedPref === 'disabled') {
        toggle.classList.remove('active');
    } else {
        toggle.classList.add('active');
    }
}



function updateProfile() {
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const messageDiv = document.getElementById('profileUpdateMessage');
    

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
   
    if (name === '') {
        messageDiv.className = 'profile-update-error';
        messageDiv.textContent = '⚠️ Name cannot be empty!';
        messageDiv.style.display = 'block';
        return;
    }
    
    if (email === '' || !email.includes('@')) {
        messageDiv.className = 'profile-update-error';
        messageDiv.textContent = '⚠️ Please enter a valid email address!';
        messageDiv.style.display = 'block';
        return;
    }
    

    const sidebarName = document.querySelector('.sidebar-footer .profile-name');
    if (sidebarName) {
        sidebarName.textContent = name;
    }
    

    const avatar = document.querySelector('.sidebar-footer .profile-avatar');
    if (avatar) {
        avatar.textContent = name.charAt(0).toUpperCase();
    }

    
    messageDiv.className = 'profile-update-success';
    messageDiv.textContent = '✅ Profile updated successfully!';
    messageDiv.style.display = 'block';
    
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}



let productsData = [
    { id: 1, name: "Wireless Headphones", price: 89.99, category: "Electronics" },
    { id: 2, name: "Smart Watch Series 5", price: 159.99, category: "Electronics" },
    { id: 3, name: "Cotton T-Shirt", price: 19.99, category: "Fashion" },
    { id: 4, name: "Running Shoes", price: 69.99, category: "Sports" },
    { id: 5, name: "Travel Backpack", price: 49.99, category: "Fashion" },
    { id: 6, name: "Bluetooth Speaker", price: 39.99, category: "Electronics" },
    { id: 7, name: "Face Cream", price: 24.99, category: "Beauty" },
    { id: 8, name: "Desk Lamp", price: 34.99, category: "Home & Living" }
];



function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';

    productsData.forEach(product => {
        grid.innerHTML += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="product-card">
                    <div class="product-icon"><i class="fas fa-box"></i></div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-category">${product.category}</div>
                </div>
            </div>
        `;
    });
}


function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-box-open" style="font-size: 48px; color: #5a6488;"></i>
                <p class="text-muted mt-3">No products found</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        grid.innerHTML += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="product-card">
                    <div class="product-icon"><i class="fas fa-box"></i></div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-category">${product.category}</div>
                </div>
            </div>
        `;
    });
}



function addProduct() {
    
    const nameInput = document.getElementById('newProductName');
    const priceInput = document.getElementById('newProductPrice');
    const categorySelect = document.getElementById('newProductCategory');
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const category = categorySelect.value;
    

    if (name === '') {
        alert('⚠️ Please enter a product name!');
        nameInput.focus();
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        alert('⚠️ Please enter a valid price!');
        priceInput.focus();
        return;
    }
    
   
    const newProduct = {
        id: productsData.length + 1,
        name: name,
        price: price,
        category: category
    };
    
  
    productsData.push(newProduct);
    
    
    renderProducts();
    
    updateDashboardStats();
    
    
    nameInput.value = '';
    priceInput.value = '';
    categorySelect.value = 'Electronics';
    
    
    const modal = document.getElementById('addProductModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
        modalInstance.hide();
    }
    

    alert('✅ Product "' + name + '" added successfully!');
}



const ordersData = [
    { id: "ORD-001", customer: "John Doe", email: "john@email.com", date: "2025-05-31", amount: 250.00, status: "Delivered" },
    { id: "ORD-002", customer: "Sarah Smith", email: "sarah@email.com", date: "2025-05-30", amount: 150.00, status: "Processing" },
    { id: "ORD-003", customer: "Mike Johnson", email: "mike@email.com", date: "2025-05-29", amount: 320.00, status: "Shipped" },
    { id: "ORD-004", customer: "Emily Davis", email: "emily@email.com", date: "2025-05-28", amount: 180.00, status: "Cancelled" },
    { id: "ORD-005", customer: "David Wilson", email: "david@email.com", date: "2025-05-27", amount: 275.00, status: "Delivered" },
    { id: "ORD-006", customer: "Lisa Taylor", email: "lisa@email.com", date: "2025-05-26", amount: 95.00, status: "Processing" },
    { id: "ORD-007", customer: "Robert Brown", email: "robert@email.com", date: "2025-05-25", amount: 210.00, status: "Shipped" },
    { id: "ORD-008", customer: "Amanda Lee", email: "amanda@email.com", date: "2025-05-24", amount: 130.00, status: "Delivered" }
];



function renderOrders() {
    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    ordersData.forEach(order => {
        let statusClass = '';
        switch(order.status.toLowerCase()) {
            case 'delivered':
                statusClass = 'badge-delivered';
                break;
            case 'processing':
                statusClass = 'badge-processing';
                break;
            case 'shipped':
                statusClass = 'badge-shipped';
                break;
            case 'cancelled':
                statusClass = 'badge-cancelled';
                break;
            default:
                statusClass = 'badge-processing';
        }

        tableBody.innerHTML += `
            <tr>
                <td><strong>#${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.email}</td>
                <td>${order.date}</td>
                <td>$${order.amount.toFixed(2)}</td>
                <td><span class="badge-status ${statusClass}">${order.status}</span></td>
            </tr>
        `;
    });
}



const customersData = [
    { name: "John Doe", email: "john@email.com", phone: "+1 234 567 8901", orders: 5 },
    { name: "Sarah Smith", email: "sarah@email.com", phone: "+1 234 567 8902", orders: 3 },
    { name: "Mike Johnson", email: "mike@email.com", phone: "+1 234 567 8903", orders: 4 },
    { name: "Emily Davis", email: "emily@email.com", phone: "+1 234 567 8904", orders: 2 },
    { name: "David Wilson", email: "david@email.com", phone: "+1 234 567 8905", orders: 3 },
    { name: "Lisa Taylor", email: "lisa@email.com", phone: "+1 234 567 8906", orders: 6 }
];


function renderCustomers() {
    const tableBody = document.getElementById('customersTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    customersData.forEach(customer => {
        tableBody.innerHTML += `
            <tr>
                <td><strong>${customer.name}</strong></td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.orders}</td>
            </tr>
        `;
    });
}



function updateDashboardStats() {
    const totalSales = ordersData.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = ordersData.length;
    const totalCustomers = customersData.length;
    const totalProducts = productsData.length;

    const statNumbers = document.querySelectorAll('.stat-card .stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = '$' + totalSales.toLocaleString();
        statNumbers[1].textContent = totalOrders;
        statNumbers[2].textContent = totalCustomers;
        statNumbers[3].textContent = totalProducts;
    }
}



function renderRecentOrders() {
    let recentContainer = document.getElementById('recentOrdersContainer');
    
    if (!recentContainer) {
        const dashboardPage = document.getElementById('page-dashboard');
        if (!dashboardPage) return;
        
        const recentOrdersHTML = `
            <div class="row g-4 mt-4" id="recentOrdersContainer">
                <div class="col-12">
                    <div class="card recent-orders-card">
                        <div class="card-header">
                            <i class="fas fa-clock me-2 text-primary"></i> Recent Orders
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="recentOrdersTableBody">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        dashboardPage.insertAdjacentHTML('beforeend', recentOrdersHTML);
        recentContainer = document.getElementById('recentOrdersContainer');
    }

    const tableBody = document.getElementById('recentOrdersTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const recentOrders = ordersData.slice(0, 5);
    recentOrders.forEach(order => {
        let statusClass = '';
        switch(order.status.toLowerCase()) {
            case 'delivered':
                statusClass = 'badge-delivered';
                break;
            case 'processing':
                statusClass = 'badge-processing';
                break;
            case 'shipped':
                statusClass = 'badge-shipped';
                break;
            case 'cancelled':
                statusClass = 'badge-cancelled';
                break;
            default:
                statusClass = 'badge-processing';
        }

        tableBody.innerHTML += `
            <tr>
                <td><strong>#${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>$${order.amount.toFixed(2)}</td>
                <td><span class="badge-status ${statusClass}">${order.status}</span></td>
            </tr>
        `;
    });
}


const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [12000, 15000, 18000, 22000, 28000, 35000, 42000, 48000, 52000, 58000, 62000, 68000]
};


let salesChart = null;

function createSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    const isLight = document.body.classList.contains('light-mode');
    const gridColor = isLight ? '#e2e6ee' : '#1e2440';
    const textColor = isLight ? '#6c7a8a' : '#5a6488';
    
    if (salesChart) {
        salesChart.destroy();
    }
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.labels,
            datasets: [{
                label: 'Sales',
                data: salesData.values,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#0d6efd',
                pointBorderColor: '#0d6efd',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: textColor,
                        font: {
                            size: 13
                        }
                    }
                },
                tooltip: {
                    backgroundColor: isLight ? '#ffffff' : '#0f1429',
                    titleColor: isLight ? '#1a1a2e' : '#e8edf5',
                    bodyColor: isLight ? '#1a1a2e' : '#e8edf5',
                    borderColor: isLight ? '#e2e6ee' : '#1e2440',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}



function updateChartColors() {
    if (salesChart) {
        const isLight = document.body.classList.contains('light-mode');
        const gridColor = isLight ? '#e2e6ee' : '#1e2440';
        const textColor = isLight ? '#6c7a8a' : '#5a6488';
        
        salesChart.options.scales.x.grid.color = gridColor;
        salesChart.options.scales.x.ticks.color = textColor;
        salesChart.options.scales.y.grid.color = gridColor;
        salesChart.options.scales.y.ticks.color = textColor;
        
        salesChart.options.plugins.legend.labels.color = textColor;
        salesChart.options.plugins.tooltip.backgroundColor = isLight ? '#ffffff' : '#0f1429';
        salesChart.options.plugins.tooltip.titleColor = isLight ? '#1a1a2e' : '#e8edf5';
        salesChart.options.plugins.tooltip.bodyColor = isLight ? '#1a1a2e' : '#e8edf5';
        salesChart.options.plugins.tooltip.borderColor = isLight ? '#e2e6ee' : '#1e2440';
        
        salesChart.update();
    }
}



const topProductsData = [
    { name: "Wireless Headphones", price: 89.99, sales: 245, category: "Electronics" },
    { name: "Smart Watch Series 5", price: 159.99, sales: 189, category: "Electronics" },
    { name: "Travel Backpack", price: 49.99, sales: 156, category: "Fashion" },
    { name: "Running Shoes", price: 69.99, sales: 134, category: "Sports" },
    { name: "Bluetooth Speaker", price: 39.99, sales: 112, category: "Electronics" }
];



function renderTopProducts() {
    let topContainer = document.getElementById('topProductsContainer');
    
    if (!topContainer) {
        const dashboardPage = document.getElementById('page-dashboard');
        if (!dashboardPage) return;
        
        const topProductsHTML = `
            <div class="row g-4 mt-4" id="topProductsContainer">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-crown me-2 text-warning"></i> Top Selling Products
                        </div>
                        <div class="card-body" id="topProductsList">
                            <!-- Top products will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        dashboardPage.insertAdjacentHTML('beforeend', topProductsHTML);
        topContainer = document.getElementById('topProductsContainer');
    }

    const listContainer = document.getElementById('topProductsList');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    topProductsData.forEach((product, index) => {
        const rank = index + 1;
        let rankClass = '';
        let medalIcon = '';
        
        if (rank === 1) {
            rankClass = 'text-warning';
            medalIcon = '🥇';
        } else if (rank === 2) {
            rankClass = 'text-secondary';
            medalIcon = '🥈';
        } else if (rank === 3) {
            rankClass = 'text-danger';
            medalIcon = '🥉';
        } else {
            rankClass = 'text-muted';
            medalIcon = `#${rank}`;
        }
        
        listContainer.innerHTML += `
            <div class="top-product-item">
                <div class="top-product-rank ${rankClass}">${medalIcon}</div>
                <div class="top-product-info">
                    <div class="top-product-name">${product.name}</div>
                    <div class="top-product-category">${product.category}</div>
                </div>
                <div class="top-product-sales">
                    <div class="top-product-price">$${product.price.toFixed(2)}</div>
                    <div class="top-product-count">${product.sales} sales</div>
                </div>
            </div>
        `;
    });
}



document.addEventListener('DOMContentLoaded', function() {
  
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    const dashboardPage = document.getElementById('page-dashboard');
    if (dashboardPage) {
        dashboardPage.classList.add('active');
    }

   
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const dashboardLink = document.querySelector('.sidebar .nav-link[data-page="dashboard"]');
    if (dashboardLink) {
        dashboardLink.classList.add('active');
    }

  
    loadSavedTheme();
    
    loadSavedNotification();

    
    renderProducts();
    
    renderOrders();
    

    renderCustomers();

    updateDashboardStats();
    
    renderRecentOrders();
    
    createSalesChart();
    
    
    renderTopProducts();
});

console.log('🚀 SmartShop Dashboard loaded successfully!');
console.log('📊 Module 4 - Day 1 Complete! Add Product functionality added!');
