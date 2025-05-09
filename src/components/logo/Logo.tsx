import { zumjiLogo } from '@/constants/images';
import Image from 'next/image';
import React from 'react';

interface ZumjiLogoProps {
    width?: number;
    height?: number;
    className?: string;
}
const ZumjiLogo = ({ width = 60, height = 60, className }: ZumjiLogoProps) => {
    return (
        <div>
            <Image
                src={zumjiLogo}
                width={width}
                height={height}
                alt="logo"
                className={className}
            />
        </div>
    );
};

export default ZumjiLogo;