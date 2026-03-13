import streamlit as st
from pathlib import Path


def build_inlined_html(base_dir: Path) -> str:
    """Read index_static.html and inline the CSS and JS from static/ so it can be embedded."""
    html_path = base_dir / "index_static.html"
    css_path = base_dir / "static" / "style.css"
    js_path = base_dir / "static" / "script.js"

    html = html_path.read_text(encoding="utf-8")
    css = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    js = js_path.read_text(encoding="utf-8") if js_path.exists() else ""

    # Remove existing link/script tags (best-effort) and inject inline
    # Replace <link rel="stylesheet" href="static/style.css"> with inline style
    html = html.replace('<link rel="stylesheet" href="static/style.css">', f"<style>{css}</style>")

    # Replace script include with inline script before </body>
    if '<script src="static/script.js"></script>' in html:
        html = html.replace('<script src="static/script.js"></script>', f"<script>{js}</script>")
    else:
        # fallback: insert at end of body
        html = html.replace('</body>', f"<script>{js}</script></body>")

    return html


def main():
    st.set_page_config(page_title="HW2: GridWorld (Streamlit)", layout="wide")
    st.sidebar.title("HW2: GridWorld")
    st.sidebar.markdown("This is a Streamlit wrapper that embeds the homework2 static demo.")

    base_dir = Path(__file__).parent
    html = build_inlined_html(base_dir)

    st.markdown("<div style='text-align:right;color:#6b7280;font-size:12px'>Source: homework2/index_static.html</div>", unsafe_allow_html=True)

    # Embed the demo. Height can be adjusted depending on grid size.
    st.components.v1.html(html, height=820, scrolling=True)


if __name__ == '__main__':
    main()
