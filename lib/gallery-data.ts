export type GalleryCategory = 'rooms' | 'pool' | 'grounds' | 'breakfast';

export type GalleryAspect = 'landscape' | 'portrait' | 'square';

export type GalleryClip = 'a' | 'b' | 'c' | 'd';

export type GalleryItemKey =
  | 'room1'
  | 'room2'
  | 'room3'
  | 'room4'
  | 'pool1'
  | 'pool2'
  | 'pool3'
  | 'grounds1'
  | 'grounds2'
  | 'grounds3'
  | 'grounds4'
  | 'breakfast1'
  | 'breakfast2';

export type GalleryItemConfig = {
  key: GalleryItemKey;
  src: string;
  aspect: GalleryAspect;
  clip: GalleryClip;
  feature: boolean;
};

const CLIPS: GalleryClip[] = ['a', 'b', 'c', 'd'];
const ASPECTS: GalleryAspect[] = ['landscape', 'portrait', 'square'];

const IMAGE_SOURCES: Record<GalleryItemKey, string> = {
  room1: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  room2: 'https://images.unsplash.com/photo-1611892440504-42a784e15d7f?w=700&q=80',
  room3: 'https://images.unsplash.com/photo-1598928506311-c55ded549a5d?w=900&q=80',
  room4: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&q=80',
  pool1: 'https://images.unsplash.com/photo-1540541338287-a417d50cca71?w=900&q=80',
  pool2: 'https://images.unsplash.com/photo-1575429198097-0414c8c0e0c5?w=700&q=80',
  pool3: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  grounds1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
  grounds2: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  grounds3: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  grounds4: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80',
  breakfast1: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
  breakfast2: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=80',
};

const ITEM_ORDER: GalleryItemKey[] = [
  'room1',
  'pool1',
  'grounds1',
  'breakfast1',
  'room2',
  'room3',
  'pool2',
  'grounds2',
  'breakfast2',
  'room4',
  'pool3',
  'grounds4',
];

export const GALLERY_ITEMS: GalleryItemConfig[] = ITEM_ORDER.map((key, index) => ({
  key,
  src: IMAGE_SOURCES[key],
  aspect: ASPECTS[index % ASPECTS.length],
  clip: CLIPS[index % CLIPS.length],
  feature: (index + 1) % 6 === 0,
}));

export const GALLERY_TABS = ['all', 'rooms', 'pool', 'grounds', 'breakfast'] as const;
export type GalleryTab = (typeof GALLERY_TABS)[number];