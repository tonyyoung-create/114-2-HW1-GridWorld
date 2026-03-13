
# Homework2 — GridWorld (基於 homework2)

Live demo (homework2): https://tonyyoung-create.github.io/114-2homework1/  (如果已啟用 Pages)

快速啟動（建議使用 Flask 或 Streamlit）：
本 README 與資料夾均以 homework2 的內容為準（GridWorld demo、靜態預覽、Streamlit wrapper）。

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

2. 啟動伺服器（三種方式）：

- 方式 A（Flask — 直接執行應用程式檔案，推薦用於偵錯）

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

主要 UI 與按鈕說明（同 homework2/index_static.html）
------------------

- Grid size：輸入 5–9（系統會 clamp 到此範圍），按「Generate Grid」產生 n x n 格子。
- Mode：選擇 Set Start / Set End / Toggle Obstacle / Clear，然後點擊格子設定或清除。
- Random Policy：於每個可行狀態產生一個隨機（但避免自我迴圈）策略。
- Optimal Policy：執行 value iteration 並萃取貪婪策略。
- Evaluate Policy：對目前選定的策略執行策略評估（policy evaluation），顯示每格的 V(s) 值。
- Debug Overlay：切換後在每個格子顯示 distance、policy、reachable 與 self-loop 標記，便於偵錯與理解為何某些格子顯示 '-' 或極低的 V 值。

設計與演算法要點
------------------

- 環境為 deterministic GridWorld，step reward 預設為 R = -1，discount = 0.9。
- 為避免算法陷入自我迴圈導致 V(s) 飽和（例如 -10.00），實作中：
	- 在產生隨機策略與萃取貪婪策略時盡量避免選擇會導致自我迴圈的動作。
	- 對 unreachable（無法到達終點）的狀態在 UI 上以 '-' 顯示，並在評估中忽略。
	- 使用 BFS 計算每格到終點的最短步數（distance），並以該 distance 作為 value 的初始化啟發，配合 Gauss–Seidel（就地）更新以加速收斂。

常見問題與解法
----------------

- 如果看到大量 -10.00 值：請開啟 Debug Overlay 並檢查是否存在 self-loop 的 policy 或 unreachable 的格子。
- 如果 `python -m flask run` 啟動後沒有持續監聽（瀏覽器顯示 Connection refused），請改用 `python app.py` 並貼上終端日誌給我協助分析。

Streamlit (Embed) — 快速部署到 Streamlit Cloud
-------------------------------------------------
已提供 `homework2/streamlit_app.py`，可直接將靜態 demo 內嵌並在 Streamlit 中顯示：

在本機測試：

```pwsh
python -m pip install -r homework2/requirements.txt
python -m streamlit run homework2/streamlit_app.py --server.port 8501
```

然後開啟： http://localhost:8501

在 Streamlit Cloud（或 Streamlit Community Cloud）部署時，請在部署設定中指定 app 檔案為 `homework2/streamlit_app.py`（或我也可幫你移到 repo root 以自動辨識）。

進階建議
-----------

- 若你要做更精確的策略評估，可以改為解線性系統 (I - gamma * P_pi) V = R_pi（目前採迭代法以簡化實作）。
- 可增加介面控件讓使用者調整 gamma、step reward 或顯示 Start/End 座標與障礙清單。

如果需要我替你：

- 加入一個 `run_local.ps1` 或其他啟動腳本，我可以自動建立好（包含啟動虛擬環境與紀錄日誌）。
- 幫你把這個資料夾推到 GitHub（需要你在本機提供 push 權限或在系統上登入）。

README 更新完畢。
 
新功能（2026-03-13）
------------------
- 顯示 Bellman 方程與算法說明面板，說明 Value Iteration 與 policy extraction 的原理。
- 新增 "Show Optimal Path" 與 "Animate Policy" 按鈕：在計算出最適策略後，可從 Start 點追蹤並標示出一條最適路徑，或播放 Agent 沿策略移動的動畫（可調速度）。
- 增加圖例（Legend）與 path/highlight 樣式，以及 Debug Overlay 的 self-loop 標示，方便理解為何某些格子顯示 '-' 或極低的值。

如何在本機試用新 Demo
-----------------------
1. 啟動 Flask（推薦檢查 `python app.py`）：

```pwsh
cd 'C:\Users\user\Desktop\深度強化學習\homework2'
python app.py
```

2. 開啟瀏覽器：

	http://127.0.0.1:5002

或使用靜態預覽：

```pwsh
cd 'C:\Users\user\Desktop\深度強化學習\homework2'
python -m http.server 8002
# 然後開啟 http://127.0.0.1:8002/index_static.html
```

測試流程（推薦）
1. Generate Grid（5–9），用 mode 設定 Start / End / Obstacles
2. 按 Optimal Policy（或 Random Policy）產生策略
3. 按 Evaluate Policy 檢查 Value Matrix
4. 按 Show Optimal Path 檢視由 Start 沿策略到 Terminal 的路徑；或按 Animate Policy 播放 Agent 沿著路徑移動（可調整速度滑桿）

# Live demo: https://tonyyoung-create.github.io/114-2-HW1-GridWorld/

# HW1: GridWorld

此資料夾包含作業 HW1 的 GridWorld demo（原名 HW1-2），已移植為一個簡單可互動的網頁應用。

目錄說明：
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

3. 在瀏覽器開啟：

	http://localhost:5002

（若不想啟 Flask，可用靜態伺服器：在此資料夾執行 `python -m http.server 8002` 然後到 http://127.0.0.1:8002/ 測試，但推薦使用 Flask 以符合作業需求）。

說明與提示：
- 在頁面上可以設定 Grid size（5–9），按「Generate Grid」產生格子。
- 使用右側或上方的 mode 控制（Set Start / Set End / Toggle Obstacle / Clear）點擊格子設定起點、終點與障礙。
- 可按「Random Policy」或「Optimal Policy」產生策略，之後按「Evaluate Policy」計算每格的 V(s)。
- 若看到大量 `-10.00`：代表某些格子被策略設定為自我迴圈（self-loop）或是 unreachable；本專案加入了 reachability 檢測、distance 啟發與 debug overlay 來協助診斷。開啟 Debug Overlay 可檢視每格的 distance、policy、reachable 與 self-loop 標示。

如需更多調試或教學，我已把主要的對話紀錄放在 `與AIagent的對話紀錄.txt`（同資料夾）以方便追溯修改歷程。

附加檔案與靜態預覽
- `與AIagent的對話紀錄.txt`：本次與 AI 助手互動的重點摘要（中文），用於追溯修改決策與除錯步驟。
- `index_static.html`：靜態版本的頁面（引用 `static/` 內的資源），可用於不啟動 Flask 時的快速預覽。

靜態預覽（快速測試）
1. 在 `homework2` 資料夾執行：

```pwsh
python -m http.server 8002
```

2. 在瀏覽器中開啟：

	http://127.0.0.1:8002/index_static.html

這會啟動一個簡單的檔案伺服器並載入 `index_static.html`，讓你能立刻測試 grid / policy / evaluate 等互動功能，而不需啟動 Flask。

Troubleshooting
---------------

如果你依照上方步驟啟動 Flask（PowerShell）：

```pwsh
$env:FLASK_APP = 'app.py'
python -m flask run --port 5002
```

但瀏覽器顯示 "localhost 拒絕連線"，或命令在顯示啟動訊息後立即結束，請改成直接執行應用程式檔案以取得更完整的日誌：

```pwsh
# 在 homework2 資料夾下
python app.py
```

我在本地測試時發現 `python app.py` 可以啟動伺服器並印出請求日誌（例如：Running on http://127.0.0.1:5002），若能成功看到類似日誌，請在瀏覽器開啟 http://127.0.0.1:5002 。

其他檢查項目：

- 確認你使用的 Python 版本與虛擬環境（若有）已啟動並已安裝 `requirements.txt` 內的套件。
- 若使用防火牆或防毒軟體，可能會阻擋本機端口；可暫時停用或允許 Python 的本機網路連線以作測試。
- 若 `python -m flask run` 顯示錯誤訊息，請把終端機的完整輸出或 traceback 貼給我（或把錯誤內容截圖/複製），我會協助分析。

備註：如果你只是要快速檢查前端互動（不需要 Flask），使用靜態預覽（`python -m http.server 8002` 並開啟 `index_static.html`）是最快的方法。
