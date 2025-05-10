import React, { useState, useRef } from "react";

{/* This is the base component for a search bar in our site */ }
export function InputBarSpecial({
    customClass = "",
    readonly = false,
    searchIcon = null,
    sendIcon = null,
    validationRegex = null,
    dataAnnotation = "",
    maxLength = null,
    inputType = "text",
    specialFormat = null,
    onValidationFail = null,
    ...attributes
}) {
    const baseClass = "input-bar";
    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef(null);

    const applySpecialFormat = (inputValue) => {
        if (!specialFormat) return inputValue;

        if (typeof specialFormat === "function") {
            return specialFormat(inputValue);
        }

        let formattedValue = "";
        let rawIndex = 0;

        for (let i = 0; i < specialFormat.length; i++) {
            if (specialFormat[i] === "X") {
                if (rawIndex < inputValue.length) {
                    formattedValue += inputValue[rawIndex];
                    rawIndex++;
                }
            } else {
                formattedValue += specialFormat[i];
            }
        }

        return formattedValue;
    };

    const handleInputChange = (e) => {
        const inputElement = e.target;
        const cursorPosition = inputElement.selectionStart;
        let rawValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");

        if (inputType === "number" && isNaN(rawValue)) {
            return;
        }

        if (maxLength && rawValue.length > maxLength) {
            rawValue = rawValue.slice(0, maxLength);
        }

        const formattedValue = applySpecialFormat(rawValue);

        if (validationRegex) {
            const regex = new RegExp(validationRegex);
            const valid = regex.test(rawValue);
            setIsValid(valid);

            if (!valid && onValidationFail) {
                onValidationFail(rawValue);
            }
        }

        setValue(formattedValue);

        if (attributes.onChange) {
            attributes.onChange({
                ...e,
                target: { ...e.target, value: formattedValue },
            });
        }

        setTimeout(() => {
            const newCursorPosition = calculateCursorPosition(
                cursorPosition,
                formattedValue
            );
            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };

    const calculateCursorPosition = (cursorPosition, formattedValue) => {
        let adjustedPosition = cursorPosition;
        for (let i = 0; i < cursorPosition; i++) {
            if (specialFormat && specialFormat[i] && specialFormat[i] !== "X") {
                adjustedPosition++;
            }
        }
        return Math.min(adjustedPosition, formattedValue.length);
    };

    return (
        <div className={`${baseClass} ${customClass}`}>
            <div
                className="search-icon"
                style={{
                    visibility: searchIcon ? "visible" : "hidden",
                    width: searchIcon ? "auto" : "0",
                }}
            >
                {searchIcon}
            </div>
            <input
                {...attributes}
                ref={inputRef}
                type={specialFormat ? "text" : inputType}
                value={attributes.value !== undefined ? attributes.value : value}
                onChange={handleInputChange}
                readOnly={readonly}
                className={isValid ? "" : "input-error"}
            />
            <div
                className="send-icon"
                style={{
                    visibility: sendIcon ? "visible" : "hidden",
                    width: sendIcon ? "auto" : "0",
                }}
            >
                {sendIcon}
            </div>
            {dataAnnotation && (
                <div className={`data-annotation ${isValid ? "" : "error"}`}>
                    {isValid ? dataAnnotation : "Invalid input"}
                </div>
            )}
        </div>
    );
}

export default function InputBar({
    customClass = "",
    readonly = false,
    searchIcon = null,
    sendIcon = null,
    ...attributes
})
{
    const baseClass = 'input-bar';

    return (
        <div className={`${baseClass} ${customClass}`}>
            {/* Search icon */}
            <div className="search-icon" style={{ visibility : searchIcon ? 'visible' : 'hidden', width: searchIcon ? 'auto' : '0'}}>
                {searchIcon}
            </div>
            {/* Input field for the search bar */ }
            <input
                {...attributes}
                readOnly={readonly}
            />
            {/* Send icon */}
            <div className="send-icon" style={{ visibility: sendIcon ? 'visible' : 'hidden', width: sendIcon ? 'auto' : '0' }}>
                {sendIcon}
            </div>
        </div>
    );
}
