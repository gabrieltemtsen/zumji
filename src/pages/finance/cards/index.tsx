import React from 'react';

interface FinanceCards {
    title: string;
    leftButtonTitle: string;
    rightButtonTitle: string;
    amount: number;
    currency: string;
    onLeftButtonClick: () => void;
    onRightButtonClick: () => void;
    leftButtonIcon: React.ReactNode;
    rightButtonIcon: React.ReactNode;
}

const FinanceCards = ({
    title,
    amount,
    currency,
    leftButtonIcon: LeftIcon,
    rightButtonIcon: RightIcon,
    onLeftButtonClick,
    onRightButtonClick,
    leftButtonTitle,
    rightButtonTitle
}: FinanceCards) => {
    return (
        <div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow ">
            <a href="#">
                <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">{title}</h5>
            </a>
            <h1 className="flex flex-wrap sm:text-lg md:text-3xl gap-1">
                <span className="font-bold text-white">{amount}</span>
                <span className="font-medium text-gray-400">{currency}</span>
            </h1>
            <div className="flex gap-2">
                <a href="#" onClick={onLeftButtonClick} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                    {LeftIcon}
                    {leftButtonTitle}
                </a>
                <a href="#" onClick={onRightButtonClick} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
                    {RightIcon}
                    {rightButtonTitle}
                </a>
            </div>
        </div>
    );
};

export default FinanceCards;