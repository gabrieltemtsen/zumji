import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = () => {
    return (
        <div className="flex items-center justify-center mt-20 animate-spin">
            <DotLottieReact
                src="https://lottie.host/783d36c7-cc12-4348-85d7-74eea2f2560c/Lo5F8kIq5v.lottie"
                loop
                autoplay
                style={{ width: "400px", height: "400px" }}
            />
        </div>
    );
};

export default LottieAnimation;