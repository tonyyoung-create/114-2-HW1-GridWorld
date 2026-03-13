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

Open http://127.0.0.1:5002 in your browser.

Static preview (no server required):

```pwsh
python -m http.server 8002
# then open http://127.0.0.1:8002/index_static.html
```

Streamlit (optional)
--------------------
The repository includes `homework2/streamlit_app.py` which inlines the static demo and embeds it in Streamlit. To run locally:

```pwsh
python -m pip install -r requirements.txt
python -m streamlit run homework2/streamlit_app.py --server.port 8501
```

Then open http://localhost:8501.

Deployment notes
----------------
- GitHub Pages: a static copy suitable for Pages is provided under `homework2/docs/` and `homework2/index_static.html`.
- Streamlit Cloud: set the app file to `homework2/streamlit_app.py` and point the service at this repo (ensure required packages are listed in `requirements.txt`).

Repository housekeeping
----------------------
- `homework1/` was intentionally removed from the tracked files and is kept local/ignored by `.gitignore` (if you need it restored, restore from your local backup).
- If you want the public GitHub Pages demo to show `homework2`, tell me and I can publish `homework2/docs/` to the `gh-pages` branch or copy the static files to a `docs/` folder at repo root.

If you need further changes (move the Streamlit app to repo root, publish Pages, or create a small run script), tell me which and I'll handle it.

---

