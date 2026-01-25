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
    { id: 7, title: "ورشة الرسم للأطفال", date: "2025-12-10", location: "مركز الإبداع", category: "عائلي", image: "assets/img/event7.jpg", description: "ورشة تعليم الرسم للأطفال من عمر 6 إلى 12 سنة.", price: "40 ريال", isFeatured: false }
];


       // تعليق: بيانات إضافية للصور ومعرض الصور
        const eventImages = {
            1: [
                'img/events/event1.jpg',
                'img/events/event1-gallery1.jpg',
                'img/events/event1-gallery2.jpg',
                'img/events/event1-gallery3.jpg'
            ],
            2: [
                'img/events/event2.jpg',
                'img/events/event2-gallery1.jpg',
                'img/events/event2-gallery2.jpg'
            ],
            3: [
                'img/events/event3.jpg',
                'img/events/event3-gallery1.jpg',
                'img/events/event3-gallery2.jpg'
            ]
        };
        
        // تعليق: مواقع الفعاليات على الخريطة (صور وهمية)
        const eventLocations = {
            1: 'assets/img/map-default.png',
            2: 'assets/img/map-default.png',
            3: 'assets/img/map-default.png'
        };


// 2. دوال مساعدة (Helpers)
function getCategoryClass(category) {
    const map = { 'رياضة': 'badge-sports', 'ثقافة': 'badge-culture', 'موسيقى': 'badge-music', 'عائلي': 'badge-family' };
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
                <div class="card h-100 featured-card shadow border-0 position-relative text-white">
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
    renderLatestEvents()

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
        default: return 'bg-secondary';
    }
}

        document.addEventListener('DOMContentLoaded', function() {
            const list = document.getElementById('events-list');
            const searchInput = document.getElementById('search-input');
            const categoryFilter = document.getElementById('category-filter');
            const locationFilter = document.getElementById('location-filter');
            const scrollBtn = document.getElementById('scrollToTop');

            // --- استرجاع القيم المحفوظة من localStorage ---
                const savedDate = localStorage.getItem('filter_date');
                const savedCat = localStorage.getItem('filter_category');
                const savedLoc = localStorage.getItem('filter_location');

                if (savedDate) searchInput.value = savedDate;
                if (savedCat) categoryFilter.value = savedCat;
                if (savedLoc) locationFilter.value = savedLoc;

                // ملاحظة: إذا كان هناك تصنيف قادم من الرابط (URL)، يفضل أن تكون له الأولوية
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('category')) {
                    categoryFilter.value = urlParams.get('category');
                }
            // 2. دالة عرض الفعاليات بالترويسة الملونة
            function displayEvents(events) {
                list.innerHTML = '';
                if (events.length === 0) {
                    document.getElementById('no-results').style.display = 'block';
                    return;
                }
                document.getElementById('no-results').style.display = 'none';

                events.forEach(event => {
                    let colorClass = 'header-default';
                    if(event.category === 'رياضة') colorClass = 'header-sports';
                    else if(event.category === 'ثقافة') colorClass = 'header-culture';
                    else if(event.category === 'موسيقى') colorClass = 'header-music';
                    else if(event.category === 'عائلي') colorClass = 'header-family';

                    list.innerHTML += `
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm event-card bg-white">
                                <div class="event-card-header ${colorClass}">${event.category}</div>
                                <img src="${event.image}" class="card-img-top" style="height:200px; object-fit:cover;">
                                <div class="card-body">
                                    <h5 class="fw-bold">${event.title}</h5>
                                    <p class="text-muted small mb-1"><i class="far fa-calendar-alt me-1"></i> ${event.date}</p>
                                    <p class="text-muted small mb-2"><i class="fas fa-map-marker-alt me-1"></i> ${event.location}</p>
                                    <p class="card-text small">${event.description.substring(0, 80)}...</p>
                                    <a href="event.html?id=${event.id}" class="btn btn-primary btn-sm w-100 mt-2">التفاصيل</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            // 3. منطق الفلترة الموحد
                function filterAll() {
                    const dateVal = searchInput.value;
                    const catVal = categoryFilter.value;
                    const locVal = locationFilter.value;

                    // --- منطق الفلترة الحالي ---
                    const filtered = eventsData.filter(ev => {
                        const matchesDate = dateVal === "" || ev.date === dateVal;
                        const matchesCategory = catVal === 'all' || ev.category === catVal;
                        const matchesLocation = locVal === 'all' || ev.location === locVal;
                        return matchesDate && matchesCategory && matchesLocation;
    });
    displayEvents(filtered);

    // --- حفظ الاختيارات في localStorage ---
    localStorage.setItem('filter_date', dateVal);
    localStorage.setItem('filter_category', catVal);
    localStorage.setItem('filter_location', locVal);
}

            // 4. مستمعات الأحداث
            searchInput.addEventListener('input', filterAll);
            categoryFilter.addEventListener('change', filterAll);
            locationFilter.addEventListener('change', filterAll);
            document.getElementById('reset-btn').addEventListener('click', () => {
                searchInput.value = ''; categoryFilter.value = 'all'; locationFilter.value = 'all';
                displayEvents(eventsData);
            });
            // تشغيل أولي
            filterAll();
        });

        
        document.addEventListener('DOMContentLoaded', function() {
            // الحصول على معرف الفعالية من الرابط
            const urlParams = new URLSearchParams(window.location.search);
            const eventId = urlParams.get('id') || 1;
            
            // البحث عن الفعالية
            const event = eventsData.find(e => e.id == eventId) || eventsData[0];
            
            // تحديث مسار التنقل
            document.getElementById('breadcrumb-event').textContent = event.title;
            
            // عرض تفاصيل الفعالية
            displayEventDetails(event);
            
            // إضافة إلى التقويم
            document.addEventListener('click', function(e) {
                if (e.target.closest('#add-to-calendar-btn')) {
                    addToCalendar(event);
                }
                
                if (e.target.closest('#share-btn')) {
                    shareEvent(event);
                }
            });
            
            // التعامل مع مشاركة الفعالية
            document.querySelectorAll('.share-option').forEach(btn => {
                btn.addEventListener('click', function() {
                    const platform = this.dataset.platform;
                    shareOnPlatform(platform, event);
                });
            });
        });
        
        // دالة عرض تفاصيل الفعالية
        function displayEventDetails(event) {
            const container = document.getElementById('event-container');
            const images = eventImages[event.id] || [event.image];
            const locationMap = eventLocations[event.id] || 'assets/img/map-default.png';
            
            container.innerHTML = `
                <div class="row">
                    <!-- المحتوى الرئيسي -->
                    <div class="col-lg-8">
                        <!-- عنوان وتفاصيل أساسية -->
                        <div class="card mb-4 border-0 shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <span class="badge bg-primary fs-6">${event.category}</span>
                                    <span class="text-muted">
                                        <i class="far fa-calendar-alt me-1"></i> ${event.date}
                                    </span>
                                </div>
                                
                                <h1 class="mb-3">${event.title}</h1>
                                
                                <div class="d-flex align-items-center mb-4">
                                    <i class="fas fa-map-marker-alt text-primary me-2"></i>
                                    <h5 class="mb-0">${event.location}</h5>
                                </div>
                                
                                <div class="mb-4">
                                    <h4>عن الفعالية</h4>
                                    <p class="fs-5">${event.description}</p>
                                    <p>${getFullDescription(event.id)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- معرض الصور -->
                        <div class="card mb-4 border-0 shadow-sm">
                            <div class="card-body">
                                <h4 class="mb-3">معرض الصور</h4>
                                <div class="row" id="event-gallery">
                                    ${images.map((img, index) => `
                                        <div class="col-6 col-md-4 mb-3">
                                            <img src="${img}" 
                                                 class="img-fluid rounded gallery-image" 
                                                 alt="صورة ${index + 1}"
                                                 style="height: 150px; width: 100%; object-fit: cover; cursor: pointer;"
                                                 onclick="openImageModal('${img}')">
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- الشريط الجانبي -->
                    <div class="col-lg-4">
                        <!-- معلومات سريعة -->
                        <div class="card mb-4 border-0 shadow-sm " style="top: 20px;">
                            <div class="card-body">
                                <h4 class="mb-3">معلومات الفعالية</h4>
                                
                                <div class="mb-3">
                                    <h6><i class="fas fa-clock text-primary me-2"></i>الوقت</h6>
                                    <p>${event.time || '5:00 مساءً - 11:00 مساءً'}</p>
                                </div>
                                
                                <div class="mb-3">
                                    <h6><i class="fas fa-tag text-success me-2"></i>السعر</h6>
                                    <p>${event.price || 'مجاني'}</p>
                                </div>
                                
                                <div class="mb-3">
                                    <h6><i class="fas fa-user-tie text-warning me-2"></i>المنظم</h6>
                                    <p>${event.organizer || 'إدارة الفعاليات'}</p>
                                </div>
                                
                                <!-- أزرار الإجراءات -->
                                <div class="d-grid gap-2">
                                    <button id="add-to-calendar-btn" class="btn btn-primary">
                                        <i class="far fa-calendar-plus me-2"></i>أضف للتقويم
                                    </button>
                                    <button id="share-btn" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#shareModal">
                                        <i class="fas fa-share-alt me-2"></i>شارك الفعالية
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- خريطة الموقع -->
                        <div class="card mb-4 border-0 shadow-sm">
                            <div class="card-body">
                                <h4 class="mb-3">موقع الفعالية</h4>
                                <img src="${locationMap}" 
                                     class="img-fluid rounded" 
                                     alt="خريطة موقع الفعالية"
                                     style="height: 200px; width: 100%; object-fit: cover;">
                                <p class="mt-2 mb-0"><small>${event.location}</small></p>
                            </div>
                        </div>
                        
                        <!-- فعاليات ذات صلة -->
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <h4 class="mb-3">فعاليات ذات صلة</h4>
                                <div id="related-events">
                                    <!-- ستضاف بواسطة JavaScript -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // عرض فعاليات ذات صلة
            displayRelatedEvents(event);
        }
        
        // دالة للحصول على وصف كامل (يمكن توسيعها)
        function getFullDescription(eventId) {
            const descriptions = {
                1: "يقدم المهرجان مجموعة متنوعة من الأنشطة الموسيقية والفنية، بما في ذلك حفلات موسيقية حية، ورش عمل، وعروض فنية. يهدف المهرجان إلى دعم المواهب المحلية وتعزيز الثقافة الموسيقية في المجتمع.",
                2: "يضم المعرض أكثر من 100 دار نشر محلية وعالمية، مع أنشطة ثقافية متنوعة مثل جلسات التوقيع، الندوات الثقافية، وورش عمل للكتابة الإبداعية.",
                3: "الماراثون مفتوح لجميع الفئات العمرية، مع جوائز قيمة للفائزين. تتوزع المحطات الطبية على طول المسار لضمان سلامة المشاركين."
            };
            
            return descriptions[eventId] || "فعالية ثقافية/اجتماعية تهدف إلى إثراء المجتمع وتقديم تجربة فريدة للمشاركين.";
        }
        
        // دالة عرض فعاليات ذات صلة
        function displayRelatedEvents(currentEvent) {
            const relatedContainer = document.getElementById('related-events');
            const relatedEvents = eventsData.filter(e => 
                e.category === currentEvent.category && e.id != currentEvent.id
            ).slice(0, 2);
            
            if (relatedEvents.length === 0) {
                relatedContainer.innerHTML = '<p class="text-muted">لا توجد فعاليات ذات صلة حالياً.</p>';
                return;
            }
            
            relatedEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'card border-0 mb-3';
                eventCard.innerHTML = `
                    <div class="row g-0">
                        <div class="col-4">
                            <img src="${event.image}" class="img-fluid rounded-start" alt="${event.title}" style="height: 80px; object-fit: cover;">
                        </div>
                        <div class="col-8">
                            <div class="card-body p-2">
                                <h6 class="card-title">${event.title}</h6>
                                <p class="card-text small text-muted mb-1">
                                    <i class="far fa-calendar-alt me-1"></i> ${event.date}
                                </p>
                                <a href="event.html?id=${event.id}" class="btn btn-sm btn-outline-primary">التفاصيل</a>
                            </div>
                        </div>
                    </div>
                `;
                relatedContainer.appendChild(eventCard);
            });
        }
        
        // دالة إضافة للتقويم
        function addToCalendar(event) {
            // هنا يمكن إضافة منطق حقيقي لإضافة إلى Google Calendar أو Apple Calendar
            // للمشروع، سنعرض رسالة تأكيد فقط
            alert(`تم إضافة "${event.title}" إلى تقويمك\nالتاريخ: ${event.date}\nالمكان: ${event.location}`);
        }
        
        // دالة مشاركة الفعالية
        function shareEvent(event) {
            // يتم فتح Modal للمشاركة، والدالة الفعلية في shareOnPlatform
        }
        
        // دالة المشاركة على المنصات المختلفة
        function shareOnPlatform(platform, event) {
            const eventUrl = window.location.href;
            const eventTitle = event.title;
            const eventDescription = event.description.substring(0, 100) + '...';
            
            let shareUrl = '';
            
            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(eventTitle + ' - ' + eventUrl)}`;
                    window.open(shareUrl, '_blank');
                    break;
                    
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(eventTitle)}&url=${encodeURIComponent(eventUrl)}`;
                    window.open(shareUrl, '_blank');
                    break;
                    
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
                    window.open(shareUrl, '_blank');
                    break;
                    
                case 'copy':
                    navigator.clipboard.writeText(eventUrl)
                        .then(() => alert('تم نسخ رابط الفعالية إلى الحافظة'))
                        .catch(() => alert('حدث خطأ في نسخ الرابط'));
                    break;
            }
            
            // إغلاق الـ Modal
            const shareModal = bootstrap.Modal.getInstance(document.getElementById('shareModal'));
            shareModal.hide();
        }
        
        // دالة فتح صورة في modal (اختياري)
        function openImageModal(imageSrc) {
            const modalHtml = `
                <div class="modal fade" id="imageModal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-body p-0">
                                <img src="${imageSrc}" class="img-fluid w-100" alt="صورة الفعالية">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // إضافة الـ Modal إلى الصفحة وفتحه
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
            imageModal.show();
            
            // إزالة الـ Modal عند الإغلاق
            document.getElementById('imageModal').addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
        }

        // دالة عرض أحدث الفعاليات في الصفحة الرئيسية
function renderLatestEvents() {
    const grid = document.getElementById('latest-events-grid');
    if (!grid) return; // لضمان عدم حدوث خطأ إذا لم نكن في الصفحة الرئيسية

    // جلب آخر 4 فعاليات في المصفوفة (أو تغيير الرقم حسب الرغبة)
    const latestEvents = eventsData.slice(-4).reverse(); 

    grid.innerHTML = latestEvents.map(event => createEventCard(event)).join('');
}
