# Homework2 — GridWorld (short)

本資料夾包含 GridWorld 的示範程式與靜態預覽。請參考 repo 根目錄的 `README.md` 作為主要使用說明。

快速啟動（最短）：

```pwsh
cd 'C:\Users\user\Desktop\深度強化學習\homework2'
python app.py
# 然後在瀏覽器開啟 http://127.0.0.1:5002
```

若僅想預覽前端：

```pwsh
python -m http.server 8002
# 打開 http://127.0.0.1:8002/index_static.html
```

更多詳細說明請參見上層的 `README.md`（repo root）。
快速啟動（建議使用 Flask）： 
這會啟動一個簡單的檔案伺服器並載入 `index_static.html`，讓你能立刻測試 grid / policy / evaluate 等互動功能，而不需啟動 Flask。

Refer to the repository root README.md for the consolidated project overview and run/deploy instructions.

This `homework2/README.md` contains development notes and local tips specific to the homework2 folder. For most users, follow the top-level README (root) which is kept up to date.
- `templates/index.html`：Flask 模板（頁面標題已改為 "HW1: GridWorld"）。
- `static/style.css`：樣式。
- `static/script.js`：前端邏輯（生成 n x n 格子、可點擊設定 Start/End/Obstacle、隨機/最適策略、策略評估、debug overlay）。
- `app.py`：簡單的 Flask 應用。
- `requirements.txt`：需要的 Python 套件（Flask）。

快速啟動（建議使用 Flask）：

1. 在 `homework2` 資料夾建立或啟用虛擬環境，並安裝依賴：

```pwsh
python -m pip install -r requirements.txt
```

2. 啟動 Flask（在 `homework2` 目錄）：

```pwsh
$env:FLASK_APP = 'app.py'
python -m flask run --port 5002
```

# 114-2 HW1 / HW2 — GridWorld

此檔案已整合與 `README.md`（repo root）的內容，並保留本資料夾的補充說明；建議以 root 的 `README.md` 為主要參考來源。

快速啟動（建議使用 Flask）
---------------------------
以下步驟可讓你在本機快速啟動與測試：

1. 建議在 `homework2` 資料夾建立並啟動虛擬環境：

```pwsh
cd "C:\Users\user\Desktop\深度強化學習\homework2"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

2. 啟動伺服器（兩種方式）：

- 方式 A（直接執行應用程式檔案，推薦用於偵錯）

```pwsh
# 在 homework2 資料夾下
python app.py
```

然後在瀏覽器開啟： http://127.0.0.1:5002

- 方式 B（使用 flask run）

```pwsh
$env:FLASK_APP = 'app.py'
python -m flask run --port 5002
```

若 `python -m flask run` 啟動後立即結束或瀏覽器顯示 "Connection refused"，請改用方式 A（`python app.py`）以取得更完整的日誌。

快速靜態預覽（不需 Flask）
--------------------------------
若你只要測試前端互動（grid / policy / evaluate 等）而不需後端，使用：

```pwsh
python -m http.server 8002
```

然後在瀏覽器開啟： http://127.0.0.1:8002/index_static.html

主要檔案說明
----------------
- `homework2/index_static.html` — 靜態預覽。
- `homework2/templates/index.html` — Flask 模板。
- `homework2/static/` — 包含 `script.js`, `style.css` 等前端資源。
- `homework2/app.py` — 簡單的 Flask 應用（開發用）。
- `homework2/streamlit_app.py` — Streamlit wrapper，將靜態 demo 內嵌在 Streamlit 應用中。
- `homework2/requirements.txt` — 依賴清單（包含 Flask、streamlit、gunicorn）。

操作提示與註記
------------------
- Grid size 可設定在 5–9 範圍內（UI 上的控制）。
- 使用頁面上的 mode（Set Start / Set End / Toggle Obstacle / Clear）設定起點、終點與障礙。
- "Random Policy" 與 "Optimal Policy" 可產生不同策略，按下 "Evaluate Policy" 可計算每格的 V(s)。
- 若看到大量 `-10.00`：代表某些格子被策略設定為自我迴圈（self-loop）或為 unreachable，本專案包含 reachability 檢測、distance 啟發與 debug overlay 以協助診斷。

靜態預覽（快速測試）
---------------------
1. 在 `homework2` 資料夾執行：

```pwsh
python -m http.server 8002
```

2. 在瀏覽器中開啟： http://127.0.0.1:8002/index_static.html

Streamlit（可選）
-----------------
要使用 Streamlit 本地測試或部署至 Streamlit Cloud：

```pwsh
python -m pip install -r requirements.txt
python -m streamlit run homework2/streamlit_app.py --server.port 8501
```

然後開啟 http://localhost:8501

部署備註
---------
- GitHub Pages：`homework2/docs/` 包含靜態副本，可將其發佈到 Pages（透過 `gh-pages` 分支或將檔案複製到 repo 根下的 `docs/`）。
- Streamlit Cloud：設定 app 檔為 `homework2/streamlit_app.py` 並使用 `homework2/requirements.txt`。

故障排除（Troubleshooting）
---------------------------
- 若 Flask 在啟動後馬上結束或瀏覽器顯示拒絕連線，請直接用 `python app.py` 以取得完整 traceback。
- 確認虛擬環境已啟動且 `requirements.txt` 的套件已安裝。
- 防火牆或防毒軟體可能會阻擋本機連線，請允許 Python 的執行或暫時停用防護軟體以做測試。

附加檔案
--------
- `與AIagent的對話紀錄.txt`：與 AI 助手互動的修改歷程與決策摘要（中文）。

如果你希望我把 root `README.md` 的內容完全複寫回此檔、或只保留一個連結回 root README，告訴我你偏好的整合方式，我會依此修改。
