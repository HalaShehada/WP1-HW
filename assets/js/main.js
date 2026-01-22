/**
 * ملف JavaScript الموحد والمنظم لدليل فعاليات المدينة
 */

// 1. مصفوفة البيانات (Data)
const eventsData = [
    { id: 1, title: "مهرجان الموسيقى السنوي", date: "2025-11-15", location: "حديقة المدينة", category: "موسيقى", image: "assets/img/event1.jpg", description: "مهرجان موسيقي يضم فنانين محليين ودوليين لمدة 5 أيام.", price: "50 ريال", isFeatured: true },
    { id: 2, title: "معرض الكتاب الدولي", date: "2025-11-22", location: "مركز المعارض", category: "ثقافة", image: "assets/img/event2.jpg", description: "معرض للكتاب يضم دور نشر عربية وعالمية وفعاليات ثقافية.", price: "مجاني", isFeatured: true },
    { id: 3, title: "ماراثون المدينة الخيري", date: "2025-11-25", location: "الساحة المركزية", category: "رياضة", image: "assets/img/event3.jpg", description: "ماراثون خيري لمسافة 10كم لدعم جمعيات خيرية محلية.", price: "25 ريال", isFeatured: true },
    { id: 4, title: "مهرجان الأضواء العائلي", date: "2025-11-28", location: "الواجهة البحرية", category: "عائلي", image: "assets/img/event4.avif", description: "عرض أضواء مبهر مع أنشطة عائلية متنوعة.", price: "30 ريال", isFeatured: false },
    { id: 5, title: "ندوة التكنولوجيا المستقبلية", date: "2025-12-01", location: "جامعة المدينة", category: "ثقافة", image: "assets/img/event5.jpg", description: "ندوة تناقش أحدث التطورات في مجال التكنولوجيا.", price: "مجاني", isFeatured: false },
    { id: 6, title: "بطولة كرة القدم الخماسية", date: "2025-12-05", location: "الملعب الأولمبي", category: "رياضة", image: "assets/img/event6.jpg", description: "بطولة كرة قدم خماسية للفرق المحلية جوائز قيمة.", price: "100 ريال", isFeatured: false },
    { id: 7, title: "ورشة الرسم للأطفال", date: "2025-12-10", location: "مركز الإبداع", category: "فنية", image: "assets/img/event7.jpg", description: "ورشة تعليم الرسم للأطفال من عمر 6 إلى 12 سنة.", price: "40 ريال", isFeatured: false }
];
// 2. دوال مساعدة (Helpers)
function getCategoryClass(category) {
    const map = { 'رياضة': 'badge-sports', 'ثقافة': 'badge-culture', 'موسيقى': 'badge-music', 'عائلي': 'badge-family', 'فنية': 'bg-secondary' };
    return map[category] || 'bg-primary';
}

function createEventCard(event, isFeaturedView = false) {
    const badgeClass = getCategoryClass(event.category);
    const colClass = isFeaturedView ? 'col-md-4 mb-4' : 'col-md-6 col-lg-3 mb-4';
    
    return `
        <div class="${colClass}">
            <div class="card h-100 ${isFeaturedView ? 'featured-card shadow' : 'event-card shadow-sm'} border-0 position-relative">
                ${isFeaturedView ? '<span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 shadow-sm"><i class="fas fa-star me-1"></i> بارز</span>' : ''}
                <span class="badge ${badgeClass} position-absolute top-0 end-0 m-2 shadow-sm">${event.category}</span>
                <img src="${event.image}" class="card-img-top" alt="${event.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column text-end">
                    <h5 class="card-title fw-bold mb-2">${event.title}</h5>
                    <div class="text-muted small mb-2"><i class="far fa-calendar-alt ms-1"></i> ${event.date}</div>
                    <div class="text-muted small mb-3"><i class="fas fa-map-marker-alt ms-1"></i> ${event.location}</div>
                    <p class="card-text text-muted small flex-grow-1">${event.description.substring(0, 80)}...</p>
                    <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-primary fs-5">${event.price}</span>
                        <a href="event.html?id=${event.id}" class="btn ${isFeaturedView ? 'btn-primary px-4 rounded-pill' : 'btn-outline-primary btn-sm w-100'}">التفاصيل</a>
                    </div>
                </div>
            </div>
        </div>`;
}

// 3. الدوال الأساسية للعرض
function renderEvents(category = 'all') {
    const grid = document.getElementById('events-grid');
    if (!grid) return;

    const filtered = category === 'all' ? eventsData : eventsData.filter(e => e.category === category);
    grid.innerHTML = filtered.length ? filtered.slice(0, 4).map(e => createEventCard(e)).join('') : 
        `<div class="col-12 text-center py-5"><h4>لا توجد فعاليات في "${category}"</h4></div>`;
    
    if (category !== 'all') showAlert(`تم عرض فعاليات ${category}`);
}

function renderFeatured() {
    const grid = document.getElementById('featured-events-grid');
    if (!grid) return;

    // تصفية الفعاليات البارزة
    const featured = eventsData.filter(e => e.isFeatured);
    
    grid.innerHTML = featured.map(event => {
        // استخراج كلاس اللون المناسب للتصنيف
        const categoryClass = getCategoryColorClass(event.category);
        
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100 featured-card shadow border-0 position-relative bg-dark text-white">
                    <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 shadow-sm">
                        <i class="fas fa-star me-1"></i> بارز
                    </span>

                    <span class="badge ${categoryClass} position-absolute top-0 end-0 m-2 shadow-sm">
                        ${event.category}
                    </span>

                    <img src="${event.image}" class="card-img-top" alt="${event.title}" style="height: 200px; object-fit: cover;">
                    
                    <div class="card-body d-flex flex-column text-end">
                        <h5 class="card-title fw-bold mb-2">${event.title}</h5>
                        <div class="text-light small mb-2">
                            <i class="far fa-calendar-alt ms-1"></i> ${event.date}
                        </div>
                        <div class="text-light small mb-3">
                            <i class="fas fa-map-marker-alt ms-1"></i> ${event.location}
                        </div>
                        <p class="card-text text-muted small flex-grow-1">
                            ${event.description.substring(0, 80)}...
                        </p>
                        <hr class="bg-light">
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-info fs-5">${event.price}</span>
                            <a href="event.html?id=${event.id}" class="btn btn-primary px-4 rounded-pill">
                                التفاصيل <i class="fas fa-arrow-left ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// 4. نظام التنبيهات والوضع الداكن
function showAlert(msg, type = 'info') {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type} alert-dismissible fade show fixed-top m-3 ms-auto`;
    alertBox.style.maxWidth = '300px';
    alertBox.innerHTML = `${msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

// 5. تهيئة الصفحة (Initialization)
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    renderFeatured();

    // أزرار التصنيفات
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cat = this.getAttribute('data-category');
            renderEvents(cat);
            // تحديث شكل الأزرار
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // تبديل الوضع الداكن
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
});

// كود تشغيل زر العودة للأعلى
const scrollBtn = document.getElementById('scrollToTop');

if (scrollBtn) {
    // إظهار الزر عند التمرير لأسفل 300 بكسل
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollBtn.style.setProperty('display', 'block', 'important');
        } else {
            scrollBtn.style.display = "none";
        }
    };

    // عند الضغط على الزر، اصعد للأعلى بنعومة
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function getCategoryColorClass(category) {
    switch (category) {
        case 'رياضة': return 'badge-sports';   // تأكدي أن هذا الكلاس معرف في CSS باللون الأخضر
        case 'ثقافة': return 'badge-culture';  // باللون الأزرق
        case 'موسيقى': return 'badge-music';   // باللون الأصفر/البرتقالي
        case 'عائلي': return 'badge-family';   // باللون السماوي
        case 'فنية': return 'badge-art';      // لون إضافي للفنون
        default: return 'bg-secondary';
    }
}