import React from "react"

const Search = (porps) => {
    const { value, css_styles, onChange, placeholder } = porps
    return(
        <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        className={`${css_styles}`}
        onChange={ onChange }
        />
    )
}

export default Search