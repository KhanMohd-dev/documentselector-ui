import { useEffect, useState } from "react"
import { FREQUENCY_DROPDOWN, WHEN_DROPDOWN } from "../common/common"
import { generateUniqueId } from "../utils/helper"
import DeleteCompensation from "./DeleteCompensationPopup";

interface CompensationDataProps {
    id: string | undefined;
    type: string | undefined;
    amount: string | undefined;
    frequency: string | undefined;
    when: string | undefined;
    days: string | undefined;
}

interface CustomCompensationProps {
    toggle: boolean;
    onSave: (newData: CompensationDataProps) => void;
    operationType: string;
    editableId: string;
    compensationInfoData: CompensationDataProps[];
    onEditData: (updatedData: CompensationDataProps) => void;
    onRemoveData: (updatedDataAfterRemove: CompensationDataProps[]) => void;
}

const CustomCompensation: React.FC<CustomCompensationProps> = ({ toggle, onSave, operationType, editableId, compensationInfoData, onEditData, onRemoveData }) => {
    const [open, setOpen] = useState<boolean>(toggle)
    const [frequencyDropOpen, setFrequencyDropOpen] = useState<boolean>(false)
    const [whenDropOpen, setWhenDropOpen] = useState<boolean>(false)

    const [type, setType] = useState<string | undefined>(""); // Add state for the compensation type
    const [amount, setAmount] = useState<string | undefined>(""); // Add state for the amount
    const [frequency, setFrequency] = useState<string | undefined>(""); // Add state for the frequency
    const [when, setWhen] = useState<string | undefined>(""); // Add state for the 'when' option

    const [isDelete, setIsDelete] = useState<boolean>(false)

    useEffect(() => {
        if (operationType.toLowerCase() === "edit") {
            const existingData = compensationInfoData.find((data) => data.id === editableId) || null;
            setType(existingData?.type)
            setAmount(existingData?.amount)
            setFrequency(existingData?.frequency)
            setWhen(existingData?.when)
        }
    }, [operationType, editableId, compensationInfoData]);

    const saveCustomCompensation = () => {
        if (operationType.toLowerCase() === "add") {
            const newData = {
                id: generateUniqueId(),
                type: type,
                amount: amount,
                frequency: frequency,
                when: when,
                days: "" // Assuming 'days' is an empty string for now
            };
            onSave(newData)
        } else if (operationType.toLowerCase() === "edit") {
            const updateData = {
                id: editableId,
                type: type,
                amount: amount,
                frequency: frequency,
                when: when,
                days: "" // Assuming 'days' is an empty string for now
            }
            onEditData(updateData)
        }
        setOpen(!open);
    };

    const handleDeletionOfCompensation = (id: string) => {
        const updatedData = compensationInfoData.filter((data) => !(data.id === id));
        onRemoveData(updatedData);
        setIsDelete(!isDelete);
        setOpen(!open);
    }

    return (
        <div>
            {
                open && (
                    < div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white shadow dark:bg-gray-700 w-full max-w-2xl p-6 rounded-lg">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-3 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit Custom Compensation Type
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setOpen(!open)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-4 border-b">
                                <label className="font-medium">Compensation Type Name</label>
                                <input type="text" className="w-full h-10 p-3 mt-2 text-md text-gray-900 border border-gray-300 rounded-lg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Add custom compensation type name" value={type ? type : ''} onChange={(e) => setType(e.target.value)} />
                            </div>
                            <div className="p-4 border-t">
                                <label className="font-medium">Default Settings (Optional)</label>
                                <div className="mt-5">
                                    <label className="font-medium">Amount</label>
                                    <form>
                                        <div className="relative mt-2">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                            <input type="text" id="zip-input" aria-describedby="helper-text-explanation" className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Amount" pattern="^\d{5}(-\d{4})?$" value={amount ? amount : ''} onChange={(e) => setAmount(e.target.value)} />
                                        </div>
                                    </form>
                                </div>
                                <p className="font-medium pt-3">Frequency</p>
                                <div className="relative">
                                    <div className=" w-82 h-10 flex items-center justify-between py-3 px-3 border rounded-lg border-gray-400 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black mt-3" tabIndex={0} onClick={() => setFrequencyDropOpen(!frequencyDropOpen)}>
                                        <p className="text-sm">{frequency ? frequency : "Please Select"}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-base transition-all ${frequencyDropOpen ? 'rotate-180' : 'rotate-0'} `}>
                                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    {frequencyDropOpen && (
                                        <div className="z-50 py-2 bg-white rounded-md mt-1 shadow-lg relative" style={{ width: '100%' }}>
                                            {FREQUENCY_DROPDOWN.map((option, index) => (
                                                <div key={index} className="flex py-2 px-3 cursor-pointer hover:bg-orange-100 hover:rounded-lg" onClick={() => { setFrequency(option); setFrequencyDropOpen(!frequencyDropOpen); }}>
                                                    <p className="text-sm">{option}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="font-medium pt-3">When</p>
                                <div className="relative z-50">
                                    <div className=" w-82 h-10 flex items-center justify-between py-3 px-3 border rounded-lg border-gray-400 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black mt-3" tabIndex={0} onClick={() => setWhenDropOpen(!whenDropOpen)}>
                                        <p className="text-sm">{when ? when : "Please Select"}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-base transition-all ${whenDropOpen ? 'rotate-180' : 'rotate-0'} `}>
                                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    {whenDropOpen && (
                                        <div className="absolute py-2 bg-white rounded-md mt-1 shadow-lg" style={{ width: '100%' }}>
                                            {WHEN_DROPDOWN.map((option, index) => (
                                                <div key={index} className="flex py-2 px-3 cursor-pointer hover:bg-orange-100 hover:rounded-lg" onClick={() => { setWhen(option); setWhenDropOpen(!whenDropOpen); }}>
                                                    <p className="text-sm">{option}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {
                                operationType.toLowerCase() === "edit" && (
                                    <div className="p-4 border-t">
                                        <button className=" bg-white border border-black text-black rounded-lg p-2 font-semibold flex items-center" onClick={() => setIsDelete(!isDelete)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Delete Compensation Type
                                        </button>
                                    </div>
                                )
                            }
                            {
                                isDelete && (
                                    <div>
                                        <DeleteCompensation
                                            popup={isDelete}
                                            id={editableId}
                                            onDelete={handleDeletionOfCompensation}
                                        />
                                    </div>
                                )

                            }
                            <hr className="my-4" />
                            {/* <!-- Modal Footer --> */}
                            <div className="float-end p-4 border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-hide="default-modal" type="button" className="text-black bg-white border font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => setOpen(!open)}>Cancel</button>
                                <button data-modal-hide="default-modal" type="button" className="ms-3 text-white bg-orange-500 rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10" onClick={() => { saveCustomCompensation() }}>Save</button>
                            </div>
                        </div>
                    </div>

                )
            }
        </div >
    )
}

export default CustomCompensation