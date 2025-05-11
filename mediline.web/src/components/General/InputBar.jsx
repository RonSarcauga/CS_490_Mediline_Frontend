import React, { useState, useRef } from "react";

//Omar's custom input bar for registration
export function InputBarReg({
    wrapperClass = "gap-3",
    customClass = "br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600",
    readonly = false,
    searchIcon = null,
    sendIcon = null,
    validationRegex = null,
    dataAnnotation = "",
    maxLength = null,
    inputType = "text",
    specialFormat = null,
    onValidationFail = null,
    value: externalValue,
    onChange,
    ...props
    }) {

    const normClass = "br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
    const errorClass = "br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600 b-err"
    const [display, setDisplay] = useState("");
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);

    // Masking logic: only show literals once user has typed into them
    const applySpecialFormat = (raw) => {
        if (!specialFormat) return raw;
        let out = "", ri = 0;
        for (let i = 0; i < specialFormat.length && ri < raw.length; i++) {
        if (specialFormat[i] === "X") {
            out += raw[ri++];
        } else if (ri > 0) {
            out += specialFormat[i];
        }
        }
        return out;
    };

    const handleChange = (e) => {
        let raw = e.target.value;
        // if a mask or number-only, strip nondigits
        if (specialFormat || inputType === "number") {
        raw = raw.replace(/\D/g, "");
        }
        // enforce maxLength on raw
        if (maxLength != null && raw.length > maxLength) {
        raw = raw.slice(0, maxLength);
        }

        const formatted = applySpecialFormat(raw);

        // validation (purely visual)
        if (validationRegex) {
        const regex = new RegExp(validationRegex, "i");
        const valid = regex.test(raw);
        setIsValid(valid);
        if (!valid && onValidationFail) onValidationFail(raw);
        } else {
        setIsValid(true);
        }

        setDisplay(formatted);
        onChange?.({ ...e, target: { ...e.target, value: formatted } });
    };

    // only turn border red when there's some input but it's invalid
    const showError = !isValid && (externalValue ?? display).length > 0;

    return (
        <div className={`input-bar ${normClass} full-width`}>
            {searchIcon && <div className="search-icon">{searchIcon}</div>}

            <div style={{ position: "relative", width: "100%" }}>
            <input
                {...props}
                ref={inputRef}
                type="text"
                inputMode={specialFormat || inputType === "number" ? "numeric" : "text"}
                value={externalValue ?? display}
                onChange={handleChange}
                readOnly={readonly}
                className={`${showError ? errorClass : normClass}`}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            />

            {showError && dataAnnotation && showTooltip && (
                <div
                style={{
                    position: "absolute",
                    top: "-2.2rem",
                    left: "0",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "6px 8px",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                }}
                >
                {dataAnnotation}
                </div>
            )}
            </div>

            {sendIcon && <div className="send-icon">{sendIcon}</div>}
        </div>
        );

}

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