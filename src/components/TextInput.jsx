import React from "react";

const TextInput =React.forwardRef(({
    type,placeholder,style,label,lablelStyles,name,error,ref
})=>{
    return (
        <div className="w-full flex flex-col mt-2 ">
            {label&&(<p className={`font-light text-sm mb-2 ${lablelStyles}`}>{label}</p>)
            }
            <div className="w-full ">
                <input type={type} name={name} placeholder={placeholder} ref={ref} className={`bg-secondary bg-opacity-20  border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666] ${style}`} />
            </div>
            {error&&(
                <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
            )}
        </div>
    )
})

export default TextInput