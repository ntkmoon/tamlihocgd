import React from 'react';
import { TeacherGender, TeacherMood } from '../types/game';

interface TeacherAvatarProps {
  mood: TeacherMood;
  gender?: TeacherGender;
  teacherName?: string;
  size?: 'sm' | 'md';
  hideBubble?: boolean;
  showNameplate?: boolean;
}

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({
  mood,
  gender = 'female',
  teacherName = 'Cô Ngân',
  size = 'md',
  hideBubble = false,
  showNameplate = true,
}) => {
  const mouthPath =
    mood === 'happy'
      ? 'M 58.5 52.5 Q 65 57.5 71.5 52.5'
      : mood === 'concerned'
        ? 'M 59.5 55 Q 65 51.5 70.5 55'
        : mood === 'thoughtful'
          ? 'M 60 53.5 L 70 53.5'
          : 'M 59.5 53 Q 65 56 70.5 53';

  const browOffset = mood === 'concerned' ? -1.4 : mood === 'happy' ? -0.9 : 0;

  const sizeClass =
    size === 'sm'
      ? 'w-16 sm:w-20 h-auto'
      : 'w-24 sm:w-28 lg:w-32 h-auto';

  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none">
      {/* Subtle reaction bubble when mood is non-neutral */}
      {!hideBubble && mood !== 'neutral' && (
        <div
          className={`mb-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold shadow-sm border transition-all duration-200 whitespace-nowrap ${
            mood === 'happy'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : mood === 'concerned'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}
        >
          {mood === 'happy' ? 'Rất tốt!' : mood === 'concerned' ? 'Cần rút kinh nghiệm' : 'Đang suy ngẫm'}
        </div>
      )}

      <svg
        viewBox="0 0 130 205"
        className={`${sizeClass} drop-shadow-[0_6px_14px_rgba(28,20,12,0.16)]`}
        aria-label={`Giáo viên ${teacherName}`}
      >
        {/* Soft floor shadow */}
        <ellipse cx="65" cy="196" rx="34" ry="5.5" fill="rgba(68, 46, 22, 0.16)" />

        {gender === 'female' ? (
          <>
            {/* Traditional Vietnamese hair flowing seamlessly behind ears and neck */}
            <path
              d="M 41.5 38 C 41.5 11.5 88.5 11.5 88.5 38 C 90.5 50 89.5 61 85 70 L 45 70 C 40.5 61 39.5 50 41.5 38 Z"
              fill="#271812"
            />

            {/* Neat black low-heel shoes */}
            <path d="M 46 193 Q 52 188 59 193 L 59 196 L 45 196 Z" fill="#1e293b" />
            <path d="M 71 193 Q 78 188 85 193 L 85 196 L 71 196 Z" fill="#1e293b" />

            {/* Flowing wide-leg white silk trousers (Quần lụa áo dài) */}
            <path
              d="M 45 104 L 85 104 L 91 192 L 68 192 L 65 135 L 62 192 L 39 192 Z"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <line x1="51" y1="120" x2="47" y2="190" stroke="#e2e8f0" strokeWidth="1.1" />
            <line x1="79" y1="120" x2="83" y2="190" stroke="#e2e8f0" strokeWidth="1.1" />

            {/* Back flap of Áo Dài (Tà sau) */}
            <path
              d="M 44 103 L 86 103 L 92 178 Q 65 182 38 178 Z"
              fill="#0f766e"
              stroke="#115e59"
              strokeWidth="1.1"
              opacity="0.9"
            />

            {/* Front flap of Áo Dài (Tà trước) with gentle curved hem */}
            <path
              d="M 47 104 L 83 104 L 86 176 Q 65 183 44 176 Z"
              fill="#0d9488"
              stroke="#0f766e"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            {/* Silk sheen & delicate golden lotus-petal motif on lower tà áo */}
            <path d="M 54 114 L 52 173" stroke="#5eead4" strokeWidth="1" opacity="0.28" />
            <path d="M 76 114 L 78 173" stroke="#5eead4" strokeWidth="1" opacity="0.28" />
            <g transform="translate(69 148)" opacity="0.9">
              <path d="M 0 8 Q -4 2 0 -4 Q 4 2 0 8 Z" fill="#fef3c7" />
              <path d="M 0 8 Q -7 4 -5 -1 Q -1 1 0 8 Z" fill="#fde68a" />
              <path d="M 0 8 Q 7 4 5 -1 Q 1 1 0 8 Z" fill="#fde68a" />
              <circle cx="0" cy="-6.5" r="1.1" fill="#fcd34d" />
            </g>

            {/* Áo Dài fitted bodice with classic raglan seams & mandarin collar (Cổ trụ) */}
            <path
              d="M 43 70 Q 52 65 65 65 Q 78 65 87 70 L 83 106 L 47 106 Z"
              fill="#0d9488"
              stroke="#0f766e"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            {/* Raglan diagonal seams characteristic of Vietnamese Áo dài */}
            <line x1="57" y1="66" x2="46" y2="85" stroke="#115e59" strokeWidth="1" opacity="0.55" />
            <line x1="73" y1="66" x2="84" y2="85" stroke="#115e59" strokeWidth="1" opacity="0.55" />
            {/* Waist shaping highlight */}
            <path d="M 49 102 Q 65 106 81 102" stroke="#115e59" strokeWidth="1.1" fill="none" opacity="0.45" />
            {/* Subtle side-button closure curve & gold teacher pin */}
            <path d="M 65 67 Q 76 74 82 88" stroke="#99f6e4" strokeWidth="0.9" fill="none" opacity="0.6" />
            <circle cx="75" cy="79" r="2.1" fill="#fbbf24" stroke="#b45309" strokeWidth="0.6" />

            {/* Mandarin collar (Cổ trụ áo dài) */}
            <path
              d="M 57 62 Q 65 65 73 62 L 74 68 Q 65 71 56 68 Z"
              fill="#0f766e"
              stroke="#115e59"
              strokeWidth="1.1"
            />
            <path d="M 58 64 Q 65 66.5 72 64" stroke="#fef3c7" strokeWidth="0.8" fill="none" opacity="0.7" />

            {/* Left Áo Dài long sleeve cradling hardcover Sổ Chủ Nhiệm */}
            <path
              d="M 44 71 Q 31 93 37 115 L 45 113 Q 41 96 47 78 Z"
              fill="#0d9488"
              stroke="#0f766e"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Hardcover Sổ Chủ Nhiệm */}
            <rect x="27" y="106" width="14" height="19" rx="2" fill="#14532d" stroke="#052e16" strokeWidth="1.1" />
            <line x1="30" y1="107" x2="30" y2="124" stroke="#86efac" strokeWidth="1" opacity="0.6" />
            <circle cx="40.5" cy="117" r="4.3" fill="#fad6b8" stroke="#dfb28e" strokeWidth="0.9" />

            {/* Right Áo Dài long sleeve raised gracefully with pointer */}
            <path
              d="M 86 71 Q 99 81 104 64 L 97 60 Q 93 74 83 68 Z"
              fill="#0d9488"
              stroke="#0f766e"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="103.5" cy="58" r="4.3" fill="#fad6b8" stroke="#dfb28e" strokeWidth="0.9" />
            {/* Slender wooden chalkboard pointer */}
            <line x1="104.5" y1="56" x2="120" y2="27" stroke="#92400e" strokeWidth="2.4" strokeLinecap="round" />

            {/* Neck with subtle chin shadow */}
            <rect x="60" y="57" width="10" height="8.5" rx="3.5" fill="#f3c4a0" />
            <path d="M 60 59 Q 65 62 70 59" stroke="#dfa77e" strokeWidth="1.4" fill="none" />

            {/* Ears & pearl studs */}
            <ellipse cx="45.5" cy="43" rx="3" ry="4.5" fill="#f7cea9" stroke="#dfb28e" strokeWidth="1" />
            <ellipse cx="84.5" cy="43" rx="3" ry="4.5" fill="#f7cea9" stroke="#dfb28e" strokeWidth="1" />
            <circle cx="45.5" cy="46.5" r="1.4" fill="#fef3c7" stroke="#d97706" strokeWidth="0.5" />
            <circle cx="84.5" cy="46.5" r="1.4" fill="#fef3c7" stroke="#d97706" strokeWidth="0.5" />

            {/* Head */}
            <path
              d="M 46 37 C 46 21 84 21 84 37 C 84 53 75 60.5 65 60.5 C 55 60.5 46 53 46 37 Z"
              fill="#fde0c6"
              stroke="#e1b48e"
              strokeWidth="1.2"
            />

            {/* Seamless side-parted crown & soft forehead bangs with pearl hairpin */}
            <path
              d="M 41.5 38 C 41.5 11.5 88.5 11.5 88.5 38 L 85 38 C 82 32 71 31 56 28 C 49 30 46 33 45 38 Z"
              fill="#271812"
            />
            {/* Small pearl hairpin */}
            <circle cx="78" cy="28.5" r="1.8" fill="#fef9c3" stroke="#d97706" strokeWidth="0.5" />

            {/* Soft rosy cheeks */}
            <ellipse cx="52.5" cy="48.5" rx="3.2" ry="1.6" fill="#fda4af" opacity="0.36" />
            <ellipse cx="77.5" cy="48.5" rx="3.2" ry="1.6" fill="#fda4af" opacity="0.36" />

            {/* Expressive warm eyes */}
            <ellipse cx="57" cy="42.5" rx="2.4" ry="2.6" fill="#1c1917" />
            <ellipse cx="73" cy="42.5" rx="2.4" ry="2.6" fill="#1c1917" />
            <circle cx="57.8" cy="41.6" r="0.8" fill="#ffffff" />
            <circle cx="73.8" cy="41.6" r="0.8" fill="#ffffff" />
            <path d="M 54 41 Q 57 39.2 60 41" stroke="#1c1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 70 41 Q 73 39.2 76 41" stroke="#1c1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Nose bridge */}
            <path d="M 65 43 L 64.2 48 Q 65 49 66.2 48" stroke="#d8a37b" strokeWidth="1.1" fill="none" strokeLinecap="round" />

            {/* Eyebrows */}
            <path
              d={`M 53 ${36 + browOffset} Q 57 ${34.2 + browOffset} 61 ${36 + browOffset}`}
              stroke="#271812"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 69 ${36 + browOffset} Q 73 ${34.2 + browOffset} 77 ${36 + browOffset}`}
              stroke="#271812"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Delicate thin-rim glasses */}
            <circle cx="57" cy="42.5" r="5.6" fill="rgba(255,255,255,0.12)" stroke="#78350f" strokeWidth="1.1" />
            <circle cx="73" cy="42.5" r="5.6" fill="rgba(255,255,255,0.12)" stroke="#78350f" strokeWidth="1.1" />
            <line x1="62.6" y1="42.5" x2="67.4" y2="42.5" stroke="#78350f" strokeWidth="1.1" />

            {/* Warm smile */}
            <path d={mouthPath} stroke="#9f1239" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Polished black leather shoes (Giày tây) */}
            <path d="M 44 192 Q 51 187 59 192 L 59 196 L 43 196 Z" fill="#1c1917" />
            <path d="M 71 192 Q 79 187 87 192 L 87 196 L 71 196 Z" fill="#1c1917" />

            {/* Tailored dark charcoal-navy pleated trousers (Quần tây âu) */}
            <path
              d="M 44 109 L 86 109 L 85 192 L 70 192 L 65 137 L 60 192 L 45 192 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <line x1="52.5" y1="114" x2="52.5" y2="189" stroke="#334155" strokeWidth="1" opacity="0.6" />
            <line x1="77.5" y1="114" x2="77.5" y2="189" stroke="#334155" strokeWidth="1" opacity="0.6" />

            {/* Belt & neat metal buckle */}
            <rect x="44" y="105" width="42" height="5" rx="1.5" fill="#1c1917" />
            <rect x="61.5" y="105.5" width="7" height="4" rx="1" fill="#d97706" />

            {/* Crisp Vietnamese male teacher dress shirt (Sơ mi sáng màu sơ vin gọn gàng) */}
            <path
              d="M 41 69 Q 52 65 65 65 Q 78 65 89 69 L 86 106 L 44 106 Z"
              fill="#eff6ff"
              stroke="#93c5fd"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            {/* Center button placket */}
            <line x1="65" y1="73" x2="65" y2="105" stroke="#bfdbfe" strokeWidth="1.1" />
            <circle cx="65" cy="83" r="0.9" fill="#64748b" />
            <circle cx="65" cy="91" r="0.9" fill="#64748b" />
            <circle cx="65" cy="99" r="0.9" fill="#64748b" />

            {/* Crisp shirt collar & classic Vietnamese teacher tie */}
            <path d="M 55 65 L 65 75 L 75 65" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.2" />
            <path d="M 62.5 71 L 67.5 71 L 68.5 96 L 65 101 L 61.5 96 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.8" />

            {/* Left shirt chest pocket with a clipped fountain pen */}
            <rect x="72" y="80" width="9.5" height="9" rx="1.5" fill="#e0f2fe" stroke="#93c5fd" strokeWidth="0.9" />
            <line x1="75.5" y1="76.5" x2="75.5" y2="83" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="75.5" cy="76.5" r="0.9" fill="#f59e0b" />

            {/* Left dress-shirt sleeve holding Sổ Chủ Nhiệm */}
            <path
              d="M 42 70 Q 30 94 36 115 L 44 113 Q 40 96 46 77 Z"
              fill="#eff6ff"
              stroke="#93c5fd"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <rect x="35.5" y="112" width="9" height="4" rx="1.5" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.8" />
            {/* Hardcover Sổ Chủ Nhiệm */}
            <rect x="26" y="106" width="14" height="19" rx="2" fill="#14532d" stroke="#052e16" strokeWidth="1.1" />
            <line x1="29" y1="107" x2="29" y2="124" stroke="#86efac" strokeWidth="1" opacity="0.6" />
            <circle cx="39.5" cy="117" r="4.3" fill="#f6cfa9" stroke="#d8a87e" strokeWidth="0.9" />

            {/* Right dress-shirt sleeve raised holding pointer */}
            <path
              d="M 88 70 Q 100 81 105 64 L 98 60 Q 94 74 85 67 Z"
              fill="#eff6ff"
              stroke="#93c5fd"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <rect x="98" y="59" width="8" height="4" rx="1.5" transform="rotate(24 102 61)" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.8" />
            <circle cx="104.5" cy="58" r="4.3" fill="#f6cfa9" stroke="#d8a87e" strokeWidth="0.9" />
            <line x1="105.5" y1="56" x2="120" y2="27" stroke="#92400e" strokeWidth="2.4" strokeLinecap="round" />

            {/* Neck */}
            <rect x="59.5" y="57" width="11" height="10" rx="4" fill="#eec09a" />
            <path d="M 59.5 59.5 Q 65 62.5 70.5 59.5" stroke="#d9a176" strokeWidth="1.4" fill="none" />

            {/* Ears */}
            <ellipse cx="45.5" cy="42" rx="3.1" ry="4.6" fill="#f6cfa9" stroke="#d8a87e" strokeWidth="1" />
            <ellipse cx="84.5" cy="42" rx="3.1" ry="4.6" fill="#f6cfa9" stroke="#d8a87e" strokeWidth="1" />

            {/* Head */}
            <path
              d="M 46 36 C 46 20 84 20 84 36 C 84 52 75 60 65 60 C 55 60 46 52 46 36 Z"
              fill="#fbd8ba"
              stroke="#dca980"
              strokeWidth="1.2"
            />

            {/* Neat Vietnamese side-parted hair */}
            <path
              d="M 43.5 39 C 42 10.5 88 10.5 86.5 39 L 83.5 42 C 83 34 78.5 30 71 30 C 64 30 58 32 53 28.5 C 48.5 30.5 46.5 34.5 46.5 42 Z"
              fill="#231610"
            />

            {/* Subtle warm blush */}
            <ellipse cx="52.5" cy="48" rx="3" ry="1.5" fill="#fda4af" opacity="0.28" />
            <ellipse cx="77.5" cy="48" rx="3" ry="1.5" fill="#fda4af" opacity="0.28" />

            {/* Eyes */}
            <ellipse cx="57" cy="42" rx="2.3" ry="2.4" fill="#1c1917" />
            <ellipse cx="73" cy="42" rx="2.3" ry="2.4" fill="#1c1917" />
            <circle cx="57.7" cy="41.2" r="0.8" fill="#ffffff" />
            <circle cx="73.7" cy="41.2" r="0.8" fill="#ffffff" />

            {/* Nose bridge */}
            <path d="M 65 42.5 L 64.2 47.5 Q 65 48.5 66.2 47.5" stroke="#d8a37b" strokeWidth="1.1" fill="none" strokeLinecap="round" />

            {/* Eyebrows */}
            <path
              d={`M 52.5 ${35.5 + browOffset} Q 57 ${33.8 + browOffset} 61.5 ${35.5 + browOffset}`}
              stroke="#231610"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 68.5 ${35.5 + browOffset} Q 73 ${33.8 + browOffset} 77.5 ${35.5 + browOffset}`}
              stroke="#231610"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />

            {/* Sleek half-rim rectangular glasses */}
            <rect
              x="50.8"
              y="37.5"
              width="12.2"
              height="8.8"
              rx="2"
              fill="rgba(255,255,255,0.14)"
              stroke="#334155"
              strokeWidth="1.3"
            />
            <rect
              x="67"
              y="37.5"
              width="12.2"
              height="8.8"
              rx="2"
              fill="rgba(255,255,255,0.14)"
              stroke="#334155"
              strokeWidth="1.3"
            />
            <line x1="63" y1="41.5" x2="67" y2="41.5" stroke="#334155" strokeWidth="1.3" />

            {/* Mouth */}
            <path d={mouthPath} stroke="#881337" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>

      {/* Teacher Nameplate */}
      {showNameplate && (
        <div className="mt-0.5 px-3 py-0.5 rounded-md bg-emerald-800 text-white text-xs font-semibold shadow-sm border border-emerald-600/50 whitespace-nowrap">
          {teacherName}
        </div>
      )}
    </div>
  );
};
