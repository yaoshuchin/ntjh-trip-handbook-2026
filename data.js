// 南投縣立南投國民中學 115學年度 畢業旅行手冊資料庫
const TRIP_DATA = {
  info: {
    school: "南投縣立南投國民中學",
    title: "115學年度 畢業旅行行動手冊",
    subtitle: "南台灣三日知性與歡樂之旅",
    dates: "115.10.21 (三) ～ 115.10.23 (五)",
    duration: "三天二夜",
    assembly: {
      time: "07:30",
      location: "學校中庭集合出發",
      note: "各班班長確實掌握人數，上車前先上洗手間，繫妥安全帶"
    },
    hotels: [
      {
        day: "第一晚 (10/21 三)",
        name: "墾丁福華渡假大飯店",
        phone: "08-8862324",
        telLink: "tel:088862324",
        address: "屏東縣恆春鎮墾丁路 2 號",
        mapUrl: "https://maps.google.com/?q=墾丁福華渡假大飯店",
        notice: "依政府環保政策，飯店內不再提供一次性盥洗用品（請自備牙刷、牙膏、梳子、刮鬍刀等）。"
      },
      {
        day: "第二晚 (10/22 四)",
        name: "高雄義大天悅飯店",
        phone: "07-6568000",
        telLink: "tel:076568000",
        address: "高雄市大樹區三和里義大八街 100 號",
        mapUrl: "https://maps.google.com/?q=高雄義大天悅飯店",
        notice: "依政府環保政策，飯店內不再提供一次性盥洗用品（請自備牙刷、牙膏、梳子、刮鬍刀等）。"
      }
    ],
    stats: {
      studentsTotal: 178,
      maleStudents: 91,
      femaleStudents: 87,
      teachersTotal: 12,
      vegetarianStudents: 2,
      busCount: 7
    }
  },

  itinerary: [
    {
      day: 1,
      date: "115/10/21 (星期三)",
      title: "南下探索・惡地奇景與國境之南",
      hotel: "墾丁福華渡假大飯店",
      meals: { breakfast: "自理", lunch: "美味合菜午餐", dinner: "美味合菜晚餐", night: "墾丁大街自理" },
      timeline: [
        { time: "07:30", title: "學校中庭集合出發", desc: "各班班長清點人數回報，準時上車出發，行車安全教育", icon: "school" },
        { time: "08:00~10:00", title: "國道風光與車上活動", desc: "國道南下奔馳，聆聽領隊行前解說與車上育樂", icon: "bus" },
        { time: "10:00~11:30", title: "田寮月世界", desc: "欣賞如月球表面般的惡地地質與泥岩特殊景觀、漫步攬月樓步道", icon: "mountain" },
        { time: "11:45~12:45", title: "享用美味午餐", desc: "依分配桌次迅速就坐入席，補充足夠體力", icon: "utensils" },
        { time: "13:30~16:00", title: "國立海洋生物博物館 (海生館)", desc: "走訪台灣水域館（高山到海洋小水滴的旅行）、珊瑚王國海底隧道、世界水域館、觀察小白鯨與企鵝", icon: "fish" },
        { time: "16:20~17:30", title: "貓鼻頭風景區", desc: "巴士海峽與台灣海峽的分界點，欣賞典型裙礁海岸侵蝕地形", icon: "camera" },
        { time: "18:00~19:00", title: "美味豐盛晚餐", desc: "抵達餐廳享用合菜晚宴，各桌收拾桌面保持禮貌", icon: "utensils" },
        { time: "19:20~21:00", title: "夜宿墾丁福華渡假大飯店 ＆ 墾丁大街夜巡", desc: "辦理入住、分配房間放置行李；導師領隊帶領夜探熱鬧墾丁大街", icon: "hotel" },
        { time: "21:30", title: "晚點名與查房", desc: "回房休息、洗漱就寢，嚴禁擅離房間與大聲喧嘩", icon: "moon" }
      ]
    },
    {
      day: 2,
      date: "115/10/22 (星期四)",
      title: "沙灘淨灘・踏浪歡樂＆義大冒險狂歡",
      hotel: "高雄義大天悅飯店",
      meals: { breakfast: "飯店內享用美味早餐", lunch: "義大園區餐券100元", dinner: "義大世界美食街自理", night: "-" },
      timeline: [
        { time: "07:00~08:00", title: "晨喚・享用美味早餐", desc: "起床盥洗，在墾丁福華渡假大飯店享用豐盛自助早餐", icon: "sun" },
        { time: "08:20~09:50", title: "飯店沙灘趣味競賽 (淨灘 / 踏浪)", desc: "感受國境之南海風沙灘，分組環保淨灘活動與歡樂踏浪（未經許可嚴禁深水戲水）", icon: "umbrella-beach" },
        { time: "10:10~12:00", title: "前往高雄義大世界", desc: "整理行李裝備搭乘專車，沿途欣賞南部風光與合唱交流", icon: "bus" },
        { time: "12:00~17:30", title: "義大遊樂世界", desc: "全台唯一希臘情境主題樂園！【特洛伊城】木馬屠城記、室內雲霄飛車、飛越台灣模擬飛行、極限挑戰（午餐使用100元餐券）", icon: "roller-coaster" },
        { time: "17:30~20:00", title: "義大世界購物廣場 ＆ 搭乘夜間摩天輪", desc: "逛逛全台最大名品Outlet購物廣場，登上直徑80公尺高空摩天輪俯瞰絕美夜景（晚餐美食街自理）", icon: "shopping-bag" },
        { time: "20:30", title: "夜宿高雄義大天悅飯店", desc: "分配房間入住，洗滌一日疲憊，整理行李收穫", icon: "hotel" },
        { time: "21:30", title: "晚點名查房與就寢", desc: "各班確實晚點名，安靜休息儲備第三天活力", icon: "moon" }
      ]
    },
    {
      day: 3,
      date: "115/10/23 (星期五)",
      title: "旗津海港采風・古典美學奇美殿堂・賦歸",
      hotel: "溫暖可愛的家",
      meals: { breakfast: "飯店內享用美味早餐", lunch: "美味合菜午餐", dinner: "回到可愛的家", night: "-" },
      timeline: [
        { time: "07:00~08:00", title: "晨喚・天悅飯店自助早餐", desc: "整理好所有行李退房，享用營養活力早餐", icon: "sun" },
        { time: "08:20~11:00", title: "旗津風景區采風巡禮", desc: "參訪旗津海岸公園、漫步夢幻星空隧道、登旗後砲台俯瞰高雄港、拜訪古老旗後天后宮與品味旗津老街", icon: "ship" },
        { time: "11:30~12:30", title: "港都美味午餐", desc: "享用美味午宴，各班整齊就座", icon: "utensils" },
        { time: "13:30~16:00", title: "奇美博物館", desc: "參觀創辦人許文龍先生畢生心血之私立博物館瑰寶，走訪奧林帕斯橋、阿波羅噴泉、西洋藝術品與動物標本常設展", icon: "landmark" },
        { time: "16:30~17:30", title: "名間親子生態園區", desc: "走訪南投最大 2.6 公頃全齡共融生態公園，暢玩 5 米高彩虹滑梯、大草坪歡樂合影", icon: "camera" },
        { time: "17:30~18:00", title: "快樂賦歸！平安返抵南投國中", desc: "專車安全返校，清點個人物品與行李，依序互道珍重、回家與家人分享美好回憶！", icon: "home" }
      ]
    }
  ],

  buses: [
    {
      busNo: 1,
      title: "1 車",
      classes: "904 (全部)",
      countDetail: "904: 男10 女9 (19人)",
      totalStudents: 19,
      chaperones: [
        { role: "學務主任", name: "董O遠" },
        { role: "904 導師", name: "蔡O秀", note: "素食・眷屬隨行" }
      ],
      vegCount: 1
    },
    {
      busNo: 2,
      title: "2 車",
      classes: "901 (全部) + 902 (部分)",
      countDetail: "901: 男11 女8 (19人) | 902: 男4 女7 (11人)",
      totalStudents: 30,
      chaperones: [
        { role: "901 導師", name: "吳O萱" },
        { role: "902 導師", name: "黃O英" }
      ],
      vegCount: 0
    },
    {
      busNo: 3,
      title: "3 車",
      classes: "903 (全部) + 902 (部分)",
      countDetail: "903: 男11 女12 (23人) | 902: 男4 女4 (8人)",
      totalStudents: 31,
      chaperones: [
        { role: "903 導師", name: "陳O綸" }
      ],
      vegCount: 0
    },
    {
      busNo: 4,
      title: "4 車 (丁車)",
      classes: "905 (全部)",
      countDetail: "905: 男11 女10 (21人)",
      totalStudents: 21,
      chaperones: [
        { role: "905 導師", name: "施O婷" }
      ],
      vegCount: 0
    },
    {
      busNo: 5,
      title: "5 車",
      classes: "906 (全部)",
      countDetail: "906: 男13 女11 (24人)",
      totalStudents: 24,
      chaperones: [
        { role: "906 導師", name: "石O洋" }
      ],
      vegCount: 0
    },
    {
      busNo: 6,
      title: "6 車",
      classes: "907 (全部) + 908 (全部)",
      countDetail: "907: 男11 女11 (22人) | 908: 男6 女3 (9人)",
      totalStudents: 31,
      chaperones: [
        { role: "907 導師", name: "孫O惠" },
        { role: "908 導師", name: "李O嘉" }
      ],
      vegCount: 0
    },
    {
      busNo: 7,
      title: "7 車",
      classes: "909 (全部)",
      countDetail: "909: 男10 女12 (22人)",
      totalStudents: 22,
      chaperones: [
        { role: "訓育組長", name: "姚O勤" },
        { role: "909 導師", name: "黃O姿" }
      ],
      vegCount: 1
    }
  ],

  teachers: [
    { role: "校長", name: "劉O彥", bus: "公務安排", roomDay1: "－", roomDay2: "746 (單/雙人)", note: "10/22 進駐天悅" },
    { role: "學務主任", name: "董O遠", bus: 1, roomDay1: "4056 (福華)", roomDay2: "747 (天悅)", note: "隨車 1 車" },
    { role: "902 導師", name: "黃O英", bus: 2, roomDay1: "4058 (福華)", roomDay2: "748 (天悅)", note: "隨車 2 車" },
    { role: "908 導師", name: "李O嘉", bus: 6, roomDay1: "4060 (福華)", roomDay2: "750 (天悅)", note: "隨車 6 車" },
    { role: "訓育組長", name: "姚O勤", bus: 7, roomDay1: "3058 (福華)", roomDay2: "740 (天悅)", note: "隨車 7 車（與蔡O秀老師同房）" },
    { role: "904 導師", name: "蔡O秀", bus: 1, roomDay1: "3058 (福華)", roomDay2: "740 (天悅)", note: "隨車 1 車（素食、眷屬同房）" },
    { role: "907 導師", name: "孫O惠", bus: 6, roomDay1: "3060 (福華)", roomDay2: "742 (天悅)", note: "隨車 6 車（與黃O姿老師同房）" },
    { role: "909 導師", name: "黃O姿", bus: 7, roomDay1: "3060 (福華)", roomDay2: "742 (天悅)", note: "隨車 7 車" },
    { role: "906 導師", name: "石O洋", bus: 5, roomDay1: "3062 (福華)", roomDay2: "752 (天悅)", note: "隨車 5 車（與施O婷老師同房區）" },
    { role: "905 導師", name: "施O婷", bus: 4, roomDay1: "3062 (福華)", roomDay2: "752 (天悅)", note: "隨車 4 車" },
    { role: "901 導師", name: "吳O萱", bus: 2, roomDay1: "3064 (福華)", roomDay2: "756 (天悅)", note: "隨車 2 車（與陳O綸老師同房區）" },
    { role: "903 導師", name: "陳O綸", bus: 3, roomDay1: "3064 (福華)", roomDay2: "756 (天悅)", note: "隨車 3 車" }
  ],

  // 178名學生名冊
  students: [
    // 901
    { name: "簡O翔", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "501", note: "" },
    { name: "簡O錤", class: "901", gender: "男", bus: 2, room1: "2141", table1: "2", room2: "501", note: "" },
    { name: "賴O育", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "501", note: "" },
    { name: "楊O翰", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "503", note: "" },
    { name: "鄒O陞", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "501", note: "" },
    { name: "廖O豪", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "503", note: "" },
    { name: "吳O成", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "502", note: "" },
    { name: "林O紘", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "502", note: "" },
    { name: "陳O潾", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "502", note: "" },
    { name: "陳O宥", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "503", note: "" },
    { name: "黃O榤", class: "901", gender: "男", bus: 2, room1: "2142", table1: "1", room2: "502", note: "" },
    { name: "林O汝", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "賴O羽", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "劉O妤", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "鄧O云", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "田O羽", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },
    { name: "朱O融", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },
    { name: "陳O涵", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },
    { name: "陳O妡", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },

    // 902
    { name: "古O弘", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "509", note: "" },
    { name: "黃O翊", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "511", note: "" },
    { name: "楊O正", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "511", note: "" },
    { name: "楊O傑", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "509", note: "" },
    { name: "吳O億", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "509", note: "" },
    { name: "王O群", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "511", note: "" },
    { name: "陳O祺", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "511", note: "" },
    { name: "楊O諺", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "509", note: "" },
    { name: "吳O霏", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "沈O語", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "林O安", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "張O瑄", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "陳O蒨", class: "902", gender: "女", bus: 2, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "陳O潔", class: "902", gender: "女", bus: 2, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "鄒O璇", class: "902", gender: "女", bus: 2, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "歐O臻", class: "902", gender: "女", bus: 3, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "王O恩", class: "902", gender: "女", bus: 3, room1: "3035", table1: "3", room2: "550", note: "" },
    { name: "劉O圻", class: "902", gender: "女", bus: 3, room1: "3035", table1: "4", room2: "550", note: "" },
    { name: "蔡O喬", class: "902", gender: "女", bus: 3, room1: "3035", table1: "4", room2: "550", note: "" },

    // 903
    { name: "施O佑", class: "903", gender: "男", bus: 3, room1: "2137", table1: "6", room2: "516", note: "" },
    { name: "陳O侑", class: "903", gender: "男", bus: 3, room1: "2137", table1: "6", room2: "516", note: "" },
    { name: "廖O鈞", class: "903", gender: "男", bus: 3, room1: "2137", table1: "6", room2: "516", note: "" },
    { name: "蔡O君", class: "903", gender: "男", bus: 3, room1: "2124", table1: "7", room2: "512", note: "" },
    { name: "張O煒", class: "903", gender: "男", bus: 3, room1: "2124", table1: "6", room2: "512", note: "" },
    { name: "陳O潣", class: "903", gender: "男", bus: 3, room1: "2124", table1: "6", room2: "512", note: "" },
    { name: "黃O鈞", class: "903", gender: "男", bus: 3, room1: "2124", table1: "7", room2: "512", note: "" },
    { name: "簡O霖", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "曾O智", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "施O圻", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "洪O彬", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "林O儒", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "張O禎", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "楊O頵", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "蕭O瑩", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "朱O芯", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "賴O如", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "廖O霓", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "彭O璇", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "林O玫", class: "903", gender: "女", bus: 3, room1: "3070", table1: "5", room2: "543", note: "" },
    { name: "簡O鎣", class: "903", gender: "女", bus: 3, room1: "3070", table1: "6", room2: "543", note: "" },
    { name: "程O玹", class: "903", gender: "女", bus: 3, room1: "3070", table1: "5", room2: "543", note: "" },
    { name: "葉O瑄", class: "903", gender: "女", bus: 3, room1: "3070", table1: "6", room2: "543", note: "" },

    // 904
    { name: "王O億", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "石O愷", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "林O羽", class: "904", gender: "男", bus: 1, room1: "2135", table1: "7", room2: "518", note: "" },
    { name: "姚O城", class: "904", gender: "男", bus: 1, room1: "2135", table1: "素", room2: "516", note: "素食" },
    { name: "羅O鈞", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "王O", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "許O崴", class: "904", gender: "男", bus: 1, room1: "2126", table1: "7", room2: "518", note: "" },
    { name: "蔡O緯", class: "904", gender: "男", bus: 1, room1: "2126", table1: "7", room2: "518", note: "" },
    { name: "鄧O康", class: "904", gender: "男", bus: 1, room1: "2126", table1: "8", room2: "519", note: "" },
    { name: "鍾O洧", class: "904", gender: "男", bus: 1, room1: "2126", table1: "7", room2: "518", note: "" },
    { name: "王O茹", class: "904", gender: "女", bus: 1, room1: "3072", table1: "8", room2: "561", note: "" },
    { name: "翁O涵", class: "904", gender: "女", bus: 1, room1: "3072", table1: "8", room2: "561", note: "" },
    { name: "黃O芳", class: "904", gender: "女", bus: 1, room1: "3072", table1: "7", room2: "561", note: "" },
    { name: "胡O紜", class: "904", gender: "女", bus: 1, room1: "3072", table1: "7", room2: "561", note: "" },
    { name: "林O妮", class: "904", gender: "女", bus: 1, room1: "3074", table1: "8", room2: "562", note: "" },
    { name: "蔡O霏", class: "904", gender: "女", bus: 1, room1: "3074", table1: "7", room2: "562", note: "" },
    { name: "謝O倢", class: "904", gender: "女", bus: 1, room1: "3074", table1: "7", room2: "562", note: "" },
    { name: "藍O媗", class: "904", gender: "女", bus: 1, room1: "3074", table1: "8", room2: "562", note: "" },
    { name: "黎O蓉", class: "904", gender: "女", bus: 1, room1: "3076", table1: "8", room2: "560", note: "" },

    // 905
    { name: "湯O綸", class: "905", gender: "男", bus: 4, room1: "2137", table1: "10", room2: "519", note: "" },
    { name: "蕭O均", class: "905", gender: "男", bus: 4, room1: "2137", table1: "10", room2: "519", note: "" },
    { name: "簡O鈞", class: "905", gender: "男", bus: 4, room1: "2137", table1: "10", room2: "519", note: "" },
    { name: "熊O捷", class: "905", gender: "男", bus: 4, room1: "2127", table1: "9", room2: "520", note: "" },
    { name: "林O穎", class: "905", gender: "男", bus: 4, room1: "2127", table1: "9", room2: "520", note: "" },
    { name: "林O弘", class: "905", gender: "男", bus: 4, room1: "2127", table1: "9", room2: "520", note: "" },
    { name: "羅O惟", class: "905", gender: "男", bus: 4, room1: "2127", table1: "10", room2: "520", note: "" },
    { name: "陳O璋", class: "905", gender: "男", bus: 4, room1: "2128", table1: "9", room2: "521", note: "" },
    { name: "陳O佑", class: "905", gender: "男", bus: 4, room1: "2128", table1: "9", room2: "521", note: "" },
    { name: "楊O樺", class: "905", gender: "男", bus: 4, room1: "2128", table1: "10", room2: "521", note: "" },
    { name: "葉O修", class: "905", gender: "男", bus: 4, room1: "2128", table1: "10", room2: "521", note: "" },
    { name: "林O婕", class: "905", gender: "女", bus: 4, room1: "3041", table1: "9", room2: "553", note: "" },
    { name: "林O慧", class: "905", gender: "女", bus: 4, room1: "3041", table1: "9", room2: "553", note: "" },
    { name: "廖O玉", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "張O涵", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "張O潼", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "曾O瑜", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "谷O愛", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },
    { name: "林O渝", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },
    { name: "黃O蓉", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },
    { name: "廖O涵", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },

    // 906
    { name: "王O倫", class: "906", gender: "男", bus: 5, room1: "2138", table1: "18", room2: "523", note: "" },
    { name: "吳O彥", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "張O昕", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "張O璽", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "黃O翰", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "黃O程", class: "906", gender: "男", bus: 5, room1: "2138", table1: "18", room2: "523", note: "" },
    { name: "黃O揚", class: "906", gender: "男", bus: 5, room1: "2139", table1: "11", room2: "526", note: "" },
    { name: "陳O聖", class: "906", gender: "男", bus: 5, room1: "2139", table1: "18", room2: "523", note: "" },
    { name: "邱O辰", class: "906", gender: "男", bus: 5, room1: "2139", table1: "18", room2: "523", note: "" },
    { name: "陳O廷", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "蔡O哲", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "蕭O堯", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "鄒O丞", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "張O芸", class: "906", gender: "女", bus: 5, room1: "3035", table1: "11", room2: "550", note: "" },
    { name: "張O卉", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "郭O瑄", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "黃O誼", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "黃O貽", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "簡O涵", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "552", note: "" },
    { name: "許O慈", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "552", note: "" },
    { name: "陳O樂", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "553", note: "" },
    { name: "王O文", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "552", note: "" },
    { name: "簡O霓", class: "906", gender: "女", bus: 5, room1: "3041", table1: "12", room2: "553", note: "" },
    { name: "林O甄", class: "906", gender: "女", bus: 5, room1: "3041", table1: "12", room2: "552", note: "" },

    // 907
    { name: "金O賢", class: "907", gender: "男", bus: 6, room1: "2139", table1: "14", room2: "526", note: "" },
    { name: "張O二", class: "907", gender: "男", bus: 6, room1: "2139", table1: "14", room2: "526", note: "" },
    { name: "廖O豐", class: "907", gender: "男", bus: 6, room1: "2139", table1: "14", room2: "526", note: "" },
    { name: "莊O瑄", class: "907", gender: "男", bus: 6, room1: "2130", table1: "13", room2: "527", note: "" },
    { name: "張O湋", class: "907", gender: "男", bus: 6, room1: "2130", table1: "13", room2: "527", note: "" },
    { name: "陳O劭", class: "907", gender: "男", bus: 6, room1: "2130", table1: "14", room2: "527", note: "" },
    { name: "王O豐", class: "907", gender: "男", bus: 6, room1: "2130", table1: "14", room2: "527", note: "" },
    { name: "松O樂", class: "907", gender: "男", bus: 6, room1: "2131", table1: "14", room2: "529", note: "" },
    { name: "陳O陞", class: "907", gender: "男", bus: 6, room1: "2131", table1: "13", room2: "529", note: "" },
    { name: "蔡O璟", class: "907", gender: "男", bus: 6, room1: "2131", table1: "13", room2: "529", note: "" },
    { name: "謝O佑", class: "907", gender: "男", bus: 6, room1: "2131", table1: "13", room2: "529", note: "" },
    { name: "楊O沛", class: "907", gender: "女", bus: 6, room1: "3076", table1: "13", room2: "560", note: "" },
    { name: "林O琪", class: "907", gender: "女", bus: 6, room1: "3076", table1: "13", room2: "560", note: "" },
    { name: "侯O晴", class: "907", gender: "女", bus: 6, room1: "3076", table1: "14", room2: "560", note: "" },
    { name: "林O妤", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "胡O愛", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "張O穎", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "曾O婕", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "徐O禕", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },
    { name: "許O萱", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },
    { name: "劉O芹", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },
    { name: "林O鈺", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },

    // 908
    { name: "王O陞", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "506", note: "" },
    { name: "楊O旭", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "陳O霈", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "506", note: "" },
    { name: "陳O霆", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "林O鋮", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "林O稷", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "阮O雲", class: "908", gender: "女", bus: 6, room1: "4084", table1: "15", room2: "545", note: "" },
    { name: "連O瑆", class: "908", gender: "女", bus: 6, room1: "4084", table1: "15", room2: "545", note: "" },
    { name: "曾O淯", class: "908", gender: "女", bus: 6, room1: "4084", table1: "15", room2: "545", note: "" },

    // 909
    { name: "簡O辰", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "508", note: "" },
    { name: "王O恩", class: "909", gender: "男", bus: 7, room1: "2133", table1: "17", room2: "506", note: "" },
    { name: "李O逸", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "506", note: "" },
    { name: "林O德", class: "909", gender: "男", bus: 7, room1: "2133", table1: "素", room2: "508", note: "素食" },
    { name: "陳O儒", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "508", note: "" },
    { name: "張O峻", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "508", note: "" },
    { name: "吳O浩", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "吳O漳", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "李O諺", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "林O翔", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "姚O慈", class: "909", gender: "女", bus: 7, room1: "2085", table1: "16", room2: "563", note: "" },
    { name: "張O軒", class: "909", gender: "女", bus: 7, room1: "2085", table1: "16", room2: "563", note: "" },
    { name: "許O羽", class: "909", gender: "女", bus: 7, room1: "2085", table1: "16", room2: "563", note: "" },
    { name: "藍O琳", class: "909", gender: "女", bus: 7, room1: "2085", table1: "17", room2: "563", note: "" },
    { name: "林O琪", class: "909", gender: "女", bus: 7, room1: "2086", table1: "17", room2: "565", note: "" },
    { name: "張O寗", class: "909", gender: "女", bus: 7, room1: "2086", table1: "18", room2: "565", note: "" },
    { name: "陳O彤", class: "909", gender: "女", bus: 7, room1: "2086", table1: "16", room2: "565", note: "" },
    { name: "蔡O妍", class: "909", gender: "女", bus: 7, room1: "2086", table1: "16", room2: "565", note: "" },
    { name: "何O瑜", class: "909", gender: "女", bus: 7, room1: "2120", table1: "17", room2: "566", note: "" },
    { name: "林O萱", class: "909", gender: "女", bus: 7, room1: "2120", table1: "16", room2: "566", note: "" },
    { name: "林O褕", class: "909", gender: "女", bus: 7, room1: "2120", table1: "17", room2: "566", note: "" },
    { name: "林O婕", class: "909", gender: "女", bus: 7, room1: "2120", table1: "17", room2: "566", note: "" }
  ],

  attractions: [
    {
        "id": "moon-world",
        "name": "田寮月世界",
        "tag": "Day 1 地質奧秘",
        "subtitle": "如月球表面般的荒涼崎嶇惡地奇觀",
        "googleMapUrl": "https://maps.google.com/?q=田寮月世界地質公園",
        "desc": "月世界在地理學上稱為『惡地』，係雨水與河水在質地軟弱、色呈青灰且略含鹽質的泥岩區，經年累月強烈侵蝕而成的荒涼崎嶇地形。泥岩顆粒細小、膠結鬆散，透水性低，遇雨即順坡流瀉，植物極難生長，因而形成寸草不生的光禿鋸齒狀山脊。民國70年於此地建造中國涼亭式建築『攬月樓』，登上平台可遠眺宛如月球般的蒼茫絕景。",
        "images": [
            "assets/img/moon_world_1.jpg",
            "assets/img/moon_world_2.jpg",
            "assets/img/moon_world_3.jpg"
        ],
        "webLinks": [
            {
                "title": "官方網站｜奇美博物館官方網站",
                "url": "https://www.chimeimuseum.org/"
            }
        ],
        "videoLinks": [
            {
                "title": "【奇美博物館全展區開箱】阿波羅噴泉與歐洲古典名畫",
                "url": "https://www.youtube.com/results?search_query=奇美博物館+完整導覽"
            },
            {
                "title": "【許文龍創辦理念】大眾共享的世界文化寶藏",
                "url": "https://www.youtube.com/results?search_query=許文龍+奇美博物館+理念"
            },
            {
                "title": "【走進歐洲童話殿堂】奧林帕斯橋與阿波羅水舞實拍",
                "url": "https://www.youtube.com/results?search_query=奇美博物館+阿波羅噴泉+水舞"
            }
        ]
    },
    {
        "id": "mingjian-park",
        "name": "名間親子生態園區",
        "tag": "Day 3 家鄉新亮點",
        "subtitle": "南投最大 2.6 公頃全齡共融遊戲場・5米巨型彩虹溜滑梯",
        "googleMapUrl": "https://maps.google.com/?q=名間親子生態園區",
        "desc": "名間親子生態園區位於南投縣名間鄉（鄰近國道三號名間交流道），佔地約 2.6 公頃，為南投縣最具規模之大型全齡共融特色戶外生態公園！\n園區核心地標為高達 5 公尺的巨型彩虹磨石子溜滑梯，設有兩道長達 15 公尺的高速滑道與安全緩衝人工草皮；周邊規劃了草皮攀爬坡、天空環狀景觀步道、360度複合攀爬網、巨型白細沙坑、鳥巢鞦韆與彈跳床。園區廣植落羽松、肖楠、五葉松與景觀生態池，是三天畢旅尾聲讓全體師生盡情舒展身心、拍攝團體歡樂大合影的最佳景點！",
        "images": [
            "assets/img/mingjian_1.jpg",
            "assets/img/mingjian_2.jpg",
            "assets/img/mingjian_3.jpg"
        ],
        "webLinks": [
            {
                "title": "南投旅遊網｜名間親子生態園區官方介紹",
                "url": "https://travel.nantou.gov.tw/spot/%E5%90%8D%E9%96%93%E8%A6%AA%E5%AD%90%E7%94%9F%E6%85%8B%E5%9C%92%E5%8D%80/"
            },
            {
                "title": "南投縣政府最新消息｜名間全齡共融樂園",
                "url": "https://www.nantou.gov.tw/"
            },
            {
                "title": "玩全台灣旅遊網｜名間親子生態園區亮點設施",
                "url": "https://okgo.tw/"
            }
        ],
        "videoLinks": [
            {
                "title": "【名間親子生態園區完整導覽】南投最新2.6公頃放電樂園",
                "url": "https://www.youtube.com/results?search_query=名間親子生態園區+導覽"
            },
            {
                "title": "【5米巨無霸彩虹滑梯】兩道15公尺磨石子極速體驗",
                "url": "https://www.youtube.com/results?search_query=名間親子生態園區+彩虹溜滑梯"
            },
            {
                "title": "【天空環狀步道與攀爬設施】南投全齡共融遊具大公開",
                "url": "https://www.youtube.com/results?search_query=名間親子生態園區+遊具"
            }
        ]
    }
],

  quiz: {
    trueFalse: [
      {
        id: "tf1",
        question: "01. 小丑魚和海葵有合作的行為嗎？",
        answer: true,
        answerText: "是",
        explanation: "小丑魚與海葵是典型的互利共生關係！海葵的有毒觸手能保護小丑魚免受天敵攻擊，小丑魚則能替海葵清理觸手雜質、死屑，並以游動吸引其他小魚成為海葵的食物。"
      },
      {
        id: "tf2",
        question: "02. 海馬是否為魚類？",
        answer: true,
        answerText: "是",
        explanation: "海馬雖然外形奇特且直立游泳，但牠們擁有鰓、背鰭，身體由骨質環片包覆，在分類學上屬於輻鰭魚綱海龍魚科，是百分之百的硬骨魚類！"
      },
      {
        id: "tf3",
        question: "03. 魚有舌骨，請問魚是否有舌頭呢？",
        answer: true,
        answerText: "是",
        explanation: "魚類確實有舌頭！只是魚的舌頭構造相對簡單（多為基舌或初級舌），由舌骨支撐，表面覆有黏膜或齒狀突起，主要用來固定與吞嚥獵物，無法像人類舌頭般靈活伸縮伸出。"
      }
    ],
    qa: [
      {
        num: "01",
        q: "請問蛤蜊的生殖方式為何？另『珍珠』是如何形成的？",
        a: "公貝及母貝同時放出精、卵於水中。受精卵在水中懸浮數日，發育成仔貝再沈至底部。\n【珍珠形成】：為防止進入殼內之異物（如砂粒或寄生蟲）使軟體組織發炎，蚌貝會分泌碳酸鈣之珍珠質層層包裹此異物，經過數年累積沉澱後形成圓潤光澤的珍珠。"
      },
      {
        num: "02",
        q: "魷魚和花枝該怎麼分阿？",
        a: "• 魷魚（鎖管、小管）：鰭葉僅在尾部，身體呈長錐形，體內具有透明針形的幾丁質內殼，常見曬製成魷魚乾。\n• 花枝（烏賊）：鰭葉分布在身體周圍兩側，體態較圓胖，體內具有一塊大而白色鈣質的長菱形烏賊骨（海螵蛸）。"
      },
      {
        num: "03",
        q: "為何養的水母越來越小？",
        a: "一般人水族館飼養的多為白色半透明的『海月水母』，牠們需要攝食浮游動物。若未適當進食，水母會消耗自身體內的組織與水分來取得游動生存所需之能量，導致體積愈變愈小。"
      },
      {
        num: "04",
        q: "魚的年齡如何判斷？",
        a: "如同樹木看年輪一樣！可以透過將魚的脊椎骨磨平觀察其同心圓輪紋；硬骨魚類的平衡器官（內耳）內有『內耳石（耳石）』，橫切磨光後可在顯微鏡下看到如同年輪般的明暗生長輪（需配合魚種生活史推估）。"
      },
      {
        num: "05",
        q: "何處為亞洲最大水族博物館？",
        a: "國立海洋生物博物館（台灣屏東車城）。"
      },
      {
        num: "06",
        q: "國立海洋生物博物館位於哪一縣？哪一鄉？",
        a: "屏東縣車城鄉。"
      },
      {
        num: "07",
        q: "海生館的館魚為何？共分哪幾個參觀館？",
        a: "館魚是『燕魚』。全館分為三大主要常設展示館：台灣水域館、珊瑚王國館、世界水域館。"
      },
      {
        num: "08",
        q: "鯨魚親水廣場中有幾種鯨魚？展示大廳上的魚模型為何都面向海洋呢？",
        a: "親水廣場有兩種鯨魚：大翅鯨（座頭鯨）與抹香鯨。\n展示大廳的模型魚全部頭朝向海洋方向，象徵『回歸海洋、飲水思源』的生態保育精神。"
      },
      {
        num: "09",
        q: "您知道魟魚的胸鰭、腹鰭、背鰭及尾鰭在哪裡嗎？",
        a: "• 胸鰭：身體兩側擴展成寬大波浪狀如翅膀的部位。\n• 腹鰭：在身體後下方、排泄孔兩側較小的鰭片。\n• 背鰭：位於細長尾巴基部上方的小鰭。\n• 尾鰭：位於尾巴最末端。"
      },
      {
        num: "10",
        q: "台灣水域館的主題是？高山溪流區中，櫻花鉤吻鮭的同種魚類是？",
        a: "主題是『從高山到海洋小水滴的旅行』。\n高山溪流區中櫻花鉤吻鮭的同科冷水性魚類夥伴如『高山鯝魚（苦花）』。"
      },
      {
        num: "11",
        q: "比比看：河流上游與中游的不同？",
        a: "• 水流比較急、流速大的是上游（落差大）；水流量較大的是下游。\n• 石頭比較大、稜角分明的是上游（因剛從岩壁崩落）；被水流長途沖刷圓潤細小的是下游與出海口。"
      },
      {
        num: "12",
        q: "海生館大洋池餵魚秀的主角為何種魚類？大洋池裡的生態是仿照哪一個海域的？",
        a: "主角包含鯨鯊、魟魚、大型石斑等。\n大洋池生態仿照的是『台灣東部太平洋大洋區』。"
      },
      {
        num: "13",
        q: "白鯨喜歡唱歌，所以又被稱為什麼？",
        a: "『海中金絲雀』。白鯨能發出多達數十種多變口哨聲、唧唧聲與鳥鳴般的音調進行回聲定位與社交溝通。"
      },
      {
        num: "14",
        q: "鯊魚用什麼構造偵測微弱的電流與獵物？",
        a: "一種稱為『羅倫氏壺腹（Ampullae of Lorenzini）』的電感受器器官，分布在鯊魚吻部周圍，能感應百萬分之一伏特的微弱生物電流。"
      },
      {
        num: "15",
        q: "地球歷史上體型最大的動物是誰？",
        a: "藍鯨（Blue Whale，長度可達30公尺以上，體重超過150公噸，遠超過任何已知恐龍）。"
      },
      {
        num: "16",
        q: "海生館展示大廳上的懸掛大烏賊為何？側邊扁平圓盤狀的大魚為何？",
        a: "深海巨大頭足類『大王烏賊』；側邊扁平無尾柄的圓形大魚為『曼波魚（翻車魚）』。"
      },
      {
        num: "17",
        q: "“珊瑚礁”依照地質形態主要分為哪三大類呢？",
        a: "1. 堡礁（Barrier Reef，如澳洲大堡礁）\n2. 環礁（Atoll，如南海東沙環礁）\n3. 裙礁（Fringing Reef，如台灣恆春墾丁海岸、貓鼻頭）。"
      },
      {
        num: "18",
        q: "影響珊瑚礁毀壞的重要因素是什麼？珊瑚礁每年的產卵期在幾月？",
        a: "• 毀壞因素：海水溫度異常升高、水質混濁沉積物覆蓋、人為踩踏與廢水污染、過度捕撈。\n• 產卵盛期：每年農曆 3～4 月（約國曆四、五月媽祖生日前後），常出現大規模夜間同步釋卵壯觀景象。"
      },
      {
        num: "19",
        q: "珊瑚行光合作用需要的生物為何？珊瑚白化的原因有哪些？",
        a: "• 必備生物：共生於珊瑚體內的單細胞藻類『共生藻（蟲黃藻）』。\n• 白化原因：當海水水溫超過耐受極限（>30℃）或環境惡化時，共生藻離開或死亡，導致珊瑚失去色彩，露出內部白色碳酸鈣骨骼，若持續過久珊瑚便會飢餓死亡。"
      },
      {
        num: "20",
        q: "珊瑚穴是礁岩動物的休息區，糯鰻（海鰻）為何在銳利的珊瑚礁中穿梭不會割傷？",
        a: "糯鰻表皮無硬鱗，但表面覆蓋著一層非常厚而滑溜的黏膜分泌物，能有效減少摩擦阻力並隔絕尖銳珊瑚礁石的割傷。"
      },
      {
        num: "21",
        q: "獅子魚的學名屬名為何？",
        a: "獅子魚學名為『蓑鮋（Pterois）』，魚鰭棘條發達如羽翼，棘條基部具有毒腺。"
      },
      {
        num: "22",
        q: "世界上體型最大的雙殼貝類是誰？它的閉殼肌是宴席上常吃到的何種食材？",
        a: "『巨硨磲蛤（大硨磲）』，長度可達1.2公尺以上。\n其肥厚發達的閉殼肌曬乾加工後即為名貴食材『干貝』。"
      },
      {
        num: "23",
        q: "珊瑚王國館的主題是什麼？館內明星小白鯨的原生故鄉在哪裡？",
        a: "主題是『海洋中的熱帶雨林』。\n小白鯨的原生棲地是冷冽的北極與亞北極海域（俄羅斯、加拿大、阿拉斯加周邊）。"
      },
      {
        num: "24",
        q: "台灣與澎湖傳統漁民口訣中，最令人聞風喪膽的『四大毒魚』為何？",
        a: "口訣：『一魟、二虎、三沙毛、四臭肚』。\n1. 魟魚（尾刺劇毒） 2. 獅子魚（虎鮋，背棘劇毒） 3. 沙毛（鰻鯰，胸背棘有毒） 4. 臭肚（象魚/藍子魚，背鰭刺毒）。"
      },
      {
        num: "25",
        q: "海生館設立水下工作站的目的為何？海底隧道的長度總共約為幾公尺？",
        a: "1. 目的：為了不驚擾海洋生物，直接長時觀測、紀錄與研究珊瑚礁與魚群的自然生態。\n2. 海底隧道長度：長達 84 公尺，為全台最具代表性的海底沉浸式景觀。"
      }
    ]
  },

  notices: {
    personal: [
      "【守時至上】『守時』是活動順利進行的不二法門，請準時抵達指定集合地點。各班班長確實掌握人數，上、下車清點人數後向隨隊人員、導師回報。",
      "【行車安全】上車前先上洗手間，會暈車的同學請開車前半小時服用暈車藥。同學必須全程繫安全帶，行車間嚴禁任意走動，頭手不可伸出車外。",
      "【過馬路安全】上下車或休息站上洗手間時需過馬路應特別注意安全，休息站車輛頻繁務必左右張望。",
      "【團隊禮儀】參訪活動期間遇友校學生應互相禮讓、避免言語衝突，注意言行舉止。車內、餐廳、飯店、景點均應主動維護環境整潔。",
      "【嚴禁脫隊】活動全程一律團隊帶隊，嚴禁私自個別行動，行動中務必三五成群，切勿落單進入無人高危險區域。",
      "【牢記電話】請同學記住自己的車號及吃飯桌次，並牢記導師電話；若不慎脫隊立即聯絡導師或領隊。",
      "【違禁品嚴禁】嚴禁攜帶菸酒、檳榔、麻將、不良書刊等違禁品，若有違反校規者一律從嚴議處。",
      "【量力而為】請愛惜身體，若具心臟病、心血管疾病或經醫師指示不能從事劇烈活動者，切勿搭乘刺激遊樂設施。遇有不適立刻告知老師。",
      "【安全第一】行程中若未經學校專業規劃安排，絕對禁止擅自游泳戲水！下車或離開飯店時，隨身貴重物品請自行保管。",
      "【尊重領隊】嚴禁私下聯絡領隊，禁止私加領隊 LINE、FB、IG 等任何社群媒體以維護公私分際。",
      "【愛護公物】嚴禁在飯店內使用染髮劑或指甲油，如有弄髒毛巾地毯或損害物品，必須依飯店價目全額賠償！"
    ],
    hotel: [
      "大家共同維護房客住宿品質，走廊及各區域走動時請放輕腳步、輕聲細語。",
      "夜間需按規定時間就寢。晚點名時務必在自己房間內，不得私自調換房間或到其他房間聊天喧嘩。",
      "保護自身安全，請千萬不要在彈簧床上彈跳，避免床架斷裂受傷。",
      "電視螢幕機體沉重，若需微調角度請洽領隊或飯店人員，切勿自行大力搬動摔落。",
      "客房內使用後的濕毛巾請放回浴室毛巾架，切勿丟在床上造成棉被潮濕孳生黴菌。",
      "進入飯店房間後，第一件事請先查看門後逃生避難路線圖、緊急安全門位置及窗戶景況。",
      "若遇緊急災害火災時：遵從服務人員引導，以濕毛巾捂口鼻放低身段往安全梯逃生，下樓千萬不可搭乘電梯！出房門前先手背摸門板測溫。"
    ],
    motionSickness: [
      {
        tip: "行前睡眠充裕",
        desc: "出發前一晚避免通宵熬夜打電動，充足精神是抗暈第一步。"
      },
      {
        tip: "乘車飲食節制",
        desc: "乘車前三小時請勿吃太飽，避免大量乳製品、豆漿、油炸油膩及辛辣食物。"
      },
      {
        tip: "坐前排靠窗通風",
        desc: "易暈車同學盡量乘坐前座位置，將冷氣出風口對準臉部保持空氣流通。"
      },
      {
        tip: "轉移焦點減少晃動",
        desc: "乘車時頭部盡量貼靠椅背，凝視遠方地平線風景或閉目入睡，切勿在車上低頭滑手機或看書。"
      }
    ],
    acupoints: [
      {
        name: "合谷穴",
        effect: "緩解頭痛、提神醒腦",
        method: "手心向下，拇指食指併攏時虎口肌肉隆起最高處，以另一手拇指指腹垂直深壓5秒放鬆，持續按壓數次。"
      },
      {
        name: "內關穴",
        effect: "止嘔吐、平復胃部逆流、安神",
        method: "手心向上，從手腕橫紋正中往手臂方向量取『三橫指（食指中指無名指併攏寬度）』，兩條大筋中間凹陷處即為內關穴。"
      },
      {
        name: "足三里穴",
        effect: "消除噁心反胃、調節腸胃氣機",
        method: "膝蓋外側凹陷（外膝眼）直下四指橫寬、脛骨旁開一橫指處，揉按會有微酸脹感。"
      }
    ],
    firstAid: [
      {
        title: "流鼻血急救處置",
        steps: "讓患者坐正並『頭部稍微前傾』（切勿仰頭避免血液倒流嗆入氣管！），用手指捏緊鼻翼兩側軟骨壓迫約10分鐘，並在鼻樑或額頭敷冷毛巾促使血管收縮。"
      },
      {
        title: "熱傷害與中暑預防",
        steps: "炎熱戶外應穿著寬鬆透氣衣物並戴帽防曬。若出現頭暈、面色蒼白、大量出汗不適，應立刻移至陰涼通風處，鬆開衣物，補充微量淡鹽水，並以濕毛巾或冰袋敷於頸部與腋下降溫。"
      }
    ]
  },

  packingChecklist: [
    {
      category: "必備重要證件與金錢",
      items: [
        { id: "p1", name: "個人健保 IC 卡", tip: "就醫必備，請妥善放置隨身包內夾層" },
        { id: "p2", name: "適量零錢與零用金", tip: "買飲料、紀念品、第二晚晚餐及緊急用途" },
        { id: "p3", name: "家裡大門鑰匙", tip: "回程返家使用，請妥善收納防遺失" },
        { id: "p4", name: "紙、筆、手冊或手機", tip: "筆記學習單、聯絡通訊" }
      ]
    },
    {
      category: "衣物與生活盥洗 (環保自備)",
      items: [
        { id: "p5", name: "換洗衣物 2~3 套", tip: "吸汗排汗衫、休閒長短褲、內衣褲、襪子" },
        { id: "p6", name: "個人牙刷、牙膏", tip: "重要！兩家飯店依法不主動提供一次性盥洗用品" },
        { id: "p7", name: "梳子、浴帽、個人毛巾", tip: "個人衛生清潔用品自備" },
        { id: "p8", name: "輕便薄外套", tip: "遊覽車內空調冷氣較強或海邊早晚防風" },
        { id: "p9", name: "乾淨塑膠袋數個", tip: "裝換下來的髒衣物、鞋子或沙灘濕物" },
        { id: "p10", name: "大型行李箱或旅行袋", tip: "放置換洗衣物與大件物品，置於車底行李艙" }
      ]
    },
    {
      category: "個人隨身與防護常備品",
      items: [
        { id: "p11", name: "個人雙肩隨身背包", tip: "下車參訪時背負水壺、雨具、證件" },
        { id: "p12", name: "個人常備藥物", tip: "個人慢性病、氣喘吸入劑、暈車藥、腸胃藥、止痛藥" },
        { id: "p13", name: "個人隨身水壺 / 環保杯", tip: "隨時補充水分，戶外防中暑" },
        { id: "p14", name: "遮陽帽、太陽眼鏡", tip: "南台灣恆春陽光強烈防紫外線曬傷" },
        { id: "p15", name: "防曬乳、防蚊液", tip: "戶外活動與草地海邊防護" },
        { id: "p16", name: "輕便雨衣或折疊傘", tip: "應對突發陣雨與遮陽兩用" },
        { id: "p17", name: "備用口罩 4~6 個", tip: "進出公眾密閉場所與預防感冒" },
        { id: "p18", name: "行動電源與充電線", tip: "保持手機電力，隨時保持通訊安全" }
      ]
    }
  ]
};

// 匯出供 script.js 使用
if (typeof module !== 'undefined') {
  module.exports = TRIP_DATA;
}
