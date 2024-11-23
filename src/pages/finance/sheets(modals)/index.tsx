import React from "react";
import {
    Block,
    Preloader,
    Link,
    Sheet,
    Toolbar,
} from "konsta/react";

interface FinanceModalProps {
    isSheetOpen?: boolean;
    opened?: boolean;
    onBackdropClick: () => void;
    onClose: () => void;
    inputLabel?: string;
    onInputChange?: (value: string) => void;
    inTxn?: boolean;
    onButtonClick: () => void;
    buttonText?: string;
    inputDescription?: string | React.ReactNode;
}

const FinanceModal = ({
    isSheetOpen,
    opened,
    onBackdropClick,
    onClose,
    inputLabel,
    onInputChange,
    inTxn,
    onButtonClick,
    buttonText,
    inputDescription
}: FinanceModalProps) => {
    return (
        <Sheet className={`pb-safe  ${isSheetOpen ? 'relative max-w-md' : 'mb-5'}`} opened={opened} onBackdropClick={onBackdropClick}>
            <Toolbar top>
                <div className="left" />
                <div className="right">
                    <Link toolbar onClick={onClose}>
                        Close
                    </Link>
                </div>
            </Toolbar>
            <Block className="flex flex-col justify-center items-center h-full p-4">
                <div className="mb-5 w-full max-w-md">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{inputLabel}</label>
                    {inputDescription && typeof inputDescription === 'string' ?
                        <p className="text-xs mb-3 text-neutral-300">{inputDescription}</p> :
                         inputDescription 
                    }
                    <input onChange={(e) => onInputChange && onInputChange(e.target.value)} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="100" required />
                </div>
                {inTxn ? (
                    <Preloader className="center-item mt-3" />
                ) : (
                    <button onClick={onButtonClick} className="text-white  bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 font-medium  text-sm px-5 py-2.5 text-center">
                        {buttonText}
                    </button>
                )}
            </Block>
        </Sheet>
    );
};

export default FinanceModal;