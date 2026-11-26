import React from 'react';
import { FloatingStatPopup, Student } from '../types/game';
import { MAX_STAT, WARNING_THRESHOLD } from '../data/students';

interface StudentDeskProps {
  student: Student;
  isInvolved: boolean;
  isSelected: boolean;
  popups: FloatingStatPopup[];
  onSelect: (studentId: string) => void;
}

export const StudentDesk: React.FC<StudentDeskProps> = ({
  student,
  isInvolved,
  isSelected,
  popups,
  onSelect,
}) => {
  const isTransferred = student.status === 'transferred';
  const isAtRisk = !isTransferred && student.affection <= WARNING_THRESHOLD;

  const formatDelta = (label: string, val?: number) => {
    if (!val) return null;
    const sign = val > 0 ? '+' : '';
    return `${sign}${val} ${label}`;
  };

  const isTroublemaker = student.role === 'Học sinh cá biệt';

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating stat delta popups (stacked vertically) */}
      <div className="pointer-events-none absolute -top-1 -translate-y-full left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0.5 w-max">
        {popups.map((popup) => {
          const items = [
            { text: formatDelta('Yêu thích', popup.deltas.affection), val: popup.deltas.affection ?? 0 },
            { text: formatDelta('Tâm trạng', popup.deltas.mood), val: popup.deltas.mood ?? 0 },
            { text: formatDelta('Học lực', popup.deltas.academic), val: popup.deltas.academic ?? 0 },
          ].filter((x) => x.text !== null);

          return (
            <div
              key={popup.id}
              className="flex flex-col items-center gap-0.5 animate-[bounce_0.8s_ease-out_1]"
            >
              {items.map((item, idx) => (
                <span
                  key={idx}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm border tabular-nums whitespace-nowrap ${
                    item.val > 0
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-rose-600 text-white border-rose-400'
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onSelect(student.id)}
        aria-label={`Xem thông số học sinh ${student.name}${isTroublemaker ? ' (Học sinh cá biệt)' : ''}${isTransferred ? ' (Đã chuyển lớp)' : ''}`}
        title={isTroublemaker ? `${student.name} — Học sinh cá biệt` : student.name}
        className={`group relative flex flex-col items-center w-full rounded-xl px-2 pt-1.5 pb-1 transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
          isTransferred
            ? 'opacity-55 cursor-pointer hover:opacity-75'
            : 'cursor-pointer hover:-translate-y-0.5 active:translate-y-0'
        } ${
          isSelected
            ? 'ring-2 ring-amber-500 bg-amber-100/70'
            : isInvolved && !isTransferred
              ? 'ring-2 ring-emerald-600/80 bg-emerald-50/70'
              : 'hover:bg-white/40'
        }`}
      >
        {/* Nameplate above student */}
        <div
          className={`relative z-10 flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold shadow-xs border max-w-full transition-colors ${
            isTransferred
              ? 'bg-stone-200 text-stone-600 border-stone-300 line-through'
              : isAtRisk
                ? 'bg-rose-600 text-white border-rose-700'
                : isInvolved
                  ? 'bg-emerald-700 text-white border-emerald-800'
                  : isTroublemaker
                    ? 'bg-amber-900/95 text-amber-100 border-amber-600/80 group-hover:bg-amber-950'
                    : 'bg-stone-800/90 text-amber-50 border-stone-700 group-hover:bg-stone-900'
          }`}
        >
          <span className="truncate">{student.name}</span>
          {isAtRisk && (
            <span className="shrink-0 font-mono text-[10px] bg-rose-800/90 px-1 rounded" title="Yêu thích thấp — Nguy cơ chuyển lớp">
              !
            </span>
          )}
        </div>

        {/* Desk + Neat Uniformed Student SVG */}
        <div className="relative w-full flex flex-col items-center mt-0.5">
          <svg
            viewBox="0 0 120 78"
            className="w-20 sm:w-24 h-auto overflow-visible"
            aria-hidden="true"
          >
            {/* Desk surface */}
            <rect x="8" y="45" width="104" height="22" rx="3.5" fill="#d99a4e" stroke="#8a5219" strokeWidth="1.5" />
            <rect x="10" y="45" width="100" height="4.5" rx="2" fill="#eab872" />
            {/* Desk legs */}
            <rect x="14" y="67" width="8" height="8" rx="1.5" fill="#7c4714" />
            <rect x="98" y="67" width="8" height="8" rx="1.5" fill="#7c4714" />

            {/* Neat open notebook & textbook on desk */}
            <rect x="28" y="48" width="28" height="13" rx="1.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="42" y1="48" x2="42" y2="61" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="31" y1="52" x2="39" y2="52" stroke="#e2e8f0" strokeWidth="0.9" />
            <line x1="31" y1="55.5" x2="39" y2="55.5" stroke="#e2e8f0" strokeWidth="0.9" />
            <line x1="45" y1="52" x2="53" y2="52" stroke="#e2e8f0" strokeWidth="0.9" />
            <rect x="64" y="49" width="18" height="10" rx="1.5" fill={student.avatar.shirtAccent} opacity="0.85" />
            <rect x="66" y="51" width="14" height="2" rx="1" fill="rgba(255,255,255,0.45)" />

            {!isTransferred ? (
              <g>
                {/* Neat school backpack tucked on side of chair */}
                <rect
                  x="80"
                  y="40"
                  width="14"
                  height="20"
                  rx="4"
                  fill={student.avatar.bagColor}
                  stroke="#334155"
                  strokeWidth="1"
                />
                <rect x="82" y="43" width="10" height="4" rx="1.5" fill="rgba(255,255,255,0.25)" />

                {/* Neat wooden chair back behind student */}
                <rect x="38" y="38" width="44" height="19" rx="4" fill="#b7793a" stroke="#7c4714" strokeWidth="1.1" />

                {/* Crisp white school uniform shirt & tidy shoulders */}
                <path
                  d="M 33 55 C 34 38 43 34 60 34 C 77 34 86 38 87 55 Z"
                  fill="#ffffff"
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                {/* Shirt collar flaps */}
                <path d="M 48 34 L 54 39 L 60 35 L 66 39 L 72 34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

                {/* Red scarf (Khăn quàng đỏ) neatly folded */}
                {student.avatar.redScarf && (
                  <g>
                    <path
                      d="M 45 35 L 60 47 L 75 35 Q 60 39 45 35 Z"
                      fill="#dc2626"
                      stroke="#991b1b"
                      strokeWidth="0.9"
                      strokeLinejoin="round"
                    />
                    <circle cx="60" cy="40.5" r="2.2" fill="#b91c1c" />
                  </g>
                )}

                {/* Raised hand if involved in current situation */}
                {isInvolved && (
                  <g>
                    <path
                      d="M 83 45 Q 94 31 92 17"
                      stroke="#ffffff"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 83 45 Q 94 31 92 17"
                      stroke="#94a3b8"
                      strokeWidth="1"
                      fill="none"
                    />
                    <circle cx="92" cy="15" r="3.6" fill="#fbd2b1" stroke="#d9a074" strokeWidth="0.8" />
                  </g>
                )}

                {/* Neck connecting cleanly */}
                <rect x="55.5" y="29" width="9" height="7" rx="3" fill="#f1c39f" />

                {/* Subtle ears */}
                <circle cx="45.5" cy="22" r="2.6" fill="#f7cea9" stroke="#d9a074" strokeWidth="0.8" />
                <circle cx="74.5" cy="22" r="2.6" fill="#f7cea9" stroke="#d9a074" strokeWidth="0.8" />

                {/* Head */}
                <circle
                  cx="60"
                  cy="21"
                  r="14"
                  fill="#fbd2b1"
                  stroke="#d9a074"
                  strokeWidth="1"
                />

                {/* Tidy, well-groomed hairstyles covering full crown */}
                {student.avatar.hairStyle === 'bob' && (
                  <g>
                    <path
                      d="M 43.5 24 C 43.5 -0.5 76.5 -0.5 76.5 24 L 75 34 Q 71.5 34.5 70.5 25.5 Q 65 20.5 60 20.5 Q 55 20.5 49.5 25.5 Q 48.5 34.5 45 34 Z"
                      fill={student.avatar.hairColor}
                    />
                  </g>
                )}
                {student.avatar.hairStyle === 'ponytail' && (
                  <g>
                    <path
                      d="M 71 14 Q 82 14 82 27 Q 79 33 74 28 Q 74 21 71 18 Z"
                      fill={student.avatar.hairColor}
                    />
                    <path
                      d="M 44 23 C 44 -0.5 76 -0.5 76 23 Q 68 19.5 60 21 Q 52 19.5 44 23 Z"
                      fill={student.avatar.hairColor}
                    />
                    <circle cx="74" cy="16.5" r="2.5" fill={student.avatar.shirtAccent} />
                  </g>
                )}
                {student.avatar.hairStyle === 'pigtails' && (
                  <g>
                    <circle cx="43" cy="24.5" r="5.5" fill={student.avatar.hairColor} />
                    <circle cx="77" cy="24.5" r="5.5" fill={student.avatar.hairColor} />
                    <path
                      d="M 44 23 C 44 -0.5 76 -0.5 76 23 Q 68 19.5 60 21 Q 52 19.5 44 23 Z"
                      fill={student.avatar.hairColor}
                    />
                    <circle cx="46" cy="21.5" r="2" fill="#f59e0b" />
                    <circle cx="74" cy="21.5" r="2" fill="#f59e0b" />
                  </g>
                )}
                {student.avatar.hairStyle === 'short' && (
                  <g>
                    <path
                      d="M 44 23.5 C 44 -0.5 76 -0.5 76 23.5 Q 68 19 60 21.5 Q 52 19 44 23.5 Z"
                      fill={student.avatar.hairColor}
                    />
                  </g>
                )}
                {student.avatar.hairStyle === 'spiky' && (
                  <g>
                    <path
                      d="M 44 23.5 C 44 -1 76 -1 76 23.5 L 71 19.5 L 67 23.5 L 62.5 18.5 L 58 24 L 53.5 19 L 49 23.5 Z"
                      fill={student.avatar.hairColor}
                    />
                    <path
                      d="M 52 7 L 55.5 2 L 59.5 6 L 63.5 1.5 L 67.5 6.5"
                      fill={student.avatar.hairColor}
                    />
                  </g>
                )}
                {student.avatar.hairStyle === 'parted' && (
                  <g>
                    <path
                      d="M 44 23 C 44 -0.5 76 -0.5 76 23 Q 66.5 19 61 17.5 Q 54.5 21.5 44 23 Z"
                      fill={student.avatar.hairColor}
                    />
                  </g>
                )}

                {/* Neat Accessories (Ribbon, Headband, Glasses) */}
                {student.avatar.accessory === 'ribbon' && (
                  <path d="M 54 11.5 L 60 14.5 L 66 11.5 L 64 16.5 L 56 16.5 Z" fill="#f43f5e" />
                )}
                {student.avatar.accessory === 'headband' && (
                  <path
                    d="M 46.5 17.5 Q 60 10.5 73.5 17.5"
                    stroke="#e11d48"
                    strokeWidth="2.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                )}
                {student.avatar.accessory === 'glasses' && (
                  <g opacity="0.85">
                    <line x1="44" y1="20.5" x2="48" y2="20.5" stroke="#475569" strokeWidth="1.5" />
                    <line x1="72" y1="20.5" x2="76" y2="20.5" stroke="#475569" strokeWidth="1.5" />
                  </g>
                )}
              </g>
            ) : (
              /* Empty chair if student transferred */
              <g>
                <rect x="42" y="38" width="36" height="18" rx="4" fill="#b47a3c" stroke="#78481a" strokeWidth="1.2" />
                <text x="60" y="50" textAnchor="middle" fontSize="8" fill="#fef3c7" fontWeight="600">
                  Trống
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Classic compact affection bar beneath desk */}
        {!isTransferred && (
          <div className="w-16 sm:w-20 h-1.5 rounded-full bg-stone-900/15 overflow-hidden mt-0.5">
            <div
              className={`h-full transition-all duration-300 ${
                student.affection <= WARNING_THRESHOLD
                  ? 'bg-rose-500'
                  : student.affection >= 700
                    ? 'bg-emerald-500'
                    : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(100, (student.affection / MAX_STAT) * 100)}%` }}
            />
          </div>
        )}
      </button>
    </div>
  );
};

