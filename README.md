# OBLIV Lab website

Static site for the Oblivious Computation, Privacy, and Secure Learning Lab (University of Misan).

## Publish on GitHub Pages (free)
1. Create a new public repository on GitHub named `oblivlab`.
2. Upload everything in this folder (drag-and-drop works) and commit.
3. Repository → Settings → Pages → Source: "Deploy from a branch", Branch: `main`, folder: `/ (root)` → Save.
4. After ~1 minute the site is live at https://aaallami.github.io/oblivlab/

## Editing
- Add a paper: append an entry to `data/publications.json` (optional keys: `pdf`, `code`, `doi`).
- Add news: edit `news.html`, add an `<li>` at the top of the list.
- Your photo: save as `assets/ali.jpg`.
- Page content lives in `src/*.html`; run `python3 build.py` to regenerate, or edit the root `.html` files directly.
