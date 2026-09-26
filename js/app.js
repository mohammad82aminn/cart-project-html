const products = [
    { id: 1, name: 'گوشی موبایل پرشا ۱۵', category: 'electronics', price: 45900000, image: 'phone', rating: 4.8, sold: 1250 },
    { id: 2, name: 'لپ‌تاپ آسوس روگ', category: 'electronics', price: 89900000, image: 'laptop', rating: 4.9, sold: 830 },
    { id: 3, name: 'هدفون بلوتوث سونی', category: 'electronics', price: 12500000, image: 'headphones', rating: 4.7, sold: 2100 },
    { id: 4, name: 'ساعت هوشمند اپل', category: 'electronics', price: 18900000, image: 'watch', rating: 4.8, sold: 960 },
    { id: 5, name: 'کیف دوچرخه مدرن', category: 'accessories', price: 3200000, image: 'bag', rating: 4.5, sold: 540 },
    { id: 6, name: 'عینک آفتابی فریری', category: 'accessories', price: 4800000, image: 'glasses', rating: 4.6, sold: 720 },
    { id: 7, name: 'کوله‌پشتی گرافیتی', category: 'accessories', price: 2900000, image: 'backpack', rating: 4.4, sold: 380 },
    { id: 8, name: 'تی‌شرت اسپرت نایکی', category: 'clothing', price: 2400000, image: 'tshirt', rating: 4.3, sold: 1500 },
    { id: 9, name: 'شلوار جین دنیم', category: 'clothing', price: 5600000, image: 'jeans', rating: 4.5, sold: 920 },
    { id: 10, name: 'کت پشمی کوردی', category: 'clothing', price: 12800000, image: 'jacket', rating: 4.7, sold: 450 },
    { id: 11, name: 'کفش ورزشی نیکی', category: 'clothing', price: 7800000, image: 'shoes', rating: 4.6, sold: 1100 },
    { id: 12, name: 'مبلمان مینیمال سفید', category: 'home', price: 15900000, image: 'furniture', rating: 4.8, sold: 230 },
    { id: 13, name: 'گلدان سرامیکی دست‌ساز', category: 'home', price: 1800000, image: 'pot', rating: 4.4, sold: 670 },
    { id: 14, name: 'شمعدان طلاکاری', category: 'home', price: 4200000, image: 'candle', rating: 4.5, sold: 410 },
    { id: 15, name: 'کنسول تلویزیون چوبی', category: 'home', price: 6700000, image: 'tvstand', rating: 4.3, sold: 190 },
    { id: 16, name: 'بلوتوث اسپیکر JBL', category: 'electronics', price: 8900000, image: 'speaker', rating: 4.7, sold: 1400 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentPage = 'products';
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

const sampleReviews = [
    { productId: 1, name: 'علی احمدی', rating: 5, text: 'عالیه، کیفیت خیلی خوبی داره. به طرز خلاقانه بسته‌بندی شده', date: '1404/08/15' },
    { productId: 1, name: 'مریم رضایی', rating: 4, text: 'جنس خوب، اما کمی کندتر از انتظار رسید', date: '1404/08/10' },
    { productId: 2, name: 'حسین کریمی', rating: 5, text: 'بهترین لپ‌تاپی که خریدم، سرعت فوق‌العاده‌ست', date: '1404/08/05' },
    { productId: 3, name: 'زهرا محمدی', rating: 4, text: 'صداش خوبه ولی کمی سنگینه', date: '1404/08/01' },
    { productId: 5, name: 'سارا نوری', rating: 5, text: 'چینی و شیک، برای راه‌اندازی عالیه', date: '1404/07/28' },
    { productId: 8, name: 'امیر حسینی', rating: 3, text: 'عمومیه، اما برای قیمتش قابل قبوله', date: '1404/07/25' },
    { productId: 11, name: 'فاطمه موسوی', rating: 5, text: 'خیلی راحت و سبکه، حتی بلد راه میرم', date: '1404/07/20' },
    { productId: 12, name: 'رضا افشار', rating: 4, text: 'طراحی شیک و ساده، برای خونه‌ی کوچک عالیه', date: '1404/07/15' },
];

function initReviews() {
    const existingCount = reviews.length;
    if (existingCount === 0) {
        reviews = [...sampleReviews];
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }
}

function getProductReviews(productId) {
    return reviews.filter(r => r.productId === productId);
}

function getAverageRating(productId) {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return null;
    const sum = productReviews.reduce((s, r) => s + r.rating, 0);
    return (sum / productReviews.length).toFixed(1);
}

function getReviewCount(productId) {
    return getProductReviews(productId).length;
}

function addReview(productId, name, rating, text) {
    const review = {
        productId,
        name,
        rating,
        text,
        date: new Date().toLocaleDateString('fa-IR')
    };
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    return review;
}

function renderStars(rating, size = 'text-sm') {
    let html = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
        html += `<i class="fas fa-star text-yellow-400"></i>`;
    }
    if (halfStar) {
        html += `<i class="fas fa-star-half-alt text-yellow-400"></i>`;
    }
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        html += `<i class="far fa-star text-gray-600"></i>`;
    }
    return html;
}

document.addEventListener('DOMContentLoaded', () => {
    initReviews();
    hideLoader();
    setTimeout(() => {
        checkAuth();
        renderProducts();
        updateCartBadge();
    }, 800);
});

function hideLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.3s ease';
        setTimeout(() => loader.classList.add('hidden'), 300);
    }, 800);
}

function checkAuth() {
    if (!isLoggedIn) {
        document.querySelectorAll('[id^="page-"]').forEach(p => {
            p.classList.add('hidden');
            p.classList.remove('animate-fade-in-up');
        });
        document.getElementById('page-login').classList.remove('hidden');
        document.getElementById('page-login').classList.add('animate-fade-in-up');
        document.getElementById('nav-auth').classList.add('hidden');
    } else {
        switchPage('products');
        updateAuthUI();
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (!email || !password) {
        showToast('لطفاً تمام فیلدها را پر کنید');
        return;
    }
    
    if (password.length < 4) {
        showToast('رمز عبور باید حداقل ۴ کاراکتر باشد');
        return;
    }
    
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    updateAuthUI();
    switchPage('products');
    showToast('ورود با موفقیت انجام شد');
}

function handleLogout() {
    if (!isLoggedIn) return;
    document.getElementById('logout-modal').classList.remove('hidden');
}

function closeLogoutModal() {
    document.getElementById('logout-modal').classList.add('hidden');
}

function confirmLogout() {
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    closeLogoutModal();
    document.getElementById('nav-auth').classList.add('hidden');
    document.querySelectorAll('[id^="page-"]').forEach(p => {
        p.classList.add('hidden');
        p.classList.remove('animate-fade-in-up');
    });
    document.getElementById('page-login').classList.remove('hidden');
    document.getElementById('page-login').classList.add('animate-fade-in-up');
    showToast('خروج با موفقیت انجام شد');
}

function updateAuthUI() {
    if (isLoggedIn) {
        document.getElementById('nav-user-btn').classList.add('hidden');
        document.getElementById('nav-logout-btn').classList.remove('hidden');
    } else {
        document.getElementById('nav-user-btn').classList.remove('hidden');
        document.getElementById('nav-logout-btn').classList.add('hidden');
    }
}

function switchPage(page) {
    const protectedPages = ['cart', 'checkout', 'success'];
    if (protectedPages.includes(page) && !isLoggedIn) {
        switchPage('login');
        showToast('برای ادامه ابتدا وارد شوید');
        return;
    }
    
    document.querySelectorAll('[id^="page-"]').forEach(p => {
        p.classList.add('hidden');
        p.classList.remove('animate-fade-in-up');
    });
    const targetPage = document.getElementById(`page-${page}`);
    targetPage.classList.remove('hidden');
    targetPage.classList.add('animate-fade-in-up');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('text-white', 'bg-white/10'));
    if (page === 'products') {
        document.getElementById('nav-products').classList.add('text-white', 'bg-white/10');
    } else if (page === 'cart') {
        document.getElementById('nav-cart').classList.add('text-white', 'bg-white/10');
    }
    
    currentPage = page;
    
    if (page === 'cart') renderCart();
    if (page === 'checkout') renderCheckoutItems();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filtered = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
    
    grid.innerHTML = filtered.map((product, index) => {
        const avgRating = getAverageRating(product.id);
        const reviewCount = getReviewCount(product.id);
        const displayRating = avgRating || product.rating;
        return `
        <div class="product-card stagger-item bg-gray-900 rounded-3xl overflow-hidden border border-white/5 group" style="animation-delay: ${index * 0.05}s">
            <div class="relative overflow-hidden img-placeholder h-56 flex items-center justify-center cursor-pointer" onclick="openReviews(${product.id})">
                <div class="w-32 h-32 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <i class="fas fa-${getProductIcon(product.image)} text-5xl text-gray-600 group-hover:text-brand-400 transition-colors duration-300"></i>
                </div>
                <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    <i class="fas fa-star text-yellow-400"></i> ${displayRating}
                </div>
                <div class="absolute top-3 left-3 bg-brand-500/90 text-white text-xs px-3 py-1 rounded-full">
                    ${product.sold.toLocaleString('fa-IR')} فروش
                </div>
                <div class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    ${getCategoryLabel(product.category)}
                </div>
                <div class="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full hover:bg-brand-500/50 transition-colors">
                    <i class="fas fa-comment-dots mr-1"></i>${reviewCount} نظر
                </div>
            </div>
            <div class="p-5">
                <h3 class="font-bold text-base mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors cursor-pointer" onclick="openReviews(${product.id})">${product.name}</h3>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-brand-400">${product.price.toLocaleString('fa-IR')} تومان</span>
                    <button onclick="addToCart(${product.id}, this)" class="add-to-cart-btn w-10 h-10 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                        <i class="fas fa-plus text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

function filterCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
}

function getProductIcon(type) {
    const icons = { phone: 'mobile-screen', laptop: 'laptop', headphones: 'headphones', watch: 'watch', bag: 'bag', glasses: 'glasses', backpack: 'backpack', tshirt: 'tshirt', jeans: 'vest', jacket: 'vest', shoes: 'shoe-prints', furniture: 'couch', pot: 'vase', candle: 'fire', tvstand: 'tv', speaker: 'volume-high' };
    return icons[type] || 'box';
}

function getCategoryLabel(cat) {
    const labels = { electronics: 'الکترونیک', clothing: 'پوشاک', accessories: 'اکسسوری', home: 'خانه' };
    return labels[cat] || cat;
}

function addToCart(productId, btn) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartBadge();
    showToast(`${product.name} به سبد خرید اضافه شد`);
    
    btn.classList.add('scale-90');
    setTimeout(() => btn.classList.remove('scale-90'), 150);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCart();
    showToast('حذف شد');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        updateCartBadge();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('nav-badge').textContent = total;
    document.getElementById('fab-badge').textContent = total;
    
    if (total > 0) {
        document.getElementById('nav-badge').classList.remove('hidden');
        document.getElementById('fab-badge').classList.remove('hidden');
    } else {
        document.getElementById('nav-badge').classList.add('hidden');
        document.getElementById('fab-badge').classList.add('hidden');
    }
}



function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
    if (cart.length === 0) {
        document.getElementById('cart-empty').classList.remove('hidden');
        document.getElementById('cart-content').classList.add('hidden');
        return;
    }
    
    document.getElementById('cart-empty').classList.add('hidden');
    document.getElementById('cart-content').classList.remove('hidden');
    document.getElementById('cart-count-text').textContent = `${getCartCount()} محصول`;
    
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item bg-gray-900 rounded-2xl p-5 border border-white/5 flex items-center gap-4 animate-slide-in-cart" style="animation-delay: ${index * 0.05}s">
            <div class="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-${getProductIcon(item.image)} text-2xl text-gray-600"></i>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-bold text-sm truncate">${item.name}</h4>
                <p class="text-brand-400 font-bold text-sm">${item.price.toLocaleString('fa-IR')} تومان</p>
            </div>
            <div class="flex items-center gap-1">
                <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white">
                    <i class="fas fa-minus text-xs"></i>
                </button>
                <span class="w-8 text-center font-bold text-sm">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white">
                    <i class="fas fa-plus text-xs"></i>
                </button>
            </div>
            <div class="text-right min-w-[80px]">
                <p class="font-bold text-sm">${(item.price * item.quantity).toLocaleString('fa-IR')} تومان</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-item-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-400 transition-all">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    updateSummary();
}

function updateSummary() {
    const subtotal = getCartTotal();
    const shipping = 0;
    const discount = subtotal > 100000000 ? subtotal * 0.1 : 0;
    const total = subtotal - discount + shipping;
    
    document.getElementById('summary-subtotal').textContent = subtotal.toLocaleString('fa-IR') + ' تومان';
    document.getElementById('summary-shipping').textContent = shipping === 0 ? 'رایگان' : shipping.toLocaleString('fa-IR') + ' تومان';
    document.getElementById('summary-discount').textContent = discount > 0 ? '-' + discount.toLocaleString('fa-IR') + ' تومان' : '0 تومان';
    document.getElementById('summary-total').textContent = total.toLocaleString('fa-IR') + ' تومان';
}

function renderCheckoutItems() {
    const container = document.getElementById('checkout-items');
    container.innerHTML = cart.map(item => `
        <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
            <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <i class="fas fa-${getProductIcon(item.image)} text-gray-600"></i>
            </div>
            <div class="flex-1">
                <p class="text-sm font-bold">${item.name}</p>
                <p class="text-xs text-gray-400">${item.quantity} عدد × ${item.price.toLocaleString('fa-IR')} تومان</p>
            </div>
            <p class="font-bold text-brand-400">${(item.price * item.quantity).toLocaleString('fa-IR')} تومان</p>
        </div>
    `).join('');
    
    const total = getCartTotal();
    document.getElementById('order-total').textContent = total.toLocaleString('fa-IR') + ' تومان';
    document.getElementById('order-date').textContent = new Date().toLocaleDateString('fa-IR');
    document.getElementById('order-id').textContent = '#ORD-' + Math.floor(100000 + Math.random() * 900000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = message;
    toast.classList.remove('hidden');
    toast.style.animation = 'none';
    toast.offsetHeight;
    toast.style.animation = 'toastIn 0.3s ease-out';
    
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease-out forwards';
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2500);
}

function placeOrder() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    
    if (!name || !phone || !address) {
        showToast('لطفاً تمام فیلدهای الزامی را پر کنید');
        return;
    }
    
    if (!/^[\u0600-\u06FF0-9+\s()-]+$/.test(phone)) {
        showToast('شماره موبایل نامعتبر است');
        return;
    }
    
    const btn = document.getElementById('place-order-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>در حال پردازش...';
    btn.disabled = true;
    
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartBadge();
        btn.innerHTML = 'ثبت سفارش <i class="fas fa-check ml-2"></i>';
        btn.disabled = false;
        switchPage('success');
        showToast('سفارش شما با موفقیت ثبت شد!');
    }, 1500);
}
