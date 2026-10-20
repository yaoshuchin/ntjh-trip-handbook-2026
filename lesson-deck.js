/* ============================================================
   南投國中 115 畢旅 · 增強型網頁簡報引擎
   - 1280×720 固定畫布等比縮放
   - present (全螢幕投影片) / read (捲動閱讀) 雙模式
   - 目錄總覽 (支援搜尋即時篩選、目前頁面高亮)
   - 簡報切換按鍵 (頂部按鈕、兩側懸浮翻頁箭頭、鍵盤、觸控滑動)
   - 版面色彩方案 (深色、淡綠、淡紅、淡紫、淺灰、淺藍、淡黃)
   - 演示工具箱：
     * 講解教鞭 (雷射筆光點與軌跡)
     * 手寫筆 (自由流暢筆觸)
     * 顏色切換 (紅、藍、綠、黑)
     * 基本圖形 (圓形、正方形、三角形)
     * 橡皮擦、復原、清除全版
     * 擷圖存檔 (使用 html2canvas 導出高解析度 PNG)
   ============================================================ */
(function () {
    'use strict';

    var SLIDE_W = 1280;
    var SLIDE_H = 720;

    var body = document.body;
    var stage = document.getElementById('deck-stage');
    if (!stage) return;

    // 將每張 .slide 包進 .slide-fit
    var raw = Array.prototype.slice.call(stage.querySelectorAll('.slide'));
    var fits = raw.map(function (sl, i) {
        var fit = document.createElement('div');
        fit.className = 'slide-fit';
        sl.parentNode.insertBefore(fit, sl);
        fit.appendChild(sl);
        var no = document.createElement('div');
        no.className = 'slide-no';
        no.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(raw.length).padStart(2, '0');
        sl.appendChild(no);

        // 為每張投影片建立專屬繪圖 canvas
        var cvs = document.createElement('canvas');
        cvs.className = 'slide-canvas';
        cvs.width = SLIDE_W;
        cvs.height = SLIDE_H;
        sl.appendChild(cvs);

        return fit;
    });

    var total = fits.length;
    var idx = 0;

    /* ── 縮放：把 1280 寬的畫布等比縮到容器寬 ── */
    function rescale() {
        fits.forEach(function (fit) {
            var w = fit.clientWidth;
            if (!w) return;
            var k = w / SLIDE_W;
            var sl = fit.querySelector('.slide');
            sl.style.transform = 'scale(' + k + ')';
        });
    }

    /* ── 模式切換 ── */
    function setMode(mode) {
        body.setAttribute('data-mode', mode);
        var btn = document.getElementById('mode-btn');
        if (btn) {
            btn.textContent = mode === 'present' ? '閱讀模式' : '簡報模式';
            btn.classList.toggle('is-on', mode === 'present');
        }
        try { localStorage.setItem('dslab-deck-mode', mode); } catch (e) { /* ignore */ }
        if (mode === 'present') go(idx);
        requestAnimationFrame(rescale);
    }

    /* ── 翻頁邏輯 ── */
    function go(n) {
        idx = Math.max(0, Math.min(total - 1, n));
        fits.forEach(function (f, i) { f.classList.toggle('is-current', i === idx); });

        var cnt = document.getElementById('deck-count');
        var pageStr = String(idx + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
        if (cnt) cnt.textContent = pageStr;

        var prevBtn = document.getElementById('ctrl-prev');
        var nextBtn = document.getElementById('ctrl-next');
        if (prevBtn) prevBtn.disabled = (idx === 0);
        if (nextBtn) nextBtn.disabled = (idx === total - 1);

        var sidePrev = document.getElementById('side-prev');
        var sideNext = document.getElementById('side-next');
        if (sidePrev) sidePrev.style.display = (idx === 0 ? 'none' : 'flex');
        if (sideNext) sideNext.style.display = (idx === total - 1 ? 'none' : 'flex');

        if (body.getAttribute('data-mode') === 'present') window.scrollTo(0, 0);
        markTocCurrent();
    }

    /* ── 綁定基礎導航按鈕 ── */
    var modeBtn = document.getElementById('mode-btn');
    if (modeBtn) {
        modeBtn.addEventListener('click', function () {
            setMode(body.getAttribute('data-mode') === 'present' ? 'read' : 'present');
        });
    }

    var fsBtn = document.getElementById('fs-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', function () {
            if (document.fullscreenElement) document.exitFullscreen();
            else document.documentElement.requestFullscreen();
        });
    }

    // 頂部導航按鍵
    var prev = document.getElementById('ctrl-prev');
    var next = document.getElementById('ctrl-next');
    if (prev) prev.addEventListener('click', function () { go(idx - 1); });
    if (next) next.addEventListener('click', function () { go(idx + 1); });

    // 兩側懸浮箭頭
    var sidePrev = document.getElementById('side-prev');
    var sideNext = document.getElementById('side-next');
    if (sidePrev) sidePrev.addEventListener('click', function () { go(idx - 1); });
    if (sideNext) sideNext.addEventListener('click', function () { go(idx + 1); });

    /* ── 鍵盤翻頁 ── */
    document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
        if (e.key === 'Escape') {
            closeToc();
            // 如果工具列開著，先切回 pointer
            if (currentTool !== 'pointer') setTool('pointer');
            return;
        }
        if (toc && !toc.hidden) return; // 總覽開著不翻頁
        if (body.getAttribute('data-mode') !== 'present') return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(idx + 1); }
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
        else if (e.key === 'Home') { e.preventDefault(); go(0); }
        else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
    });

    /* ── 觸控左右滑動翻頁 ── */
    var touchStartX = 0;
    var touchStartY = 0;
    document.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        if (currentTool !== 'pointer') return; // 塗鴉模式時不觸發滑動翻頁
        if (e.changedTouches && e.changedTouches.length === 1) {
            var diffX = e.changedTouches[0].clientX - touchStartX;
            var diffY = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(diffX) > 60 && Math.abs(diffY) < 50) {
                if (diffX < 0) go(idx + 1);
                else go(idx - 1);
            }
        }
    }, { passive: true });

    /* ============================================================
       目錄總覽 (TOC) 模組
       ============================================================ */
    var toc = document.getElementById('deck-toc');
    var tocGrid = document.getElementById('deck-toc-grid');
    var tocFilter = document.getElementById('toc-filter');

    function buildToc() {
        if (!tocGrid) return;
        tocGrid.innerHTML = '';
        fits.forEach(function (fit, i) {
            var sl = fit.querySelector('.slide');
            var eyebrow = sl.querySelector('.s-eyebrow');
            var h = sl.querySelector('.s-title, .s-title-xl');

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'toc-item';
            btn.dataset.idx = i;
            btn.dataset.text = ((eyebrow ? eyebrow.textContent : '') + ' ' + (h ? h.textContent : '')).toLowerCase();

            var no = document.createElement('span');
            no.className = 'toc-no';
            no.textContent = String(i + 1).padStart(2, '0');

            var txt = document.createElement('span');
            txt.className = 'toc-txt';

            var eb = document.createElement('span');
            eb.className = 'toc-eyebrow';
            eb.textContent = eyebrow ? eyebrow.textContent : '';

            var hh = document.createElement('span');
            hh.className = 'toc-h';
            // 清理標題文字
            hh.textContent = h ? h.textContent.replace(/\s+/g, ' ').trim() : '(無標題)';

            txt.appendChild(eb);
            txt.appendChild(hh);
            btn.appendChild(no);
            btn.appendChild(txt);

            btn.addEventListener('click', function () {
                closeToc();
                if (body.getAttribute('data-mode') === 'present') go(i);
                else fit.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            tocGrid.appendChild(btn);
        });
    }

    function markTocCurrent() {
        if (!tocGrid) return;
        var items = tocGrid.querySelectorAll('.toc-item');
        for (var i = 0; i < items.length; i++) items[i].classList.toggle('is-current', i === idx);
    }

    function openToc() {
        if (!toc) return;
        markTocCurrent();
        toc.hidden = false;
        if (tocFilter) {
            tocFilter.value = '';
            filterToc('');
            setTimeout(function () { tocFilter.focus(); }, 100);
        }
        var cur = tocGrid && tocGrid.querySelector('.toc-item.is-current');
        if (cur) cur.scrollIntoView({ block: 'center' });
    }

    function closeToc() {
        if (toc) toc.hidden = true;
    }

    function filterToc(keyword) {
        if (!tocGrid) return;
        var kw = keyword.toLowerCase().trim();
        var items = tocGrid.querySelectorAll('.toc-item');
        items.forEach(function (item) {
            if (!kw || item.dataset.text.indexOf(kw) !== -1) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (tocFilter) {
        tocFilter.addEventListener('input', function () { filterToc(this.value); });
    }

    var tocBtn = document.getElementById('toc-btn');
    var tocClose = document.getElementById('toc-close');
    if (tocBtn) tocBtn.addEventListener('click', function () { toc && !toc.hidden ? closeToc() : openToc(); });
    if (tocClose) tocClose.addEventListener('click', closeToc);
    if (toc) toc.addEventListener('click', function (e) { if (e.target === toc) closeToc(); });

    /* ============================================================
       版面色彩方案 (Themes)
       ============================================================ */
    var themeSelect = document.getElementById('theme-select');
    function applyTheme(themeName) {
        if (!themeName) themeName = 'default';
        body.setAttribute('data-theme', themeName);
        if (themeSelect) themeSelect.value = themeName;
        try { localStorage.setItem('nantou-deck-theme', themeName); } catch (e) { /* ignore */ }
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', function () {
            applyTheme(this.value);
        });
    }

    var savedTheme = 'default';
    try { savedTheme = localStorage.getItem('nantou-deck-theme') || 'default'; } catch (e) { /* ignore */ }
    applyTheme(savedTheme);

    /* ============================================================
       演示工具箱 (Laser, Pen, Shapes, Colors, Undo, Clear, Snapshot)
       ============================================================ */
    var annoBar = document.getElementById('annotation-bar');
    var toolToggleBtn = document.getElementById('draw-tool-toggle');
    var laserDot = document.getElementById('deck-laser-pointer');

    var currentTool = 'pointer'; // 'pointer', 'laser', 'pen', 'shape-circle', 'shape-rect', 'shape-triangle'
    var currentColor = '#ef4444'; // default red
    var currentLineWidth = 3;

    // 每頁的繪圖筆畫歷史紀錄 (支援切換頁面時保留與復原)
    // slideDrawings[pageIndex] = [ { type: 'path'|'circle'|'rect'|'triangle', color, width, points / bbox } ]
    var slideDrawings = {};
    for (var p = 0; p < total; p++) { slideDrawings[p] = []; }

    function setTool(toolName) {
        currentTool = toolName;
        body.classList.toggle('is-drawing-mode', toolName.indexOf('shape') !== -1 || toolName === 'pen');
        body.classList.toggle('is-laser-mode', toolName === 'laser');

        if (laserDot) {
            laserDot.hidden = (toolName !== 'laser');
        }

        var btns = document.querySelectorAll('.anno-btn[data-tool]');
        btns.forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.tool === toolName);
        });
    }

    function toggleAnnoBar() {
        if (!annoBar) return;
        var willOpen = annoBar.hidden;
        annoBar.hidden = !willOpen;
        if (toolToggleBtn) toolToggleBtn.classList.toggle('is-on', willOpen);
        if (!willOpen) {
            setTool('pointer');
        } else if (currentTool === 'pointer') {
            setTool('pen');
        }
    }

    if (toolToggleBtn) toolToggleBtn.addEventListener('click', toggleAnnoBar);
    var annoClose = document.getElementById('anno-close');
    if (annoClose) annoClose.addEventListener('click', function () {
        if (annoBar) annoBar.hidden = true;
        if (toolToggleBtn) toolToggleBtn.classList.remove('is-on');
        setTool('pointer');
    });

    // 綁定工具按鈕
    var toolBtns = document.querySelectorAll('.anno-btn[data-tool]');
    toolBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            setTool(this.dataset.tool);
        });
    });

    // 綁定顏色切換
    var colorBtns = document.querySelectorAll('.color-btn[data-color]');
    colorBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            colorBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            currentColor = this.dataset.color;
            if (laserDot) {
                laserDot.style.background = currentColor;
                laserDot.style.boxShadow = '0 0 8px ' + currentColor + ', 0 0 16px ' + currentColor;
            }
        });
    });

    // 筆刷粗細切換
    var penSizeBtn = document.getElementById('pen-size-btn');
    if (penSizeBtn) {
        var sizes = [2, 4, 8];
        var sIndex = 1; // default 4px (index 1)
        penSizeBtn.addEventListener('click', function () {
            sIndex = (sIndex + 1) % sizes.length;
            currentLineWidth = sizes[sIndex];
            this.textContent = '線寬: ' + currentLineWidth + 'px';
        });
    }

    /* ── 雷射教鞭游標跟隨 ── */
    document.addEventListener('mousemove', function (e) {
        if (currentTool === 'laser' && laserDot) {
            laserDot.style.left = e.clientX + 'px';
            laserDot.style.top = e.clientY + 'px';

            // 產生光跡殘影
            if (Math.random() < 0.3) {
                var trail = document.createElement('div');
                trail.className = 'deck-laser-trail';
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
                trail.style.background = currentColor;
                document.body.appendChild(trail);
                setTimeout(function () {
                    trail.style.opacity = '0';
                    setTimeout(function () { if (trail.parentNode) trail.parentNode.removeChild(trail); }, 400);
                }, 50);
            }
        }
    });

    /* ── 繪圖與基本圖形邏輯 ── */
    function getCanvasCoords(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        var clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function redrawSlideCanvas(pageIdx) {
        var fit = fits[pageIdx];
        if (!fit) return;
        var canvas = fit.querySelector('.slide-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var items = slideDrawings[pageIdx] || [];
        items.forEach(function (item) {
            ctx.save();
            ctx.strokeStyle = item.color;
            ctx.fillStyle = item.color;
            ctx.lineWidth = item.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (item.type === 'path' && item.points && item.points.length > 0) {
                ctx.beginPath();
                ctx.moveTo(item.points[0].x, item.points[0].y);
                for (var j = 1; j < item.points.length; j++) {
                    ctx.lineTo(item.points[j].x, item.points[j].y);
                }
                ctx.stroke();
            } else if (item.type === 'circle') {
                var cx = (item.x1 + item.x2) / 2;
                var cy = (item.y1 + item.y2) / 2;
                var rx = Math.abs(item.x2 - item.x1) / 2;
                var ry = Math.abs(item.y2 - item.y1) / 2;
                ctx.beginPath();
                ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, 2 * Math.PI);
                ctx.stroke();
            } else if (item.type === 'rect') {
                var rx = Math.min(item.x1, item.x2);
                var ry = Math.min(item.y1, item.y2);
                var rw = Math.abs(item.x2 - item.x1);
                var rh = Math.abs(item.y2 - item.y1);
                ctx.strokeRect(rx, ry, rw, rh);
            } else if (item.type === 'triangle') {
                var tx1 = (item.x1 + item.x2) / 2;
                var ty1 = item.y1;
                var tx2 = item.x1;
                var ty2 = item.y2;
                var tx3 = item.x2;
                var ty3 = item.y2;
                ctx.beginPath();
                ctx.moveTo(tx1, ty1);
                ctx.lineTo(tx2, ty2);
                ctx.lineTo(tx3, ty3);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.restore();
        });
    }

    var isDrawing = false;
    var currentItem = null;

    fits.forEach(function (fit, fIdx) {
        var canvas = fit.querySelector('.slide-canvas');
        if (!canvas) return;

        function startDraw(e) {
            if (currentTool === 'pointer' || currentTool === 'laser') return;
            e.preventDefault();
            isDrawing = true;
            var pt = getCanvasCoords(canvas, e);

            if (currentTool === 'pen') {
                currentItem = {
                    type: 'path',
                    color: currentColor,
                    width: currentLineWidth,
                    points: [pt]
                };
            } else if (currentTool === 'shape-circle') {
                currentItem = {
                    type: 'circle',
                    color: currentColor,
                    width: currentLineWidth,
                    x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y
                };
            } else if (currentTool === 'shape-rect') {
                currentItem = {
                    type: 'rect',
                    color: currentColor,
                    width: currentLineWidth,
                    x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y
                };
            } else if (currentTool === 'shape-triangle') {
                currentItem = {
                    type: 'triangle',
                    color: currentColor,
                    width: currentLineWidth,
                    x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y
                };
            }
        }

        function moveDraw(e) {
            if (!isDrawing || !currentItem) return;
            e.preventDefault();
            var pt = getCanvasCoords(canvas, e);

            if (currentItem.type === 'path') {
                currentItem.points.push(pt);
                redrawSlideCanvas(fIdx);
                // 即時畫最新一段
                var ctx = canvas.getContext('2d');
                ctx.save();
                ctx.strokeStyle = currentItem.color;
                ctx.lineWidth = currentItem.width;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                var len = currentItem.points.length;
                if (len > 1) {
                    ctx.beginPath();
                    ctx.moveTo(currentItem.points[len - 2].x, currentItem.points[len - 2].y);
                    ctx.lineTo(currentItem.points[len - 1].x, currentItem.points[len - 1].y);
                    ctx.stroke();
                }
                ctx.restore();
            } else {
                currentItem.x2 = pt.x;
                currentItem.y2 = pt.y;
                redrawSlideCanvas(fIdx);
                // 畫預覽圖案
                var ctx = canvas.getContext('2d');
                ctx.save();
                ctx.strokeStyle = currentItem.color;
                ctx.lineWidth = currentItem.width;
                if (currentItem.type === 'circle') {
                    var cx = (currentItem.x1 + currentItem.x2) / 2;
                    var cy = (currentItem.y1 + currentItem.y2) / 2;
                    var rx = Math.abs(currentItem.x2 - currentItem.x1) / 2;
                    var ry = Math.abs(currentItem.y2 - currentItem.y1) / 2;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, 2 * Math.PI);
                    ctx.stroke();
                } else if (currentItem.type === 'rect') {
                    var rx = Math.min(currentItem.x1, currentItem.x2);
                    var ry = Math.min(currentItem.y1, currentItem.y2);
                    var rw = Math.abs(currentItem.x2 - currentItem.x1);
                    var rh = Math.abs(currentItem.y2 - currentItem.y1);
                    ctx.strokeRect(rx, ry, rw, rh);
                } else if (currentItem.type === 'triangle') {
                    ctx.beginPath();
                    ctx.moveTo((currentItem.x1 + currentItem.x2) / 2, currentItem.y1);
                    ctx.lineTo(currentItem.x1, currentItem.y2);
                    ctx.lineTo(currentItem.x2, currentItem.y2);
                    ctx.closePath();
                    ctx.stroke();
                }
                ctx.restore();
            }
        }

        function endDraw(e) {
            if (!isDrawing) return;
            isDrawing = false;
            if (currentItem) {
                slideDrawings[fIdx].push(currentItem);
                currentItem = null;
                redrawSlideCanvas(fIdx);
            }
        }

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', moveDraw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseleave', endDraw);

        canvas.addEventListener('touchstart', startDraw, { passive: false });
        canvas.addEventListener('touchmove', moveDraw, { passive: false });
        canvas.addEventListener('touchend', endDraw, { passive: false });
    });

    // 復原 (Undo)
    var undoBtn = document.getElementById('anno-undo');
    if (undoBtn) {
        undoBtn.addEventListener('click', function () {
            if (slideDrawings[idx] && slideDrawings[idx].length > 0) {
                slideDrawings[idx].pop();
                redrawSlideCanvas(idx);
            }
        });
    }

    // 清除當前頁 (Clear)
    var clearBtn = document.getElementById('anno-clear');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (slideDrawings[idx]) {
                slideDrawings[idx] = [];
                redrawSlideCanvas(idx);
            }
        });
    }

    /* ── 提示 Toast ── */
    function showToast(msg) {
        var old = document.querySelector('.deck-toast');
        if (old && old.parentNode) old.parentNode.removeChild(old);

        var toast = document.createElement('div');
        toast.className = 'deck-toast';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 2400);
    }

    /* ── 擷圖存檔 (Snapshot & Save PNG) ── */
    var captureBtn = document.getElementById('anno-capture');
    if (captureBtn) {
        captureBtn.addEventListener('click', function () {
            var currentFit = fits[idx];
            if (!currentFit) return;
            var slideEl = currentFit.querySelector('.slide');
            if (!slideEl) return;

            showToast('⏳ 正在擷取第 ' + (idx + 1) + ' 頁簡報與筆記...');

            if (typeof html2canvas !== 'undefined') {
                html2canvas(slideEl, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    logging: false
                }).then(function (canvas) {
                    var link = document.createElement('a');
                    link.download = '南投國中115畢旅簡報-第' + String(idx + 1).padStart(2, '0') + '頁.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    showToast('📸 已成功擷取並下載第 ' + (idx + 1) + ' 頁簡報！');
                }).catch(function (err) {
                    console.error('Snapshot failed:', err);
                    showToast('❌ 擷圖失敗，請稍後重試');
                });
            } else {
                showToast('❌ html2canvas 尚未載入，請確認網路連線');
            }
        });
    }

    /* ── 啟動 ── */
    var saved = 'read';
    try { saved = localStorage.getItem('dslab-deck-mode') || 'read'; } catch (e) { /* ignore */ }
    buildToc();
    setMode(saved === 'present' ? 'present' : 'read');
    go(0);
    rescale();
    window.addEventListener('resize', rescale);
    window.addEventListener('load', function () { rescale(); });
})();
