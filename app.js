/* ═══════════════════════════════════════════════════════════
   SCALING THE SOUL — Firebase Auth + Firestore
   ═══════════════════════════════════════════════════════════ */
const CONFIG = { splashDuration: 2400, multilingualInterval: 2500, particleCount: 20 };
const TRANSLATIONS = [
    { text: 'Share Your Legacy' }, { text: 'Partagez votre héritage' }, { text: '分享你的传承' },
    { text: 'உங்கள் மரபை பகிரவும்' }, { text: 'اپنی میراث شیئر کریں' }, { text: 'Ibahagi ang iyong pamana' },
    { text: 'Compartilhe seu legado' }, { text: 'Comparte tu legado' }, { text: 'Condividi la tua eredità' },
    { text: '당신의 유산을 공유하세요' }, { text: 'شارك إرثك' }, { text: 'Поделитесь наследием' }
];
const HOOD_COORDS = {
    'fort-york': { x: 310, y: 445 }, 'harbourfront': { x: 420, y: 450 }, 'king-west': { x: 270, y: 400 },
    'entertainment': { x: 360, y: 400 }, 'financial': { x: 410, y: 410 }, 'st-lawrence': { x: 450, y: 415 },
    'distillery': { x: 470, y: 420 }, 'church-wellesley': { x: 420, y: 370 }, 'yorkville': { x: 380, y: 340 },
    'annex': { x: 320, y: 330 }, 'midtown': { x: 400, y: 240 }, 'forest-hill': { x: 330, y: 280 },
    'north-york': { x: 400, y: 160 }, 'danforth': { x: 500, y: 340 }, 'leslieville': { x: 500, y: 390 },
    'beaches': { x: 580, y: 390 }, 'scarborough': { x: 670, y: 280 }, 'agincourt': { x: 650, y: 200 },
    'parkdale': { x: 180, y: 400 }, 'high-park': { x: 150, y: 370 }, 'junction': { x: 170, y: 330 },
    'little-italy': { x: 330, y: 370 }, 'kensington': { x: 350, y: 375 }, 'etobicoke': { x: 100, y: 300 },
    'willowdale': { x: 420, y: 160 }, 'jane-finch': { x: 220, y: 165 }, 'downsview': { x: 280, y: 190 },
    'gta': { x: 100, y: 250 }, 'ontario': { x: 50, y: 150 }, 'canada': { x: 50, y: 100 }, 'international': { x: 740, y: 100 }
};
const VENDORS = [
    { icon: 'flame', cls: 'vi-flame', name: "Auntie's Patties", type: 'Caribbean', desc: 'Jamaican patty shop from Eglinton West since 1994.', badge: 'Social Enterprise', bi: 'heart', detail: 'A cornerstone of Eglinton West for 30 years. Hired 12 youth workers through FIFA 2026.', stats: { emp: 28, yrs: 30, youth: 12, rev: '$340K' } },
    { icon: 'utensils', cls: 'vi-utensils', name: 'Taqueria La Familia', type: 'Latin American', desc: 'Mexican street food from Kensington, supporting migrant workers.', badge: 'Equity-Deserving', bi: 'shield', detail: 'Partners with migrant worker advocacy. Four generations of family recipes.', stats: { emp: 15, yrs: 8, youth: 6, rev: '$180K' } },
    { icon: 'utensils', cls: 'vi-soup', name: 'Pho Saigon Express', type: 'Vietnamese', desc: 'Third-gen Chinatown family. Training youth in culinary arts.', badge: 'Youth Employment', bi: 'award', detail: 'Culinary apprenticeship with George Brown College. 85% grad placement rate.', stats: { emp: 20, yrs: 22, youth: 18, rev: '$420K' } },
    { icon: 'cake-slice', cls: 'vi-cake', name: 'Sweet Legacy Bakery', type: 'Indigenous Bakery', desc: 'Indigenous-owned bannock and fusion pastries from Scarborough.', badge: 'Indigenous-Owned', bi: 'leaf', detail: 'Owned by Mississaugas of the Credit. Uses wild rice, saskatoon berries, and cedar.', stats: { emp: 10, yrs: 5, youth: 4, rev: '$95K' } },
    { icon: 'coffee', cls: 'vi-coffee', name: 'Ethio Brew Collective', type: 'Coffee', desc: 'Ethiopian coffee ceremony. Women-owned cooperative.', badge: 'Women-Owned', bi: 'users', detail: 'Worker cooperative of 8 Ethiopian-Canadian women. Sources from Sidamo women-led farms.', stats: { emp: 8, yrs: 3, youth: 3, rev: '$120K' } },
    { icon: 'utensils', cls: 'vi-chef', name: 'Halal Harvest Kitchen', type: 'Middle Eastern', desc: 'Newcomer women from Thorncliffe Park. Halal cuisine.', badge: 'Newcomer Program', bi: 'globe', detail: 'Started through Thorncliffe Park Women\'s Committee. Employs 14 women with language + childcare support.', stats: { emp: 14, yrs: 2, youth: 5, rev: '$160K' } }
];
const PITCHES = [
    { name: 'Regent Park', loc: '600 Dundas St E', desc: 'Full-size with LED lighting.', st: 'open', x: 440, y: 180 },
    { name: 'Jane-Finch', loc: '4400 Jane St', desc: 'Youth-focused pitch.', st: 'open', x: 120, y: 80 },
    { name: 'Scarborough Village', loc: '3600 Kingston Rd', desc: 'Wheelchair-friendly.', st: 'open', x: 350, y: 130 },
    { name: 'Bentway Legacy', loc: 'Fort York Blvd', desc: 'Permanent below the Gardiner.', st: 'coming', x: 180, y: 230 },
    { name: 'Malvern', loc: '30 Sewells Rd', desc: 'Built with local schools.', st: 'open', x: 370, y: 100 },
    { name: 'Lawrence Heights', loc: '3000 Lawrence Ave W', desc: 'All-weather turf.', st: 'coming', x: 160, y: 110 },
    { name: 'Thorncliffe Park', loc: '45 Overlea Blvd', desc: 'Multilingual signage in 8 languages.', st: 'open', x: 300, y: 145 },
    { name: 'Weston-Mt Dennis', loc: '1800 Weston Rd', desc: 'Night-lit, near LRT.', st: 'open', x: 130, y: 140 }
];

/* ─── State ─── */
let stories = [], currentUser = null, userProfile = null, currentPage = 'home', capturedMedia = null,
    capturedDataUrl = null, captureStep = 1, mobileNavOpen = false, currentFilter = 'all',
    lastPinnedStory = null, confirmCallback = null, profileMenuOpen = false, allUsers = [];

/* ═══════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('fade-out');
        document.getElementById('app').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            initApp();
        }, 600);
    }, CONFIG.splashDuration);
});

function initApp() {
    createParticles(); startCarousel(); setupCapture(); setupCharCount();
    renderVendors(); renderPitches();
    // Listen for auth state changes
    auth.onAuthStateChanged(async (user) => {
        currentUser = user;
        if (user) {
            await loadUserProfile();
        } else {
            userProfile = null;
        }
        updateAuthUI();
        await loadStories();
        refreshIcons();
    });
}

function refreshIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    } else {
        let a = 0;
        const r = setInterval(() => {
            a++;
            if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); clearInterval(r); }
            if (a > 20) clearInterval(r);
        }, 200);
    }
}

/* ═══════════════════════════════════════════════
   FIRESTORE - LOAD / SAVE
   ═══════════════════════════════════════════════ */
async function loadUserProfile() {
    if (!currentUser) return;
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
            userProfile = { id: currentUser.uid, ...doc.data() };
        } else {
            // Profile doesn't exist yet (shouldn't happen if signup is correct)
            userProfile = { id: currentUser.uid, name: currentUser.displayName || 'User', email: currentUser.email, role: 'user', neighborhood: '' };
        }
    } catch (e) {
        console.error('Load profile error:', e);
        userProfile = { id: currentUser.uid, name: currentUser.email, email: currentUser.email, role: 'user', neighborhood: '' };
    }
}

async function loadStories() {
    try {
        const snapshot = await db.collection('stories').orderBy('timestamp', 'desc').get();
        stories = [];
        snapshot.forEach(doc => {
            stories.push({ id: doc.id, ...doc.data() });
        });
    } catch (e) {
        console.error('Load stories error:', e);
        stories = [];
    }
    renderPins(); renderFeed(); animateStats();
}

async function loadAllUsers() {
    try {
        const snapshot = await db.collection('users').get();
        allUsers = [];
        snapshot.forEach(doc => {
            allUsers.push({ id: doc.id, ...doc.data() });
        });
    } catch (e) {
        console.error('Load users error:', e);
        allUsers = [];
    }
}

/* ═══════════════════════════════════════════════
   FIREBASE AUTH
   ═══════════════════════════════════════════════ */
async function handleSignup() {
    const name = gv('signup-name'), email = gv('signup-email'), hood = gv('signup-neighborhood'),
        pw = gv('signup-password'), confirm = gv('signup-confirm');

    if (!name || !email || !pw) return showToast('Please fill in all required fields.', 'warning');
    if (pw.length < 6) return showToast('Password must be at least 6 characters.', 'warning');
    if (pw !== confirm) return showToast('Passwords do not match.', 'warning');

    const btn = gi('btn-signup');
    btn.disabled = true; btn.innerHTML = '<i data-lucide="loader"></i> Creating...';

    try {
        const cred = await auth.createUserWithEmailAndPassword(email, pw);
        await cred.user.updateProfile({ displayName: name });

        // Check if this is the FIRST user — make them admin
        const usersSnap = await db.collection('users').get();
        const role = usersSnap.empty ? 'admin' : 'user';

        // Save profile to Firestore
        await db.collection('users').doc(cred.user.uid).set({
            name, email, neighborhood: hood, role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Manually set profile so admin tab shows immediately
        // (onAuthStateChanged fires before Firestore write completes)
        userProfile = { id: cred.user.uid, name, email, role, neighborhood: hood };
        updateAuthUI();

        closeAuthModal();
        showToast(`Welcome, ${name}! ${role === 'admin' ? '(Admin)' : ''}`, 'success');
        clearAuthForms();
    } catch (e) {
        console.error('Signup error:', e);
        let msg = 'Signup failed.';
        if (e.code === 'auth/email-already-in-use') msg = 'Email already in use.';
        else if (e.code === 'auth/weak-password') msg = 'Password is too weak.';
        else if (e.code === 'auth/invalid-email') msg = 'Invalid email address.';
        showToast(msg, 'error');
    }

    btn.disabled = false; btn.innerHTML = '<i data-lucide="user-plus"></i> Create Account';
    refreshIcons();
}

async function handleLogin() {
    const email = gv('login-email'), pw = gv('login-password');
    if (!email || !pw) return showToast('Please fill in all fields.', 'warning');

    const btn = gi('btn-login');
    btn.disabled = true; btn.innerHTML = '<i data-lucide="loader"></i> Logging in...';

    try {
        await auth.signInWithEmailAndPassword(email, pw);
        closeAuthModal();
        showToast('Welcome back!', 'success');
        clearAuthForms();
    } catch (e) {
        console.error('Login error:', e);
        let msg = 'Login failed.';
        if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') msg = 'Invalid email or password.';
        else if (e.code === 'auth/too-many-requests') msg = 'Too many attempts. Try again later.';
        showToast(msg, 'error');
    }

    btn.disabled = false; btn.innerHTML = '<i data-lucide="log-in"></i> Login';
    refreshIcons();
}

async function handleForgotPassword() {
    const email = gv('forgot-email');
    if (!email) return showToast('Please enter your email.', 'warning');

    try {
        await auth.sendPasswordResetEmail(email);
        showToast('Password reset email sent! Check your inbox.', 'success');
    } catch (e) {
        console.error('Forgot pw error:', e);
        if (e.code === 'auth/user-not-found') showToast('No account with that email.', 'warning');
        else showToast('If that email exists, a reset link has been sent.', 'info');
    }
}

async function handleLogout() {
    try {
        await auth.signOut();
        closeProfileMenu();
        showToast('Logged out.', 'info');
        if (currentPage === 'admin' || currentPage === 'mystories') navigateTo('home');
    } catch (e) {
        showToast('Logout failed.', 'error');
    }
}

async function handleChangePassword() {
    const nw = gv('pw-new'), cf = gv('pw-confirm');
    if (!nw) return showToast('Enter a new password.', 'warning');
    if (nw.length < 6) return showToast('Password must be 6+ characters.', 'warning');
    if (nw !== cf) return showToast('Passwords do not match.', 'warning');

    try {
        await currentUser.updatePassword(nw);
        closePasswordModal();
        showToast('Password updated!', 'success');
    } catch (e) {
        console.error('Change pw error:', e);
        if (e.code === 'auth/requires-recent-login') {
            showToast('Please log out and log back in, then try again.', 'warning');
        } else {
            showToast('Failed to update password.', 'error');
        }
    }
}

function clearAuthForms() {
    ['login-email', 'login-password', 'signup-name', 'signup-email', 'signup-password', 'signup-confirm', 'signup-neighborhood', 'forgot-email'].forEach(id => {
        const e = gi(id); if (e) e.value = '';
    });
}

/* ═══════════════════════════════════════════════
   AUTH UI
   ═══════════════════════════════════════════════ */
function updateAuthUI() {
    const authBtns = gi('nav-auth-btns'), profile = gi('nav-user-profile');
    const adminNav = gi('nav-admin'), adminMobile = gi('mobile-nav-admin');
    const captureGate = gi('capture-auth-gate'), captureForm = gi('capture-form-area');
    const mobileAuth = gi('mobile-auth-area');

    if (currentUser && userProfile) {
        authBtns.classList.add('hidden');
        profile.classList.remove('hidden');
        const initial = (userProfile.name || 'U').charAt(0).toUpperCase();
        gi('nav-avatar').textContent = initial;
        gi('nav-username').textContent = (userProfile.name || 'User').split(' ')[0];
        gi('pd-avatar').textContent = initial;
        gi('pd-name').textContent = userProfile.name || 'User';
        gi('pd-email').textContent = userProfile.email || currentUser.email;
        gi('pd-role').textContent = userProfile.role === 'admin' ? 'Admin' : 'User';
        if (adminNav) adminNav.style.display = userProfile.role === 'admin' ? '' : 'none';
        if (adminMobile) adminMobile.style.display = userProfile.role === 'admin' ? '' : 'none';
        if (captureGate) captureGate.classList.add('hidden');
        if (captureForm) captureForm.style.display = '';
        if (mobileAuth) mobileAuth.innerHTML = `<button class="mobile-nav-link" onclick="handleLogout()"><i data-lucide="log-out"></i> Logout (${(userProfile.name || 'User').split(' ')[0]})</button>`;
    } else {
        authBtns.classList.remove('hidden');
        profile.classList.add('hidden');
        if (adminNav) adminNav.style.display = 'none';
        if (adminMobile) adminMobile.style.display = 'none';
        if (captureGate) captureGate.classList.remove('hidden');
        if (captureForm) captureForm.style.display = 'none';
        if (mobileAuth) mobileAuth.innerHTML = `<button class="mobile-nav-link" onclick="openAuthModal('login')"><i data-lucide="log-in"></i> Login</button><button class="mobile-nav-link" onclick="openAuthModal('signup')"><i data-lucide="user-plus"></i> Sign Up</button>`;
    }
    refreshIcons();
}

function openAuthModal(tab = 'login') { gi('auth-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; switchAuthTab(tab); refreshIcons(); }
function closeAuthModal() { gi('auth-modal').classList.add('hidden'); document.body.style.overflow = ''; }
function switchAuthTab(tab) { document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab)); document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active')); const el = gi(`auth-${tab}`); if (el) el.classList.add('active'); }

/* ═══════════════════════════════════════════════
   PROFILE
   ═══════════════════════════════════════════════ */
function toggleProfileMenu() { profileMenuOpen = !profileMenuOpen; gi('profile-dropdown').classList.toggle('hidden', !profileMenuOpen); refreshIcons(); }
function closeProfileMenu() { profileMenuOpen = false; gi('profile-dropdown').classList.add('hidden'); }

function openProfileModal() {
    closeProfileMenu(); if (!userProfile) return;
    gi('profile-name').value = userProfile.name || '';
    gi('profile-neighborhood').value = userProfile.neighborhood || '';
    gi('profile-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; refreshIcons();
}
function closeProfileModal() { gi('profile-modal').classList.add('hidden'); document.body.style.overflow = ''; }

async function saveProfile() {
    if (!currentUser || !userProfile) return;
    const name = gv('profile-name'), hood = gv('profile-neighborhood');
    if (!name) return showToast('Name is required.', 'warning');

    try {
        await db.collection('users').doc(currentUser.uid).update({ name, neighborhood: hood });
        await currentUser.updateProfile({ displayName: name });
        userProfile.name = name;
        userProfile.neighborhood = hood;
        updateAuthUI();
        closeProfileModal();
        showToast('Profile updated!', 'success');
    } catch (e) {
        console.error('Save profile error:', e);
        showToast('Failed to save profile.', 'error');
    }
}

function openChangePasswordModal() { closeProfileMenu(); gi('password-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; refreshIcons(); }
function closePasswordModal() { gi('password-modal').classList.add('hidden'); document.body.style.overflow = '';['pw-new', 'pw-confirm'].forEach(id => { const e = gi(id); if (e) e.value = ''; }); }

/* ═══════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════ */
function navigateTo(page) {
    if ((page === 'capture' || page === 'mystories') && !currentUser) { openAuthModal('login'); return; }
    if (page === 'admin' && (!userProfile || userProfile.role !== 'admin')) { showToast('Admin access only.', 'error'); return; }
    currentPage = page; closeProfileMenu();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const t = gi(`page-${page}`); if (t) { t.classList.add('active'); t.style.animation = 'none'; t.offsetHeight; t.style.animation = ''; }
    document.querySelectorAll('.nav-link,.mobile-nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
    if (mobileNavOpen) toggleMobileNav(); window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'map') { renderPins(); renderFeed(); }
    if (page === 'legacy') animateLegacyStats();
    if (page === 'mystories') renderMyStories();
    if (page === 'admin') renderAdmin();
    if (page === 'capture') updateAuthUI();
    refreshIcons();
}
function toggleMobileNav() { mobileNavOpen = !mobileNavOpen; gi('mobile-nav').classList.toggle('open', mobileNavOpen); gi('nav-hamburger').classList.toggle('open', mobileNavOpen); }

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
function createParticles() { const c = gi('hero-particles'); if (!c) return; const cols = ['#00e5ff', '#d500f9', '#ffab00', '#00e676']; for (let i = 0; i < CONFIG.particleCount; i++) { const p = document.createElement('div'); p.className = 'particle'; const s = Math.random() * 4 + 2; p.style.cssText = `width:${s}px;height:${s}px;background:${cols[Math.floor(Math.random() * 4)]};left:${Math.random() * 100}%;bottom:-10px;animation-duration:${Math.random() * 8 + 6}s;animation-delay:${Math.random() * 5}s;opacity:${Math.random() * .5 + .2}`; c.appendChild(p); } }
function startCarousel() { const el = gi('ml-text'); if (!el) return; let i = 0; setInterval(() => { i = (i + 1) % TRANSLATIONS.length; el.style.opacity = 0; el.style.transform = 'translateY(8px)'; setTimeout(() => { el.textContent = TRANSLATIONS[i].text; el.style.opacity = 1; el.style.transform = 'translateY(0)'; }, 300); }, CONFIG.multilingualInterval); }
function animateStats() { setTimeout(() => { animN('stat-stories', stories.length, 1200); const h = {}; stories.forEach(s => h[s.neighborhood] = 1); animN('stat-neighborhoods', Object.keys(h).length, 1000); }, 300); }
function animN(id, tgt, dur) { const el = gi(id); if (!el) return; const s = performance.now(); (function u(n) { const p = Math.min((n - s) / dur, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(tgt * e); if (p < 1) requestAnimationFrame(u); })(s); }
function animateLegacyStats() { document.querySelectorAll('.ls-stat .ls-number').forEach(el => { const t = parseFloat(el.dataset.target); if (!t) return; const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', isF = String(t).includes('.'); const s = performance.now(); (function u(n) { const p = Math.min((n - s) / 1500, 1), e = 1 - Math.pow(1 - p, 3), v = isF ? (t * e).toFixed(1) : Math.round(t * e); el.textContent = `${pre}${v}${suf}`; if (p < 1) requestAnimationFrame(u); })(s); }); }

/* ═══════════════════════════════════════════════
   MEDIA CAPTURE
   ═══════════════════════════════════════════════ */
function setupCapture() { const z = gi('media-capture-zone'), inp = gi('media-input'); if (!z || !inp) return; z.addEventListener('click', e => { if (e.target.closest('.btn-remove-media')) return; if (!capturedMedia) inp.click(); }); inp.addEventListener('change', onMediaSelected); }
function openMediaCapture(t) { const inp = gi('media-input'); inp.setAttribute('accept', t === 'image' ? 'image/*' : 'video/*'); inp.click(); }
function onMediaSelected(e) { const f = e.target.files[0]; if (!f) return; capturedMedia = f; gi('capture-placeholder').classList.add('hidden'); gi('btn-remove-media').classList.remove('hidden'); gi('media-capture-zone').classList.add('has-media'); if (f.type.startsWith('image/')) { const r = new FileReader(); r.onload = ev => { capturedDataUrl = ev.target.result; const img = gi('capture-preview-img'); img.src = capturedDataUrl; img.classList.remove('hidden'); }; r.readAsDataURL(f); } else { capturedDataUrl = null; const v = gi('capture-preview-video'); v.src = URL.createObjectURL(f); v.classList.remove('hidden'); } gi('btn-next-step2').disabled = false; gi('btn-next-step2').classList.remove('disabled'); showToast('Media captured!', 'success'); refreshIcons(); }
function removeMedia(e) { e.stopPropagation(); capturedMedia = null; capturedDataUrl = null; gi('media-input').value = ''; gi('capture-placeholder').classList.remove('hidden'); gi('capture-preview-img').classList.add('hidden'); gi('capture-preview-video').classList.add('hidden'); gi('btn-remove-media').classList.add('hidden'); gi('media-capture-zone').classList.remove('has-media'); gi('btn-next-step2').disabled = true; gi('btn-next-step2').classList.add('disabled'); refreshIcons(); }
function setupCharCount() { const ta = gi('story-caption'), ct = gi('char-count'); if (ta && ct) ta.addEventListener('input', () => ct.textContent = ta.value.length); }

/* ═══════════════════════════════════════════════
   CAPTURE STEPS
   ═══════════════════════════════════════════════ */
function goToCaptureStep(step) {
    if (step === 2 && !capturedMedia) return;
    if (step === 3) { const nh = gv('neighborhood-select'); if (!nh) { showToast('Select a neighborhood.', 'warning'); return; } submitStory(); }
    captureStep = step; document.querySelectorAll('.capture-step').forEach(s => s.classList.remove('active'));
    const t = gi(`capture-step-${step}`); if (t) t.classList.add('active');
    document.querySelectorAll('.csi-step').forEach(s => { const n = parseInt(s.dataset.cstep); s.classList.remove('active', 'completed'); if (n === step) s.classList.add('active'); if (n < step) s.classList.add('completed'); }); refreshIcons();
}

async function submitStory() {
    if (!currentUser || !userProfile) return;
    const hood = gv('neighborhood-select'), hoodLabel = gi('neighborhood-select').selectedOptions[0]?.text || hood;
    const cap = gv('story-caption') || 'My Fan Festival moment!';
    const mt = capturedMedia?.type?.startsWith('video/') ? 'video' : 'photo';

    // Compress image data URL to reduce Firestore doc size (max 1MB)
    let thumb = '';
    if (capturedDataUrl) {
        try {
            thumb = await compressImage(capturedDataUrl, 400, 0.6);
        } catch (e) { thumb = ''; }
    }

    try {
        const docRef = await db.collection('stories').add({
            userId: currentUser.uid, name: userProfile.name || 'Anonymous',
            neighborhood: hood, hoodLabel, caption: cap, type: mt,
            timestamp: Date.now(), isNew: true, thumb,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        lastPinnedStory = { id: docRef.id, name: userProfile.name, hoodLabel, caption: cap, type: mt };
        gi('pin-summary').innerHTML = `
            <div class="pin-summary-item"><span class="label"><i data-lucide="user"></i> Name</span><span class="value">${userProfile.name}</span></div>
            <div class="pin-summary-item"><span class="label"><i data-lucide="map-pin"></i> Hood</span><span class="value">${hoodLabel}</span></div>
            <div class="pin-summary-item"><span class="label"><i data-lucide="${mt === 'video' ? 'video' : 'camera'}"></i> Type</span><span class="value">${mt}</span></div>
            <div class="pin-summary-item"><span class="label"><i data-lucide="message-square"></i> Caption</span><span class="value">${cap}</span></div>`;

        await loadStories();
        showToast('Story pinned!', 'success');
    } catch (e) {
        console.error('Submit story error:', e);
        showToast('Failed to pin story. Try again.', 'error');
    }
    refreshIcons();
}

function compressImage(dataUrl, maxW, quality) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let w = img.width, h = img.height;
            if (w > maxW) { h = (maxW / w) * h; w = maxW; }
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve('');
        img.src = dataUrl;
    });
}

function resetCapture() { capturedMedia = null; capturedDataUrl = null; gi('media-input').value = ''; gi('capture-placeholder').classList.remove('hidden'); gi('capture-preview-img').classList.add('hidden'); gi('capture-preview-video').classList.add('hidden'); gi('btn-remove-media').classList.add('hidden'); gi('media-capture-zone').classList.remove('has-media'); gi('btn-next-step2').disabled = true; gi('btn-next-step2').classList.add('disabled'); gi('story-caption').value = ''; gi('char-count').textContent = '0'; goToCaptureStep(1); }
function shareStory() { const s = lastPinnedStory, txt = s ? `${s.name} pinned from ${s.hoodLabel}: "${s.caption}"` : 'Pin your story at FIFA Fan Festival Toronto!'; if (navigator.share) navigator.share({ title: 'Scaling the Soul', text: txt, url: location.href }).catch(() => { }); else navigator.clipboard.writeText(txt + ' — ' + location.href).then(() => showToast('Copied!', 'info')).catch(() => { }); }

/* ═══════════════════════════════════════════════
   MAP PINS
   ═══════════════════════════════════════════════ */
function renderPins() { const g = gi('pins-group'); if (!g) return; g.innerHTML = ''; const filtered = currentFilter === 'all' ? stories : stories.filter(s => s.type === currentFilter); filtered.forEach(s => { const c = HOOD_COORDS[s.neighborhood]; if (!c) return; const x = c.x + (Math.random() - .5) * 30, y = c.y + (Math.random() - .5) * 20, col = s.type === 'video' ? '#d500f9' : '#00e5ff'; const pin = svgEl('g'); pin.setAttribute('class', 'map-pin'); pin.setAttribute('transform', `translate(${x},${y})`); pin.onclick = () => openPinModal(s); const gl = svgEl('circle'); gl.setAttribute('r', '14'); gl.setAttribute('fill', s.isNew ? 'url(#pinGlowNew)' : col); gl.setAttribute('opacity', '0.25'); gl.setAttribute('class', 'pin-glow'); const dt = svgEl('circle'); dt.setAttribute('r', s.isNew ? '5' : '4'); dt.setAttribute('fill', s.isNew ? '#ffab00' : col); dt.setAttribute('filter', 'url(#glow)'); pin.appendChild(gl); pin.appendChild(dt); g.appendChild(pin); }); }
function filterStories(t) { currentFilter = t; document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === t)); renderPins(); renderFeed(); refreshIcons(); }

/* ═══════════════════════════════════════════════
   STORY FEED
   ═══════════════════════════════════════════════ */
function renderFeed(q) { const feed = gi('story-feed'); if (!feed) return; feed.innerHTML = ''; let f = currentFilter === 'all' ? stories : stories.filter(s => s.type === currentFilter); if (q) { const ql = q.toLowerCase(); f = f.filter(s => (s.name || '').toLowerCase().includes(ql) || (s.hoodLabel || '').toLowerCase().includes(ql) || (s.caption || '').toLowerCase().includes(ql)); } if (!f.length) { feed.innerHTML = '<div style="text-align:center;padding:32px;color:var(--text-muted)">No stories found.</div>'; return; } f.forEach((s, i) => { const d = document.createElement('div'); d.className = 'feed-card'; d.style.animationDelay = `${i * .06}s`; d.onclick = () => openPinModal(s); const th = s.thumb ? `<img src="${s.thumb}" alt="${s.name}">` : `<i data-lucide="${s.type === 'video' ? 'video' : 'camera'}"></i>`; d.innerHTML = `<div class="feed-thumb">${th}</div><div class="feed-info"><div class="feed-name">${s.name || 'Anonymous'}${s.isNew ? '<i data-lucide="sparkles" class="new-badge"></i>' : ''}</div><div class="feed-neighborhood"><i data-lucide="map-pin"></i> ${s.hoodLabel || s.neighborhood}</div><div class="feed-caption">${s.caption}</div><div class="feed-time"><i data-lucide="clock"></i> ${timeAgo(s.timestamp)}</div></div>`; feed.appendChild(d); }); refreshIcons(); }
function filterFeed() { renderFeed(gv('feed-search-input')); }
function timeAgo(ts) { const d = Date.now() - ts, m = Math.floor(d / 60000), h = Math.floor(d / 3600000); if (m < 1) return 'Just now'; if (m < 60) return m + 'm ago'; if (h < 24) return h + 'h ago'; return Math.floor(h / 24) + 'd ago'; }

/* ═══════════════════════════════════════════════
   PIN MODAL
   ═══════════════════════════════════════════════ */
function openPinModal(s) {
    const modal = gi('pin-modal'), body = gi('pin-modal-body');
    const media = s.thumb ? `<img class="modal-story-img" src="${s.thumb}">` : `<div class="modal-story-media-placeholder"><i data-lucide="${s.type === 'video' ? 'video' : 'camera'}"></i></div>`;
    const isOwner = currentUser && s.userId === currentUser.uid;
    const isAdmin = userProfile && userProfile.role === 'admin';
    const safeCaption = (s.caption || '').replace(/'/g, "\\'").replace(/\n/g, ' ');
    let actions = `<button class="btn btn-outline btn-sm" onclick="sharePin('${s.name || ''}','${s.hoodLabel || ''}','${safeCaption}')"><i data-lucide="share-2"></i> Share</button>`;
    if (isOwner || isAdmin) { actions += ` <button class="btn btn-sm btn-secondary" onclick="closePinModal();openEditStory('${s.id}')"><i data-lucide="edit-3"></i> Edit</button> <button class="btn btn-sm btn-danger" onclick="closePinModal();confirmDeleteStory('${s.id}')"><i data-lucide="trash-2"></i> Delete</button>`; }
    body.innerHTML = `${media}<div class="modal-story-name">${s.name || 'Anonymous'}</div><div class="modal-story-neighborhood"><i data-lucide="map-pin"></i> ${s.hoodLabel || s.neighborhood}</div><div class="modal-story-caption">${s.caption}</div><div class="modal-story-time"><i data-lucide="clock"></i> ${timeAgo(s.timestamp)}</div><div class="modal-actions">${actions}</div>`;
    modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; refreshIcons();
}
function closePinModal() { gi('pin-modal').classList.add('hidden'); document.body.style.overflow = ''; }
function sharePin(n, h, c) { const t = `${n} from ${h}: "${c}" — Scaling the Soul`; if (navigator.share) navigator.share({ title: 'Scaling the Soul', text: t, url: location.href }).catch(() => { }); else navigator.clipboard.writeText(t).then(() => showToast('Copied!', 'info')).catch(() => { }); }

/* ═══════════════════════════════════════════════
   STORY CRUD (Firestore)
   ═══════════════════════════════════════════════ */
function openEditStory(id) {
    const s = stories.find(x => x.id === id); if (!s) return;
    gi('edit-story-id').value = id; gi('edit-neighborhood').value = s.neighborhood; gi('edit-caption').value = s.caption;
    gi('edit-story-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; refreshIcons();
}
function closeEditStoryModal() { gi('edit-story-modal').classList.add('hidden'); document.body.style.overflow = ''; }

async function saveEditStory() {
    const id = gv('edit-story-id'), s = stories.find(x => x.id === id); if (!s) return;
    if (!currentUser || (s.userId !== currentUser.uid && (!userProfile || userProfile.role !== 'admin'))) return showToast('Permission denied.', 'error');
    const hood = gv('edit-neighborhood'), sel = gi('edit-neighborhood'), hoodLabel = sel.selectedOptions[0]?.text || hood, cap = gv('edit-caption');

    try {
        await db.collection('stories').doc(id).update({ neighborhood: hood, hoodLabel, caption: cap });
        closeEditStoryModal();
        await loadStories();
        if (currentPage === 'mystories') renderMyStories();
        showToast('Story updated!', 'success');
    } catch (e) {
        console.error('Edit story error:', e);
        showToast('Failed to update.', 'error');
    }
}

function confirmDeleteStory(id) {
    gi('confirm-title').textContent = 'Delete Story?';
    gi('confirm-message').textContent = 'This will permanently remove this story.';
    confirmCallback = () => deleteStory(id);
    gi('confirm-dialog').classList.remove('hidden'); document.body.style.overflow = 'hidden'; refreshIcons();
}

async function deleteStory(id) {
    const s = stories.find(x => x.id === id); if (!s) return;
    if (!currentUser || (s.userId !== currentUser.uid && (!userProfile || userProfile.role !== 'admin'))) return showToast('Permission denied.', 'error');

    try {
        await db.collection('stories').doc(id).delete();
        await loadStories();
        if (currentPage === 'mystories') renderMyStories();
        if (currentPage === 'admin') renderAdmin();
        showToast('Story deleted.', 'info');
    } catch (e) {
        console.error('Delete story error:', e);
        showToast('Failed to delete.', 'error');
    }
}

/* ═══════════════════════════════════════════════
   MY STORIES
   ═══════════════════════════════════════════════ */
function renderMyStories() {
    if (!currentUser) return;
    const list = gi('mystories-list'), empty = gi('mystories-empty');
    const mine = stories.filter(s => s.userId === currentUser.uid);
    if (!mine.length) { list.innerHTML = ''; empty.classList.remove('hidden'); refreshIcons(); return; }
    empty.classList.add('hidden'); list.innerHTML = '';
    mine.forEach(s => {
        const c = document.createElement('div'); c.className = 'my-story-card';
        c.innerHTML = `<div class="my-story-header"><span class="my-story-type ${s.type}"><i data-lucide="${s.type === 'video' ? 'video' : 'camera'}"></i> ${s.type}</span><div class="my-story-actions"><button class="btn-icon" onclick="openEditStory('${s.id}')" title="Edit"><i data-lucide="edit-3"></i></button><button class="btn-icon danger" onclick="confirmDeleteStory('${s.id}')" title="Delete"><i data-lucide="trash-2"></i></button></div></div><div class="my-story-hood"><i data-lucide="map-pin"></i> ${s.hoodLabel || s.neighborhood}</div><div class="my-story-caption">${s.caption}</div><div class="my-story-time"><i data-lucide="clock"></i> ${timeAgo(s.timestamp)}</div>`;
        list.appendChild(c);
    }); refreshIcons();
}

/* ═══════════════════════════════════════════════
   VENDORS
   ═══════════════════════════════════════════════ */
function renderVendors() {
    const g = gi('vendor-grid'); if (!g) return; g.innerHTML = '';
    VENDORS.forEach((v, i) => {
        const c = document.createElement('div'); c.className = 'vendor-card'; c.onclick = () => openVendorDetail(i);
        c.innerHTML = `<div class="vendor-icon ${v.cls}"><i data-lucide="${v.icon}"></i></div><div class="vendor-name">${v.name}</div><div class="vendor-type">${v.type}</div><div class="vendor-desc">${v.desc}</div><span class="vendor-badge"><i data-lucide="${v.bi}"></i> ${v.badge}</span>`;
        g.appendChild(c);
    }); refreshIcons();
}
function openVendorDetail(i) {
    const v = VENDORS[i]; if (!v) return;
    const body = gi('vendor-modal-body');
    body.innerHTML = `<div class="vendor-detail-header" style="display:flex;align-items:center;gap:16px;margin-bottom:16px"><div class="vendor-icon ${v.cls}" style="width:52px;height:52px;border-radius:14px"><i data-lucide="${v.icon}"></i></div><div><h2 style="font-size:20px">${v.name}</h2><span style="font-size:12px;color:var(--gold);text-transform:uppercase">${v.type}</span></div></div><p style="color:var(--text-secondary);margin-bottom:16px;line-height:1.6">${v.detail}</p><span class="vendor-badge" style="margin-bottom:16px;display:inline-flex"><i data-lucide="${v.bi}"></i> ${v.badge}</span><div class="admin-stat-grid" style="margin-top:16px"><div class="admin-stat-card"><div class="admin-stat-val">${v.stats.emp}</div><div class="admin-stat-label">Employees</div></div><div class="admin-stat-card"><div class="admin-stat-val">${v.stats.yrs}</div><div class="admin-stat-label">Years</div></div><div class="admin-stat-card"><div class="admin-stat-val">${v.stats.youth}</div><div class="admin-stat-label">Youth Hired</div></div><div class="admin-stat-card"><div class="admin-stat-val">${v.stats.rev}</div><div class="admin-stat-label">Revenue</div></div></div>`;
    gi('vendor-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; refreshIcons();
}
function closeVendorModal() { gi('vendor-modal').classList.add('hidden'); document.body.style.overflow = ''; }

/* ═══════════════════════════════════════════════
   PITCHES
   ═══════════════════════════════════════════════ */
function renderPitches(q) { const list = gi('pitch-list'); if (!list) return; list.innerHTML = ''; let f = PITCHES; if (q) { const ql = q.toLowerCase(); f = PITCHES.filter(p => p.name.toLowerCase().includes(ql) || p.loc.toLowerCase().includes(ql)); } f.forEach(p => { const c = document.createElement('div'); c.className = 'pitch-card'; const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.loc + ', Toronto')}`; c.innerHTML = `<div class="pitch-name"><svg class="custom-icon" width="16" height="16"><use href="#icon-soccer"/></svg> ${p.name}</div><div class="pitch-location"><i data-lucide="map-pin"></i> ${p.loc}</div><div class="pitch-desc">${p.desc}</div><div class="pitch-footer"><span class="pitch-status ${p.st}"><i data-lucide="${p.st === 'open' ? 'check-circle' : 'clock'}"></i> ${p.st === 'open' ? 'Open' : 'Coming Soon'}</span><a href="${url}" target="_blank" class="pitch-directions" onclick="event.stopPropagation()"><i data-lucide="navigation"></i> Directions</a></div>`; list.appendChild(c); }); refreshIcons(); }
function filterPitches() { renderPitches(gv('pitch-search-input')); }

/* ═══════════════════════════════════════════════
   ADMIN PANEL (Firestore)
   ═══════════════════════════════════════════════ */
function switchAdminTab(tab) { document.querySelectorAll('.admin-tab').forEach(t => { const txt = t.textContent.toLowerCase(); t.classList.toggle('active', txt.includes(tab)); }); document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active')); const el = gi(`admin-tab-${tab}`); if (el) el.classList.add('active'); renderAdmin(); refreshIcons(); }

async function renderAdmin() {
    await loadAllUsers();
    renderAdminUsers(); renderAdminStories(); renderAdminStats();
}

function renderAdminUsers() {
    const el = gi('admin-users-list'); if (!el) return;
    if (!allUsers.length) { el.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:32px">No users.</p>'; return; }
    let html = '<table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Hood</th><th>Actions</th></tr></thead><tbody>';
    allUsers.forEach(u => {
        html += `<tr><td>${u.name || 'N/A'}</td><td>${u.email || 'N/A'}</td><td><span class="role-badge ${u.role}">${u.role}</span></td><td>${u.neighborhood || '-'}</td><td><div style="display:flex;gap:4px">${u.role === 'admin' ? `<button class="btn-icon" onclick="changeRole('${u.id}','user')" title="Demote"><i data-lucide="arrow-down"></i></button>` : `<button class="btn-icon" onclick="changeRole('${u.id}','admin')" title="Promote"><i data-lucide="arrow-up"></i></button>`}${u.id !== currentUser?.uid ? `<button class="btn-icon danger" onclick="confirmDeleteUser('${u.id}','${(u.name || '').replace(/'/g, "\\'")}')" title="Delete"><i data-lucide="trash-2"></i></button>` : ''}</div></td></tr>`;
    });
    html += '</tbody></table>'; el.innerHTML = html; refreshIcons();
}

function renderAdminStories() {
    const el = gi('admin-stories-list'); if (!el) return;
    if (!stories.length) { el.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:32px">No stories.</p>'; return; }
    let html = '<table class="admin-table"><thead><tr><th>Author</th><th>Hood</th><th>Type</th><th>Caption</th><th>Actions</th></tr></thead><tbody>';
    stories.forEach(s => {
        html += `<tr><td>${s.name || 'Anon'}</td><td>${s.hoodLabel || s.neighborhood}</td><td>${s.type}</td><td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.caption || ''}</td><td><div style="display:flex;gap:4px"><button class="btn-icon" onclick="openEditStory('${s.id}')" title="Edit"><i data-lucide="edit-3"></i></button><button class="btn-icon danger" onclick="confirmDeleteStory('${s.id}')" title="Delete"><i data-lucide="trash-2"></i></button></div></td></tr>`;
    });
    html += '</tbody></table>'; el.innerHTML = html; refreshIcons();
}

function renderAdminStats() {
    const el = gi('admin-stats'); if (!el) return;
    const hoods = {}; stories.forEach(s => hoods[s.neighborhood] = 1);
    el.innerHTML = `<div class="admin-stat-grid"><div class="admin-stat-card"><div class="admin-stat-val">${allUsers.length}</div><div class="admin-stat-label">Users</div></div><div class="admin-stat-card"><div class="admin-stat-val">${stories.length}</div><div class="admin-stat-label">Stories</div></div><div class="admin-stat-card"><div class="admin-stat-val">${Object.keys(hoods).length}</div><div class="admin-stat-label">Neighborhoods</div></div><div class="admin-stat-card"><div class="admin-stat-val">${stories.filter(s => s.type === 'photo').length}</div><div class="admin-stat-label">Photos</div></div><div class="admin-stat-card"><div class="admin-stat-val">${stories.filter(s => s.type === 'video').length}</div><div class="admin-stat-label">Videos</div></div><div class="admin-stat-card"><div class="admin-stat-val">${allUsers.filter(u => u.role === 'admin').length}</div><div class="admin-stat-label">Admins</div></div></div>`;
}

async function changeRole(uid, role) {
    try {
        await db.collection('users').doc(uid).update({ role });
        await renderAdmin();
        const u = allUsers.find(x => x.id === uid);
        showToast(`${u?.name || 'User'} is now ${role}.`, 'success');
    } catch (e) { console.error('Change role error:', e); showToast('Failed to change role.', 'error'); }
}

function confirmDeleteUser(uid, name) {
    gi('confirm-title').textContent = 'Delete User?';
    gi('confirm-message').textContent = `Remove ${name}? Their stories will also be deleted.`;
    confirmCallback = () => deleteUser(uid);
    gi('confirm-dialog').classList.remove('hidden'); document.body.style.overflow = 'hidden'; refreshIcons();
}

async function deleteUser(uid) {
    try {
        // Delete user's stories
        const storiesSnap = await db.collection('stories').where('userId', '==', uid).get();
        const batch = db.batch();
        storiesSnap.forEach(doc => batch.delete(doc.ref));
        batch.delete(db.collection('users').doc(uid));
        await batch.commit();
        await loadStories();
        await renderAdmin();
        showToast('User deleted.', 'info');
    } catch (e) { console.error('Delete user error:', e); showToast('Failed to delete user.', 'error'); }
}

/* ═══════════════════════════════════════════════
   CONFIRM DIALOG
   ═══════════════════════════════════════════════ */
function confirmAction() { if (confirmCallback) confirmCallback(); closeConfirm(); }
function closeConfirm() { gi('confirm-dialog').classList.add('hidden'); document.body.style.overflow = ''; confirmCallback = null; }

/* ═══════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════ */
function showToast(msg, type = 'info') {
    const c = gi('toast-container'), t = document.createElement('div');
    const ic = { success: 'check-circle', info: 'info', warning: 'alert-triangle', error: 'x-circle' };
    t.className = `toast toast-${type}`;
    t.innerHTML = `<i data-lucide="${ic[type] || 'info'}"></i><span class="toast-message">${msg}</span>`;
    c.appendChild(t); refreshIcons();
    setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, 3500);
}

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */
function gi(id) { return document.getElementById(id); }
function gv(id) { const e = gi(id); return e ? e.value.trim() : ''; }
function svgEl(tag) { return document.createElementNS('http://www.w3.org/2000/svg', tag); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePinModal(); closeAuthModal(); closeProfileModal(); closePasswordModal(); closeEditStoryModal(); closeVendorModal(); closeConfirm(); closeProfileMenu(); if (mobileNavOpen) toggleMobileNav(); } });
document.addEventListener('click', e => { if (profileMenuOpen && !e.target.closest('.nav-user-profile') && !e.target.closest('.profile-dropdown')) closeProfileMenu(); });
