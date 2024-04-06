import React from "react";
type InputPropType = {
    label: string,
    value: string,
    onChange: any,
    placeHolder: string,
}
const TextInput = ({label, value, onChange, placeHolder}: InputPropType) => {
    return (
        <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                {label}
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    required={true} type="text" onChange={onChange} value={value} placeholder={placeHolder} />

            </label>
        </div>
    );
}
export default TextInput;
