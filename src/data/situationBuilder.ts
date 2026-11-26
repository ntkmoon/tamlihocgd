import {
  ChoiceOption,
  PedagogicalSituation,
  SituationCategory,
  StaffTier,
  StatDelta,
} from '../types/game';

export interface CompactChoice {
  text: string;
  quality: ChoiceOption['quality'];
  feedback: string;
  targetEffects?: StatDelta;
  classEffects?: StatDelta;
}

export interface CompactSituationInput {
  id: string;
  sourceNumber?: number;
  category: SituationCategory;
  preferredMonths?: number[];
  holidayTag?: string;
  isInfraction?: boolean;
  staffTier?: StaffTier;
  staffCharacterId?: string;
  title: string;
  prompt: string;
  involvedStudentIds: string[];
  // Order: [best, good, weak, poor] or any 4 options — deterministically rotated into A/B/C/D
  options: [CompactChoice, CompactChoice, CompactChoice, CompactChoice];
  noShuffle?: boolean;
}

const DEFAULT_EFFECTS: Record<
  ChoiceOption['quality'],
  { target: StatDelta; cls: StatDelta }
> = {
  best: {
    target: { academic: 6, mood: 8, affection: 10 },
    cls: { academic: 2, mood: 3, affection: 4 },
  },
  good: {
    target: { academic: 2, mood: 3, affection: 4 },
    cls: { academic: 1, mood: 1, affection: 1 },
  },
  weak: {
    target: { academic: -5, mood: -15, affection: -18 },
    cls: { mood: -4, affection: -5 },
  },
  poor: {
    target: { academic: -12, mood: -38, affection: -48 },
    cls: { mood: -10, affection: -12 },
  },
};

// Tuyến Đồng nghiệp & Ban Giám Hiệu: tăng ít giảm nhiều; Ban Giám Hiệu quyền lực cao hơn nên tăng/giảm mạnh hơn
const STAFF_EFFECTS: Record<
  StaffTier,
  Record<ChoiceOption['quality'], StatDelta>
> = {
  colleague: {
    best: { academic: 3, mood: 4, affection: 4 },
    good: { academic: 1, mood: 2, affection: 1 },
    weak: { academic: -5, mood: -11, affection: -13 },
    poor: { academic: -10, mood: -22, affection: -26 },
  },
  principal: {
    best: { academic: 6, mood: 8, affection: 8 },
    good: { academic: 2, mood: 3, affection: 3 },
    weak: { academic: -11, mood: -23, affection: -26 },
    poor: { academic: -20, mood: -44, affection: -52 },
  },
};

const LABELS: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

// Deterministic permutation orders for 4 choices so best answer is distributed across A, B, C, D
const PERMUTATIONS: Array<[number, number, number, number]> = [
  [0, 1, 2, 3], // best at A
  [1, 0, 2, 3], // best at B
  [2, 3, 0, 1], // best at C
  [3, 1, 2, 0], // best at D
  [1, 2, 0, 3], // best at C
  [2, 0, 3, 1], // best at B
  [0, 3, 1, 2], // best at A
  [3, 2, 1, 0], // best at D
];

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function buildSituation(input: CompactSituationInput): PedagogicalSituation {
  const perm = input.noShuffle
    ? ([0, 1, 2, 3] as [number, number, number, number])
    : PERMUTATIONS[hashSeed(input.id) % PERMUTATIONS.length];

  const hasTargets = input.involvedStudentIds.length > 0;
  const resolvedStaffTier: StaffTier | undefined =
    input.staffTier ??
    (input.category === 'Ban Giám Hiệu'
      ? 'principal'
      : input.category === 'Đồng nghiệp'
        ? 'colleague'
        : undefined);

  const choices = perm.map((srcIdx, posIdx): ChoiceOption => {
    const opt = input.options[srcIdx];
    const defaults = DEFAULT_EFFECTS[opt.quality];
    const defaultCls = resolvedStaffTier
      ? STAFF_EFFECTS[resolvedStaffTier][opt.quality]
      : defaults.cls;

    return {
      label: LABELS[posIdx],
      text: opt.text,
      quality: opt.quality,
      feedback: opt.feedback,
      targetEffects: opt.targetEffects ?? (hasTargets ? defaults.target : {}),
      classEffects: opt.classEffects ?? defaultCls,
    };
  }) as [ChoiceOption, ChoiceOption, ChoiceOption, ChoiceOption];

  return {
    id: input.id,
    sourceNumber: input.sourceNumber,
    category: input.category,
    preferredMonths: input.preferredMonths,
    holidayTag: input.holidayTag,
    isInfraction: input.isInfraction,
    staffTier: resolvedStaffTier,
    staffCharacterId: input.staffCharacterId,
    title: input.title,
    prompt: input.prompt,
    involvedStudentIds: input.involvedStudentIds,
    choices,
  };
}
