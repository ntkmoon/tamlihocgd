import React from 'react';
import { StaffCharacter } from '../types/game';

interface StaffAvatarProps {
  staff: StaffCharacter;
  size?: 'xs' | 'sm' | 'md';
}

export const StaffAvatar: React.FC<StaffAvatarProps> = ({ staff, size = 'sm' }) => {
  const isPrincipal = staff.tier === 'principal';
  const dim = size === 'xs' ? 'w-9 h-9' : size === 'sm' ? 'w-12 h-12' : 'w-16 h-16';

  return (
    <svg
      viewBox="0 0 96 96"
      className={`${dim} shrink-0 rounded-xl border ${
        isPrincipal ? 'border-amber-400/90 shadow-xs' : 'border-emerald-300/80'
      }`}
      aria-hidden="true"
    >
      {/* Clean portrait background */}
      <rect
        x="0"
        y="0"
        width="96"
        height="96"
        rx="12"
        fill={isPrincipal ? '#fdf6e7' : '#eff8f4'}
      />
      <circle
        cx="48"
        cy="42"
        r="34"
        fill={isPrincipal ? '#fef3c7' : '#dcfce7'}
        opacity="0.55"
      />

      {/* Female back hair / low bun */}
      {staff.gender === 'female' && (
        <g>
          <ellipse cx="48" cy="46" rx="20" ry="20" fill={staff.hairColor} />
          <circle cx="48" cy="60" r="10.5" fill={staff.hairColor} />
        </g>
      )}

      {/* Tailored Suit Jacket / Cardigan Shoulders */}
      <path
        d="M 14 96 C 14 70 28 65 48 65 C 68 65 82 70 82 96 Z"
        fill={staff.shirtColor}
      />

      {/* Crisp White Dress Shirt & Collar */}
      <path d="M 36 65 L 48 84 L 60 65 Z" fill="#ffffff" />
      <path d="M 38 65 L 44 74 L 48 68 L 52 74 L 58 65" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

      {/* Lapels for formal blazer look */}
      <path d="M 35 65 L 43 86 L 32 80 Z" fill="rgba(0,0,0,0.18)" />
      <path d="M 61 65 L 53 86 L 64 80 Z" fill="rgba(0,0,0,0.18)" />

      {/* Tie for Male or Silk Collar Pin / Brooch for Female */}
      {staff.gender === 'male' ? (
        <path
          d="M 45.5 69 L 50.5 69 L 51.5 89 L 48 94 L 44.5 89 Z"
          fill={isPrincipal ? '#991b1b' : '#0369a1'}
        />
      ) : (
        <g>
          <path
            d="M 41 70 Q 48 76 55 70"
            stroke={isPrincipal ? '#d97706' : '#e11d48'}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="48" cy="73.5" r="2.2" fill="#fef3c7" stroke="#b45309" strokeWidth="0.8" />
        </g>
      )}

      {/* Principal Gold Emblem Pin */}
      {isPrincipal && (
        <circle cx="65" cy="79" r="3.2" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
      )}

      {/* Neck with soft shadow */}
      <rect x="42" y="54" width="12" height="14" rx="5" fill="#f5cca8" />
      <path d="M 42 57 Q 48 61 54 57" stroke="#dca87d" strokeWidth="1.5" fill="none" />

      {/* Ears */}
      <ellipse cx="30" cy="42" rx="3.2" ry="5" fill="#f7cfa9" stroke="#dcb089" strokeWidth="0.9" />
      <ellipse cx="66" cy="42" rx="3.2" ry="5" fill="#f7cfa9" stroke="#dcb089" strokeWidth="0.9" />

      {/* Face */}
      <path
        d="M 31 38 C 31 20 65 20 65 38 C 65 54 57 60 48 60 C 39 60 31 54 31 38 Z"
        fill="#fde0c6"
        stroke="#e2b48d"
        strokeWidth="1"
      />

      {/* Layered Hair Top */}
      {staff.gender === 'female' ? (
        <>
          <path
            d="M 28.5 40 C 27.5 11 68.5 11 67.5 40 C 63.5 32 57 29.5 49.5 31 C 43 32 38 28.5 34.5 30.5 C 31.5 32.5 29.5 36.5 28.5 40 Z"
            fill={staff.hairColor}
          />
          <path d="M 30 37 Q 29 46 31 53" stroke={staff.hairColor} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 66 37 Q 67 46 65 53" stroke={staff.hairColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <path
          d="M 28.5 39 C 27.5 10.5 68.5 10.5 67.5 39 L 64.5 42 C 64 34 60 30 53.5 30 C 47.5 30 43 31.8 39 28.5 C 35 30.5 32 34.5 31.5 42 Z"
          fill={staff.hairColor}
        />
      )}

      {/* Eyebrows */}
      <path
        d="M 36.5 35.5 Q 40 34 43.5 35.5"
        stroke="#292524"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 52.5 35.5 Q 56 34 59.5 35.5"
        stroke="#292524"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Expressive Eyes */}
      <ellipse cx="40.2" cy="41.5" rx="2.1" ry="2.2" fill="#1c1917" />
      <ellipse cx="55.8" cy="41.5" rx="2.1" ry="2.2" fill="#1c1917" />
      <circle cx="40.9" cy="40.8" r="0.75" fill="#ffffff" />
      <circle cx="56.5" cy="40.8" r="0.75" fill="#ffffff" />

      {/* Subtle Nose Bridge */}
      <path d="M 48 42 L 47.4 47 Q 48 48 49.2 47" stroke="#d9a379" strokeWidth="1.1" fill="none" strokeLinecap="round" />

      {/* Refined Glasses */}
      {staff.glasses && (
        <g stroke="#334155" strokeWidth="1.3" fill="rgba(255,255,255,0.12)">
          <rect x="34.5" y="37.8" width="11.2" height="7.6" rx="2" />
          <rect x="50.3" y="37.8" width="11.2" height="7.6" rx="2" />
          <line x1="45.7" y1="41.2" x2="50.3" y2="41.2" />
        </g>
      )}

      {/* Composed Warm Expression */}
      <path
        d={isPrincipal ? 'M 43 52 Q 48 54.5 53 52' : 'M 42.5 51.5 Q 48 55.2 53.5 51.5'}
        stroke="#9a3412"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

