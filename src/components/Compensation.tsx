import { useState } from "react";
import { DAYS_DROPDOWN, FREQUENCY_DROPDOWN, PERIOD_DROPDOWN, WHEN_DROPDOWN, addCompensationDropdown, selectValues } from "../common/common";
import configData from "../config/appConfig.json"
import { generateUniqueId } from "../utils/helper";
import CustomCompensation from "./CustomCompensation";

enum DropdownType {
    Frequency = "frequency",
    When = "when",
    Notice = "notice",
    Union = "union",
    Amount = "amount",
    CustomUnion = "custom-union",
    Benefit = "benefit",
}

const Compensation: React.FC = () => {
    const BENEFIT_PACEHOLDER = "Days"
    const CUSTOM = "Custom"

    const [optionOne, setOptionOne] = useState<string | null>(null)
    const [optionTwo, setOptionTwo] = useState<string | null>(null)
    const [optionThree, setOptionThree] = useState<string | null>(null)
    const [benefitOpen, setBenefitOpen] = useState<boolean>(false)
    const [benefitSelection, setBenefitSelection] = useState<string>('');
    const [isCompensationDropdown, setIsCompensationDropdown] = useState<boolean>(false)
    const [isTypesOfCompensation, setIsTypesOfCompensation] = useState(addCompensationDropdown)

    const [compensationData, setCompensationData] = useState([
        {
            id: generateUniqueId(),
            type: "Salary/Wage",
            amount: "",
            frequency: "Monthly",
            when: "At the end of each period",
            days: ""
        }
    ]);

    const [frequencyDropOpen, setFrequencyDropOpen] = useState(Array(compensationData.length).fill(false))
    const [whenDropOpen, setWhenDropOpen] = useState(Array(compensationData.length).fill(false))
    const [noticeDropOpen, setNoticeDropOpen] = useState(Array(compensationData.length).fill(false))
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [operationType, setOperationType] = useState<string>("")
    const [isToBeEdited, setIsToBeEdited] = useState<string>("")
    const [isAdditionalUnionInfo, setIsAdditionalUnionInfo] = useState([
        {
            id: generateUniqueId(),
            unionName: "",
            customUnionName: ""
        }
    ])
    const [unionOpen, setUnionOpen] = useState(Array(isAdditionalUnionInfo.length).fill(false))
    const [capturedCompensationId, setCapturedCompensationId] = useState<string>("")

    const handleBlur = () => {
        // Delay closing the dropdown to handle the click on dropdown options
        setTimeout(() => setIsCompensationDropdown(false), 100);
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        switch (type.toLowerCase()) {
            case 'optionone':
                setOptionOne(event.target.value)
                break
            case 'optiontwo':
                setOptionTwo(event.target.value)
                break
            case 'optionthree':
                setOptionThree(event.target.value)
                break
        };
    };

    const handleAddNewUnion = () => {
        const newData = {
            id: generateUniqueId(),
            unionName: "",
            customUnionName: ""
        }
        setIsAdditionalUnionInfo((prevData) => [...prevData, newData]);
    }

    const handleDeleteUnionData = (id: string) => {
        setIsAdditionalUnionInfo((prevData) => prevData.filter((data) => data.id !== id))
    }

    const handleSelectOption = (value: string, type: string) => {
        switch (type.toLowerCase()) {
            case DropdownType.Benefit:
                setBenefitSelection(value)
                setBenefitOpen(false)
                break
        };
    };

    const handleAllDropDownOpenClose = (index: number, type: string, dataState: boolean[]) => {
        const newState: boolean[] = [...dataState];
        newState[index] = !newState[index];
        switch (type.toLowerCase()) {
            case DropdownType.Frequency:
                setFrequencyDropOpen(newState);
                break
            case DropdownType.When:
                setWhenDropOpen(newState);
                break
            case DropdownType.Notice:
                setNoticeDropOpen(newState);
                break
            case DropdownType.Union:
                setUnionOpen(newState);
                break
        };
    };

    const addNewCompensationRow = (name: string, type: string) => {
        if (type.toLowerCase() !== CUSTOM.toLowerCase()) {
            const newData = {
                id: generateUniqueId(),
                type: name,
                amount: "",
                frequency: "",
                when: "",
                days: ""
            };
            setCompensationData((prevData) => [...prevData, newData]);
        }
    };

    const handleAllDropDownSelect = (value: string, type: string, id: string, index: number) => {
        switch (type.toLowerCase()) {
            case DropdownType.Amount:
                setCompensationData((prevData) => prevData.map((data) => data.id === id ? { ...data, amount: value } : data))
                break
            case DropdownType.Frequency:
                setCompensationData((prevData) => prevData.map((data) => data.id === id ? { ...data, frequency: value } : data))
                // Close the dropdown by updating the state
                const newFreqState: boolean[] = [...frequencyDropOpen];
                newFreqState[index] = !newFreqState[index];
                setFrequencyDropOpen(newFreqState)
                break
            case DropdownType.When:
                setCompensationData((prevData) => prevData.map((data) => data.id === id ? { ...data, when: value } : data))
                // Close the dropdown by updating the state
                const newWhenState: boolean[] = [...whenDropOpen];
                newWhenState[index] = !newWhenState[index];
                setWhenDropOpen(newWhenState)
                break
            case DropdownType.Notice:
                setCompensationData((prevData) => prevData.map((data) => data.id === id ? { ...data, days: value } : data))
                // Close the dropdown by updating the state
                const newNoticeState: boolean[] = [...noticeDropOpen];
                newNoticeState[index] = !newNoticeState[index];
                setNoticeDropOpen(newNoticeState)
                break
            case DropdownType.Union:
                setIsAdditionalUnionInfo((prevData) => prevData.map((data) => data.id === id ? { ...data, unionName: value } : data))
                // Close the dropdown by updating the state
                const newUnionState: boolean[] = [...unionOpen];
                newUnionState[index] = !newUnionState[index];
                setUnionOpen(newUnionState)
                break
            case DropdownType.CustomUnion:
                setIsAdditionalUnionInfo((prevData) => prevData.map((data) => data.id === id ? { ...data, customUnionName: value } : data))
                break
        };
    };

    const deleteCompensationRow = (id: string) => {
        setCompensationData((prevData) => prevData.filter((data) => data.id !== id))
        setIsTypesOfCompensation((prevData) => prevData.filter(data => data.id !== capturedCompensationId))
    };

    const handleModalSave = (data: any) => {
        if (operationType.toLowerCase() === "add") {
            const newTypeOfCompensation = {
                id: generateUniqueId(),
                displayName: data?.type,
                value: data?.type,
                type: "custom"
            };
            setIsTypesOfCompensation((prevData) => [...prevData, newTypeOfCompensation])
        };
        setCompensationData((prevData) => [...prevData, data]);
    }

    const handleEditableSource = (compensationName: string) => {
        const editableId = compensationData.filter((data) => data.type.toLowerCase() === compensationName.toLowerCase()).map(data => data.id.toString());
        setIsToBeEdited(editableId[0])
        setOpenModal(!openModal);
        setOperationType('edit');
    };

    const handleModalUpdateData = (updatedData: any) => {
        // Find the index of the updated data in compensationData
        const dataIndex = compensationData.findIndex(data => data.id === updatedData.id);

        if (dataIndex !== -1) {
            // Update the data in compensationData
            const updatedCompensationInfoData = [...compensationData];
            updatedCompensationInfoData[dataIndex] = updatedData;
            setCompensationData(updatedCompensationInfoData);

        };
    };

    const handleModalDeleteData = (updatedData: any[]) => {
        setCompensationData(updatedData);
        setIsTypesOfCompensation((prevData) => prevData.filter(data => data.id !== capturedCompensationId))
    };

    return (
        <div>
            <div className="grid grid-cols-6 gap-4 p-11">
                <div className="col-start-2 col-span-4 flex justify-center items-center p-5 bg-slate-50">
                    <div className="border border-gray-300 p-5 rounded-md bg-white">
                        <h3 className="text-xl font-semibold p-4">Tell us about Jason Smith’s compensation & benefits</h3>
                        <h4 className="font-medium pl-4 pb-4">Tell us how Jason Smith will be compensated, if / when they should become eligible for benefits, and let Mason guide you through - and optimize - how any union membership(s) may impact your compensation & benefit payment obligations</h4>
                    </div>
                </div>
                <div className="col-start-2 col-span-4 pl-8">
                    <label className="font-medium">Is Jason Smith a member (or required to be a member, for this role) of any union(s)?</label>
                    <div className="mt-2">
                        <input key="ques-1" className="m-2 text-black" type="radio" value="yes" name="yes-1" checked={optionOne === "yes"} onChange={(e) => handleOptionChange(e, "optionOne")} /> Yes
                        <input key="ques-2" className="m-2 text-black" type="radio" value="no" name="no-1" checked={optionOne === "no"} onChange={(e) => handleOptionChange(e, "optionOne")} /> No
                    </div>
                    {optionOne === "yes" && isAdditionalUnionInfo?.map((info, infoIndex) => (
                        <div className="col-start-2 col-span-4 mt-3">
                            <label className="font-medium">Select Union</label>
                            <div className="w-96 h-10 flex items-center justify-between py-3 px-3 border rounded-lg border-gray-400 bg-white" tabIndex={0} onClick={() => handleAllDropDownOpenClose(infoIndex, "union", unionOpen)}>
                                <p className="text-sm">{info.unionName ? info.unionName : "Select Union"}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-base transition-all ${unionOpen[infoIndex] ? 'rotate-180' : 'rotate-0'} `}>
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {
                                unionOpen[infoIndex] && (
                                    <div className="top-[110%] left-0 w-96 max-h-[320px] py-2 bg-white rounded-md mt-1 shadow-lg">
                                        <div onClick={() => { handleAllDropDownSelect("(!) My union isn't listed", "union", info.id, infoIndex) }}>
                                            <p className="text-sm py-2 px-2 cursor-pointer hover:bg-orange-100 hover:rounded-lg ml-1">(!) My union isn't listed</p>
                                        </div>
                                        <hr className="my-1 w-82 ml-3 mr-3" />
                                        {selectValues.map((option, index) =>
                                            <div key={index} className="flex py-2 px-3 cursor-pointer hover:bg-orange-100 hover:rounded-lg" onClick={() => handleAllDropDownSelect(option.value, "union", info.id, infoIndex)}>
                                                <p className="text-sm">{option.displayName}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                            {
                                <div>
                                    {
                                        isAdditionalUnionInfo[infoIndex].unionName !== "" && optionOne === "yes" && (
                                            <div className="col-start-2 col-span-4 mt-3 w-96">
                                                {
                                                    isAdditionalUnionInfo[infoIndex].unionName.toLowerCase() === "(!) My union isn't listed".toLowerCase() && (
                                                        <div>
                                                            <label className="font-medium">Please Enter Union Name</label>
                                                            <input type="text" className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Union Name" value={info.customUnionName ? info.customUnionName : ''} onChange={(e) => handleAllDropDownSelect(e.target.value, "custom-union", info.id, infoIndex)} />
                                                        </div>
                                                    )
                                                }
                                                <div className="h-70 bg-sky-100 rounded-lg border-1 text-sky-700 mt-4">
                                                    <p className="p-3 whitespace-pre-line">
                                                        {selectValues.some(option => option.value.toLowerCase().includes(isAdditionalUnionInfo[infoIndex].unionName.toLowerCase())) ? configData.unionListed : configData.unionNotListed}
                                                    </p>
                                                </div>
                                                {infoIndex > 0 && isAdditionalUnionInfo[infoIndex].unionName !== "" && (
                                                    <button className=" bg-white border rounded-lg mt-3 w-9 h-9 py-2 px-2 hover:bg-slate-300" key={`${infoIndex}-${info.id}`} onClick={() => handleDeleteUnionData(info.id)} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    }
                                    {
                                        infoIndex === isAdditionalUnionInfo.length - 1 && isAdditionalUnionInfo[infoIndex].unionName !== "" && (
                                            <button className="bg-slate-50 border text-black rounded-lg p-2 font-semibold mt-5 border-t" onClick={() => handleAddNewUnion()} >
                                                + Add Another Union
                                            </button>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    ))}
                    <hr className="my-4" />
                </div>
                <div className="col-start-2 col-span-4 pl-8 relative">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold size-14 mt-6">Compensation</label>
                        <div onBlur={handleBlur}>
                            <button className=" bg-white border border-orange-600  text-orange-600 rounded-lg p-2 font-semibold" onClick={() => (setIsCompensationDropdown(!isCompensationDropdown)
                            )}>
                                + Add Compensation
                            </button>
                            {
                                isCompensationDropdown && (
                                    <div className="py-2 bg-white rounded-md mt-1 shadow-lg absolute z-50 right-0">
                                        {isTypesOfCompensation.map((option, index) =>
                                            <div key={index} className={`w-80 py-2 px-3 hover:bg-orange-100 hover:rounded-lg flex items-center justify-between ${option.type.toLowerCase() === "custom" ? 'cursor-not-allowed' : 'cursor-pointer'}`} onMouseDown={() => { addNewCompensationRow(option.value, option.type);  setCapturedCompensationId(option.id) }}>
                                                <p className="text-md">{option.displayName}</p>
                                                {
                                                    option.type?.toLowerCase() === "custom" && (
                                                        <div className="border rounded-lg hover:bg-gray-200 w-8 h-6 p-1 cursor-pointer shadow bg-white" onMouseDown={() => { handleEditableSource(option.value) }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-4 text-black">
                                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                            </svg>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )}
                                        <button className="w-full border bg-white  rounded-lg px-2 size-8 font-semibold hover:bg-gray-200" onMouseDown={() => { setOpenModal(!openModal); setOperationType('add'); }}>+ Add Custom Compensation</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        openModal && (
                            <div>
                                <CustomCompensation
                                    toggle={openModal}
                                    onSave={handleModalSave}
                                    operationType={operationType}
                                    editableId={isToBeEdited}
                                    compensationInfoData={compensationData}
                                    onEditData={handleModalUpdateData}
                                    onRemoveData={handleModalDeleteData}
                                />
                            </div>
                        )
                    }

                    <div className="rounded-lg border shadow-sm">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg border">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-2 py-2">
                                        Compensation Type
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Frequency
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        When
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    compensationData.map((data, dataIndex) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-20" key={`${dataIndex}-${data.id}`}>
                                            <th scope="row" className="px-2 py-2 font-medium text-gray-900 dark:text-white w-28" key={`${dataIndex}-${data.id}`}>
                                                {data.type}
                                            </th>
                                            <td className="px-4 py-4 w-60" key={`${dataIndex}-${data.id}`}>
                                                <form>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>
                                                        </div>
                                                        <input type="text" className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount" value={data.amount ? data.amount : ''} onChange={(e) => handleAllDropDownSelect(e.target.value, "amount", data.id, dataIndex)} />
                                                    </div>
                                                </form>
                                            </td>
                                            <td className="px-2 py-2 w-40" key={`${dataIndex}-${data.id}`}>
                                                <div className="w-28 h-10 ml-3 flex items-center justify-between py-3 px-3 border rounded-lg border-gray-400 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black" tabIndex={0} onClick={() => handleAllDropDownOpenClose(dataIndex, "frequency", frequencyDropOpen)}>
                                                    <p className="text-sm">{data.frequency}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-base transition-all ${frequencyDropOpen[dataIndex] ? 'rotate-180' : 'rotate-0'} `}>
                                                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                {frequencyDropOpen[dataIndex] && (
                                                    <div className="absolute z-50" key={`${dataIndex}-${data.id}`}>
                                                        <div className="w-28 max-h-[320px] py-2 bg-white rounded-md mt-1 shadow-lg ml-3">
                                                            {FREQUENCY_DROPDOWN.map((option, index) => (
                                                                <div key={index} className="flex py-2 px-3 cursor-pointer hover:bg-orange-100 hover:rounded-lg" onClick={() => handleAllDropDownSelect(option, "frequency", data.id, dataIndex)}>
                                                                    <p className="text-sm">{option}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-2 py-2 w-80" key={`${dataIndex}-${data.id}`}>
                                                <div className="w-82 h-10 ml-3 flex items-center justify-between py-3 px-3 border rounded-lg border-gray-400 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black" tabIndex={0} onClick={() => handleAllDropDownOpenClose(dataIndex, "when", whenDropOpen)}>
                                                    <p className="text-sm">{data.when}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-base transition-all ${whenDropOpen[dataIndex] ? 'rotate-180' : 'rotate-0'} `}>
                                                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                {whenDropOpen[dataIndex] && (
                                                    <div className="absolute z-50" key={`${dataIndex}-${data.id}`}>
                                                        <div className="w-72 max-h-[320px] py-2 bg-white rounded-md mt-1 shadow-lg ml-3">
                                                            {WHEN_DROPDOWN.map((option, index) => (
                                                                <div key={index} className="flex py-2 px-3 cursor-pointer hover:bg-orange-100 hover:rounded-lg" onClick={() => { handleAllDropDownSelect(option, "when", data.id, dataIndex) }}>
                                                                    <p className="text-sm">{option}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-2 py-2 flex w-34 mt-3" key={`${dataIndex}-${data.id}`}>
                                                {data.when.toLowerCase() === "Number of days after they start work".toLowerCase() && (
                                                    <>
                                                        <div className=" w-24 h-10 ml-3 flex items-center justify-between py-3 px-3 border rounded-lg border-gray-400 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black" tabIndex={0} onClick={() => handleAllDropDownOpenClose(dataIndex, "notice", noticeDropOpen)}>
                                                            <p className="text-sm">{data.days}</p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-base transition-all ${noticeDropOpen[dataIndex] ? 'rotate-180' : 'rotate-0'} `}>
                                                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        {noticeDropOpen[dataIndex] && (
                                                            <div className="absolute z-50" key={`${dataIndex}-${data.id}`}>
                                                                <div className="w-24 max-h-[320px] py-2 bg-white rounded-md mt-10 shadow-lg ml-3">
                                                                    {DAYS_DROPDOWN.map((option, index) => (
                                                                        <div key={index} className="flex py-2 px-3 cursor-pointer hover:bg-orange-100 hover:rounded-lg" onClick={() => handleAllDropDownSelect(option, "notice", data.id, dataIndex)}>
                                                                            <p className="text-sm">{option}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <label className="font-medium mt-2 ml-2">Days</label>
                                                    </>
                                                )}
                                                {dataIndex > 0 && (
                                                    <td key={`${dataIndex}-${data.id}`}>
                                                        <button className=" bg-white border rounded-lg ml-12 w-9 h-9 py-2 px-2 hover:bg-slate-300" key={`${dataIndex}-${data.id}`} onClick={() => {deleteCompensationRow(data.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <hr className="my-4" />
                </div>
                <div className="col-start-2 col-span-4 pl-8">
                    <label className="font-medium">Should Jason Smith automatically become eligible for benefits?</label>
                    <div className="mt-2">
                        <input key="ques-3" className="m-2 text-black" type="radio" value="yes" name="yes-2" checked={optionTwo === "yes"} onChange={(e) => handleOptionChange(e, "optionTwo")} /> Yes
                        <input key="ques-4" className="m-2 text-black" type="radio" value="no" name="no-2" checked={optionTwo === "no"} onChange={(e) => handleOptionChange(e, "optionTwo")} /> No
                    </div>
                    {
                        optionTwo === "yes" && (
                            <div className="col-start-2 col-span-4 mt-3">
                                <label className="font-medium">Great, When?</label>
                                <div className="mt-2 flex items-center">
                                    <input key="ques-5" className="m-2 text-black" type="radio" value="Immediately" name="imm" checked={optionThree === "Immediately"} onChange={(e) => handleOptionChange(e, "optionThree")} /> Immediately
                                    <input key="ques-6" className="m-2 text-black" type="radio" value="After their probation period" name="pb" checked={optionThree === "After their probation period"} onChange={(e) => handleOptionChange(e, "optionThree")} /> After their probation period
                                    <input key="ques-7" className="m-2 text-black" type="radio" value="After" name="after" checked={optionThree === "After"} onChange={(e) => handleOptionChange(e, "optionThree")} /> After
                                    <div className={`flex items-center ${optionThree?.toLowerCase() !== "after" ? 'pointer-events-none bg-opacity-60' : ''}`}>
                                        <input type="number" className="ml-3 w-28 h-10 p-3 text-md text-gray-900 border border-gray-300 rounded-lg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                        <div className={`w-28 h-10 ml-3 flex items-center justify-between py-3 px-3 border rounded-lg border-gray-400 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${optionThree?.toLowerCase() !== "after" ? 'opacity-50' : ''}`} tabIndex={0} onClick={() => setBenefitOpen(!benefitOpen)}>
                                            <p className="text-sm">{benefitSelection ? benefitSelection : BENEFIT_PACEHOLDER}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-base transition-all ${benefitOpen ? 'rotate-180' : 'rotate-0'} `}>
                                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        {benefitOpen && (
                                            <div className="relative">
                                                <div className="w-28 max-h-[320px] py-2 bg-white rounded-md mt-1 shadow-lg absolute top-5 -left-28">
                                                    {PERIOD_DROPDOWN.map((option, index) => (
                                                        <div key={index} className="flex py-2 px-3 cursor-pointer hover:bg-orange-100 hover:rounded-lg" onClick={() => handleSelectOption(option, "benefit")}>
                                                            <p className="text-sm">{option}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <hr className="my-4" />
                </div>
            </div>

        </div>
    )

};

export default Compensation