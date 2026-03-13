# GridWorld Demo — 使用說明

這是一個互動式 GridWorld 示範（作業 deliverable 放在 `homework2/`），適合想快速體驗格子世界策略與策略評估的使用者。

快速預覽
---------
（若要快速在本機測試，請使用「快速靜態預覽」或啟動本機 Flask 伺服器。）

快速開始（最短步驟，PowerShell）
---------------------------------
1. 進入 `homework2` 資料夾：

```pwsh
cd 'C:\Users\user\Desktop\深度強化學習\homework2'
```

2. （可選）建立並啟用虛擬環境，安裝必要套件：

```pwsh
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

3. 啟動本機伺服器（推薦，用於互動與除錯）：

```pwsh
python app.py
```

打開瀏覽器並前往：

    http://127.0.0.1:5002

快速靜態預覽（不需安裝）
------------------------
如果你只想快速試試前端互動（不啟動 Flask）：

```pwsh
python -m http.server 8002
# 然後開啟 http://127.0.0.1:8002/index_static.html
```

Streamlit（可選，雲端或本機）
--------------------------------
專案包含一個 Streamlit 包裝器，可在 Streamlit Cloud 或本機啟動：

```pwsh
python -m pip install -r homework2/requirements.txt
python -m streamlit run homework2/streamlit_app.py --server.port 8501
```

然後開啟 http://localhost:8501

重要頁面與檔案
----------------
- `homework2/index_static.html`：靜態預覽入口（可直接在瀏覽器開啟）
- `homework2/templates/index.html`：Flask 版的頁面模板
- `homework2/static/script.js`、`homework2/static/style.css`：前端互動程式與樣式
- `homework2/app.py`：Flask 應用入口
- `homework2/streamlit_app.py`：Streamlit 包裝器

使用提示（給使用者）
----------------------
- 在 UI 可調整 Grid 大小（建議 5–9）。
- 使用「Set Start / Set End / Toggle Obstacle」設定格子狀態。
- 「Random Policy」與「Optimal Policy」可生成策略；點選「Evaluate Policy」查看每格 V(s)。
- 若看到很多 `-10.00`，請開啟 Debug Overlay 檢查是否有 self-loop 或 unreachable（無法到達終點）的格子。

遇到問題？（簡短排查）
------------------------
- 啟動後看不到網頁或連線被拒：在 `homework2` 資料夾執行 `python app.py`，把終端機的錯誤輸出複製貼上給我。
- 套件安裝問題：確認已啟動虛擬環境並使用 `pip install -r requirements.txt` 安裝依賴。
- 端口被佔用或防火牆阻擋：檢查本機防火牆或嘗試更換 port。

發佈或下一步（可選）
---------------------------------
- 將靜態 demo 發佈到 GitHub Pages：可將 `homework2/docs/` 的內容複製到 repo 根的 `docs/` 並推送，或建立/更新 `gh-pages` 分支。
- 部署到 Streamlit Cloud：將 App 檔設定為 `homework2/streamlit_app.py`，並使用 `homework2/requirements.txt` 進行部署。
- 新增 `run_local.ps1` 啟動腳本：建立一個腳本以自動啟動虛擬環境並啟動伺服器。

若要執行上述任一項，請在本專案開啟 issue 或於討論區註明所需操作，團隊即可依指示執行。
快速啟動（建議使用 Flask）： 
這會啟動一個簡單的檔案伺服器並載入 `index_static.html`，讓你能立刻測試 grid / policy / evaluate 等互動功能，而不需啟動 Flask。

使用說明（詳細）
------------------

步驟概覽：

1. 建議在 `homework2` 資料夾建立並啟動虛擬環境（選用）：
# 114-2 HW1 / HW2 — GridWorld

Live demo (optional): https://tonyyoung-create.github.io/114-2homework1/

## 簡介
本倉庫的主要 deliverable 放在 `homework2/`，包含一個可互動的 GridWorld demo（前端 HTML/JS + Flask 示範後端），並提供 Streamlit 包裝以便雲端部署。

## 目標
- 互動式 GridWorld：格子生成、起/終點設定、障礙、策略（隨機/貪婪）、策略評估與視覺化。
- 支援本機開發（Flask）、靜態預覽（檔案伺服器）與 Streamlit 部署。

## 快速啟動（推薦：Flask）
1) 建立虛擬環境並安裝依賴（PowerShell）：

```pwsh
cd 'C:\Users\user\Desktop\深度強化學習\homework2'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

2) 啟動 Flask（開發/除錯模式，推薦）：

```pwsh
python app.py
```

在瀏覽器開啟：http://127.0.0.1:5002

替代（若你想使用 flask CLI）：

```pwsh
$env:FLASK_APP = 'app.py'
python -m flask run --port 5002
```

若 `flask run` 立刻退出或無法連線，改用 `python app.py` 可取得完整日誌。

## 靜態預覽（快速測試，無需 Flask）

```pwsh
python -m http.server 8002
# 然後打開 http://127.0.0.1:8002/index_static.html
```

## Streamlit（可選）
若要在 Streamlit Cloud 或本機測試 Streamlit wrapper：

```pwsh
python -m pip install -r homework2/requirements.txt
python -m streamlit run homework2/streamlit_app.py --server.port 8501
```

開啟 http://localhost:8501

## 主要檔案
- `homework2/` — 主專案資料夾（Flask app、靜態預覽、Streamlit wrapper）
- `homework2/index_static.html` — 靜態預覽
- `homework2/templates/index.html` — Flask 模板
- `homework2/static/script.js`, `homework2/static/style.css` — 前端邏輯與樣式
- `homework2/app.py` — Flask 開發應用
- `homework2/streamlit_app.py` — Streamlit 包裝器
- `homework2/requirements.txt` — 建議依賴（Flask、streamlit、gunicorn）

## 演算法要點
- 環境為 deterministic GridWorld；step reward 預設 R = -1，discount γ = 0.9。
- 為避免自我迴圈導致 V(s) 飽和：
  - 生成策略時避免 self-loop（若可能）
  - 使用 BFS 計算 distance 作為啟發初始值
  - 使用 Gauss–Seidel（就地）更新以加速策略評估收斂

## 部署建議
- GitHub Pages（靜態）：`homework2/docs/` 已含靜態副本。可將該內容複製到 repo 根 `docs/`，或發佈到 `gh-pages` 分支。
- Streamlit Cloud（互動）：將 App 設為 `homework2/streamlit_app.py` 並使用 `homework2/requirements.txt`。
- 伺服器部署（Render/Heroku 類似）：使用 `gunicorn`（例如 `gunicorn homework2.app:app`）。

## 常見問題（Troubleshooting）
- 若看到大量 `-10.00`：請開啟 Debug Overlay 檢查是否存在 self-loop 或 unreachable 的格子。
- 若 Flask 在啟動後馬上結束或瀏覽器無法連線，請執行 `python app.py`，並將終端的 traceback 儲存或貼於 issue/討論串中以供協作者協助診斷。
- 確認已啟動虛擬環境且已安裝依賴；如遇到防火牆阻擋，請允許 Python 的本機連線或更換 port。

## 版控說明
- `homework1/` 已從版本控制移除並列入 `.gitignore`（如需恢復，請從本地備份或其他來源還原）。
- 本 repo 只保留一份 README（此檔，位於 repo root）；`homework2/` 下保留一個簡短指向檔案以便瀏覽。

## 可採取的後續操作（可選）
- 將 `homework2/docs/` 發佈到 GitHub Pages：可將該內容複製到 repo 根的 `docs/` 並推送，或建立/更新 `gh-pages` 分支。
- 在 Streamlit Cloud 建立部署：設定 App 檔為 `homework2/streamlit_app.py` 並使用 `homework2/requirements.txt`。
- 新增 `run_local.ps1` 啟動腳本：建立腳本以自動啟動虛擬環境並啟動伺服器。

若要執行其中任一項，請在本專案建立 issue 或於討論中註明欲採取的操作，協作者即可依指示執行。

## Quick static preview (no Flask required)

If you only want to test the frontend interactions (grid / policy / evaluate) without running Flask:

```pwsh
python -m http.server 8002
# open http://127.0.0.1:8002/index_static.html
```

## Files of interest

- `homework2/` — primary project folder (Flask app, static preview, Streamlit wrapper).
- `homework2/index_static.html` — static preview referencing files in `homework2/static/`.
- `homework2/templates/index.html` — Flask template.
- `homework2/static/script.js`, `homework2/static/style.css` — frontend logic and styles.
- `homework2/app.py` — Flask development app.
- `homework2/streamlit_app.py` — Streamlit wrapper that embeds the static demo.
- `homework2/requirements.txt` — dependencies (Flask, streamlit, gunicorn).

## Streamlit (optional)

To run the Streamlit wrapper locally or deploy to Streamlit Cloud:

```pwsh
python -m pip install -r homework2/requirements.txt
python -m streamlit run homework2/streamlit_app.py --server.port 8501
```

Open http://localhost:8501.

## Deployment notes

- GitHub Pages: a static copy suitable for Pages is included under `homework2/docs/`. To publish on Pages you can either:
  - copy the contents of `homework2/docs/` into a top-level `docs/` folder and enable Pages from `main/docs`, or
  - publish `homework2/docs/` via a `gh-pages` branch (force-update if needed).

- Streamlit Cloud: set the app file to `homework2/streamlit_app.py` and ensure `homework2/requirements.txt` (or a root `requirements.txt`) lists required packages.

## Usage notes and tips

- Grid size is adjustable in the UI (recommended 5–9).
- Use page mode controls (Set Start / Set End / Toggle Obstacle / Clear) to set the start, goal and obstacles.
- "Random Policy" and "Optimal Policy" create policies you can evaluate with "Evaluate Policy" to compute V(s) per cell.
- If you see many `-10.00` values, the policy may include self-loops or unreachable states; the demo includes reachability checks, a distance heuristic, and a debug overlay to help diagnose this. Enable the Debug Overlay to view distance, policy, reachable, and self-loop markers per cell.

## Troubleshooting

- If Flask exits immediately or the browser cannot connect, run `python app.py` from the `homework2` folder to see a full traceback and logs.
- Ensure your virtual environment is activated and dependencies installed.
- If a port appears blocked, check firewall/antivirus settings and allow Python to accept local connections during testing.

## Repository housekeeping

- `homework1/` was intentionally removed from tracked files and listed in `.gitignore` per prior decisions. If you need the original `homework1` files restored, provide a backup — they are not tracked in this repo's current history as normal files.

## 公開示範 (選項)

- 發佈到 GitHub Pages（靜態）：將 `homework2/docs/` 的內容複製到 repo 根的 `docs/` 並推送，或建立/更新 `gh-pages` 分支以發佈靜態站點。
- 部署到 Streamlit Cloud（互動）：設定 App 檔為 `homework2/streamlit_app.py` 並使用 `homework2/requirements.txt` 進行部署。

---

若需文字調整（語言風格、簡化說明、加入截圖或明確 Port/URL 範例），請在專案中提出 issue 或 pull request，所需的修改會由維護流程處理。

