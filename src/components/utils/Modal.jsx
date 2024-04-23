import Button from "./Button"


function RulesModal({ onClose, isOpen, content }) {
    if (isOpen) {
        return (
            <div className="fixed h-full w-full top-0 flex lg:items-center lg:justify-center">
                <div className="h-full w-full absolute bg-black opacity-50 top-0" />

                <div className="relative rounded-lg h-full w-full bg-white flex flex-col px-8 py-16 justify-between items-center lg:w-[600px] lg:max-h-[80vh] lg:h-fit overflow-auto lg:p-8 gap-3">
                    {content}

                    <Button clicked={() => onClose()} type="secondary" text="Close" />
                </div>
            </div>
        )
    }
}

export default RulesModal