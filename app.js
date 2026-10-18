/**
 * 南投縣立南投國民中學 115學年度 畢業旅行行動手冊
 * 前端互動核心邏輯
 */

document.addEventListener("DOMContentLoaded", () => {
  // 載入資料確認
  if (typeof TRIP_DATA === "undefined") {
    console.error("TRIP_DATA is not loaded!");
    return;
  }

  // 狀態管理
  const state = {
    activeTab: "itinerary",
    selectedDay: 1,
    searchQuery: "",
    selectedClass: "all",
    selectedBus: "all",
    rosterViewMode: "table", // 'table' or 'card'
    hotelDayView: "both",     // 'both', 'day1', 'day2'
    checklistState: JSON.parse(localStorage.getItem("nantou_trip_pack_list") || "{}")
  };

  // 初始化所有模組
  initNavigation();
  initItinerary();
  initRosterSearch();
  initBuses();
  initAttractions();
  initQuiz();
  initChecklist();
  initNotices();
  initQuickStats();

  /* ==========================================================================
     1. 導航切換 (Desktop Tabs & Mobile Bottom Nav)
     ========================================================================== */
  function initNavigation() {
    const desktopBtns = document.querySelectorAll(".nav-tab-btn");
    const mobileBtns = document.querySelectorAll(".mobile-nav-btn");
    const panes = document.querySelectorAll(".tab-pane");

    function switchTab(targetTab) {
      state.activeTab = targetTab;

      // 更新按鈕狀態
      desktopBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === targetTab);
      });
      mobileBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === targetTab);
      });

      // 更新分頁顯示
      panes.forEach(pane => {
        pane.classList.toggle("active", pane.id === `tab-${targetTab}`);
      });

      // 滾動回頂部
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.switchTabTo = switchTab;

    window.jumpToAttract = function(aid) {
      switchTab('attractions');
      setTimeout(() => {
        const el = document.getElementById(aid);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    };

    desktopBtns.forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    mobileBtns.forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // 檢查網址 hash 是否有指定分頁或景點
    const hash = window.location.hash.replace("#", "");
    if (hash === "attractions" || hash.startsWith("attract-")) {
      switchTab("attractions");
      if (hash.startsWith("attract-")) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }

  /* ==========================================================================
     2. 頂部快速資訊 (Quick Stats & Hotels)
     ========================================================================== */
  function initQuickStats() {
    const hotelContainer = document.getElementById("hero-hotels-container");
    if (!hotelContainer) return;

    hotelContainer.innerHTML = TRIP_DATA.info.hotels.map(h => `
      <div class="quick-card">
        <div>
          <div class="quick-card-title">${h.day}</div>
          <div class="quick-card-hotel">${h.name}</div>
          <div style="font-size:0.75rem; color:rgba(255,255,255,0.85); margin-top:2px;">📍 ${h.address}</div>
        </div>
        <div class="quick-card-actions">
          <a href="${h.telLink}" class="quick-btn">
            📞 打電話 (${h.phone})
          </a>
          <a href="${h.mapUrl}" target="_blank" rel="noopener noreferrer" class="quick-btn">
            🗺️ 地圖導航
          </a>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     3. 行程總覽模組 (3-Day Itinerary)
     ========================================================================== */
  function initItinerary() {
    const daySelector = document.getElementById("day-selector");
    const container = document.getElementById("itinerary-content-container");
    if (!daySelector || !container) return;

    function getAttractId(text) {
      if (!text) return null;
      if (text.includes("月世界")) return "attract-moon-world";
      if (text.includes("海生館") || text.includes("海洋生物")) return "attract-nmmba";
      if (text.includes("貓鼻頭")) return "attract-maobitou";
      if (text.includes("墾丁大街")) return "attract-kenting-street";
      if (text.includes("墾丁福華")) return "attract-kenting-howard";
      if (text.includes("義大遊樂") || text.includes("特洛伊")) return "attract-eda-theme-park";
      if (text.includes("摩天輪") || text.includes("購物廣場")) return "attract-eda-mall";
      if (text.includes("天悅")) return "attract-eda-skylark";
      if (text.includes("旗津") || text.includes("砲台") || text.includes("星空隧道")) return "attract-cijin";
      if (text.includes("奇美")) return "attract-chimei-museum";
      if (text.includes("名間")) return "attract-mingjian-park";
      return null;
    }

    // 渲染天數按鈕
    daySelector.innerHTML = TRIP_DATA.itinerary.map(item => `
      <button class="day-btn ${item.day === state.selectedDay ? "active" : ""}" data-day="${item.day}">
        <span class="day-label">第 ${item.day} 天</span>
        <span class="day-date">${item.date.split(" ")[0]}</span>
      </button>
    `).join("");

    daySelector.querySelectorAll(".day-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.selectedDay = parseInt(btn.dataset.day, 10);
        daySelector.querySelectorAll(".day-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCurrentDayItinerary();
      });
    });

    function renderCurrentDayItinerary() {
      const dayData = TRIP_DATA.itinerary.find(d => d.day === state.selectedDay);
      if (!dayData) return;

      container.innerHTML = `
        <div class="day-summary-box">
          <div class="day-summary-title">🌟 Day ${dayData.day}：${dayData.title}</div>
          <div style="font-size:0.86rem; color:#0369a1; margin-top:4px;">
            🏨 住宿：<strong>${dayData.hotel}</strong> ｜ 📅 日期：${dayData.date}
          </div>
          <div class="day-meals-grid">
            <div class="meal-pill">🥣 早餐：${dayData.meals.breakfast}</div>
            <div class="meal-pill">🍱 午餐：${dayData.meals.lunch}</div>
            <div class="meal-pill">🍽️ 晚餐：${dayData.meals.dinner}</div>
          </div>
          <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="quick-btn" style="background:#0284c7; color:#fff; border:none; padding:7px 14px; font-weight:700; border-radius:6px; cursor:pointer;" onclick="window.switchTabTo('attractions')">
              🏖️ 查看景點與飯店圖文導覽 (全 11 處景點) ➔
            </button>
          </div>
        </div>

        <div class="timeline-flow">
          ${dayData.timeline.map(item => {
            const aid = getAttractId(item.title + ' ' + item.desc);
            return `
              <div class="timeline-item">
                <div class="timeline-dot">●</div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <span class="timeline-name">${item.title}</span>
                    <span class="timeline-time">${item.time}</span>
                  </div>
                  <div class="timeline-desc">${item.desc}</div>
                  ${aid ? `
                    <div style="margin-top:8px;">
                      <button type="button" class="quick-btn" style="border:1px solid #0284c7; color:#0284c7; background:rgba(2,132,199,0.06); padding:3px 10px; font-size:0.8rem; font-weight:700; border-radius:4px; cursor:pointer;" onclick="window.jumpToAttract('${aid}')">
                        📍 點擊查看詳細圖文介紹與影片 ➔
                      </button>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    renderCurrentDayItinerary();
  }

  /* ==========================================================================
     4. 查房分車搜尋系統 (Room & Table Finder)
     ========================================================================== */
  function initRosterSearch() {
    const searchInput = document.getElementById("roster-search-input");
    const clearBtn = document.getElementById("search-clear-btn");
    const classFilterWrap = document.getElementById("class-filter-chips");
    const busFilterWrap = document.getElementById("bus-filter-chips");
    const resultsCountEl = document.getElementById("results-count");
    const tableContainer = document.getElementById("roster-table-container");
    const cardContainer = document.getElementById("roster-cards-container");
    const viewBtns = document.querySelectorAll(".view-btn");

    // 建立班級篩選按鈕
    const classes = ["all", "901", "902", "903", "904", "905", "906", "907", "908", "909", "teachers"];
    classFilterWrap.innerHTML = classes.map(cls => {
      const label = cls === "all" ? "全部對象" : (cls === "teachers" ? "隨團師長" : `${cls}班`);
      return `<button class="filter-chip ${cls === state.selectedClass ? "active" : ""}" data-class="${cls}">${label}</button>`;
    }).join("");

    classFilterWrap.querySelectorAll(".filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        state.selectedClass = chip.dataset.class;
        classFilterWrap.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        renderRosterResults();
      });
    });

    // 建立車次篩選按鈕
    const buses = ["all", 1, 2, 3, 4, 5, 6, 7];
    busFilterWrap.innerHTML = buses.map(b => {
      const label = b === "all" ? "全部車次" : `${b} 車`;
      return `<button class="filter-chip ${b.toString() === state.selectedBus.toString() ? "active" : ""}" data-bus="${b}">${label}</button>`;
    }).join("");

    busFilterWrap.querySelectorAll(".filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        state.selectedBus = chip.dataset.bus;
        busFilterWrap.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        renderRosterResults();
      });
    });

    // 搜尋輸入事件
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      clearBtn.style.display = state.searchQuery ? "flex" : "none";
      renderRosterResults();
    });

    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      clearBtn.style.display = "none";
      renderRosterResults();
      searchInput.focus();
    });

    // 切換視圖 (表格 vs 卡片)
    viewBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        state.rosterViewMode = btn.dataset.view;
        viewBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        tableContainer.style.display = state.rosterViewMode === "table" ? "block" : "none";
        cardContainer.style.display = state.rosterViewMode === "card" ? "grid" : "none";
      });
    });

    function getFilteredData() {
      // 整合學生與老師
      let list = [];

      // 加入學生
      if (state.selectedClass !== "teachers") {
        list = list.concat(TRIP_DATA.students.map(s => ({
          type: "student",
          name: s.name,
          class: s.class,
          gender: s.gender,
          bus: s.bus,
          room1: s.room1,
          table1: s.table1,
          room2: s.room2,
          note: s.note
        })));
      }

      // 加入老師
      if (state.selectedClass === "all" || state.selectedClass === "teachers") {
        list = list.concat(TRIP_DATA.teachers.map(t => ({
          type: "teacher",
          name: t.name,
          class: t.role,
          gender: "師長",
          bus: t.bus,
          room1: t.room1,
          table1: "隨師桌",
          room2: t.room2,
          note: t.note
        })));
      }

      // 班級過濾
      if (state.selectedClass !== "all" && state.selectedClass !== "teachers") {
        list = list.filter(item => item.class === state.selectedClass);
      }

      // 車次過濾
      if (state.selectedBus !== "all") {
        const busNum = parseInt(state.selectedBus, 10);
        list = list.filter(item => item.bus === busNum);
      }

      // 關鍵字搜尋 (姓名、房號、班級、桌次)
      if (state.searchQuery) {
        const q = state.searchQuery;
        list = list.filter(item => {
          return item.name.toLowerCase().includes(q) ||
                 item.class.toLowerCase().includes(q) ||
                 item.room1.toLowerCase().includes(q) ||
                 item.room2.toLowerCase().includes(q) ||
                 (item.table1 && item.table1.toString().includes(q)) ||
                 (item.bus && item.bus.toString().includes(q));
        });
      }

      return list;
    }

    function renderRosterResults() {
      const list = getFilteredData();
      resultsCountEl.innerHTML = `符合筆數：<strong>${list.length}</strong> 位`;

      if (list.length === 0) {
        const emptyHtml = `
          <div style="text-align:center; padding:40px 16px; color:var(--text-muted);">
            <div style="font-size:2.5rem; margin-bottom:8px;">🔍</div>
            <div style="font-weight:700; font-size:1.1rem;">找不到符合條件的名冊資料</div>
            <p style="font-size:0.86rem; margin-top:4px;">請嘗試更換搜尋關鍵字（例如姓名或房號）或重設篩選條件</p>
          </div>
        `;
        tableContainer.innerHTML = emptyHtml;
        cardContainer.innerHTML = emptyHtml;
        return;
      }

      // 渲染表格視圖
      tableContainer.innerHTML = `
        <table class="roster-table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>身份/班級</th>
              <th>車次</th>
              <th>10/21 福華房號</th>
              <th>10/21 桌次</th>
              <th>10/22 天悅房號</th>
              <th>備註</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(item => `
              <tr>
                <td>
                  <strong>${item.name}</strong>
                  ${item.gender === "男" ? '<span class="gender-badge male">男</span>' : (item.gender === "女" ? '<span class="gender-badge female">女</span>' : '')}
                </td>
                <td><span style="font-weight:600; color:var(--text-main);">${item.class}</span></td>
                <td><span class="bus-badge">${typeof item.bus === "number" ? `${item.bus} 車` : item.bus}</span></td>
                <td><span class="room-badge">${item.room1}</span></td>
                <td><span class="table-badge">${item.table1 === "素" ? "🥬 素食桌" : (item.table1 === "隨師桌" ? "隨師桌" : `第 ${item.table1} 桌`)}</span></td>
                <td><span class="room-badge eda">${item.room2}</span></td>
                <td>${item.note ? `<span class="veg-pill">${item.note}</span>` : '－'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;

      // 渲染卡片視圖 (手機極致體驗)
      cardContainer.innerHTML = list.map(item => `
        <div class="student-card">
          <div class="student-card-head">
            <div class="student-card-name">
              ${item.name}
              ${item.gender === "男" ? '<span class="gender-badge male">男</span>' : (item.gender === "女" ? '<span class="gender-badge female">女</span>' : '')}
              ${item.note ? `<span class="veg-pill">${item.note}</span>` : ''}
            </div>
            <div style="display:flex; gap:4px;">
              <span class="bus-badge">${typeof item.bus === "number" ? `${item.bus} 車` : item.bus}</span>
              <span class="table-badge">${item.table1 === "素" ? "🥬 素食" : (item.table1 === "隨師桌" ? "隨師" : `第${item.table1}桌`)}</span>
            </div>
          </div>
          <div style="font-size:0.82rem; color:var(--text-muted); font-weight:600;">
            班級單位：${item.class}
          </div>
          <div class="student-card-rooms">
            <div class="card-room-box">
              <span class="label">10/21 墾丁福華</span>
              <span class="val">${item.room1}</span>
            </div>
            <div class="card-room-box" style="background:#fefce8; border-color:#fef08a;">
              <span class="label">10/22 高雄天悅</span>
              <span class="val" style="color:#92400e;">${item.room2}</span>
            </div>
          </div>
        </div>
      `).join("");
    }

    renderRosterResults();
  }

  /* ==========================================================================
     5. 團務車次模組 (Buses Roster)
     ========================================================================== */
  function initBuses() {
    const container = document.getElementById("buses-content-container");
    if (!container) return;

    container.innerHTML = `
      <div class="bus-cards-grid">
        ${TRIP_DATA.buses.map(bus => `
          <div class="bus-card">
            <div class="bus-card-top">
              <div class="bus-title">
                🚌 ${bus.title}
              </div>
              <div class="bus-count-badge">學生 ${bus.totalStudents} 人</div>
            </div>
            <div style="font-size:0.92rem; font-weight:700; color:var(--text-main); margin-bottom:6px;">
              班級分配：${bus.classes}
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:12px;">
              ${bus.countDetail}
            </div>
            <div class="bus-chaperones-box">
              <div style="font-size:0.78rem; font-weight:700; color:var(--primary-dark); margin-bottom:4px;">隨車師長</div>
              ${bus.chaperones.map(c => `
                <div class="chaperone-item">
                  <span>${c.role}</span>
                  <strong>${c.name} ${c.note ? `(${c.note})` : ''}</strong>
                </div>
              `).join("")}
            </div>
            ${bus.vegCount > 0 ? `
              <div style="font-size:0.78rem; color:#15803d; font-weight:700; display:flex; align-items:center; gap:4px;">
                🥬 本車含素食餐食：${bus.vegCount} 位
              </div>
            ` : ''}
          </div>
        `).join("")}
      </div>

      <!-- 隨團師長總覽 -->
      <div class="card" style="margin-top:24px;">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:14px; color:var(--text-main);">
          👨‍🏫 隨團行政與導師分房對照表
        </h3>
        <div class="roster-table-wrap">
          <table class="roster-table">
            <thead>
              <tr>
                <th>職稱</th>
                <th>姓名</th>
                <th>隨車</th>
                <th>10/21 福華房號</th>
                <th>10/22 天悅房號</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody>
              ${TRIP_DATA.teachers.map(t => `
                <tr>
                  <td><strong>${t.role}</strong></td>
                  <td>${t.name}</td>
                  <td><span class="bus-badge">${typeof t.bus === "number" ? `${t.bus} 車` : t.bus}</span></td>
                  <td><span class="room-badge">${t.roomDay1}</span></td>
                  <td><span class="room-badge eda">${t.roomDay2}</span></td>
                  <td><span style="font-size:0.8rem; color:var(--text-muted);">${t.note}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     6. 景點圖文導覽模組 (Attractions Guide)
     ========================================================================== */
  function initAttractions() {
    const container = document.getElementById("attractions-content-container");
    if (!container) return;

    container.innerHTML = TRIP_DATA.attractions.map(item => `
      <div class="attraction-card" id="attract-${item.id}">
        <div class="attraction-gallery">
          ${item.images.map(img => `
            <img src="${img}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'">
          `).join("")}
        </div>
        <div class="attraction-body">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
            <div>
              <span class="attraction-tag">${item.tag}</span>
              <h3 class="attraction-title">${item.name}</h3>
              <div class="attraction-subtitle">${item.subtitle}</div>
            </div>
            ${item.googleMapUrl ? `
              <a href="${item.googleMapUrl}" target="_blank" rel="noopener noreferrer" class="attract-map-btn">
                🗺️ Google 地圖導航
              </a>
            ` : ''}
          </div>
          <div class="attraction-desc">${item.desc}</div>

          <!-- 景點外連資源：3篇推薦網頁與3部影片 -->
          <div class="attraction-resources">
            ${item.webLinks && item.webLinks.length ? `
              <div>
                <div class="resource-group-title">📖 推薦網頁介紹：</div>
                <div class="resource-chips-grid">
                  ${item.webLinks.map(l => `
                    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="resource-chip web">
                      🌐 ${l.title}
                    </a>
                  `).join("")}
                </div>
              </div>
            ` : ''}

            ${item.videoLinks && item.videoLinks.length ? `
              <div>
                <div class="resource-group-title">🎬 相關推薦影片：</div>
                <div class="resource-chips-grid">
                  ${item.videoLinks.map(v => `
                    <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="resource-chip video">
                      ▶️ ${v.title}
                    </a>
                  `).join("")}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     7. 海生館學習單互動答題 (Interactive Quiz)
     ========================================================================== */
  function initQuiz() {
    const tfContainer = document.getElementById("quiz-tf-container");
    const qaContainer = document.getElementById("quiz-qa-container");
    if (!tfContainer || !qaContainer) return;

    // 渲染是非題
    tfContainer.innerHTML = TRIP_DATA.quiz.trueFalse.map((q, idx) => `
      <div class="quiz-tf-card" id="quiz-tf-card-${idx}">
        <div class="quiz-tf-question">${q.question}</div>
        <div class="quiz-tf-options">
          <button class="quiz-opt-btn" data-qindex="${idx}" data-val="true">⭕ 是</button>
          <button class="quiz-opt-btn" data-qindex="${idx}" data-val="false">❌ 否</button>
        </div>
        <div class="quiz-explanation-box" id="tf-exp-${idx}">
          <strong>💡 正確答案：${q.answerText}</strong>
          <p style="margin-top:4px;">${q.explanation}</p>
        </div>
      </div>
    `).join("");

    tfContainer.querySelectorAll(".quiz-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const qIdx = parseInt(btn.dataset.qindex, 10);
        const userChoice = btn.dataset.val === "true";
        const qData = TRIP_DATA.quiz.trueFalse[qIdx];
        const card = document.getElementById(`quiz-tf-card-${qIdx}`);
        const expBox = document.getElementById(`tf-exp-${qIdx}`);

        // 清除先前狀態
        card.querySelectorAll(".quiz-opt-btn").forEach(b => {
          b.classList.remove("correct", "wrong");
        });

        if (userChoice === qData.answer) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
          // 標記正確按鈕
          const correctBtn = card.querySelector(`.quiz-opt-btn[data-val="${qData.answer}"]`);
          if (correctBtn) correctBtn.classList.add("correct");
        }

        expBox.style.display = "block";
      });
    });

    // 渲染 25 題問答翻卡/折疊
    qaContainer.innerHTML = TRIP_DATA.quiz.qa.map(q => `
      <div class="quiz-qa-card">
        <div class="quiz-qa-header">
          <span class="quiz-qa-num">${q.num}</span>
          <span class="quiz-qa-title">${q.q}</span>
          <span class="quiz-toggle-icon">▼</span>
        </div>
        <div class="quiz-qa-body">
          <div style="font-weight:700; color:var(--primary-dark); margin-bottom:4px;">📝 參考解答：</div>
          ${q.a}
        </div>
      </div>
    `).join("");

    qaContainer.querySelectorAll(".quiz-qa-header").forEach(hdr => {
      hdr.addEventListener("click", () => {
        const card = hdr.closest(".quiz-qa-card");
        card.classList.toggle("open");
      });
    });
  }

  /* ==========================================================================
     8. 行李打包清單模組 (Packing Checklist with LocalStorage)
     ========================================================================== */
  function initChecklist() {
    const container = document.getElementById("checklist-container");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const resetBtn = document.getElementById("reset-checklist-btn");
    if (!container) return;

    function updateProgress() {
      const allItems = TRIP_DATA.packingChecklist.flatMap(g => g.items);
      const total = allItems.length;
      let checked = 0;

      allItems.forEach(item => {
        if (state.checklistState[item.id]) {
          checked++;
        }
      });

      const pct = total === 0 ? 0 : Math.round((checked / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.textContent = `${checked} / ${total} 項完成 (${pct}%)`;
    }

    function renderChecklist() {
      container.innerHTML = TRIP_DATA.packingChecklist.map(group => `
        <div class="checklist-group">
          <div class="checklist-group-title">
            📌 ${group.category}
          </div>
          <div class="checklist-items">
            ${group.items.map(item => {
              const isDone = !!state.checklistState[item.id];
              return `
                <div class="check-item ${isDone ? "done" : ""}" data-id="${item.id}">
                  <div class="check-box">✓</div>
                  <div class="item-text-wrap">
                    <div class="item-name">${item.name}</div>
                    <div class="item-tip">${item.tip}</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `).join("");

      container.querySelectorAll(".check-item").forEach(itemEl => {
        itemEl.addEventListener("click", () => {
          const itemId = itemEl.dataset.id;
          state.checklistState[itemId] = !state.checklistState[itemId];
          localStorage.setItem("nantou_trip_pack_list", JSON.stringify(state.checklistState));
          itemEl.classList.toggle("done", state.checklistState[itemId]);
          updateProgress();
        });
      });

      updateProgress();
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("確定要重設所有行李勾選狀態嗎？")) {
          state.checklistState = {};
          localStorage.removeItem("nantou_trip_pack_list");
          renderChecklist();
        }
      });
    }

    renderChecklist();
  }

  /* ==========================================================================
     9. 生活須知與安全防護模組 (Notices & Safety)
     ========================================================================== */
  function initNotices() {
    const container = document.getElementById("notices-content-container");
    if (!container) return;

    container.innerHTML = `
      <div class="notice-accordion">
        <!-- 個人注意事項 -->
        <div class="notice-block">
          <div class="notice-block-title">📋 行程個人重要守則</div>
          <ul class="notice-list">
            ${TRIP_DATA.notices.personal.map(rule => `<li>${rule}</li>`).join("")}
          </ul>
        </div>

        <!-- 飯店住宿須知 -->
        <div class="notice-block">
          <div class="notice-block-title">🏨 飯店住宿生活須知與逃生要領</div>
          <ul class="notice-list">
            ${TRIP_DATA.notices.hotel.map(rule => `<li>${rule}</li>`).join("")}
          </ul>
        </div>

        <!-- 預防暈車妙方與指壓穴位 -->
        <div class="notice-block">
          <div class="notice-block-title">🚗 預防暈車秘訣 ＆ 簡易指壓穴位</div>
          <div style="font-size:0.9rem; margin-bottom:12px; color:var(--text-main);">
            旅行前充足睡眠是抗暈良藥，若感到車晃暈眩反胃，可深按以下三大經絡穴道持續有止暈止吐效果：
          </div>
          <div class="acupoint-grid">
            ${TRIP_DATA.notices.acupoints.map(ap => `
              <div class="acupoint-card">
                <h4>👉 ${ap.name}</h4>
                <div class="acupoint-effect">${ap.effect}</div>
                <div class="acupoint-method">${ap.method}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 緊急救護常識 -->
        <div class="notice-block">
          <div class="notice-block-title">⛑️ 緊急急救處理小常識</div>
          <div class="acupoint-grid">
            ${TRIP_DATA.notices.firstAid.map(fa => `
              <div class="acupoint-card" style="background:#fff7ed; border-color:#ffedd5;">
                <h4 style="color:#c2410c;">🩹 ${fa.title}</h4>
                <div style="font-size:0.86rem; color:#7c2d12; margin-top:4px; line-height:1.5;">${fa.steps}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }
});
