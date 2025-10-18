// --- วันที่ ---
const dateDisplay = document.getElementById("dateDisplay");
let currentDate = new Date();
function updateDateDisplay() {
  const thMonths = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
  dateDisplay.textContent = `${currentDate.getDate()} ${thMonths[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}
updateDateDisplay();


document.getElementById("prevDay").onclick = () => { currentDate.setDate(currentDate.getDate()-1); updateDateDisplay(); };
document.getElementById("nextDay").onclick = () => { currentDate.setDate(currentDate.getDate()+1); updateDateDisplay(); };

// ===== ปฏิทิน: ตัวแปรหลัก =====
const calendarModal = document.getElementById("calendarModal");
const calendarDays = document.getElementById("calendarDays");
const monthLabel = document.getElementById("monthLabel");
const cancelCalendar = document.getElementById("cancelCalendar");
const okCalendar = document.getElementById("okCalendar");

let selectedTempDate = new Date(); // เก็บวันที่เลือกชั่วคราว

// ===== ปุ่มเปิดปฏิทิน =====
document.getElementById("openCalendar").onclick = () => {
  calendarModal.classList.add("show");
  renderCalendar();
};

// ===== ฟังก์ชันแสดงปฏิทิน =====
function renderCalendar() {
  calendarDays.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  monthLabel.textContent = `${monthNames[month]} ${year + 543}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendarDays.appendChild(empty);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.className = "day";
    day.textContent = i;

    // วันปัจจุบัน
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("today");
    }

    // วันเลือก
    if (
      i === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      day.classList.add("selected");
    }

    day.onclick = () => {
      document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
      day.classList.add("selected");
      selectedTempDate = new Date(year, month, i);
    };

    calendarDays.appendChild(day);
  }
}

// ===== ปุ่มยกเลิก / ตกลง =====
cancelCalendar.onclick = () => {
  selectedTempDate = currentDate; // ยกเลิก: คืนค่าก่อนหน้า
  calendarModal.classList.remove("show");
};

okCalendar.onclick = () => {
  currentDate = selectedTempDate; // ตกลง: ใช้วันที่ใหม่
  updateDateDisplay();
  calendarModal.classList.remove("show");
};






// --- Popup หมวดหมู่ ---
const catModal = document.getElementById("catModal");
const openCategory = document.getElementById("openCategory");
const closeCat = document.getElementById("closeCat");
const confirmCat = document.getElementById("confirmCat");
const tabExpense = document.getElementById("tabExpense");
const tabIncome = document.getElementById("tabIncome");
const expenseGrid = document.getElementById("expenseGrid");
const incomeGrid = document.getElementById("incomeGrid");
const catIcon = document.getElementById("catIcon");
const catText = document.getElementById("catText");

openCategory.onclick = () => catModal.classList.add("show");
closeCat.onclick = () => catModal.classList.remove("show");

tabExpense.onclick = () => {
  tabExpense.classList.add("active");
  tabIncome.classList.remove("active");
  expenseGrid.classList.remove("hidden");
  incomeGrid.classList.add("hidden");
};
tabIncome.onclick = () => {
  tabIncome.classList.add("active");
  tabExpense.classList.remove("active");
  incomeGrid.classList.remove("hidden");
  expenseGrid.classList.add("hidden");
};

let selectedItem = document.querySelector(".item.active");
document.querySelectorAll(".item").forEach(item => {
  item.onclick = () => {
    document.querySelectorAll(".item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    selectedItem = item;
  };
});

confirmCat.onclick = () => {
  if (selectedItem) {
    catIcon.className = `fa-solid ${selectedItem.dataset.icon}`;
    catText.textContent = selectedItem.dataset.text;
  }
  catModal.classList.remove("show");
};

// --- เสริมให้แน่ใจ: คลิกที่กล่องหมวดหมู่จะเปิด modal เสมอ ---
const openCategoryBtn = document.getElementById('openCategory');
const catOverlay = document.getElementById('catModal'); // ควรมี id catModal
const catModalContent = catOverlay?.querySelector('.modal');

// เปิด modal ทั้งคลิกและคีย์บอร์ด (Enter / Space)
if (openCategoryBtn) {
  openCategoryBtn.addEventListener('click', () => catOverlay.classList.add('show'));
  openCategoryBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      catOverlay.classList.add('show');
    }
  });
}

// ปิดเมื่อกดปุ่ม close (คุณมีปุ่ม closeCat อยู่แล้ว)
if (typeof closeCat !== 'undefined') {
  closeCat.addEventListener('click', () => catOverlay.classList.remove('show'));
}

// ปิดเมื่อคลิกด้านนอก modal (overlay click) — แต่ถ้าคลิกใน modal ไม่ปิด
if (catOverlay && catModalContent) {
  catOverlay.addEventListener('click', (ev) => {
    if (!catModalContent.contains(ev.target)) {
      catOverlay.classList.remove('show');
    }
  });
}

// ถ้ามีการเลือก category (selectedItem) และกด confirmCat โค้ดเดิมจะอัพเดต icon/text
// (คุณมี confirmCat.onclick อยู่แล้วในไฟล์) — ถ้าต้องการ ผมใส่การอัพเดตให้ซ้ำอีกครั้ง:
if (typeof confirmCat !== 'undefined') {
  confirmCat.addEventListener('click', () => {
    if (selectedItem) {
      catIcon.className = `fa-solid ${selectedItem.dataset.icon}`;
      catText.textContent = selectedItem.dataset.text;
    }
    catOverlay.classList.remove('show');
  });
}


