import React from "react";
import { Search } from "lucide-react";
import "../../styles/Components/ui/Search.css";

function Search_Bar({ entity = "default",placeholder = "Search...",value = "",  onChange, shortcut = "Ctrl + K"}) {
  return (
    <div className="search__bar" data-entity={entity}>
        <Search size={16}className="search__icon" />
        <input type="text" placeholder={placeholder} />
        {/* {shortcut && (
          <kbd className="search__kbd">
            {shortcut}
          </kbd>
        )} */}

      </div>
  );
}

export default Search_Bar;