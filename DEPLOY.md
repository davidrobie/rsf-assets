# Deploying to DreamHost

The site builds to a folder of static files (`dist/`) and is rsync'd to DreamHost on every push to `main`. No PHP, no database, fast.

You only need to do steps 1–4 once.

---

## 1. On DreamHost: enable SSH and find your paths

1. Log in to the DreamHost panel.
2. **Users → Manage Users** → click your shell user (e.g. `dh_yourname`). Make sure type is **Shell user**, not FTP.
3. Note these three values — you'll paste them into GitHub as secrets:
   - **SSH user**: e.g. `dh_yourname`
   - **SSH host**: e.g. `iad1-shared-b8-44.dreamhost.com` (find under your user)
   - **Site path**: typically `/home/dh_yourname/lwi21c.com` (the directory DreamHost serves for the domain)

If the domain isn't hooked up yet:
- DreamHost panel → **Websites → Manage Websites → Add Website**, pick the domain `lwi21c.com`, set the directory to `/home/dh_yourname/lwi21c.com`. DreamHost will create the folder and serve it as static HTML by default.

---

## 2. Generate an SSH key for GitHub Actions

On **your local machine** (not DreamHost), generate a dedicated key:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/dreamhost_deploy -N "" -C "github-actions-deploy"
```

This creates two files:
- `~/.ssh/dreamhost_deploy`        (private — goes into GitHub secrets)
- `~/.ssh/dreamhost_deploy.pub`    (public — goes onto DreamHost)

Copy the **public** key onto DreamHost:

```bash
ssh-copy-id -i ~/.ssh/dreamhost_deploy.pub dh_yourname@iad1-shared-b8-44.dreamhost.com
```

(or manually append the contents of `dreamhost_deploy.pub` to `~/.ssh/authorized_keys` on the server).

Test it:

```bash
ssh -i ~/.ssh/dreamhost_deploy dh_yourname@iad1-shared-b8-44.dreamhost.com
# you should land in your DreamHost home directory
```

---

## 3. Capture DreamHost's host fingerprint

```bash
ssh-keyscan -t ed25519,rsa iad1-shared-b8-44.dreamhost.com
```

Save the entire output. You'll paste it into GitHub as a secret (so the deploy job can verify it's actually talking to DreamHost).

---

## 4. Add GitHub secrets

In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**. Add five:

| Secret name              | Value                                              |
| ------------------------ | -------------------------------------------------- |
| `DREAMHOST_USER`         | `dh_yourname`                                      |
| `DREAMHOST_HOST`         | `iad1-shared-b8-44.dreamhost.com`                  |
| `DREAMHOST_PATH`         | `/home/dh_yourname/lwi21c.com`                     |
| `DREAMHOST_SSH_KEY`      | Contents of `~/.ssh/dreamhost_deploy` (private)    |
| `DREAMHOST_KNOWN_HOSTS`  | Output of the `ssh-keyscan` command from step 3   |

---

## 5. Push to main

```bash
git add .
git commit -m "Initial site"
git push origin main
```

Open the **Actions** tab on GitHub — you should see "Build & Deploy to DreamHost" running. When it finishes (~1–2 minutes), visit `https://www.lwi21c.com` and the site should be live.

---

## Moving to the permanent domain later

1. In DreamHost, point `www.rightsizedframework.com` at the same directory, or set up a new directory and update the rsync path.
2. In `astro.config.mjs`, change `site: 'https://www.lwi21c.com'` → the real domain.
3. In `public/robots.txt`, replace the `Disallow: /` block with:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://www.rightsizedframework.com/sitemap-index.xml
   ```
4. Push. Done.

---

## Troubleshooting

**"Permission denied (publickey)"** → the public key didn't make it onto DreamHost, or you used the wrong user. SSH into the box manually with `-v` to debug.

**Deploy succeeds but the site is empty** → `DREAMHOST_PATH` points to the wrong directory. Verify by SSH'ing in and running `pwd` after `cd` into the path.

**HTML serves as text/plain** → DreamHost is treating the directory as text. Make sure the domain in the panel is set as a regular **Fully Hosted** website, not "Mirror" or "Redirect."

**Fonts not loading on the live site** → fine on staging if it works; we use Google Fonts via CDN with no API key.
