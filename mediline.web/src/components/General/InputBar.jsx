{/* This is the base component for a search bar in our site */ }
export default function InputBar({readonly = false,
                                  searchIcon = null,
                                  placeholder = '',
                                  sendIcon = null}) {
    return (
        <div className="input-bar">
            {/* Search icon */}
            <div className="search-icon" style={{ visibility : searchIcon ? 'visible' : 'hidden', width: searchIcon ? 'auto' : '0'}}>
                {searchIcon}
            </div>
            {/* Input field for the search bar */ }
            <input type="text" placeholder={placeholder} readOnly={readonly} />
            {/* Send icon */}
            <div className="send-icon" style={{ visibility: sendIcon ? 'visible' : 'hidden', width: sendIcon ? 'auto' : '0' }}>
                {sendIcon}
            </div>
        </div>
    );
}
