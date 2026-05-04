<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TradeLedger — Where Real Traders Build Reputation</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,500;0,600;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F4EFE6;
    --bg-card: #FDFAF5;
    --bg-dark: #1C1814;
    --text-primary: #1C1814;
    --text-secondary: #6B6258;
    --text-tertiary: #9C938A;
    --border: rgba(28, 24, 20, 0.10);
    --border-md: rgba(28, 24, 20, 0.16);
    --accent-green: #3D6B4A;
    --accent-green-light: #EAF2ED;
    --accent-amber: #8B6914;
    --accent-amber-light: #F5EDDB;
    --accent-red: #8B2E2E;
    --accent-red-light: #F5E8E8;
    --accent-blue: #2D5580;
    --accent-blue-light: #E8EFF7;
    --gold: #9B7E3A;
    --radius: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text-primary);
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(244, 239, 230, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    height: 60px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: 'Cormorant Garant', serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--text-primary);
    text-decoration: none;
  }
  .nav-logo span {
    color: var(--gold);
  }
  .nav-links {
    display: flex; align-items: center; gap: 2rem;
    list-style: none;
  }
  .nav-links a {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--text-secondary);
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--text-primary); }
  .nav-cta {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-primary) !important;
    border: 1px solid var(--border-md);
    padding: 8px 18px;
    border-radius: var(--radius);
    transition: background 0.2s, border-color 0.2s !important;
  }
  .nav-cta:hover { background: var(--bg-card) !important; border-color: var(--text-primary) !important; }

  /* CONTAINERS */
  .container { max-width: 1160px; margin: 0 auto; padding: 0 2rem; }
  .section { padding: 100px 0; }
  .section-sm { padding: 72px 0; }

  /* SECTION LABELS */
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::before {
    content: '';
    display: inline-block;
    width: 24px; height: 1px;
    background: var(--text-tertiary);
  }

  /* DIVIDERS */
  .divider { height: 1px; background: var(--border); }

  /* ===================== HERO ===================== */
  .hero {
    padding: 180px 0 120px;
    position: relative;
    overflow: hidden;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 80px;
    align-items: start;
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 10px;
  }
  .hero-eyebrow::before {
    content: '';
    width: 32px; height: 1px;
    background: var(--gold);
    display: inline-block;
  }
  .hero h1 {
    font-family: 'Cormorant Garant', serif;
    font-size: 64px;
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 2rem;
  }
  .hero h1 em {
    font-style: italic;
    color: var(--gold);
  }
  .hero-sub {
    font-size: 17px;
    font-weight: 300;
    color: var(--text-secondary);
    max-width: 460px;
    line-height: 1.75;
    margin-bottom: 3rem;
  }
  .hero-sub strong { font-weight: 500; color: var(--text-primary); }
  .hero-actions {
    display: flex; align-items: center; gap: 1.5rem;
  }
  .btn-primary {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--text-primary);
    color: var(--bg);
    border: 1px solid var(--text-primary);
    padding: 13px 28px;
    border-radius: var(--radius);
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { background: var(--bg-dark); border-color: var(--bg-dark); }
  .btn-ghost {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 6px;
    transition: color 0.2s;
  }
  .btn-ghost:hover { color: var(--text-primary); }
  .btn-ghost-arrow { font-size: 16px; }

  /* Hero right panel — live feed preview */
  .hero-panel {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    position: sticky;
    top: 80px;
  }
  .hero-panel-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .hero-panel-title {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }
  .live-dot {
    display: flex; align-items: center; gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--accent-green);
    letter-spacing: 0.06em;
  }
  .live-dot::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent-green);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .trade-item {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: start;
    transition: background 0.15s;
  }
  .trade-item:hover { background: rgba(28,24,20,0.02); }
  .trade-item:last-child { border-bottom: none; }
  .trade-pair {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
    letter-spacing: 0.02em;
  }
  .trade-dir {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 2px;
    display: inline-block;
    margin-left: 8px;
  }
  .dir-long { background: var(--accent-green-light); color: var(--accent-green); }
  .dir-short { background: var(--accent-red-light); color: var(--accent-red); }
  .trade-meta {
    display: flex; align-items: center; gap: 10px;
    margin-top: 5px;
    flex-wrap: wrap;
  }
  .trade-meta-item {
    font-size: 11px;
    color: var(--text-tertiary);
    font-family: 'DM Mono', monospace;
  }
  .trade-meta-item span {
    color: var(--text-secondary);
    font-weight: 400;
  }
  .trade-status {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .status-active { background: var(--accent-blue-light); color: var(--accent-blue); }
  .status-tp { background: var(--accent-green-light); color: var(--accent-green); }
  .status-sl { background: var(--accent-red-light); color: var(--accent-red); }
  .trade-rr {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--text-secondary);
    text-align: right;
  }
  .trade-rr strong {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .hero-panel-footer {
    padding: 12px 20px;
    background: rgba(28,24,20,0.02);
    border-top: 1px solid var(--border);
    font-size: 11px;
    color: var(--text-tertiary);
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  /* ===================== STATEMENT ===================== */
  .statement-block {
    background: var(--bg-dark);
    padding: 100px 0;
    position: relative;
    overflow: hidden;
  }
  .statement-block::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(155,126,58,0.4), transparent);
  }
  .statement-inner {
    max-width: 760px;
  }
  .statement-block .section-label { color: rgba(155,126,58,0.6); }
  .statement-block .section-label::before { background: rgba(155,126,58,0.6); }
  .statement-quote {
    font-family: 'Cormorant Garant', serif;
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: rgba(244,239,230,0.92);
    margin-bottom: 2.5rem;
    letter-spacing: -0.01em;
  }
  .statement-quote em {
    font-style: italic;
    color: rgba(155,126,58,0.85);
  }
  .statement-body {
    font-size: 16px;
    font-weight: 300;
    color: rgba(244,239,230,0.55);
    max-width: 560px;
    line-height: 1.8;
  }
  .statement-body strong { font-weight: 500; color: rgba(244,239,230,0.8); }

  .statement-rule {
    margin: 3rem 0;
    padding: 2rem 2.5rem;
    border-left: 2px solid rgba(155,126,58,0.5);
    background: rgba(244,239,230,0.03);
    border-radius: 0 var(--radius) var(--radius) 0;
  }
  .statement-rule p {
    font-family: 'Cormorant Garant', serif;
    font-size: 24px;
    font-style: italic;
    font-weight: 400;
    color: rgba(244,239,230,0.75);
    line-height: 1.5;
  }

  /* ===================== HOW IT WORKS ===================== */
  .how-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 3rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .how-step {
    background: var(--bg-card);
    padding: 40px 36px;
    position: relative;
  }
  .how-step:not(:last-child) { border-right: 1px solid var(--border); }
  .how-num {
    font-family: 'Cormorant Garant', serif;
    font-size: 64px;
    font-weight: 400;
    color: rgba(28,24,20,0.07);
    line-height: 1;
    margin-bottom: 1.5rem;
    display: block;
  }
  .how-step h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }
  .how-step p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.7;
  }
  .how-step .tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent-amber);
    background: var(--accent-amber-light);
    padding: 3px 8px;
    border-radius: 2px;
    margin-top: 1.25rem;
  }

  /* Section h2 */
  h2.section-h2 {
    font-family: 'Cormorant Garant', serif;
    font-size: 42px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  h2.section-h2 em {
    font-style: italic;
    color: var(--gold);
  }
  .section-sub {
    font-size: 15px;
    font-weight: 300;
    color: var(--text-secondary);
    max-width: 520px;
    line-height: 1.75;
  }

  /* ===================== COMPARISON ===================== */
  .compare-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 3rem;
  }
  .compare-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .compare-card-header {
    padding: 20px 28px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .compare-card-header h3 {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.03em;
  }
  .compare-badge {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 2px;
    margin-left: auto;
  }
  .badge-legacy { background: var(--accent-red-light); color: var(--accent-red); }
  .badge-tl { background: var(--accent-green-light); color: var(--accent-green); }
  .compare-list {
    padding: 24px 28px;
    list-style: none;
    display: flex; flex-direction: column; gap: 14px;
  }
  .compare-list li {
    font-size: 14px;
    color: var(--text-secondary);
    display: flex; align-items: flex-start; gap: 10px;
    line-height: 1.5;
  }
  .compare-list li::before {
    content: '';
    width: 16px; height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .compare-card.legacy .compare-list li::before {
    background: var(--accent-red-light);
    outline: 1.5px solid var(--accent-red);
    outline-offset: -3px;
  }
  .compare-card.tl .compare-list li {
    color: var(--text-primary);
  }
  .compare-card.tl .compare-list li::before {
    background: var(--accent-green);
  }

  /* ===================== METRICS ===================== */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    margin-top: 3rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .metric-card {
    background: var(--bg-card);
    padding: 36px 28px;
    border-right: 1px solid var(--border);
    position: relative;
  }
  .metric-card:last-child { border-right: none; }
  .metric-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 0.75rem;
  }
  .metric-value {
    font-family: 'Cormorant Garant', serif;
    font-size: 48px;
    font-weight: 400;
    line-height: 1;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }
  .metric-desc {
    font-size: 13px;
    color: var(--text-tertiary);
    line-height: 1.6;
    font-weight: 300;
  }
  .metrics-note {
    margin-top: 1.5rem;
    padding: 14px 20px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    display: flex; align-items: center; gap: 10px;
    font-size: 12px;
    color: var(--text-tertiary);
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }
  .metrics-note::before {
    content: '—';
    color: var(--gold);
  }

  /* ===================== FEED ===================== */
  .feed-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 40px;
    margin-top: 3rem;
    align-items: start;
  }
  .feed-list {
    display: flex; flex-direction: column; gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .feed-header {
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-card);
    display: flex; align-items: center; justify-content: space-between;
  }
  .feed-title {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .feed-trade {
    background: var(--bg-card);
    padding: 20px;
    border-bottom: 1px solid var(--border);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: start;
    transition: background 0.15s;
    cursor: default;
  }
  .feed-trade:hover { background: rgba(28,24,20,0.015); }
  .feed-trade:last-child { border-bottom: none; }
  .feed-trade-top {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 6px;
  }
  .feed-pair {
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    letter-spacing: 0.02em;
  }
  .feed-trader {
    font-size: 12px;
    color: var(--text-tertiary);
    margin-bottom: 10px;
    display: flex; align-items: center; gap: 6px;
  }
  .trader-avatar {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--border-md);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 9px;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: uppercase;
  }
  .feed-levels {
    display: flex; gap: 16px;
    margin-top: 8px;
  }
  .level-item {
    display: flex; flex-direction: column; gap: 2px;
  }
  .level-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }
  .level-value {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .feed-right {
    display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  }
  .feed-rr {
    font-family: 'Cormorant Garant', serif;
    font-size: 26px;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1;
  }
  .feed-rr-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: var(--text-tertiary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: right;
  }

  /* Sidebar */
  .feed-sidebar {
    display: flex; flex-direction: column; gap: 16px;
    position: sticky; top: 80px;
  }
  .sidebar-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .sidebar-card-header {
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }
  .sidebar-card-body { padding: 16px 18px; }
  .stat-row {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
  }
  .stat-row:last-child { border-bottom: none; padding-bottom: 0; }
  .stat-row-label { color: var(--text-tertiary); font-size: 12px; }
  .stat-row-value {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
  }
  .stat-row-value.green { color: var(--accent-green); }
  .stat-row-value.amber { color: var(--accent-amber); }

  /* ===================== TRADER PROFILE ===================== */
  .profile-grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 24px;
    margin-top: 3rem;
  }
  .profile-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    height: fit-content;
  }
  .profile-header {
    padding: 28px;
    border-bottom: 1px solid var(--border);
  }
  .profile-avatar {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--bg);
    border: 1px solid var(--border-md);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garant', serif;
    font-size: 22px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
  .profile-name {
    font-size: 17px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 3px;
  }
  .profile-handle {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--text-tertiary);
    letter-spacing: 0.04em;
  }
  .reputation-score {
    margin-top: 1.5rem;
    padding: 16px;
    background: var(--bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .rep-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }
  .rep-value {
    font-family: 'Cormorant Garant', serif;
    font-size: 32px;
    font-weight: 500;
    color: var(--gold);
    line-height: 1;
  }
  .rep-sub { font-size: 11px; color: var(--text-tertiary); margin-top: 2px; }

  .profile-stats {
    padding: 20px 28px;
    display: flex; flex-direction: column; gap: 0;
  }
  .profile-stat {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
  }
  .profile-stat:last-child { border-bottom: none; }
  .profile-stat-label { color: var(--text-tertiary); }
  .profile-stat-value {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
  }
  .profile-stat-value.pos { color: var(--accent-green); }

  /* Equity curve */
  .equity-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .equity-header {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .equity-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
  }
  .equity-return {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--accent-green);
    font-weight: 500;
  }
  .equity-chart-area {
    padding: 24px 24px 16px;
    height: 180px;
    position: relative;
  }

  /* ===================== TRUST ===================== */
  .trust-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 3rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .trust-item {
    background: var(--bg-card);
    padding: 36px 32px;
    border-right: 1px solid var(--border);
  }
  .trust-item:last-child { border-right: none; }
  .trust-icon {
    width: 36px; height: 36px;
    border: 1px solid var(--border-md);
    border-radius: var(--radius);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
    font-size: 16px;
  }
  .trust-item h3 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  .trust-item p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.7;
    font-weight: 300;
  }

  /* ===================== FINAL CTA ===================== */
  .final-cta {
    background: var(--bg-dark);
    padding: 120px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .final-cta::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(155,126,58,0.4), transparent);
  }
  .final-cta .section-label {
    justify-content: center;
    color: rgba(155,126,58,0.6);
    margin-bottom: 2rem;
  }
  .final-cta .section-label::before { background: rgba(155,126,58,0.6); }
  .final-h2 {
    font-family: 'Cormorant Garant', serif;
    font-size: 56px;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: rgba(244,239,230,0.9);
    margin-bottom: 1.5rem;
  }
  .final-h2 em {
    font-style: italic;
    color: rgba(155,126,58,0.85);
  }
  .final-sub {
    font-size: 16px;
    font-weight: 300;
    color: rgba(244,239,230,0.45);
    margin-bottom: 3.5rem;
    line-height: 1.75;
  }
  .final-actions {
    display: flex; align-items: center; justify-content: center; gap: 1.5rem;
    flex-wrap: wrap;
  }
  .btn-gold {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--gold);
    color: var(--bg);
    border: 1px solid var(--gold);
    padding: 13px 32px;
    border-radius: var(--radius);
    text-decoration: none;
    transition: background 0.2s, opacity 0.2s;
    cursor: pointer;
  }
  .btn-gold:hover { opacity: 0.85; }
  .btn-outline-light {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(244,239,230,0.5);
    border: 1px solid rgba(244,239,230,0.15);
    padding: 13px 32px;
    border-radius: var(--radius);
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s;
    cursor: pointer;
  }
  .btn-outline-light:hover { color: rgba(244,239,230,0.8); border-color: rgba(244,239,230,0.35); }
  .final-note {
    margin-top: 3rem;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: rgba(244,239,230,0.2);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* FOOTER */
  footer {
    background: var(--bg-dark);
    border-top: 1px solid rgba(244,239,230,0.06);
    padding: 40px 0;
  }
  .footer-inner {
    display: flex; align-items: center; justify-content: space-between;
  }
  .footer-logo {
    font-family: 'Cormorant Garant', serif;
    font-size: 17px;
    font-weight: 600;
    color: rgba(244,239,230,0.4);
  }
  .footer-logo span { color: rgba(155,126,58,0.6); }
  .footer-note {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    color: rgba(244,239,230,0.18);
    text-transform: uppercase;
  }

  /* CANDLESTICK DECORATION */
  .candle-bg {
    position: absolute;
    right: -20px; bottom: -20px;
    opacity: 0.04;
    pointer-events: none;
  }

  /* Scroll fade-in */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">Trade<span>Ledger</span></a>
  <ul class="nav-links">
    <li><a href="#how">How It Works</a></li>
    <li><a href="#feed">Live Feed</a></li>
    <li><a href="#profiles">Traders</a></li>
    <li><a href="#cta" class="nav-cta">Start Tracking</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <!-- Left: copy -->
      <div>
        <div class="hero-eyebrow">Forex &amp; Metals · Reputation System</div>
        <h1>Trading without<br><em>manipulation.</em></h1>
        <p class="hero-sub">
          A transparent ledger for serious traders.
          Every trade is <strong>published once and locked forever</strong> —
          no edits, no stop movement, no averages.
          Only fixed risk/reward and final outcomes.
        </p>
        <div class="hero-actions">
          <a href="#feed" class="btn-primary">View Live Trades →</a>
          <a href="#how" class="btn-ghost">How It Works <span class="btn-ghost-arrow">↓</span></a>
        </div>
      </div>

      <!-- Right: live preview panel -->
      <div class="hero-panel fade-in">
        <div class="hero-panel-header">
          <span class="hero-panel-title">Live Feed</span>
          <span class="live-dot">Live</span>
        </div>

        <div class="trade-item">
          <div>
            <div>
              <span class="trade-pair">XAUUSD</span>
              <span class="trade-dir dir-long">Long</span>
            </div>
            <div class="trade-meta">
              <span class="trade-meta-item">Entry <span>2,318.40</span></span>
              <span class="trade-meta-item">SL <span>2,302.00</span></span>
              <span class="trade-meta-item">TP <span>2,367.20</span></span>
            </div>
          </div>
          <div>
            <div class="trade-rr"><strong>1 : 3</strong>RR</div>
            <div class="trade-status status-active">Active</div>
          </div>
        </div>

        <div class="trade-item">
          <div>
            <div>
              <span class="trade-pair">EURUSD</span>
              <span class="trade-dir dir-short">Short</span>
            </div>
            <div class="trade-meta">
              <span class="trade-meta-item">Entry <span>1.0874</span></span>
              <span class="trade-meta-item">SL <span>1.0912</span></span>
              <span class="trade-meta-item">TP <span>1.0788</span></span>
            </div>
          </div>
          <div>
            <div class="trade-rr"><strong>1 : 2.3</strong>RR</div>
            <div class="trade-status status-tp">TP Hit</div>
          </div>
        </div>

        <div class="trade-item">
          <div>
            <div>
              <span class="trade-pair">XAGUSD</span>
              <span class="trade-dir dir-long">Long</span>
            </div>
            <div class="trade-meta">
              <span class="trade-meta-item">Entry <span>27.44</span></span>
              <span class="trade-meta-item">SL <span>26.90</span></span>
              <span class="trade-meta-item">TP <span>28.88</span></span>
            </div>
          </div>
          <div>
            <div class="trade-rr"><strong>1 : 2.6</strong>RR</div>
            <div class="trade-status status-sl">SL Hit</div>
          </div>
        </div>

        <div class="trade-item">
          <div>
            <div>
              <span class="trade-pair">GBPUSD</span>
              <span class="trade-dir dir-long">Long</span>
            </div>
            <div class="trade-meta">
              <span class="trade-meta-item">Entry <span>1.2734</span></span>
              <span class="trade-meta-item">SL <span>1.2695</span></span>
              <span class="trade-meta-item">TP <span>1.2812</span></span>
            </div>
          </div>
          <div>
            <div class="trade-rr"><strong>1 : 2</strong>RR</div>
            <div class="trade-status status-active">Active</div>
          </div>
        </div>

        <div class="hero-panel-footer">
          All trades locked at publication · Cannot be edited or deleted
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- STATEMENT (Core Idea) -->
<section class="statement-block">
  <div class="container">
    <div class="statement-inner fade-in">
      <div class="section-label">The Standard</div>
      <div class="statement-quote">
        This is not a platform for<br>posting every trade.<br>
        It is for your <em>best ideas only.</em>
      </div>
      <p class="statement-body">
        Most trading platforms reward <strong>volume</strong>. More signals, more followers,
        more noise. TradeLedger is built on the opposite principle:
        only high-conviction, well-defined setups belong here.
        Each trade you publish carries your name and your record — permanently.
      </p>
      <div class="statement-rule">
        <p>"If a trade is not worth staking your reputation on — don't publish it."</p>
      </div>
      <p class="statement-body">
        When traders know their record cannot be altered,
        they become <strong>selective by necessity</strong>. That selectivity is what
        makes TradeLedger's data worth reading.
      </p>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="section" id="how">
  <div class="container">
    <div class="section-label">Process</div>
    <h2 class="section-h2">Three steps.<br><em>No exceptions.</em></h2>
    <p class="section-sub">The mechanics are intentionally rigid. Rigidity is what makes the data credible.</p>

    <div class="how-grid fade-in">
      <div class="how-step">
        <span class="how-num">01</span>
        <h3>Publish your trade</h3>
        <p>Define your entry, stop loss, and take profit. Every field is mandatory. Partial setups are not accepted.</p>
        <div class="tag">Entry · SL · TP required</div>
      </div>
      <div class="how-step">
        <span class="how-num">02</span>
        <h3>It locks. Forever.</h3>
        <p>The moment a trade is published, it is sealed. No edits. No stop movement. No additions. The only outcome is TP hit, SL hit, or still active.</p>
        <div class="tag">Immutable record</div>
      </div>
      <div class="how-step">
        <span class="how-num">03</span>
        <h3>Your record builds</h3>
        <p>Each trade adds to your permanent performance history. Winrate, expectancy, and drawdown are calculated on the unedited record — automatically.</p>
        <div class="tag">Verified metrics only</div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- WHY DIFFERENT -->
<section class="section">
  <div class="container">
    <div class="section-label">Distinction</div>
    <h2 class="section-h2">Why this is <em>different.</em></h2>
    <p class="section-sub">Traditional signal platforms were not designed for accountability. TradeLedger was built for nothing else.</p>

    <div class="compare-grid fade-in">
      <div class="compare-card legacy">
        <div class="compare-card-header">
          <h3>Traditional platforms</h3>
          <span class="compare-badge badge-legacy">Legacy model</span>
        </div>
        <ul class="compare-list">
          <li>Stop losses can be moved after entry, hiding risk expansion</li>
          <li>Trades can be deleted when results turn unfavorable</li>
          <li>Averaging down obscures the true risk of a position</li>
          <li>Drawdown figures are frequently omitted or distorted</li>
          <li>Providers are incentivized to post high volume, not high quality</li>
        </ul>
      </div>
      <div class="compare-card tl">
        <div class="compare-card-header">
          <h3>TradeLedger</h3>
          <span class="compare-badge badge-tl">This platform</span>
        </div>
        <ul class="compare-list">
          <li>Every position is fixed at publication — entry, SL, and TP are permanent</li>
          <li>No trade can be removed from the record once published</li>
          <li>Risk/reward is declared upfront and calculated automatically</li>
          <li>Maximum drawdown is visible on every trader's public profile</li>
          <li>Traders are rewarded for selectivity, not volume of publications</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- METRICS -->
<section class="section">
  <div class="container">
    <div class="section-label">Analytics</div>
    <h2 class="section-h2">The metrics that <em>matter.</em></h2>
    <p class="section-sub">Every profile displays the same four core figures, calculated identically across all traders.</p>

    <div class="metrics-grid fade-in">
      <div class="metric-card">
        <div class="metric-label">Risk / Reward</div>
        <div class="metric-value">1:R</div>
        <p class="metric-desc">Declared at publication. Calculated from the fixed SL and TP levels. Never adjusted.</p>
      </div>
      <div class="metric-card">
        <div class="metric-label">Win Rate</div>
        <div class="metric-value">W%</div>
        <p class="metric-desc">TP hits divided by closed trades. Includes all SL hits — nothing is excluded.</p>
      </div>
      <div class="metric-card">
        <div class="metric-label">Expectancy</div>
        <div class="metric-value">E[R]</div>
        <p class="metric-desc">Average R-multiple per trade. The single most informative measure of long-run edge.</p>
      </div>
      <div class="metric-card">
        <div class="metric-label">Max Drawdown</div>
        <div class="metric-value">DD%</div>
        <p class="metric-desc">Peak-to-trough sequence of SL hits in consecutive R-multiples. Always visible.</p>
      </div>
    </div>
    <div class="metrics-note fade-in">
      All metrics are calculated from fixed, immutable trade records. No manual adjustments are possible.
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- LIVE FEED -->
<section class="section" id="feed">
  <div class="container">
    <div class="section-label">Feed</div>
    <h2 class="section-h2">High-conviction trades.<br><em>Nothing else.</em></h2>
    <p class="section-sub">Every entry in this feed represents a trader's published commitment — name attached, record on the line.</p>

    <div class="feed-layout fade-in">
      <div>
        <div class="feed-list">
          <div class="feed-header">
            <span class="feed-title">Recent Publications — Forex &amp; Metals</span>
            <span class="live-dot">Live</span>
          </div>

          <!-- Trade 1 -->
          <div class="feed-trade">
            <div>
              <div class="feed-trade-top">
                <span class="feed-pair">XAUUSD</span>
                <span class="trade-dir dir-long">Long</span>
                <span class="trade-status status-active">Active</span>
              </div>
              <div class="feed-trader">
                <span class="trader-avatar">MR</span>
                M. Reyes · 47 published trades · Expectancy +0.68R
              </div>
              <div class="feed-levels">
                <div class="level-item">
                  <span class="level-label">Entry</span>
                  <span class="level-value">2,318.40</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Stop Loss</span>
                  <span class="level-value">2,302.00</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Take Profit</span>
                  <span class="level-value">2,367.20</span>
                </div>
              </div>
            </div>
            <div class="feed-right">
              <div class="feed-rr">1 : 3</div>
              <div class="feed-rr-label">Risk / Reward</div>
            </div>
          </div>

          <!-- Trade 2 -->
          <div class="feed-trade">
            <div>
              <div class="feed-trade-top">
                <span class="feed-pair">EURUSD</span>
                <span class="trade-dir dir-short">Short</span>
                <span class="trade-status status-tp">TP Hit</span>
              </div>
              <div class="feed-trader">
                <span class="trader-avatar">KL</span>
                K. Laurent · 29 published trades · Expectancy +0.51R
              </div>
              <div class="feed-levels">
                <div class="level-item">
                  <span class="level-label">Entry</span>
                  <span class="level-value">1.0874</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Stop Loss</span>
                  <span class="level-value">1.0912</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Take Profit</span>
                  <span class="level-value">1.0788</span>
                </div>
              </div>
            </div>
            <div class="feed-right">
              <div class="feed-rr">1 : 2.3</div>
              <div class="feed-rr-label">Risk / Reward</div>
            </div>
          </div>

          <!-- Trade 3 -->
          <div class="feed-trade">
            <div>
              <div class="feed-trade-top">
                <span class="feed-pair">XAGUSD</span>
                <span class="trade-dir dir-long">Long</span>
                <span class="trade-status status-sl">SL Hit</span>
              </div>
              <div class="feed-trader">
                <span class="trader-avatar">AT</span>
                A. Tanaka · 63 published trades · Expectancy +0.44R
              </div>
              <div class="feed-levels">
                <div class="level-item">
                  <span class="level-label">Entry</span>
                  <span class="level-value">27.44</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Stop Loss</span>
                  <span class="level-value">26.90</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Take Profit</span>
                  <span class="level-value">28.88</span>
                </div>
              </div>
            </div>
            <div class="feed-right">
              <div class="feed-rr">1 : 2.6</div>
              <div class="feed-rr-label">Risk / Reward</div>
            </div>
          </div>

          <!-- Trade 4 -->
          <div class="feed-trade">
            <div>
              <div class="feed-trade-top">
                <span class="feed-pair">GBPUSD</span>
                <span class="trade-dir dir-short">Short</span>
                <span class="trade-status status-tp">TP Hit</span>
              </div>
              <div class="feed-trader">
                <span class="trader-avatar">SR</span>
                S. Rousseau · 18 published trades · Expectancy +0.72R
              </div>
              <div class="feed-levels">
                <div class="level-item">
                  <span class="level-label">Entry</span>
                  <span class="level-value">1.2742</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Stop Loss</span>
                  <span class="level-value">1.2786</span>
                </div>
                <div class="level-item">
                  <span class="level-label">Take Profit</span>
                  <span class="level-value">1.2654</span>
                </div>
              </div>
            </div>
            <div class="feed-right">
              <div class="feed-rr">1 : 2</div>
              <div class="feed-rr-label">Risk / Reward</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="feed-sidebar">
        <div class="sidebar-card">
          <div class="sidebar-card-header">Platform Summary</div>
          <div class="sidebar-card-body">
            <div class="stat-row">
              <span class="stat-row-label">Active traders</span>
              <span class="stat-row-value">214</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">Total published trades</span>
              <span class="stat-row-value">4,831</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">Active positions</span>
              <span class="stat-row-value">37</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">Avg R/R (all trades)</span>
              <span class="stat-row-value green">1 : 2.41</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">Avg expectancy</span>
              <span class="stat-row-value green">+0.38R</span>
            </div>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="sidebar-card-header">Instruments</div>
          <div class="sidebar-card-body">
            <div class="stat-row">
              <span class="stat-row-label">XAUUSD</span>
              <span class="stat-row-value">38%</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">EURUSD</span>
              <span class="stat-row-value">22%</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">GBPUSD</span>
              <span class="stat-row-value">17%</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">XAGUSD</span>
              <span class="stat-row-value">11%</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label">Other Forex</span>
              <span class="stat-row-value">12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- TRADER PROFILES -->
<section class="section" id="profiles">
  <div class="container">
    <div class="section-label">Profiles</div>
    <h2 class="section-h2">Reputation is built<br><em>trade by trade.</em></h2>
    <p class="section-sub">Each profile is a complete, unedited record. What you see is what was published. Nothing more.</p>

    <div class="profile-grid fade-in">
      <div>
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">MR</div>
            <div class="profile-name">M. Reyes</div>
            <div class="profile-handle">@reyes · Member since Jan 2024</div>
            <div class="reputation-score">
              <div>
                <div class="rep-label">Reputation Score</div>
                <div class="rep-sub">Based on 47 locked trades</div>
              </div>
              <div class="rep-value">88.4</div>
            </div>
          </div>
          <div class="profile-stats">
            <div class="profile-stat">
              <span class="profile-stat-label">Published trades</span>
              <span class="profile-stat-value">47</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat-label">Win rate</span>
              <span class="profile-stat-value pos">62.1%</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat-label">Avg R/R</span>
              <span class="profile-stat-value">1 : 2.7</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat-label">Expectancy</span>
              <span class="profile-stat-value pos">+0.68R</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat-label">Max drawdown</span>
              <span class="profile-stat-value">−3.2R</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat-label">Primary market</span>
              <span class="profile-stat-value">XAUUSD</span>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="equity-card">
          <div class="equity-header">
            <span class="equity-title">Equity curve — cumulative R</span>
            <span class="equity-return">+31.96R total</span>
          </div>
          <div class="equity-chart-area">
            <svg width="100%" height="100%" viewBox="0 0 580 148" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Grid lines -->
              <line x1="0" y1="37" x2="580" y2="37" stroke="rgba(28,24,20,0.06)" stroke-width="0.5" stroke-dasharray="4,4"/>
              <line x1="0" y1="74" x2="580" y2="74" stroke="rgba(28,24,20,0.06)" stroke-width="0.5" stroke-dasharray="4,4"/>
              <line x1="0" y1="111" x2="580" y2="111" stroke="rgba(28,24,20,0.06)" stroke-width="0.5" stroke-dasharray="4,4"/>
              <!-- Area fill -->
              <path d="M0,138 L0,130 L24,120 L48,108 L72,116 L96,100 L120,88 L144,96 L168,80 L192,64 L216,72 L240,56 L264,44 L288,52 L312,38 L336,24 L360,32 L384,18 L408,10 L432,20 L456,8 L480,4 L504,14 L528,6 L552,2 L580,8 L580,138 Z" fill="rgba(61,107,74,0.06)"/>
              <!-- Equity line -->
              <path d="M0,130 L24,120 L48,108 L72,116 L96,100 L120,88 L144,96 L168,80 L192,64 L216,72 L240,56 L264,44 L288,52 L312,38 L336,24 L360,32 L384,18 L408,10 L432,20 L456,8 L480,4 L504,14 L528,6 L552,2 L580,8" fill="none" stroke="#3D6B4A" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
              <!-- Data points -->
              <circle cx="192" cy="64" r="3" fill="#3D6B4A" opacity="0.4"/>
              <circle cx="336" cy="24" r="3" fill="#3D6B4A" opacity="0.4"/>
              <circle cx="480" cy="4" r="3" fill="#3D6B4A" opacity="0.4"/>
              <circle cx="580" cy="8" r="3.5" fill="#3D6B4A"/>
            </svg>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="sidebar-card-header">Recent trade history</div>
          <div class="sidebar-card-body" style="padding:0;">
            <div class="trade-item">
              <div>
                <div><span class="trade-pair">XAUUSD</span><span class="trade-dir dir-long" style="margin-left:8px">Long</span></div>
                <div class="trade-meta"><span class="trade-meta-item">Entry <span>2,318.40</span></span><span class="trade-meta-item">RR <span>1:3</span></span></div>
              </div>
              <div class="trade-status status-active">Active</div>
            </div>
            <div class="trade-item">
              <div>
                <div><span class="trade-pair">EURUSD</span><span class="trade-dir dir-short" style="margin-left:8px">Short</span></div>
                <div class="trade-meta"><span class="trade-meta-item">Entry <span>1.0920</span></span><span class="trade-meta-item">RR <span>1:2.5</span></span></div>
              </div>
              <div class="trade-status status-tp">TP Hit</div>
            </div>
            <div class="trade-item">
              <div>
                <div><span class="trade-pair">XAUUSD</span><span class="trade-dir dir-short" style="margin-left:8px">Short</span></div>
                <div class="trade-meta"><span class="trade-meta-item">Entry <span>2,344.10</span></span><span class="trade-meta-item">RR <span>1:2</span></span></div>
              </div>
              <div class="trade-status status-tp">TP Hit</div>
            </div>
            <div class="trade-item">
              <div>
                <div><span class="trade-pair">GBPUSD</span><span class="trade-dir dir-long" style="margin-left:8px">Long</span></div>
                <div class="trade-meta"><span class="trade-meta-item">Entry <span>1.2694</span></span><span class="trade-meta-item">RR <span>1:3</span></span></div>
              </div>
              <div class="trade-status status-sl">SL Hit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- TRUST -->
<section class="section">
  <div class="container">
    <div class="section-label">Transparency</div>
    <h2 class="section-h2">The record cannot<br><em>be altered.</em></h2>
    <p class="section-sub">Not by the trader. Not by us. The architecture of the platform does not permit it.</p>

    <div class="trust-grid fade-in">
      <div class="trust-item">
        <div class="trust-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Fixed at publication</h3>
        <p>The instant a trade is submitted, all three levels — entry, stop loss, and take profit — are sealed. The database record is write-protected from that point forward.</p>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M8 5v4l2.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Full history visible</h3>
        <p>Every trade ever published — wins, losses, active positions — appears on the trader's public profile. Selective disclosure is not possible.</p>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L10.5 5.5H13.5L11 8L12 12L8 10L4 12L5 8L2.5 5.5H5.5L8 2Z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Reputation is earned</h3>
        <p>Metrics are computed automatically from the immutable record. A trader's reputation score reflects only what actually happened — not what was selectively reported.</p>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta" id="cta">
  <div class="container">
    <div class="section-label">Join TradeLedger</div>
    <div class="final-h2">
      Build the reputation<br>your trading <em>deserves.</em>
    </div>
    <p class="final-sub">
      Track your real performance. Publish only your best setups.<br>
      Let the record speak without interference.
    </p>
    <div class="final-actions">
      <a href="#" class="btn-gold">Start Tracking Your Trades</a>
      <a href="#feed" class="btn-outline-light">Browse the Live Feed</a>
    </div>
    <p class="final-note">Forex · Gold · Silver · No copy trading · No manipulation</p>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-logo">Trade<span>Ledger</span></div>
      <div class="footer-note">Performance records cannot be edited or deleted</div>
    </div>
  </div>
</footer>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Stagger children of grids
  document.querySelectorAll('.how-grid, .compare-grid, .metrics-grid, .trust-grid').forEach(grid => {
    grid.querySelectorAll(':scope > *').forEach((child, i) => {
      child.style.transitionDelay = (i * 80) + 'ms';
    });
  });
</script>
</body>
</html>
