"""Smoke test: the single-file website bundle parses and exports the app."""
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent.parent


def test_website_bundle_exists_and_parses():
    p = ROOT / "website"
    assert p.exists(), "website file missing"
    assert p.stat().st_size > 10000, "website bundle suspiciously small"
    r = subprocess.run(["node", "--check", str(p)], capture_output=True, text=True)
    assert r.returncode == 0, r.stderr


def test_website_exports_app():
    src = (ROOT / "website").read_text(encoding="utf-8")
    assert "export default" in src, "no default export in website bundle"
    assert "VisionQuantech" in src or "Visionquantech" in src
