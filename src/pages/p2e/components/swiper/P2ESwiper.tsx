import AnimateFromBottom from "@/animation/animate-from-bottom";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Ensure Swiper styles are imported
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const RatingStars = ({ rating }: { rating: number; }) => {
    return (
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} color={index < rating ? "yellow" : "gray"} />
            ))}
        </div>
    );
};

const ProductCard = ({
    title,
    price,
    rating,
    href,
}: {
    title: string;
    price: number;
    rating: number;
    href: string;
}) => {
    return (
        <div className="w-full max-w-sm border rounded-lg shadow-lg bg-gray-800 border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="px-5 pb-5">
                <a href={href}>
                    <h5 className="text-xl font-semibold tracking-tight p-5 text-white hover:underline">
                        {title}
                    </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <RatingStars rating={rating} />
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-3">
                        {rating}.0
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">${price}</span>
                    <a
                        href={href}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Go To
                    </a>
                </div>
            </div>
        </div>
    );
};

const P2ESwiper = () => {
    const products = [
        { title: "Advertise Products Here", price: 599, rating: 5, href: "#" },
        { title: "Best Deals on Electronics", price: 299, rating: 4, href: "#" },
        { title: "Limited Time Offer!", price: 799, rating: 5, href: "#" },
        { title: "Get our coupons!", price: 800, rating: 5, href: "#" },
    ];

    return (
        <AnimateFromBottom>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard
                            title={product.title}
                            price={product.price}
                            rating={product.rating}
                            href={product.href}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </AnimateFromBottom>
    );
};

export default P2ESwiper;
