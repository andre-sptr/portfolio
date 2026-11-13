<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projects | Miqdad Badjuber</title>
    <!-- Favicon -->
    <link rel="icon" href="../favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="48x48" href="../assets/images/favicon-48x48.png">
    <link rel="icon" type="image/png" sizes="96x96" href="../assets/images/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="192x192" href="../assets/images/favicon-192x192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/images/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Rubik:wght@700&family=Sora:wght@400;500;600;700;800&display=block">
<script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        void: '#020202',
                        cyanGlow: '#00f0ff',
                        purpleGlow: '#8a2be2',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ["'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
                        sora: ['Sora', 'sans-serif'],
                        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
                    }
                }
            }
        }
    </script>
    
    <style>
        :root {
            -color-void: #020202;
            -color-cyan: #00f0ff;
            -color-purple: #8a2be2;
            -transition-fast: 200ms;
            -transition-base: 300ms;
            -transition-slow: 500ms;
            -ease-out: cubic-bezier(0.16, 1, 0.3, 1);
        }

        html {
            scrollbar-gutter: stable;
        }

        @media (min-width: 1024px) {
            html {
                font-size: 80% !important; 
            }
        }

        body {
            background-color: var(-color-void);
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .font-sora { font-family: 'Sora', sans-serif; }
        .font-display { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; font-weight: 700 !important; }
        .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }

                .bg-grid {
            position: fixed;
            inset: 0;
            z-index: -2;
            pointer-events: none;
            background: #000000;
        }

                .hud-line { width: 1px; background: linear-gradient(to bottom, transparent, rgba(0,240,255,0.4), transparent); }

                .btn-back {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #a1a1aa;
            font-family: 'Inter', sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1;
            text-decoration: none;
            cursor: pointer;
            user-select: none;
            padding: 0.25rem 0;
            transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 10;
        }
        .btn-back:hover {
            color: #ffffff;
        }
        .btn-back-icon {
            width: 14px;
            height: 14px;
            stroke: currentColor;
            flex-shrink: 0;
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-back:hover .btn-back-icon {
            transform: translateX(-3px);
        }

        /* Project Card (Deep Dark Obsidian Brown) */
        .project-card {
            background-color: #080605 !important;
            background: #080605 !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-radius: 1rem;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .project-card:hover {
            background-color: #0e0b09 !important;
            background: #0e0b09 !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            transform: none !important;
        }

        /* Project CTA Link */
        .project-cta-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700;
            font-size: 0.8125rem;
            font-weight: 600;
            color: #9ca3af;
            text-decoration: none;
            position: relative;
            padding-bottom: 2px;
            transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-cta-link:hover,
        .group:hover .project-cta-link,
        .project-card:hover .project-cta-link {
            color: #ffffff;
        }
        .project-cta-text {
            position: relative;
        }
        .project-cta-text::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0%;
            height: 1.5px;
            background: linear-gradient(to right, #00f0ff, #ffffff);
            border-radius: 9999px;
            transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: none !important;
        }
        .project-cta-link:hover .project-cta-text::after,
        .group:hover .project-cta-link .project-cta-text::after,
        .project-card:hover .project-cta-link .project-cta-text::after {
            width: 100%;
        }

        /* Circular Arrow Button (Hidden by default, emerges on card hover, ZERO GLOW) */
        .project-arrow-circle {
            width: 1.75rem;
            height: 1.75rem;
            border-radius: 9999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            color: #020202 !important;
            opacity: 0;
            transform: scale(0.6) translateX(-6px);
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            flex-shrink: 0;
            box-shadow: none !important;
            filter: none !important;
        }
        .project-arrow-circle svg {
            width: 0.85rem;
            height: 0.85rem;
            color: inherit;
            stroke: currentColor;
            stroke-width: 2.2;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .project-arrow-circle,
        .project-card:hover .project-arrow-circle,
        .project-cta-link:hover .project-arrow-circle {
            opacity: 1;
            transform: scale(1) translateX(0);
        }
        .group:hover .project-arrow-circle svg,
        .project-card:hover .project-arrow-circle svg,
        .project-cta-link:hover .project-arrow-circle svg {
            transform: translateX(1.5px);
        }

        /* Filter Track & Sliding Underline */
        .filter-track {
            display: inline-flex;
            flex-wrap: wrap;
            gap: 0.375rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            position: relative;
            padding-bottom: 0.35rem;
            margin-bottom: 2rem;
            width: 100%;
        }
        .filter-sliding-line {
            position: absolute;
            bottom: -1px;
            height: 2px;
            background-color: #ffffff;
            border-radius: 9999px;
            transition: left 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
        }
        .filter-btn {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700;
            font-size: 0.8125rem;
            font-weight: 600;
            color: #71717a;
            padding: 0.45rem 0.95rem;
            border-radius: 0.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
            transition: all 0.25s ease;
        }
        .filter-btn:hover {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.04);
        }
        .filter-btn.active {
            color: #ffffff !important;
            background-color: rgba(255, 255, 255, 0.06);
        }

        /* Header and Footer social link tap targets (44x44px via pseudo-element without layout shift) */
        header .flex.items-center.gap-4.h-6 a,
        footer .flex.items-center.gap-4 a {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        header .flex.items-center.gap-4.h-6 a::before,
        footer .flex.items-center.gap-4 a::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 44px;
            height: 44px;
        }

        /* Mobile Filters */
        @media (max-width: 1023px) {
            header.w-full,
            body > header {
                padding-left: 1.25rem !important;
                padding-right: 1.25rem !important;
                padding-top: 1.25rem !important;
                padding-bottom: 0 !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
            }
            main {
                padding-left: 1.25rem !important;
                padding-right: 1.25rem !important;
                padding-top: 1.75rem !important;
                padding-bottom: 3.5rem !important;
            }
            h1 {
                font-size: clamp(2rem, 8vw, 2.5rem) !important;
                line-height: 1.1 !important;
            }
            .page-header-block {
                margin-bottom: 1.5rem !important;
            }
            .page-header-desc {
                font-size: 0.8125rem !important; /* 13px */
                line-height: 1.65 !important;
                color: #e4e4e7 !important;
                margin-top: 0.5rem !important;
            }
            .filter-track {
                display: flex !important;
                flex-wrap: nowrap !important;
                overflow-x: auto !important;
                -webkit-overflow-scrolling: touch !important;
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
                gap: 0.25rem !important;
                padding-bottom: 0.45rem !important;
                margin-bottom: 1.5rem !important;
            }
            .filter-track::-webkit-scrollbar {
                display: none !important;
            }
            .filter-btn {
                font-size: 0.75rem !important;
                padding: 0.4rem 0.75rem !important;
            }

            /* Project Card Mobile (Full-Bleed 16:9 Banner Card) */
            .project-card {
                background-color: #080605 !important;
                background: #080605 !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 1.25rem !important;
                padding: 0 !important;
                overflow: hidden !important;
                display: flex !important;
                flex-direction: column !important;
            }
            .project-card > div.flex {
                flex-direction: column !important;
                gap: 0 !important;
                width: 100% !important;
            }
            .project-card .aspect-video {
                order: -1 !important;
                width: 100% !important;
                border-radius: 0 !important;
                border-top: none !important;
                border-left: none !important;
                border-right: none !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
                margin-bottom: 0 !important;
                flex-shrink: 0 !important;
            }
            .project-card .flex-1.flex-col,
            .project-card-body {
                padding: 1.15rem 1.15rem 1.25rem 1.15rem !important;
                width: 100% !important;
                display: flex !important;
                flex-direction: column !important;
                flex: 1 1 0% !important;
            }
            /* Hide badge pill metadata */
            .project-card .text-xs.font-sans.text-gray-400.font-medium,
            .project-card .flex.items-center.gap-2.mb-3.text-xs,
            .project-card .flex.items-center.gap-2.mb-2.text-xs {
                display: none !important;
            }
            .project-card h2,
            .project-card h3 {
                font-size: 1rem !important;
                line-height: 1.35 !important;
                margin-bottom: 0.35rem !important;
                font-weight: 700 !important;
            }
            .project-card p {
                font-size: 0.75rem !important;
                line-height: 1.55 !important;
                margin-bottom: 1rem !important;
                color: #9ca3af !important;
            }
            .project-action-row,
            .project-card .mt-auto {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                align-items: center !important;
                justify-content: space-between !important;
                width: 100% !important;
                padding-top: 0.75rem !important;
                margin-top: auto !important;
                border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
                gap: 0.5rem !important;
            }
            .project-arrow-circle {
                opacity: 1 !important;
                transform: scale(1) translateX(0) !important;
                width: 1.5rem !important;
                height: 1.5rem !important;
                background: #ffffff !important;
                color: #020202 !important;
                border-radius: 9999px !important;
                flex-shrink: 0 !important;
            }
            .project-cta-link {
                color: #ffffff !important;
                font-size: 0.75rem !important;
                white-space: nowrap !important;
            }
            .btn-github-source {
                padding: 0.35rem 0.65rem !important;
                font-size: 0.7rem !important;
                background-color: rgba(255, 255, 255, 0.08) !important;
                color: #e4e4e7 !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                white-space: nowrap !important;
                flex-shrink: 0 !important;
                transform: none !important;
                transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease !important;
            }
            .btn-github-source svg {
                width: 12px !important;
                height: 12px !important;
                flex-shrink: 0 !important;
            }
            .btn-github-source:hover,
            .btn-github-source:active,
            .btn-github-source:focus {
                background-color: #ffffff !important;
                color: #09090b !important;
                border-color: #ffffff !important;
                transform: none !important;
            }
        }

        /* Button GitHub Source Code */
        .btn-github-source {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.375rem 0.75rem;
            border-radius: 0.5rem;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700;
            font-size: 0.75rem;
            font-weight: 600;
            background-color: #ffffff;
            color: #09090b;
            text-decoration: none;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .btn-github-source:hover {
            background-color: #e4e4e7;
            transform: translateY(-1px);
        }
    </style>
</head>
<body>
    <div class="bg-grid"></div>

    <!--- HUD Overlay (Left & Right lines temporarily disabled for trial) -->
    <!--
    <div class="fixed left-6 md:left-12 top-0 bottom-0 hud-line opacity-30 z-0 hidden sm:block"></div>
    <div class="fixed right-6 md:right-12 top-0 bottom-0 hud-line opacity-30 z-0 hidden sm:block"></div>
    -->

    <!-- Header -->
    <header class="w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-8 md:pt-12 flex justify-between items-center relative z-20">
        <a href="/index.html" class="btn-back" aria-label="Back to home">
            <svg class="btn-back-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 13L5 8L10 3"/>
            </svg>
            <span>Back</span>
        </a>

        <div class="flex items-center gap-4 h-6">
            <a href="https://github.com/miqdadbadjuber" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-5 h-5" aria-label="GitHub Profile">
                <svg class="w-5 h-5 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/miqdad-badjuber" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-5 h-5" aria-label="LinkedIn Profile">
                <svg class="w-5 h-5 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
        </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-10 pb-16 md:pt-14 md:pb-24">
        
        <!-- Page Header -->
        <div class="mb-10 page-header-block">
            <h1 class="font-display text-4xl md:text-6xl font-black tracking-tighter text-white">
                Projects<span class="text-gray-600">.</span>
            </h1>
            <p class="page-header-desc text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed font-sans mt-3">
                Featured catalog of AI agent developer tools, deterministic guardrails, and machine learning pipelines built with clean architecture.
            </p>
        </div>

        <!-- Filter Bar with Sliding Underline -->
        <div class="filter-track" id="filter-track">
            <button class="filter-btn active" onclick="filterProjects('all', this)">All</button>
            <button class="filter-btn" onclick="filterProjects('agent', this)">AI Agent Tools</button>
            <button class="filter-btn" onclick="filterProjects('ml', this)">Machine Learning</button>
            <div id="filter-sliding-line" class="filter-sliding-line"></div>
        </div>

                <!-- Projects List (Matching exact index.html styling) -->
        <div id="projects-container" class="space-y-6">
            
            <!-- PROJECT 1: AntiSlop -->
            <article class="project-item" data-category="agent">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Agent Skills Package</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">v3.2.25 • Open Source</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/anti-ai-slop.html" class="hover:text-cyanGlow transition-colors">AntiSlop</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Deterministic rules and focused skills for AI generated interfaces, product copy, accessibility, responsive layouts, and source code comments.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/anti-ai-slop.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/anti-slop" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/anti-ai-slop.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/antislop.webp" alt="AntiSlop banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 2: Style UI -->
            <article class="project-item" data-category="agent">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>UI Component System</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">v1.2.0 • NPM Package</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/style-ui.html" class="hover:text-cyanGlow transition-colors">Style UI</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Modern headless component system built on Radix Primitives and Tailwind CSS for creating accessible, unstyled, and highly customizable production interfaces.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/style-ui.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/style-ui" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/style-ui.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/style-ui.webp" alt="Style UI banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 3: Luna -->
            <article class="project-item" data-category="agent">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Productivity Workspace</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">Offline-First • IndexedDB</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/luna.html" class="hover:text-cyanGlow transition-colors">Luna</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Minimalist personal knowledge base and task workspace with instantaneous markdown rendering, zero tracking, and secure offline-first local storage.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/luna.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/Luna" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/luna.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/luna.webp" alt="Luna banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 4: Energy Demand Forecasting -->
            <article class="project-item" data-category="ml">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Time-Series Machine Learning</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">XGBoost • MAPE 2.78%</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/energy-demand-forecasting.html" class="hover:text-cyanGlow transition-colors">Energy Demand Forecasting</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Hourly power consumption time-series regression across 17,520 observations, achieving 2.78% MAPE and 0.9073 R² score with zero lookahead data leakage.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/energy-demand-forecasting.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/Eksperimen_SML_Miqdad" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/energy-demand-forecasting.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/energy-demand-forecasting.webp" alt="Energy Demand Forecasting banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 5: Image Classification TensorFlow -->
            <article class="project-item" data-category="ml">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Computer Vision &amp; Deep Learning</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">TensorFlow • 88% Test Acc</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/image-classification-tensorflow.html" class="hover:text-cyanGlow transition-colors">Image Classification TensorFlow</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Custom 4-block deep convolutional neural network for 6-class natural scene recognition, exported to SavedModel, TFLite, and browser TensorFlow.js.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/image-classification-tensorflow.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/image-classification-tensorflow" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/image-classification-tensorflow.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/image-classification-tensorflow.webp" alt="Image Classification banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 6: Customer Uplift Modeling -->
            <article class="project-item" data-category="ml">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Causal Inference &amp; Uplift Modeling</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">Meta-Learners • Qini 35.26</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/customer-uplift-modeling.html" class="hover:text-cyanGlow transition-colors">Customer Uplift Modeling</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Causal machine learning framework utilizing S-Learners and T-Learners to optimize marketing budget allocation and isolate true promotional persuasion effects.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/customer-uplift-modeling.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/fraud_detection_clustering" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/customer-uplift-modeling.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/customer-uplift-modeling.webp" alt="Customer Uplift Modeling banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 7: Credit Risk Prediction -->
            <article class="project-item" data-category="ml">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Financial Risk &amp; XAI</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">Calibrated LightGBM • SHAP</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/credit-risk-prediction.html" class="hover:text-cyanGlow transition-colors">Credit Risk Prediction</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Probability-calibrated default prediction engine with cost-sensitive threshold optimization and global plus local model explainability using SHAP values.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/credit-risk-prediction.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/fraud-detection-classification" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/credit-risk-prediction.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/credit-risk-prediction.webp" alt="Credit Risk Prediction banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 8: Student Performance MLOps -->
            <article class="project-item" data-category="ml">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Production MLOps Engineering</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">ZenML • MLflow • FastAPI</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/student-performance-mlops.html" class="hover:text-cyanGlow transition-colors">Student Performance MLOps</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Modular production machine learning pipeline automating data ingestion, model registry tracking via MLflow, and microservice REST deployment using Docker.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/student-performance-mlops.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/student-performance-mlops" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/student-performance-mlops.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/student-performance-mlops.webp" alt="Student Performance MLOps banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

            <!-- PROJECT 9: Sentiment Analysis Gojek -->
            <article class="project-item" data-category="ml">
                <div class="project-card rounded-2xl p-6 md:p-10 lg:p-12 group">
                    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 text-xs font-sans text-gray-400 font-medium">
                                <span>Natural Language Processing</span>
                                <span class="text-gray-600">•</span>
                                <span class="text-cyanGlow">BiLSTM • 88.99% Acc</span>
                            </div>
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                <a href="/projects/sentiment-analysis-gojek.html" class="hover:text-cyanGlow transition-colors">Sentiment Analysis Gojek</a>
                            </h2>
                            <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                Deep BiLSTM NLP classifier designed for informal Indonesian text and slang normalization, achieving 88.99% accuracy on Google Play Store app reviews.
                            </p>
                            <div class="project-action-row flex items-center justify-between">
                                <a href="/projects/sentiment-analysis-gojek.html" class="project-cta-link">
                                     <span class="project-cta-text">View Details</span>
                                    <span class="project-arrow-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                                </a>
                                <a href="https://github.com/miqdadbadjuber/sentiment-analysis-gojek" target="_blank" rel="noopener noreferrer" class="btn-github-source">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                        <a href="/projects/sentiment-analysis-gojek.html" class="w-full lg:w-5/12 aspect-video rounded-xl border border-white/[0.04] relative overflow-hidden transition-colors duration-500 bg-white/[0.02] shrink-0 block">
                            <img src="../assets/images/sentiment-analysis-gojek.webp" alt="Sentiment Analysis Gojek banner" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center">
                        </a>
                    </div>
                </div>
            </article>

        </div>
        <div class="mt-14 pt-8 border-t border-white/[0.08] flex items-center">
            <a href="/index.html" class="btn-back" aria-label="Back to home">
            <svg class="btn-back-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 13L5 8L10 3"/>
            </svg>
            <span>Back</span>
        </a>
        </div>

    </main>

    <!-- Footer -->
    <footer class="w-full max-w-[1000px] mx-auto px-6 md:px-12 py-10 border-t border-white/[0.06] flex justify-between items-center text-xs text-gray-500 font-sans relative z-20">
        <div>&copy; 2026 Miqdad Badjuber</div>
        
        <div class="flex items-center gap-4">
            <a href="https://github.com/miqdadbadjuber" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="GitHub Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/miqdad-badjuber" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
        </div>
    </footer>

    <!-- Filter Script with Sliding Underline Animation -->
    <script>
        function updateFilterLine(activeBtn) {
            const line = document.getElementById('filter-sliding-line');
            const track = document.getElementById('filter-track');
            if (!line || !track || !activeBtn) return;
            const trackRect = track.getBoundingClientRect();
            const btnRect = activeBtn.getBoundingClientRect();
            line.style.left = (btnRect.left - trackRect.left + track.scrollLeft) + 'px';
            line.style.width = btnRect.width + 'px';
        }

        function filterProjects(category, btn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateFilterLine(btn);
            if (btn.scrollIntoView) {
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }

            const items = document.querySelectorAll('.project-item');
            items.forEach(item => {
                const itemCategory = item.dataset.category || '';
                const matches = (category === 'all' || itemCategory === category);
                if (matches) {
                    item.classList.remove('hidden');
                    item.style.setProperty('display', 'block', 'important');
                } else {
                    item.classList.add('hidden');
                    item.style.setProperty('display', 'none', 'important');
                }
            });
        }

        window.addEventListener('DOMContentLoaded', () => {
            const activeBtn = document.querySelector('#filter-track .filter-btn.active');
            if (activeBtn) updateFilterLine(activeBtn);
            const track = document.getElementById('filter-track');
            if (track) {
                track.addEventListener('scroll', () => {
                    const currentActive = document.querySelector('#filter-track .filter-btn.active');
                    if (currentActive) updateFilterLine(currentActive);
                }, { passive: true });
            }
        });
        window.addEventListener('resize', () => {
            const activeBtn = document.querySelector('#filter-track .filter-btn.active');
            if (activeBtn) updateFilterLine(activeBtn);
        });
    </script>
<script>
if (window.location.protocol === 'file:') {
    document.querySelectorAll('a[href^="/"]').forEach(function(el) {
        var h = el.getAttribute('href');
        var isSub = window.location.pathname.includes('/projects/') || window.location.pathname.includes('/blog/') || window.location.pathname.includes('/about/') || window.location.pathname.includes('/credentials/');
        var prefix = isSub ? '../' : '';
        if (h === '/' || h === '/index.html' || h === '/#home') {
            el.setAttribute('href', prefix + 'index.html');
        } else if (h.startsWith('/#')) {
            el.setAttribute('href', prefix + 'index.html' + h.substring(1));
        } else {
            el.setAttribute('href', prefix + h.substring(1));
        }
    });
}
</script>
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092" integrity="sha512-UKNk8GbxkABxKcXYuLkO16EleLGUkcvJWtpSNmExE0Too3ZaFAxTscNWEc1OdAv5/BikHawapSCaiD2XCmp+Bw==" data-cf-beacon='{"version":"2024.11.0","token":"101197c27c7842e0b4d3934b59d8c203","r":1,"spa":2}' crossorigin="anonymous"></script>
</body>
</html>
