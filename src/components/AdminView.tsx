<!DOCTYPE html>

<html class="light" lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Lumma Cotação Auto - Painel Administrativo</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-error-container": "#93000a",
                    "outline-variant": "#c4c6cd",
                    "on-tertiary-container": "#8d9194",
                    "on-tertiary-fixed-variant": "#43474a",
                    "secondary-container": "#659dfe",
                    "tertiary": "#121618",
                    "error-container": "#ffdad6",
                    "background": "#f6faff",
                    "outline": "#74777d",
                    "on-error": "#ffffff",
                    "surface-dim": "#d2dbe4",
                    "on-secondary-fixed": "#001a40",
                    "tertiary-container": "#262a2c",
                    "primary": "#041627",
                    "on-secondary-container": "#003370",
                    "error": "#ba1a1a",
                    "on-primary": "#ffffff",
                    "on-secondary": "#ffffff",
                    "on-tertiary-fixed": "#181c1e",
                    "surface-container-low": "#ecf5fe",
                    "surface-tint": "#4f6073",
                    "on-background": "#141d23",
                    "surface": "#f6faff",
                    "surface-variant": "#dbe4ed",
                    "secondary-fixed": "#d7e2ff",
                    "surface-container": "#e6eff8",
                    "on-surface": "#141d23",
                    "surface-bright": "#f6faff",
                    "on-tertiary": "#ffffff",
                    "on-primary-container": "#8192a7",
                    "on-primary-fixed-variant": "#38485a",
                    "tertiary-fixed-dim": "#c4c7ca",
                    "on-secondary-fixed-variant": "#004491",
                    "primary-fixed": "#d2e4fb",
                    "secondary": "#115cb9",
                    "inverse-primary": "#b7c8de",
                    "surface-container-high": "#e0e9f2",
                    "tertiary-fixed": "#e0e3e6",
                    "inverse-on-surface": "#e9f2fb",
                    "on-primary-fixed": "#0b1d2d",
                    "surface-container-highest": "#dbe4ed",
                    "on-surface-variant": "#44474c",
                    "secondary-fixed-dim": "#acc7ff",
                    "surface-container-lowest": "#ffffff",
                    "primary-container": "#1a2b3c",
                    "inverse-surface": "#293138",
                    "primary-fixed-dim": "#b7c8de"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "margin-mobile": "16px",
                    "sm": "8px",
                    "md": "16px",
                    "gutter": "24px",
                    "xs": "4px",
                    "base": "4px",
                    "xl": "48px",
                    "lg": "24px",
                    "margin-desktop": "64px",
                    "max-width": "1200px"
            },
            "fontFamily": {
                    "headline-md": ["Inter"],
                    "display-lg": ["Inter"],
                    "headline-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "body-lg": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "label-sm": ["Inter"],
                    "body-md": ["Inter"]
            },
            "fontSize": {
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f6faff;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c4c6cd;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #74777d;
        }
        .details-row {
            transition: all 0.2s ease-in-out;
        }
        .details-row:not(.hidden) {
            display: table-row;
        }
    </style>
</head>
<body class="bg-background text-on-background antialiased flex h-screen overflow-hidden">
<!-- SideNavBar (Shared Component Anchor) -->
<aside class="h-screen w-64 left-0 top-0 bg-surface-container-low dark:bg-primary-container flex flex-col p-md gap-sm border-r border-outline-variant flex-shrink-0">
<div class="mb-xl px-sm">
<h1 class="font-headline-md text-headline-md font-black text-primary dark:text-primary-fixed">Lumma Auto</h1>
<div class="mt-sm">
<p class="font-label-md text-label-md text-primary font-bold">Painel Administrativo</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Admin Profile</p>
</div>
</div>
<nav class="flex-grow space-y-xs">
<a class="flex items-center gap-md px-md py-sm bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-transform active:scale-[0.98]" href="#">
<span class="material-symbols-outlined" data-icon="assignment">assignment</span>
<span class="font-label-md text-label-md">Solicitações</span>
</a>
<a class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all active:scale-[0.98]" href="#">
<span class="material-symbols-outlined" data-icon="download">download</span>
<span class="font-label-md text-label-md">Exportar Dados</span>
</a>
<a class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all active:scale-[0.98]" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-md text-label-md">Configurações</span>
</a>
</nav>
<div class="mt-auto p-sm border-t border-outline-variant pt-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">AD</div>
<div>
<p class="font-label-md text-label-md font-bold">Admin</p>
<p class="font-label-sm text-label-sm text-outline">v2.4.0</p>
</div>
</div>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="flex-grow flex flex-col h-screen overflow-hidden">
<!-- Header / Top Bar -->
<header class="h-16 flex items-center justify-between px-margin-desktop bg-surface border-b border-outline-variant flex-shrink-0">
<div class="flex items-center gap-md">
<h2 class="font-headline-md text-headline-md text-primary">Solicitações de Cotação</h2>
<span class="bg-error text-on-error px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">lock</span>
                Área Restrita
            </span>
</div>
<div class="flex items-center gap-lg">
<div class="relative w-80">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" data-icon="search">search</span>
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-md py-2 font-body-md text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all" placeholder="Filtrar por nome, placa ou CPF..." type="text"/>
</div>
<button class="bg-primary text-on-primary font-label-md text-label-md px-lg py-2 rounded-lg flex items-center gap-sm hover:opacity-90 active:scale-95 transition-all">
<span class="material-symbols-outlined text-[20px]" data-icon="file_download">file_download</span>
                Exportar Dados
            </button>
</div>
</header>
<!-- Content Area -->
<div class="flex-grow overflow-auto p-margin-desktop custom-scrollbar">
<!-- Bento Stats Summary -->
<div class="grid grid-cols-4 gap-lg mb-xl">
<div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
<p class="font-label-sm text-label-sm text-outline-variant uppercase">Total Hoje</p>
<p class="font-headline-lg text-headline-lg text-primary mt-xs">124</p>
<p class="text-secondary font-label-sm text-label-sm mt-sm flex items-center gap-xs">
<span class="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span>
                    +12% vs ontem
                </p>
</div>
<div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
<p class="font-label-sm text-label-sm text-outline-variant uppercase">Em Análise</p>
<p class="font-headline-lg text-headline-lg text-primary mt-xs">42</p>
<div class="w-full bg-surface-variant h-1 rounded-full mt-md overflow-hidden">
<div class="bg-secondary h-full" style="width: 35%"></div>
</div>
</div>
<div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
<p class="font-label-sm text-label-sm text-outline-variant uppercase">Convertidas</p>
<p class="font-headline-lg text-headline-lg text-primary mt-xs">68</p>
<p class="text-on-error-container font-label-sm text-label-sm mt-sm flex items-center gap-xs">
                    Taxa de 54.8%
                </p>
</div>
<div class="bg-primary-container text-on-primary p-lg rounded-xl border border-outline">
<p class="font-label-sm text-label-sm text-on-primary-container uppercase">SLA Médio</p>
<p class="font-headline-lg text-headline-lg text-on-primary mt-xs">14 min</p>
<p class="text-secondary-fixed font-label-sm text-label-sm mt-sm">Dentro do esperado</p>
</div>
</div>
<!-- Main Data Table Container -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container text-on-surface-variant">
<tr>
<th class="px-lg py-md font-label-sm text-label-sm uppercase tracking-wider">Data/Hora</th>
<th class="px-lg py-md font-label-sm text-label-sm uppercase tracking-wider">Cliente / Contato</th>
<th class="px-lg py-md font-label-sm text-label-sm uppercase tracking-wider">Veículo (Placa/CEP)</th>
<th class="px-lg py-md font-label-sm text-label-sm uppercase tracking-wider">Perfil de Uso</th>
<th class="px-lg py-md font-label-sm text-label-sm uppercase tracking-wider">Status</th>
<th class="px-lg py-md font-label-sm text-label-sm uppercase tracking-wider text-center">Ações</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low transition-colors cursor-pointer group" onclick="toggleDetails('details-1')">
<td class="px-lg py-md font-body-md text-body-md whitespace-nowrap">24 Mai, 14:32</td>
<td class="px-lg py-md">
<div class="flex items-center gap-sm">
<div class="w-10 h-10 rounded bg-primary-fixed-dim text-primary flex items-center justify-center font-bold text-sm">RC</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface">Ricardo Camargo</span>
<span class="font-label-sm text-label-sm text-outline">(11) 98877-6655</span>
</div>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface">LUM-2024</span>
<span class="font-label-sm text-label-sm text-outline">CEP: 04571-010</span>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col gap-1">
<span class="flex items-center gap-1 font-label-sm text-[11px] text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded w-fit">
<span class="material-symbols-outlined text-[14px]">work</span> COMERCIAL
                                </span>
<span class="flex items-center gap-1 font-label-sm text-[11px] text-on-error-container bg-error-container px-2 py-0.5 rounded w-fit">
<span class="material-symbols-outlined text-[14px]">group</span> JOVEM (18-25)
                                </span>
</div>
</td>
<td class="px-lg py-md">
<span class="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full font-label-sm text-[11px] uppercase">Pendente</span>
</td>
<td class="px-lg py-md text-center">
<button class="p-1 hover:text-secondary text-outline-variant transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="expand_more">expand_more</span>
</button>
</td>
</tr>
<!-- Row 1 Details (Hidden) -->
<tr class="details-row hidden bg-surface-bright" id="details-1">
<td class="px-xl py-lg" colspan="6">
<div class="grid grid-cols-3 gap-xl">
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Dados do Cliente</h4>
<p class="font-body-md text-body-md"><strong>CPF:</strong> 123.456.789-00</p>
<p class="font-body-md text-body-md"><strong>Email:</strong> ricardo.c@email.com.br</p>
<p class="font-body-md text-body-md"><strong>WhatsApp:</strong> (11) 98877-6655</p>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Dados do Veículo</h4>
<p class="font-body-md text-body-md"><strong>Placa:</strong> LUM-2024 (São Paulo/SP)</p>
<p class="font-body-md text-body-md"><strong>Pernoite:</strong> 04571-010 (Brooklin)</p>
<p class="font-body-md text-body-md"><strong>Modelo:</strong> VW Nivus Highline 2024</p>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Perfil Detalhado</h4>
<p class="font-body-md text-body-md"><strong>Uso:</strong> Trabalho/Comercial</p>
<p class="font-body-md text-body-md"><strong>Condutores 18-25:</strong> Sim (Filho)</p>
<p class="font-body-md text-body-md"><strong>Garagem:</strong> Própria Fechada</p>
</div>
</div>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low transition-colors cursor-pointer group" onclick="toggleDetails('details-2')">
<td class="px-lg py-md font-body-md text-body-md whitespace-nowrap">24 Mai, 13:15</td>
<td class="px-lg py-md">
<div class="flex items-center gap-sm">
<div class="w-10 h-10 rounded bg-secondary-fixed-dim text-on-secondary-fixed flex items-center justify-center font-bold text-sm">MA</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface">Maria Aparecida</span>
<span class="font-label-sm text-label-sm text-outline">(21) 97766-5544</span>
</div>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface">ABC-1234</span>
<span class="font-label-sm text-label-sm text-outline">CEP: 22010-001</span>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col gap-1">
<span class="flex items-center gap-1 font-label-sm text-[11px] text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded w-fit">
<span class="material-symbols-outlined text-[14px]">beach_access</span> LAZER
                                </span>
<span class="flex items-center gap-1 font-label-sm text-[11px] text-outline bg-surface-container-highest px-2 py-0.5 rounded w-fit">
<span class="material-symbols-outlined text-[14px]">person</span> APENAS TITULAR
                                </span>
</div>
</td>
<td class="px-lg py-md">
<span class="bg-surface-variant text-on-surface-variant px-sm py-1 rounded-full font-label-sm text-[11px] uppercase">Concluído</span>
</td>
<td class="px-lg py-md text-center">
<button class="p-1 hover:text-secondary text-outline-variant transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="expand_more">expand_more</span>
</button>
</td>
</tr>
<tr class="details-row hidden bg-surface-bright" id="details-2">
<td class="px-xl py-lg" colspan="6">
<div class="grid grid-cols-3 gap-xl">
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Dados do Cliente</h4>
<p class="font-body-md text-body-md"><strong>CPF:</strong> 987.654.321-11</p>
<p class="font-body-md text-body-md"><strong>Email:</strong> maria.apa@provedor.com</p>
<p class="font-body-md text-body-md"><strong>WhatsApp:</strong> (21) 97766-5544</p>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Dados do Veículo</h4>
<p class="font-body-md text-body-md"><strong>Placa:</strong> ABC-1234 (Rio de Janeiro/RJ)</p>
<p class="font-body-md text-body-md"><strong>Pernoite:</strong> 22010-001 (Copacabana)</p>
<p class="font-body-md text-body-md"><strong>Modelo:</strong> Jeep Renegade 2022</p>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Perfil Detalhado</h4>
<p class="font-body-md text-body-md"><strong>Uso:</strong> Lazer / Passeio</p>
<p class="font-body-md text-body-md"><strong>Condutores 18-25:</strong> Não</p>
<p class="font-body-md text-body-md"><strong>Garagem:</strong> Prédio/Condomínio</p>
</div>
</div>
</td>
</tr>
<!-- Row 3 (Cancelled) -->
<tr class="hover:bg-surface-container-low transition-colors cursor-pointer group" onclick="toggleDetails('details-3')">
<td class="px-lg py-md font-body-md text-body-md whitespace-nowrap">24 Mai, 11:50</td>
<td class="px-lg py-md">
<div class="flex items-center gap-sm">
<div class="w-10 h-10 rounded bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold text-sm">JS</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface">João da Silva</span>
<span class="font-label-sm text-label-sm text-outline">(31) 96655-4433</span>
</div>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface">XYZ-9876</span>
<span class="font-label-sm text-label-sm text-outline">CEP: 30110-000</span>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col gap-1">
<span class="flex items-center gap-1 font-label-sm text-[11px] text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded w-fit">
<span class="material-symbols-outlined text-[14px]">work</span> COMERCIAL
                                </span>
<span class="flex items-center gap-1 font-label-sm text-[11px] text-outline bg-surface-container-highest px-2 py-0.5 rounded w-fit">
<span class="material-symbols-outlined text-[14px]">person</span> APENAS TITULAR
                                </span>
</div>
</td>
<td class="px-lg py-md">
<span class="bg-error-container text-on-error-container px-sm py-1 rounded-full font-label-sm text-[11px] uppercase">Cancelado</span>
</td>
<td class="px-lg py-md text-center">
<button class="p-1 hover:text-secondary text-outline-variant transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="expand_more">expand_more</span>
</button>
</td>
</tr>
<tr class="details-row hidden bg-surface-bright" id="details-3">
<td class="px-xl py-lg" colspan="6">
<div class="grid grid-cols-3 gap-xl">
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Dados do Cliente</h4>
<p class="font-body-md text-body-md"><strong>CPF:</strong> 456.789.123-22</p>
<p class="font-body-md text-body-md"><strong>Email:</strong> joao.silva@email.com</p>
<p class="font-body-md text-body-md"><strong>WhatsApp:</strong> (31) 96655-4433</p>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Dados do Veículo</h4>
<p class="font-body-md text-body-md"><strong>Placa:</strong> XYZ-9876 (Belo Horizonte/MG)</p>
<p class="font-body-md text-body-md"><strong>Pernoite:</strong> 30110-000 (Centro)</p>
<p class="font-body-md text-body-md"><strong>Modelo:</strong> Ford Ka 2019</p>
</div>
<div>
<h4 class="font-label-sm text-label-sm text-outline uppercase mb-sm">Perfil Detalhado</h4>
<p class="font-body-md text-body-md"><strong>Uso:</strong> Aplicativo / Comercial</p>
<p class="font-body-md text-body-md"><strong>Condutores 18-25:</strong> Não</p>
<p class="font-body-md text-body-md"><strong>Garagem:</strong> Rua (Sem Garagem)</p>
</div>
</div>
</td>
</tr>
</tbody>
</table>
<!-- Pagination Footer -->
<div class="px-lg py-md flex items-center justify-between bg-surface-container-low border-t border-outline-variant">
<p class="font-label-sm text-label-sm text-on-surface-variant">Exibindo 1-3 de 2.450 solicitações</p>
<div class="flex items-center gap-xs">
<button class="p-2 hover:bg-surface-variant rounded transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded font-label-sm text-label-sm">1</button>
<button class="w-8 h-8 flex items-center justify-center hover:bg-surface-variant rounded font-label-sm text-label-sm">2</button>
<button class="w-8 h-8 flex items-center justify-center hover:bg-surface-variant rounded font-label-sm text-label-sm">3</button>
<span class="px-sm text-outline">...</span>
<button class="w-8 h-8 flex items-center justify-center hover:bg-surface-variant rounded font-label-sm text-label-sm">490</button>
<button class="p-2 hover:bg-surface-variant rounded transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
<!-- System Footer -->
<footer class="bg-primary dark:bg-tertiary-container text-on-primary dark:text-on-tertiary-container flex flex-col md:flex-row justify-between items-center px-margin-desktop py-md max-w-full mx-0 gap-lg flex-shrink-0">
<p class="font-label-sm text-label-sm text-outline-variant">© 2024 Lumma Cotação Auto. Todos os direitos reservados. Em conformidade com LGPD.</p>
<div class="flex gap-lg">
<a class="font-label-sm text-label-sm text-outline-variant hover:text-on-primary transition-colors" href="#">Termos de Uso</a>
<a class="font-label-sm text-label-sm text-outline-variant hover:text-on-primary transition-colors" href="#">Privacidade</a>
<a class="font-label-sm text-label-sm text-outline-variant hover:text-on-primary transition-colors" href="#">Segurança</a>
<a class="font-label-sm text-label-sm text-outline-variant hover:text-on-primary transition-colors" href="#">Contato</a>
</div>
</footer>
</main>
<script>
    // Expandable row logic
    function toggleDetails(id) {
        const detailRow = document.getElementById(id);
        const parentRow = detailRow.previousElementSibling;
        const icon = parentRow.querySelector('[data-icon="expand_more"]');
        
        const isHidden = detailRow.classList.contains('hidden');
        
        // Close all other open details (optional, but cleaner for admin)
        // document.querySelectorAll('.details-row').forEach(row => row.classList.add('hidden'));
        
        if (isHidden) {
            detailRow.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
            parentRow.classList.add('bg-surface-container');
        } else {
            detailRow.classList.add('hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
            parentRow.classList.remove('bg-surface-container');
        }
    }

    // Search feedback simulation
    const searchInput = document.querySelector('input[type="text"]');
    searchInput.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            console.log('Filtrando leads por:', e.target.value);
        }
    });

    // Export button feedback
    document.querySelector('button:has(span[data-icon="file_download"])').addEventListener('click', (e) => {
        e.stopPropagation();
        alert('Preparando exportação de dados detalhados (CSV/Excel)...');
    });
</script>
</body></html>
