# Homework2 — GridWorld (final)

Live demo (homework2): https://tonyyoung-create.github.io/114-2-HW1-GridWorld/  

這個資料夾包含 Homework2 的互動 GridWorld demo（靜態與 Flask/Streamlit 版本）。此檔案已整理為最終版，並移除與 HW1 重複或過時的說明。

快速啟動（建議）
------------------

1) 安裝依賴：

```pwsh
cd 'C:\Users\user\Desktop\深度強化學習\homework2'
python -m pip install -r requirements.txt
```

2) 直接啟動 Flask（推薦用於本機開發／偵錯）：

```pwsh
python app.py
```

開啟瀏覽器到：http://127.0.0.1:5002

3) 若只需快速測試前端互動（不啟 Flask）：

```pwsh
python -m http.server 8002
# 然後開啟 http://127.0.0.1:8002/index_static.html
```

主要功能與操作
------------------

- 產生 n x n 格子（Grid size 5–9）並可在格子上設定 Start / End / Obstacles
- Random Policy（避免自我迴圈）、Optimal Policy（value iteration + greedy extraction）
- Evaluate Policy（policy evaluation，Gauss–Seidel in-place）、Debug Overlay（distance / reachable / self-loop）
- Show Optimal Path / Animate Policy（從 Start 沿策略追蹤路徑並播放）

設計要點
------------------

- deterministic GridWorld，step reward R = -1，discount γ = 0.9
- 增加 reachability（從終點 BFS）、distance 啟發、避免 self-loop 的 policy 提取以減少 V(s) 飽和為 -10 的情況

Streamlit（Embed）
------------------

已提供 `homework2/streamlit_app.py`，可將靜態 demo 內嵌在 Streamlit。部署到 Streamlit Cloud 時，可指定應用檔案為 `homework2/streamlit_app.py`。

小結（2026-03-13）
------------------

專案已整理為最終版本：我已移除重複說明、更新 Repo/Pages 連結，並將部署相關說明簡化為上面的快速啟動段落。如需我把 Streamlit app 移至 repo root 或覆寫 `gh-pages` 讓 GitHub Pages 直接指向這份 demo，請告訴我。
備註：如果你只是要快速檢查前端互動（不需要 Flask），使用靜態預覽（`python -m http.server 8002` 並開啟 `index_static.html`）是最快的方法。
