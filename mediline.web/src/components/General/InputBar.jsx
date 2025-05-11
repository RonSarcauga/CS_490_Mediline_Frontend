import React, { useState, useRef, useEffect } from "react";
import BaseIcon from "./BaseIcon";

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
    onValidChange = null,
    value: externalValue,
    onChange,
    ...props
}) {
    const normClass = "br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600";
    const errorClass = "br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600 b-err";
    const [display, setDisplay] = useState("");
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (externalValue && externalValue !== display) {
            setDisplay(externalValue);
        }
    }, [externalValue]);

    useEffect(() => {
        if (!validationRegex) return;

        const compiledRegex =
            validationRegex instanceof RegExp
                ? validationRegex
                : new RegExp(validationRegex, "i");

        const valueToTest = (externalValue ?? display) || "";
        const valid = compiledRegex.test(valueToTest);

        if (valid !== isValid) {
            setIsValid(valid);
            onValidChange?.(valid);
        }
    }, [validationRegex, externalValue, display]);


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
        if (specialFormat || inputType === "number") {
            raw = raw.replace(/\D/g, "");
        }
        if (maxLength != null && raw.length > maxLength) {
            raw = raw.slice(0, maxLength);
        }

        const formatted = applySpecialFormat(raw);

        if (validationRegex) {
            const compiledRegex =
                validationRegex instanceof RegExp
                    ? validationRegex
                    : new RegExp(validationRegex, "i");

            const valid = compiledRegex.test(formatted);
            setIsValid(valid);
            onValidChange?.(valid);
            if (!valid && onValidationFail) onValidationFail(raw);
        } else {
            setIsValid(true);
        }

        setDisplay(formatted);
        onChange?.({ ...e, target: { ...e.target, value: formatted } });
    };

    const showError = !isValid && display.length > 0;

    return (
        <div className={`input-bar ${customClass || normClass} full-width`}>
            {searchIcon && <div className="search-icon">{searchIcon}</div>}

            <div style={{ position: "relative", width: "100%" }}>
                <input
                    {...props}
                    ref={inputRef}
                    type={inputType === "password" && !showPassword ? "password" : "text"}
                    inputMode={specialFormat || inputType === "number" ? "numeric" : "text"}
                    value={display}
                    onChange={handleChange}
                    readOnly={readonly}
                    className={`${showError ? errorClass : (customClass || normClass)}`}
                    onFocus={() => setShowTooltip(true)}
                    onBlur={() => setShowTooltip(false)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                />
                {inputType === "password" && (
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                        position: "absolute",
                        right: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        zIndex: 5
                        }}
                    >
                        {showPassword ? 
                            <BaseIcon
                            height={20}
                            width={20}
                            fillColor='none'>
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m2.999 3 18 18M9.843 9.914a3 3 0 0 0 4.265 4.22M6.5 6.646A10.02 10.02 0 0 0 2.457 12c1.274 4.057 5.065 7 9.542 7 1.99 0 3.842-.58 5.4-1.582m-6.4-12.369q.494-.049 1-.049c4.478 0 8.268 2.943 9.542 7a10 10 0 0 1-1.189 2.5"
                                ></path>
                            </BaseIcon>
                        : 
                            <BaseIcon
                            height={20}
                            width={20}
                            fillColor='none'>
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                                ></path>
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7"
                                ></path>
                            </BaseIcon>
                        }
                    </div>
                )}
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

//export default function InputBar({
//    customClass = "",
//    readOnly,
//    readonly = false,
//    searchIcon = null,
//    sendIcon = null,
//    ...attributes
//})
//{
//    const baseClass = "input-bar";

//    // Prioritize the camelCase version if provided, otherwise fallback to lowercase readonly
//    const isReadOnly = typeof readOnly !== "undefined" ? readOnly : readonly;

//    return (
//        <div className={`${baseClass} ${customClass}`}>
//            {/* Search icon */}
//            <div
//                className="search-icon"
//                style={{
//                    visibility: searchIcon ? "visible" : "hidden",
//                    width: searchIcon ? "auto" : "0",
//                }}
//            >
//                {searchIcon}
//            </div>
//            {/* Input field */}
//            <input {...attributes} readOnly={!!isReadOnly} />
//            {/* Send icon */}
//            <div
//                className="send-icon"
//                style={{
//                    visibility: sendIcon ? "visible" : "hidden",
//                    width: sendIcon ? "auto" : "0",
//                }}
//            >
//                {sendIcon}
//            </div>
//        </div>
//    );

    export default function InputBar({
        customClass = "",
        readOnly = false, // Use proper React naming
        readonly = false,
        searchIcon = null,
        sendIcon = null,
        multiline = false, // New prop to toggle between input and textarea
        rows = 5,          // Default rows for textarea
        ...attributes
    }) {
        const baseClass = "input-bar";

        // The field can either be an input or textarea based on the multiline flag.
        const FieldElement = multiline ? "textarea" : "input";

        // Prioritize the camelCase version if provided, otherwise fallback to lowercase readonly
        const isReadOnly = typeof readOnly !== "undefined" ? readOnly : readonly;

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
                {/* Render text field */}
                {multiline ? (
                    <textarea
                        {...attributes}
                        readOnly={!!isReadOnly}
                        rows={rows} // allow customization of the height
                    />
                ) : (
                    <input {...attributes} readOnly={!!isReadOnly} />
                )}
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
            </div>
        );
}
export function CustomTextArea({
    customClass = "",
    style = {},
    ...props
}) {
    // Default style reset: removes browser-specific appearance, outlines, borders, etc.
    const defaultStyle = {
        // Removes native styling on most browsers
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        // Remove borders and outlines
        border: "none",
        outline: "none",
        // Remove any background styling
        background: "transparent",
        // Optionally reset padding/margin if desired
        padding: 0,
        margin: 0,
    };

    return (
        <textarea
            {...props}
            className={customClass}
            style={{ ...defaultStyle, ...style }}
        />
    );
}
