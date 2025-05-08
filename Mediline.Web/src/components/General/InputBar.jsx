import React, { useState } from "react";

{/* This is the base component for a search bar in our site */ }
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

//export default function InputBar({
//    customClass = "",
//    readonly = false,
//    searchIcon = null,
//    sendIcon = null,
//    regexPattern = "^[a-zA-Z0-9]{8}$",  // Default regex for alphanumeric input
//    errorMessage = "Input must be at least have a length of 8 alphanumeric characters.",
//    ...attributes
//}) {
//    const baseClass = "input-bar";
//    const [value, setValue] = useState("");
//    const [isValid, setIsValid] = useState(true);

//    const handleChange = (e) => {
//        const inputValue = e.target.value;
//        setValue(inputValue);
//        setIsValid(new RegExp(regexPattern).test(inputValue));
//    };

//    return (
//        <div className={`${baseClass} ${customClass} ${isValid ? "" : "invalid-input"}`}>
//            {/* Search Icon */}
//            <div className="search-icon" style={{ visibility: searchIcon ? "visible" : "hidden", width: searchIcon ? "auto" : "0" }}>
//                {searchIcon}
//            </div>

//            {/* Input Field */}
//            <input
//                {...attributes}
//                value={value}
//                onChange={handleChange}
//                readOnly={readonly}
//                data-validation={regexPattern} // Data annotation
//                aria-invalid={!isValid} // Accessibility feature
//            />

//            {/* Error Message */}
//            {!isValid && <div className="invalid-feedback">{errorMessage}</div>}

//            {/* Send Icon */}
//            <div className="send-icon" style={{ visibility: sendIcon ? "visible" : "hidden", width: sendIcon ? "auto" : "0" }}>
//                {sendIcon}
//            </div>
//        </div>
//    );
//}
