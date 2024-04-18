function Button({ text, type = "primary", clicked = () => { } }) {

    const types = {
        primary: 'bg-gray-800 text-white',
        secondary: 'text-gray-800 bg-white border border-gray-800'
    }

    return (
        <button onClick={() => clicked()} className={'cursor-pointer tracking-widest min-h-[45px] h-[45px] text-lg font-semibold rounded-lg px-10 w-full ' + types[type]} >
            {text}
        </button>
    )
}

export default Button