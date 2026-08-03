// ================================================================
// THEME TOGGLE (Dark/Light)
// ================================================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('.top-navbar .nav-icons i:first-child');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ================================================================
// SIDEBAR TOGGLE FUNCTIONS (Mobile)
// ================================================================

function openSidebar() {
    document.getElementById('sidebar').classList.add('show');
    document.getElementById('sidebarOverlay').classList.add('show');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
}

// ================================================================
// PAGE NAVIGATION
// ================================================================

function showPage(pageId, element) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }

    // Update page title in navbar
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

    // Close sidebar on mobile
    closeSidebar();
}

// ================================================================
// NOTIFICATION TOGGLE
// ================================================================

function toggleNotification() {
    const toggle = document.getElementById('notificationToggle');
    toggle.classList.toggle('active');
}

// ================================================================
// PRODUCT DATA (8 Products)
// ================================================================

const productsData = [
    { id: 1, name: "Wireless Headphones", price: 89.99, category: "Electronics" },
    { id: 2, name: "Smart Watch Series 5", price: 159.99, category: "Electronics" },
    { id: 3, name: "Cotton T-Shirt", price: 19.99, category: "Fashion" },
    { id: 4, name: "Running Shoes", price: 69.99, category: "Sports" },
    { id: 5, name: "Travel Backpack", price: 49.99, category: "Fashion" },
    { id: 6, name: "Bluetooth Speaker", price: 39.99, category: "Electronics" },
    { id: 7, name: "Face Cream", price: 24.99, category: "Beauty" },
    { id: 8, name: "Desk Lamp", price: 34.99, category: "Home & Living" }
];

// ================================================================
// RENDER PRODUCTS
// ================================================================

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

// ================================================================
// FILTER PRODUCTS (Search + Category)
// ================================================================

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

// ================================================================
// ORDERS DATA (8 Orders)
// ================================================================

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

// ================================================================
// RENDER ORDERS
// ================================================================

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

// ================================================================
// CUSTOMER DATA (6 Customers) - MODULE 3 DAY 1
// ================================================================

const customersData = [
    { name: "John Doe", email: "john@email.com", phone: "+1 234 567 8901", orders: 5 },
    { name: "Sarah Smith", email: "sarah@email.com", phone: "+1 234 567 8902", orders: 3 },
    { name: "Mike Johnson", email: "mike@email.com", phone: "+1 234 567 8903", orders: 4 },
    { name: "Emily Davis", email: "emily@email.com", phone: "+1 234 567 8904", orders: 2 },
    { name: "David Wilson", email: "david@email.com", phone: "+1 234 567 8905", orders: 3 },
    { name: "Lisa Taylor", email: "lisa@email.com", phone: "+1 234 567 8906", orders: 6 }
];

// ================================================================
// RENDER CUSTOMERS - MODULE 3 DAY 1
// ================================================================

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

// ================================================================
// UPDATE DASHBOARD STATS
// ================================================================

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

// ================================================================
// RENDER RECENT ORDERS ON DASHBOARD
// ================================================================

function renderRecentOrders() {
    let recentContainer = document.getElementById('recentOrdersContainer');
    
    if (!recentContainer) {
        const dashboardPage = document.getElementById('page-dashboard');
        if (!dashboardPage) return;
        
        const recentOrdersHTML = `
            <div class="row g-4 mt-4" id="recentOrdersContainer">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">Recent Orders</div>
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

// ================================================================
// INITIALIZE
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard page
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    const dashboardPage = document.getElementById('page-dashboard');
    if (dashboardPage) {
        dashboardPage.classList.add('active');
    }

    // Set dashboard link as active
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const dashboardLink = document.querySelector('.sidebar .nav-link[data-page="dashboard"]');
    if (dashboardLink) {
        dashboardLink.classList.add('active');
    }

    // Set dark mode toggle to inactive by default
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
        darkToggle.classList.remove('active');
    }

    // Load products
    renderProducts();
    
    // Load orders
    renderOrders();
    
    // Load customers - MODULE 3 DAY 1
    renderCustomers();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Render recent orders on dashboard
    renderRecentOrders();
});

console.log('🚀 SmartShop Dashboard loaded successfully!');
console.log('📊 Module 3 - Day 1 Complete! Customer data added!');