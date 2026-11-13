<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Me | Miqdad Badjuber</title>
    <meta name="description" content="Miqdad Badjuber is an Indonesian AI and Machine Learning Engineer and the creator of AntiSlop, an open-source project for AI coding agents. His work includes machine learning, context engineering, and developer tools.">
    <meta name="author" content="Miqdad Badjuber">
    <link rel="canonical" href="https://miqdadbadjuber.id/about/">
    <meta property="og:type" content="profile">
    <meta property="og:title" content="About Miqdad Badjuber | AI and Machine Learning Engineer">
    <meta property="og:description" content="Miqdad Badjuber is an Indonesian AI and Machine Learning Engineer and the creator of AntiSlop, an open-source project for AI coding agents.">
    <meta property="og:url" content="https://miqdadbadjuber.id/about/">
    <meta property="og:image" content="https://miqdadbadjuber.id/assets/images/og-cover.png">
    <meta property="og:image:alt" content="Miqdad Badjuber portfolio hero preview">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="About Miqdad Badjuber | AI and Machine Learning Engineer">
    <meta name="twitter:description" content="Miqdad Badjuber is an Indonesian AI and Machine Learning Engineer and the creator of AntiSlop.">
    <meta name="twitter:image" content="https://miqdadbadjuber.id/assets/images/og-cover.png">
    <!-- Favicon -->
    <link rel="icon" href="../favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="48x48" href="../assets/images/favicon-48x48.png">
    <link rel="icon" type="image/png" sizes="96x96" href="../assets/images/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="192x192" href="../assets/images/favicon-192x192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/images/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Rubik:wght@700&family=Sora:wght@400;500;600;700;800&display=block">
<!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Miqdad Badjuber",
        "jobTitle": "AI & Machine Learning Engineer",
        "url": "https://miqdadbadjuber.id/about/",
        "image": "https://miqdadbadjuber.id/assets/images/profile.webp",
        "nationality": "Indonesia",
        "description": "Miqdad Badjuber is an Indonesian AI and Machine Learning Engineer and the creator of AntiSlop, an open-source project for AI coding agents. His work includes machine learning, context engineering, and developer tools.",
        "owns": {
            "@type": "SoftwareApplication",
            "name": "AntiSlop",
            "applicationCategory": "DeveloperApplication",
            "url": "https://miqdadbadjuber.id/projects/anti-ai-slop.html",
            "sameAs": "https://github.com/miqdadbadjuber/anti-slop",
            "description": "Open-source rules and agent skills for improving AI-generated interfaces, writing, and code."
        },
        "sameAs": [
            "https://github.com/miqdadbadjuber",
            "https://www.linkedin.com/in/miqdadbadjuber/",
            "https://x.com/miqdadbadjuber",
            "https://www.instagram.com/miqdadbadjuber/",
            "https://www.youtube.com/@miqdadbadjuberr",
            "https://g.dev/miqdadbadjuber"
        ],
        "knowsAbout": [
            "Machine Learning",
            "Deep Learning",
            "Agentic AI & Coding Skills",
            "Context Engineering",
            "Computer Vision & NLP",
            "Full-Stack Web Development",
            "Workflow Automation",
            "Open Source Tooling",
            "AI coding agent skills",
            "Interface design, writing, and code quality for AI-generated software"
        ]
    }
    </script>
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
            --color-void: #020202;
            --color-cyan: #00f0ff;
            --color-purple: #8a2be2;
            --transition-fast: 200ms;
            --transition-base: 300ms;
            --transition-slow: 500ms;
            --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
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
            background-color: var(--color-void);
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

        .essay-body p {
            color: #e4e4e7;
            font-size: 1.05rem;
            line-height: 1.95;
            margin-bottom: 1.75rem;
        }
        .essay-body p strong {
            color: #ffffff;
            font-weight: 700;
        }

        /* Mobile */
        @media (max-width: 1023px) {
            h1 {
                font-size: clamp(2rem, 8vw, 2.5rem) !important;
                line-height: 1.1 !important;
            }
            .essay-body p {
                font-size: 0.8125rem !important; /* 13px - compact, sleek mobile story size */
                line-height: 1.65 !important;
                margin-bottom: 1rem !important;
                color: #e4e4e7 !important;
            }
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
                padding-bottom: 3rem !important;
            }
        }
    </style>
</head>
<body>
    <div class="bg-grid"></div>

    <!-- HUD Overlay (Left & Right lines temporarily disabled for trial) -->
    <!--
    <div class="fixed left-6 md:left-12 top-0 bottom-0 hud-line opacity-30 z-0 hidden sm:block"></div>
    <div class="fixed right-6 md:right-12 top-0 bottom-0 hud-line opacity-30 z-0 hidden sm:block"></div>
    -->

    <!-- Header -->
    <header class="w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-8 md:pt-12 flex justify-between items-center relative z-20">
        <a href="/index.html" onclick="if(document.referrer && document.referrer.includes(window.location.host)){history.back();return false;}" class="btn-back" aria-label="Back">
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
        
        <div class="mb-10">
            <h1 class="font-display text-4xl md:text-6xl font-black tracking-tighter text-white">
                About Me<span class="text-gray-600">.</span>
            </h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            <!-- Left Column: The Full Authentic Essay (8 cols) -->
            <div class="lg:col-span-8 essay-body">
                
                <!-- Professional Identity Intro (Unified with Home) -->
                <p>
                    I am an AI &amp; Machine Learning Engineer based in Indonesia. My work centers on training machine learning models, authoring specialized skills for AI agents, and engineering platforms integrated directly with AI via API. I focus on building reliable systems: from computer vision and natural language processing pipelines to developer tools that keep artificial intelligence grounded and effective.
                </p>

                <!-- The Journey & Real Backstory -->
                <p>
                    My journey began in early 2024. Following discussions in the technology industry about artificial intelligence, I read "The Coming Wave" by Mustafa Suleyman. The book presented a clear perspective: artificial intelligence is a profound technological wave that will separate those who actively understand code and models from those who passively observe. That perspective inspired me to begin programming with dedicated focus.
                </p>

                <p>
                    Starting out, I used AI tools as a learning companion, asking questions to understand algorithmic logic, data processing, and system execution. As my curiosity grew, I dove into mathematical foundations, linear algebra, and neural network architectures, studying how models learn patterns and make inferences from real data.
                </p>

                <p>
                    Between 2025 and 2026, my study shifted toward rigorous model implementation. I built machine learning projects from scratch, working through real datasets and evaluation metrics. During one demanding technical submission, my work was rejected three times in a row. Instead of quitting, I evaluated each error log, resolved data leakages, tuned hyperparameters, and reworked the pipeline until it met production standards. That persistence earned verified credentials from Dicoding Academy and recognized achievements in Google developer programs.
                </p>

                <p>
                    Today, I channel this experience into practical open-source tools, machine learning pipelines, and developer platforms. My work includes authoring deterministic skill packages that prevent AI agents from generating hallucinated output, building offline workstations integrated with AI capabilities via API, and engineering model pipelines covering deep convolutional vision, bidirectional LSTM sentiment analysis, and time-series forecasting.
                </p>

                <p>
                    I recognize that this field evolves continuously. My daily approach remains grounded in steady technical practice, honest code evaluation, and building practical software that solves real problems.
                </p>

            </div>

            <!-- Right Column: Clean Typographical Notes (4 cols) -->
            <div class="lg:col-span-4 space-y-6 lg:border-l lg:border-white/[0.08] lg:pl-8 font-sans">
                
                <!-- Snapshot (Clean Inter & Helvetica Neue Font) -->
                <div>
                    <div class="font-display font-bold text-white text-sm tracking-tight mb-2.5">Snapshot</div>
                    <div class="space-y-2 font-sans text-xs text-gray-300">
                        <div class="flex justify-between py-1 border-b border-white/[0.04]">
                            <span class="text-gray-400 font-medium">Location</span>
                            <span class="text-white font-semibold">Indonesia</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-white/[0.04]">
                            <span class="text-gray-400 font-medium">Started</span>
                            <span class="text-white font-semibold">2024</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-white/[0.04]">
                            <span class="text-gray-400 font-medium">Focus</span>
                            <span class="text-white font-semibold">AI &amp; ML Systems</span>
                        </div>
                    </div>
                </div>

                <!-- Milestone Path -->
                <div class="pt-4 border-t border-white/[0.08] space-y-3">
                    <div class="font-display font-bold text-white text-sm tracking-tight mb-3">Milestone Path</div>
                    <div class="space-y-3 text-xs font-sans text-gray-400">
                        <div>
                            <div class="flex items-center gap-2 mb-0.5">
                                <div class="w-1.5 h-1.5 bg-cyanGlow/70 rounded-full flex-shrink-0" aria-hidden="true"></div>
                                <span class="font-display text-white text-xs font-semibold">2024</span>
                            </div>
                            <p class="text-gray-400 text-[11px] leading-relaxed pl-3.5">
                                Started programming inspired by technological developments, studying computer science fundamentals and machine learning basics.
                            </p>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-0.5">
                                <div class="w-1.5 h-1.5 bg-cyanGlow/70 rounded-full flex-shrink-0" aria-hidden="true"></div>
                                <span class="font-display text-white text-xs font-semibold">2025</span>
                            </div>
                            <p class="text-gray-400 text-[11px] leading-relaxed pl-3.5">
                                Deepened neural network architectures, evaluated model performance, and built automated MLOps pipelines.
                            </p>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-0.5">
                                <div class="w-1.5 h-1.5 bg-cyanGlow/70 rounded-full flex-shrink-0" aria-hidden="true"></div>
                                <span class="font-display text-white text-xs font-semibold">2026</span>
                            </div>
                            <p class="text-gray-400 text-[11px] leading-relaxed pl-3.5">
                                Authored custom AI agent skills, built API-integrated developer platforms, and completed verified machine learning certifications.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Core Technical Capabilities -->
                <div class="pt-4 border-t border-white/[0.08] space-y-3">
                    <div class="font-display font-bold text-white text-sm tracking-tight mb-3">Core Capabilities</div>
                    <div class="space-y-3 text-xs font-sans text-gray-400">
                        <div>
                            <div class="flex items-center gap-2 mb-0.5">
                                <div class="w-1.5 h-1.5 bg-cyanGlow/70 rounded-full flex-shrink-0" aria-hidden="true"></div>
                                <span class="font-display text-white text-xs font-semibold">Deep Learning Pipelines</span>
                            </div>
                            <p class="text-gray-400 text-[11px] leading-relaxed pl-3.5">
                                Deep CNN vision, BiLSTM sentiment analysis, time-series forecasting, and automated MLOps.
                            </p>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-0.5">
                                <div class="w-1.5 h-1.5 bg-cyanGlow/70 rounded-full flex-shrink-0" aria-hidden="true"></div>
                                <span class="font-display text-white text-xs font-semibold">AI Agent Skills &amp; Rules</span>
                            </div>
                            <p class="text-gray-400 text-[11px] leading-relaxed pl-3.5">
                                Deterministic guidelines and custom skills stopping hallucinations in AI coding agents.
                            </p>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-0.5">
                                <div class="w-1.5 h-1.5 bg-cyanGlow/70 rounded-full flex-shrink-0" aria-hidden="true"></div>
                                <span class="font-display text-white text-xs font-semibold">API-Integrated Platforms</span>
                            </div>
                            <p class="text-gray-400 text-[11px] leading-relaxed pl-3.5">
                                Developer platforms and offline workstations integrated with AI models via API.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>


        <!-- BOTTOM NAVIGATION: Back Button -->
        <div class="mt-14 pt-8 border-t border-white/[0.08] flex items-center">
            <a href="/index.html" onclick="if(document.referrer && document.referrer.includes(window.location.host)){history.back();return false;}" class="btn-back" aria-label="Back">
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
