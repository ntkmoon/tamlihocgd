export type GamePhase =
  | 'TITLE'
  | 'CLASS_RECORD_BOOK'
  | 'PLAYING'
  | 'FEEDBACK'
  | 'TRANSFER_ALERT'
  | 'MONTH_SUMMARY'
  | 'PAUSED'
  | 'VICTORY'
  | 'GAME_OVER';

export type TeacherMood = 'neutral' | 'happy' | 'thoughtful' | 'concerned';

export type TeacherGender = 'female' | 'male';

export interface TeacherProfile {
  gender: TeacherGender;
  rawName: string;
  displayName: string;
}

export interface StatDelta {
  academic?: number;
  mood?: number;
  affection?: number;
}

export interface StudentHistoryEntry {
  week: number;
  month: number;
  title: string;
  deltas: StatDelta;
}

export interface StudentAvatarConfig {
  gender: 'male' | 'female';
  hairStyle: 'bob' | 'ponytail' | 'pigtails' | 'short' | 'spiky' | 'parted';
  hairColor: string;
  shirtAccent: string;
  bagColor: string;
  accessory?: 'glasses' | 'ribbon' | 'cap' | 'headband' | 'none';
  redScarf: boolean;
}

export interface Student {
  id: string;
  name: string;
  row: number;
  col: number;
  role?: string;
  personality: string;
  academic: number;
  mood: number;
  affection: number;
  status: 'active' | 'transferred';
  transferredWeek?: number;
  transferredMonth?: number;
  avatar: StudentAvatarConfig;
  history: StudentHistoryEntry[];
}

export interface ChoiceOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  quality: 'best' | 'good' | 'weak' | 'poor';
  feedback: string;
  targetEffects: StatDelta;
  classEffects: StatDelta;
}

export type SituationCategory =
  | 'Trên lớp'
  | 'Chủ nhiệm'
  | 'Gia đình & Tâm lý'
  | 'Đồng nghiệp'
  | 'Ban Giám Hiệu'
  | 'Ngày lễ & Sự kiện'
  | 'Sự kiện khách quan';

export type SituationOrigin = 'record_book' | 'weekly_event';

export type StaffTier = 'colleague' | 'principal';

export interface StaffCharacter {
  id: string;
  name: string;
  title: string;
  tier: StaffTier;
  subjectOrArea: string;
  personality: string;
  powerNote: string;
  gender: 'male' | 'female';
  hairColor: string;
  shirtColor: string;
  glasses?: boolean;
}

export interface StaffInteractionLog {
  week: number;
  month: number;
  staffId: string;
  title: string;
  quality: ChoiceOption['quality'];
  classDeltas: StatDelta;
  affectionDelta?: number;
}

export type ExternalEventSource = 'Thời tiết' | 'Nhà trường' | 'Phụ huynh' | 'Cộng đồng';

export interface ExternalEventData {
  source: ExternalEventSource;
  feedback: string;
  targetEffects: StatDelta;
  classEffects: StatDelta;
}

export interface PedagogicalSituation {
  id: string;
  sourceNumber?: number;
  category: SituationCategory;
  eventType?: 'choice' | 'external';
  preferredMonths?: number[];
  holidayTag?: string;
  isInfraction?: boolean;
  staffTier?: StaffTier;
  staffCharacterId?: string;
  title: string;
  prompt: string;
  involvedStudentIds: string[];
  choices?: [ChoiceOption, ChoiceOption, ChoiceOption, ChoiceOption];
  externalEvent?: ExternalEventData;
}

export interface ScheduledSituation {
  situation: PedagogicalSituation;
  origin: SituationOrigin;
  choiceOrder?: number[];
}

export interface ClassRecordEntry {
  id: string;
  situation: PedagogicalSituation;
  reporter: string;
  session: string;
}

export interface AcademicWeekInfo {
  weekNumber: number; // 1..36
  month: number; // 9..12, 1..5
  weekInMonth: number; // 1..4
  monthTheme: string;
  holidayLabel?: string;
  eventCount: number; // 2..4 regular/holiday/external events
  seasonTone: 'autumn' | 'festival' | 'winter' | 'spring' | 'summer';
}

export interface FloatingStatPopup {
  id: string;
  studentId: string;
  deltas: StatDelta;
}

export interface TransferEvent {
  studentId: string;
  studentName: string;
  finalAffection: number;
  week: number;
  month: number;
}
