快速啟動（建議使用 Flask）： 
這會啟動一個簡單的檔案伺服器並載入 `index_static.html`，讓你能立刻測試 grid / policy / evaluate 等互動功能，而不需啟動 Flask。

使用說明（詳細）
------------------

步驟概覽：

1. 建議在 `homework2` 資料夾建立並啟動虛擬環境（選用）：

```pwsh
# 建議流程（PowerShell）
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

這會啟動 Flask 的開發伺服器並在終端顯示請求日誌（例如：Running on http://127.0.0.1:5002）。如果 `python app.py` 正常執行，請在瀏覽器開啟：

		http://127.0.0.1:5002

- 方式 B（使用 flask run）：

```pwsh
$env:FLASK_APP = 'app.py'
python -m flask run --port 5002
```

方式 B 在某些環境下會因為啟動流程或環境變數問題而行為不同；若你遇到 `python -m flask run` 啟動後立即結束或瀏覽器顯示 "Connection refused"，請改用方式 A（`python app.py`）查看更完整的終端日誌。

3. 快速靜態預覽（不需 Flask）

若你只要測試前端互動（grid / policy / evaluate 等）而不需後端，使用：

```pwsh
python -m http.server 8002
```

然後在瀏覽器開啟：

		http://127.0.0.1:8002/index_static.html

主要 UI 與按鈕說明
------------------

# 114-2 HW1 / HW2 — GridWorld (homework2 is the primary deliverable)

This repository contains the interactive GridWorld demo implemented for homework2. The authoritative project code and demo live under the `homework2/` folder. The repo was reorganized so the deliverable is cleanly located in `homework2`.

Quick overview
--------------
- Files of interest:
  - `homework2/` — primary project (Flask app, static preview, Streamlit wrapper)
  - `homework2/index_static.html` — static preview that can be served by a simple file server
  - `homework2/templates/` and `homework2/static/` — frontend templates and assets
  - `homework2/streamlit_app.py` — Streamlit wrapper that embeds the static demo

How to run locally
-------------------
Recommended: create a Python virtual environment in the `homework2/` folder and install dependencies.

```pwsh
cd "C:\Users\user\Desktop\深度強化學習\homework2"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Start the Flask app (recommended for debugging):

```pwsh
python app.py
```

# 114-2 HW1 / HW2 — GridWorld

This repository contains the interactive GridWorld demo implemented for homework2. The authoritative project code and demo live under the `homework2/` folder. This README is the single, consolidated document for the project (it includes both root-level and folder-specific instructions).

## Quick start (recommended: Flask)

1. Create and activate a virtual environment inside `homework2` (PowerShell):

```pwsh
cd "C:\Users\user\Desktop\深度強化學習\homework2"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

2. Start the Flask app (recommended for debugging):

```pwsh
# from inside homework2
python app.py
```

Then open http://127.0.0.1:5002 in your browser.

Alternate: use `flask run` (may behave differently in some environments):

```pwsh
$env:FLASK_APP = 'app.py'
python -m flask run --port 5002
```

If `flask run` immediately exits or you see "Connection refused", run `python app.py` to get full terminal logs.

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

## Want a public demo?

- I can publish the static demo to GitHub Pages (copy `homework2/docs/` to root `docs/` or push to `gh-pages`) or prepare and deploy the Streamlit app to Streamlit Cloud. Tell me which you prefer and I will perform the chosen publish steps.

---

If you'd like any text changes (language style, shorter instructions, add a screenshot, or include exact Port/URL examples), tell me which edits and I'll update this README accordingly.

