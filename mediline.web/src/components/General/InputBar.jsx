import React, { useState, useRef } from "react";

{/* This is the base component for a search bar in our site */ }
export function InputBarSpecial({
    customClass = "",
    readonly = false,
    searchIcon = null,
    sendIcon = null,
    validationRegex = null, // Regular expression for validation
    dataAnnotation = "", // Annotation or error message
    maxLength = null, // Maximum input length
    inputType = "text", // Restrict input type (e.g., "number")
    specialFormat = null, // Special formatting rules
    onValidationFail = null, // Callback for validation failure
    ...attributes
}) {
    const baseClass = "input-bar";
    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef(null); // Ref to track the input element

    const applySpecialFormat = (inputValue) => {
        if (!specialFormat) return inputValue;

        if (typeof specialFormat === "function") {
            // Use a custom formatting function
            return specialFormat(inputValue);
        }

        // Use a predefined format string (e.g., "XX:XX")
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
        const cursorPosition = inputElement.selectionStart; // Track cursor position
        let rawValue = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters

        // Enforce input type restrictions
        if (inputType === "number" && isNaN(rawValue)) {
            return; // Ignore non-numeric input
        }

        // Enforce maxLength restriction
        if (maxLength && rawValue.length > maxLength) {
            rawValue = rawValue.slice(0, maxLength);
        }

        // Apply special formatting
        const formattedValue = applySpecialFormat(rawValue);

        // Validate input against the regex if provided
        if (validationRegex) {
            const regex = new RegExp(validationRegex);
            const valid = regex.test(rawValue);
            setIsValid(valid);

            if (!valid && onValidationFail) {
                onValidationFail(rawValue); // Trigger callback on validation failure
            }
        }

        setValue(formattedValue);

        // Adjust cursor position after formatting
        setTimeout(() => {
            const newCursorPosition = calculateCursorPosition(
                cursorPosition,
                formattedValue
            );
            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };

    const calculateCursorPosition = (cursorPosition, formattedValue) => {
        // Adjust cursor position to skip over special characters
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
            {/* Search icon */}
            <div
                className="search-icon"
                style={{
                    visibility: searchIcon ? "visible" : "hidden",
                    width: searchIcon ? "auto" : "0",
                }}
            >
                {searchIcon}
            </div>

            {/* Input field */}
            <input
                {...attributes}
                ref={inputRef}
                type={specialFormat ? "text" : inputType} // Use "text" if specialFormat is applied
                value={value}
                onChange={handleInputChange}
                readOnly={readonly}
                className={isValid ? "" : "input-error"} // Add error class if invalid
            />

            {/* Send icon */}
            <div
                className="send-icon"
                style={{
                    visibility: sendIcon ? "visible" : "hidden",
                    width: sendIcon ? "auto" : "0",
                }}
            >
                {sendIcon}
            </div>

            {/* Data annotation */}
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
