export type GalleryCategory = 'exterior' | 'interiors' | 'pool-terrace' | 'views' | 'details';

export type GalleryAspect = 'landscape' | 'portrait' | 'square';

export type GalleryClip = 'a' | 'b' | 'c' | 'd';

export type GalleryItemKey =
  | 'ext1' | 'ext2' | 'ext3'
  | 'int1' | 'int2' | 'int3' | 'int4'
  | 'pool1' | 'pool2' | 'terrace1'
  | 'view1' | 'view2' | 'view3'
  | 'detail1' | 'detail2'
  | 'video-drone' | 'video-pool';

export type GalleryItemConfig = {
  key: GalleryItemKey;
  src: string;
  aspect: GalleryAspect;
  clip: GalleryClip;
  feature: boolean;
  category: GalleryCategory | 'video';
  isVideo?: boolean;
  videoSrc?: string;
};

const CLIPS: GalleryClip[] = ['a', 'b', 'c', 'd'];
const ASPECTS: GalleryAspect[] = ['landscape', 'portrait', 'square'];

const IMAGE_SOURCES: Partial<Record<GalleryItemKey, string>> = {
  ext1: '/images/hero-villa.jpg',
  ext2: '/images/aerial-villa.jpg',
  ext3: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85',
  int1: '/images/interior-living.jpg',
  int2: 'https://images.unsplash.com/photo-1611892440504-42a784e15d7f?w=900&q=85',
  int3: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=85',
  int4: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
  pool1: '/images/pool-terrace.jpg',
  pool2: 'https://images.unsplash.com/photo-1575429198097-0414c8c0e0c5?w=900&q=85',
  terrace1: '/images/pool-terrace.jpg',
  view1: '/images/aerial-villa.jpg',
  view2: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85',
  view3: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85',
  detail1: 'https://images.unsplash.com/photo-1600585154340-be6161a56b08?w=900&q=85',
  detail2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85',
  'video-drone': '/images/aerial-villa.jpg',
  'video-pool': '/images/hero-villa.jpg',
};

const VIDEO_SOURCES: Partial<Record<GalleryItemKey, string>> = {
  'video-drone': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'video-pool': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
};

const ITEM_ORDER: GalleryItemKey[] = [
  'ext1', 'int1', 'pool1', 'view1', 'detail1',
  'ext2', 'int2', 'pool2', 'view2', 'detail2',
  'ext3', 'int3', 'terrace1', 'view3', 'int4',
  'video-drone', 'video-pool',
];

export const GALLERY_ITEMS: GalleryItemConfig[] = ITEM_ORDER.map((key, index) => {
  const isVideo = key.startsWith('video');
  const cats: GalleryCategory[] = ['exterior', 'interiors', 'pool-terrace', 'views', 'details'];
  const cat = isVideo ? 'video' : cats[index % cats.length];
  return {
    key,
    src: IMAGE_SOURCES[key] as string,
    aspect: ASPECTS[index % ASPECTS.length],
    clip: CLIPS[index % CLIPS.length],
    feature: index % 5 === 0 || isVideo,
    category: cat as any,
    isVideo,
    videoSrc: isVideo ? VIDEO_SOURCES[key] : undefined,
  };
});

export const GALLERY_TABS = ['all', 'exterior', 'interiors', 'pool-terrace', 'views', 'details'] as const;
export type GalleryTab = (typeof GALLERY_TABS)[number];