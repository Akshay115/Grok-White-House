/**
 * Hadid-inspired parametric path library.
 * Each path has morph variants that preserve topology for smooth interpolation.
 */

export type HadidPathSet = {
  id: string;
  label: string;
  d: string;
  morphB: string;
  morphC: string;
  morphD: string;
};

/** Path A — Heydar Aliyev Center roof cross-section: rise, crest, fold-under, sweep */
export const PATH_ALIYEV: HadidPathSet = {
  id: 'aliyev',
  label: 'Aliyev',
  d: 'M-120,560 C20,380 160,220 300,300 C440,380 400,520 280,480 C160,440 80,360 180,250 C280,140 440,170 600,310 C760,450 920,390 1060,250 C1200,110 1340,170 1500,330',
  morphB:
    'M-120,540 C40,360 180,200 320,290 C460,380 420,500 300,460 C180,420 100,340 200,240 C300,140 460,160 620,300 C780,440 940,380 1080,240 C1220,100 1360,160 1500,310',
  morphC:
    'M-120,580 C0,400 140,240 280,320 C420,400 380,540 260,500 C140,460 60,380 160,270 C260,160 420,190 580,330 C740,470 900,410 1040,270 C1180,130 1320,190 1500,350',
  morphD:
    'M-120,550 C30,370 170,210 310,280 C450,350 410,510 290,470 C170,430 90,350 190,260 C290,170 450,180 610,320 C770,460 930,400 1070,260 C1210,120 1350,180 1500,320',
};

/** Path B — MAXXI Rome circulation ramp: three interlocking ribbons */
export const PATH_MAXXI: HadidPathSet = {
  id: 'maxxi',
  label: 'MAXXI',
  d: 'M-80,480 C60,420 180,340 300,380 C420,420 500,520 620,480 C740,440 820,320 940,360 C1060,400 1160,500 1280,440 C1400,380 1480,280 1560,360',
  morphB:
    'M-80,500 C80,440 200,360 320,400 C440,440 520,540 640,500 C760,460 840,340 960,380 C1080,420 1180,520 1300,460 C1420,400 1500,300 1560,380',
  morphC:
    'M-80,460 C40,400 160,320 280,360 C400,400 480,500 600,460 C720,420 800,300 920,340 C1040,380 1140,480 1260,420 C1380,360 1460,260 1560,340',
  morphD:
    'M-80,490 C70,430 190,350 310,390 C430,430 510,530 630,490 C750,450 830,330 950,370 C1070,410 1170,510 1290,450 C1410,390 1490,290 1560,370',
};

/** Path C — London Aquatics Centre roof: massive central arc with counter-curves */
export const PATH_AQUATICS: HadidPathSet = {
  id: 'aquatics',
  label: 'Aquatics',
  d: 'M-100,620 C120,200 360,40 720,80 C1080,120 1280,380 1400,560 C1320,480 1180,360 960,340 C740,320 560,420 400,520 C240,620 80,680 -100,620 Z',
  morphB:
    'M-100,640 C140,220 380,60 720,100 C1060,140 1260,400 1400,580 C1320,500 1180,380 960,360 C740,340 560,440 400,540 C240,640 80,700 -100,640 Z',
  morphC:
    'M-100,600 C100,180 340,20 720,60 C1100,100 1300,360 1400,540 C1320,460 1180,340 960,320 C740,300 560,400 400,500 C240,600 80,660 -100,600 Z',
  morphD:
    'M-100,630 C130,210 370,50 720,90 C1070,130 1270,390 1400,570 C1320,490 1180,370 960,350 C740,330 560,430 400,530 C240,630 80,690 -100,630 Z',
};

/** Path D — Galaxy Soho: concentric sweeping arcs, bird's-eye interconnected curves */
export const PATH_GALAXY: HadidPathSet = {
  id: 'galaxy',
  label: 'Galaxy',
  d: 'M-60,400 C100,280 260,180 420,240 C580,300 640,420 560,520 C480,620 300,660 160,580 C20,500 -20,360 80,260 C180,160 360,140 520,220 C680,300 760,440 700,560 C640,680 460,740 300,680 C140,620 40,480 120,360 C200,240 380,200 540,280',
  morphB:
    'M-60,420 C120,300 280,200 440,260 C600,320 660,440 580,540 C500,640 320,680 180,600 C40,520 0,380 100,280 C200,180 380,160 540,240 C700,320 780,460 720,580 C660,700 480,760 320,700 C160,640 60,500 140,380 C220,260 400,220 560,300',
  morphC:
    'M-60,380 C80,260 240,160 400,220 C560,280 620,400 540,500 C460,600 280,640 140,560 C0,480 -40,340 60,240 C160,140 340,120 500,200 C660,280 740,420 680,540 C620,660 440,720 280,660 C120,600 20,460 100,340 C180,220 360,180 520,260',
  morphD:
    'M-60,410 C110,290 270,190 430,250 C590,310 650,430 570,530 C490,630 310,670 170,590 C30,510 -10,370 90,270 C190,170 370,150 530,230 C690,310 770,450 710,570 C650,690 470,750 310,690 C150,630 50,490 130,370 C210,250 390,210 550,290',
};

export const HADID_PATHS = {
  A: PATH_ALIYEV,
  B: PATH_MAXXI,
  C: PATH_AQUATICS,
  D: PATH_GALAXY,
} as const;

export const MORPH_SEQUENCE = [
  PATH_ALIYEV.d,
  PATH_MAXXI.d,
  PATH_AQUATICS.d,
  PATH_GALAXY.d,
] as const;

export function pathMorphCycle(pathSet: HadidPathSet): string[] {
  return [pathSet.d, pathSet.morphB, pathSet.morphC, pathSet.morphD];
}

/** Closed fills for section dividers and footer sweeps */
export const PATH_ALIYEV_FILL: HadidPathSet = {
  id: 'aliyev-fill',
  label: 'Aliyev Fill',
  d: 'M0,120 C180,20 360,200 540,80 C720,-40 900,60 1080,140 C1260,220 1380,100 1440,160 L1440,120 L0,120 Z',
  morphB:
    'M0,140 C200,40 380,220 560,100 C740,-20 920,80 1100,160 C1280,240 1380,120 1440,180 L1440,120 L0,120 Z',
  morphC:
    'M0,100 C160,0 340,180 520,60 C700,-60 880,40 1060,120 C1240,200 1360,80 1440,140 L1440,120 L0,120 Z',
  morphD:
    'M0,130 C190,30 370,210 550,90 C730,-30 910,70 1090,150 C1270,230 1370,110 1440,170 L1440,120 L0,120 Z',
};

export const PATH_AQUATICS_FOOTER: HadidPathSet = {
  id: 'aquatics-footer',
  label: 'Aquatics Footer',
  d: 'M0,200 C200,40 480,-20 720,60 C960,140 1180,80 1440,20 L1440,200 L0,200 Z',
  morphB:
    'M0,200 C240,60 500,0 740,80 C980,160 1200,100 1440,40 L1440,200 L0,200 Z',
  morphC:
    'M0,200 C180,20 460,-40 700,40 C940,120 1160,60 1440,0 L1440,200 L0,200 Z',
  morphD:
    'M0,200 C220,50 490,-10 730,70 C970,150 1190,90 1440,30 L1440,200 L0,200 Z',
};

export const PATH_DIVIDER_STROKE: HadidPathSet = {
  id: 'divider-stroke',
  label: 'Divider Stroke',
  d: 'M-40,80 C120,20 280,140 440,60 S720,0 960,100 S1200,180 1480,80',
  morphB:
    'M-40,90 C100,30 300,150 460,70 S740,10 980,110 S1220,190 1480,90',
  morphC:
    'M-40,70 C140,10 260,130 420,50 S700,-10 940,90 S1180,170 1480,70',
  morphD:
    'M-40,85 C110,25 290,145 450,65 S730,5 970,105 S1210,185 1480,85',
};

export const PATH_FOOTER_ACCENT: HadidPathSet = {
  id: 'footer-accent',
  label: 'Footer Accent',
  d: 'M-60,120 C140,40 340,180 540,80 S860,20 1100,140 S1320,220 1500,100',
  morphB:
    'M-60,130 C120,50 360,190 560,90 S880,30 1120,150 S1340,230 1500,110',
  morphC:
    'M-60,110 C160,30 320,170 520,70 S840,10 1080,130 S1300,210 1500,90',
  morphD:
    'M-60,125 C130,45 350,185 550,85 S870,25 1110,145 S1330,225 1500,105',
};

export const BACKGROUND_FRAGMENTS = [
  { d: PATH_ALIYEV.d, transform: 'translate(-80, 120) scale(0.45)', opacity: 0.5 },
  { d: PATH_ALIYEV.morphC, transform: 'translate(400, 280) scale(0.35)', opacity: 0.4 },
  { d: PATH_ALIYEV.morphB, transform: 'translate(900, 80) scale(0.5)', opacity: 0.35 },
  { d: PATH_ALIYEV.morphD, transform: 'translate(200, 520) scale(0.3)', opacity: 0.45 },
  { d: PATH_ALIYEV.d, transform: 'translate(1100, 400) scale(0.4)', opacity: 0.3 },
  { d: PATH_ALIYEV.morphB, transform: 'translate(600, 600) scale(0.28)', opacity: 0.4 },
] as const;

export const HERO_LAYERS = [
  { path: PATH_ALIYEV, transform: 'translate(0, 0) scale(1)', strokeWidth: 1 },
  { path: PATH_MAXXI, transform: 'translate(60, 180) scale(0.92)', strokeWidth: 0.75 },
  { path: PATH_AQUATICS, transform: 'translate(-40, 320) scale(1.05)', strokeWidth: 0.5 },
] as const;