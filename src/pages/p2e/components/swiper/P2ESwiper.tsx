import AnimateFromBottom from "@/animation/animate-from-bottom";
import { FaHandHoldingUsd, FaStar } from "react-icons/fa";
import CustomButton from "@/components/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";

const P2ESwiper = () => {
    return (
        <AnimateFromBottom>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
            >
                <SwiperSlide>
                    <div className="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
                        <div className="px-5 pb-5">
                            <a href="#">
                                <h5 className="text-xl font-semibold tracking-tight p-5 text-white">
                                    Advertise Products Here
                                </h5>
                            </a>
                            <div className="flex items-center mt-2.5 mb-5">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                    <FaStar color="yellow" />
                                    <FaStar color="yellow" />
                                    <FaStar color="yellow" />
                                    <FaStar color="yellow" />
                                    <FaStar color="yellow" />
                                </div>
                                <span className="bg-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-3">
                                    5.0
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-white">$599</span>
                                <a
                                    href="#"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Go To
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                </SwiperSlide>
            </Swiper>
        </AnimateFromBottom>
    );
};

export default P2ESwiper;