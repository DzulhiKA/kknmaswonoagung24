import React from 'react';
import Image from 'next/image';
import logoImg from '../assets/images/kkn_mas_24_logo_1785997063421.jpg';

interface KknLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const KknLogo: React.FC<KknLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white p-0.5 shadow-md border border-emerald-400/40 ${sizeClasses[size]} ${className}`}
    >
      <Image
        src={logoImg}
        alt="Logo KKN MAS Kelompok 24 Desa Wonoagung"
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
};
