// --- วันที่ ---
const dateDisplay = document.getElementById("dateDisplay");
let currentDate = new Date();
function updateDateDisplay() {
  const thMonths = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
  // แก้ไขปีให้แสดงเป็น ค.ศ. (ไม่ต้อง +543)
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

let selectedTempDate = new Date(currentDate.getTime()); // เก็บวันที่เลือกชั่วคราว เริ่มจากวันที่ปัจจุบัน

// ===== ปุ่มเปิดปฏิทิน =====
document.getElementById("openCalendar").onclick = () => {
  calendarModal.classList.add("show");
  // ตั้งค่าวันที่เริ่มต้นในปฏิทินให้ตรงกับวันที่แสดงอยู่
  selectedTempDate = new Date(currentDate.getTime()); 
  renderCalendar(selectedTempDate.getFullYear(), selectedTempDate.getMonth());
};

// ===== ฟังก์ชันแสดงปฏิทิน =====
function renderCalendar(year, month) {
  calendarDays.innerHTML = "";
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
      selectedTempDate && // ตรวจสอบว่า selectedTempDate มีค่า
      i === selectedTempDate.getDate() && // ใช้ selectedTempDate
      month === selectedTempDate.getMonth() &&
      year === selectedTempDate.getFullYear()
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

// ===== ปุ่มเปลี่ยนเดือนในปฏิทิน (เพิ่ม) =====
document.getElementById("prevMonth").onclick = () => {
    selectedTempDate.setMonth(selectedTempDate.getMonth() - 1);
    renderCalendar(selectedTempDate.getFullYear(), selectedTempDate.getMonth());
};

document.getElementById("nextMonth").onclick = () => {
    selectedTempDate.setMonth(selectedTempDate.getMonth() + 1);
    renderCalendar(selectedTempDate.getFullYear(), selectedTempDate.getMonth());
};


// ===== ปุ่มยกเลิก / ตกลง =====
cancelCalendar.onclick = () => {
  // ไม่ต้องเปลี่ยน selectedTempDate
  calendarModal.classList.remove("show");
};

okCalendar.onclick = () => {
  currentDate = selectedTempDate; // ตกลง: ใช้วันที่ใหม่
  updateDateDisplay();
  calendarModal.classList.remove("show");
};


// --- Popup หมวดหมู่ (เหลือเฉพาะ Logic เปิด/ปิด modal) ---
const catModal = document.getElementById("catModal");
const openCategory = document.getElementById("openCategory");
const closeCat = document.getElementById("closeCat");
const catModalContent = catModal?.querySelector('.modal');


// เปิด modal ทั้งคลิกและคีย์บอร์ด
if (openCategory) {
  openCategory.addEventListener('click', () => catModal.classList.add('show'));
  openCategory.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      catModal.classList.add('show');
    }
  });
}

// ปิดเมื่อกดปุ่ม close (closeCat)
if (closeCat) {
  closeCat.addEventListener('click', () => catModal.classList.remove('show'));
}

// ปิดเมื่อคลิกด้านนอก modal (overlay click)
if (catModal && catModalContent) {
  catModal.addEventListener('click', (ev) => {
    if (!catModalContent.contains(ev.target)) {
      catModal.classList.remove('show');
    }
  });
}