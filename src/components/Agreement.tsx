import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { accordionInfo, chipColor, jobTemplates, locations, seniority, subsidiaries } from '../common/common';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchBar from './SearchBar';

const Agreement: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [isDocSelected, setIsDocSelected] = useState<boolean[][]>(Array.from({ length: accordionInfo.length }, () => []));
    const [listedDocuments, setIsListedDocuments] = useState<{ option: string, groupIndex: number, optionIndex: number }[]>([]);
    const [isFilterSelections, setIsFilterSelected] = useState<{ option: string, group: string }[]>([]);
    const [isJobTemplate, setIsJobTemplate] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [isSeniority, setIsSeniority] = useState<string>('')
    const [isSubsidiaries, setIsSubsisdiaries] = useState<string>('')

    // this method is expand / collapse the Accordion
    const handleChange = (panel: string) => {
        return (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    };

    // this method is to select/deselect documents
    const handleDocumentSelections = (groupIndex: number, optionIndex: number, option: string) => {
        const newSelectedOptions = [...isDocSelected];
        newSelectedOptions[groupIndex][optionIndex] = !newSelectedOptions[groupIndex][optionIndex];
        setIsDocSelected(newSelectedOptions);

        if (!newSelectedOptions[groupIndex][optionIndex]) {
            // Remove from the list when unselected & enable the button in document selection
            setIsListedDocuments((prevList) =>
                prevList.filter((item) => !(item.option === option && item.groupIndex === groupIndex && item.optionIndex === optionIndex))
            );
        } else {
            // Add to the list when selected & disable the button in document selection
            setIsListedDocuments((prevList) => [...prevList, { option, groupIndex, optionIndex }]);
        }
    };

    const handleFilterSelection = (option: string, group: string) => {
        switch (group?.toLowerCase()) {
            case "job templates":
                setIsJobTemplate(option)
                break
            case "locations":
                setLocation(option)
                break
            case "seniority":
                setIsSeniority(option)
                break
            case "subsidiary":
                setIsSubsisdiaries(option)
                break
        }

        // Check if the selection already exists in the state
        const isAlreadySelected = isFilterSelections.some(selection => selection.option === option && selection.group === group);

        // If not, add it to the state
        if (!isAlreadySelected) {
            setIsFilterSelected(prevSelections => [...prevSelections, { option, group }]);
        }
    }

    // this method is to handle the removal of chip
    const handleRemovalOfChip = (option: string, group: string) => {
        switch (group?.toLowerCase()) {
            case "job templates":
                setIsJobTemplate('')
                break
            case "locations":
                setLocation('')
                break
            case "seniority":
                setIsSeniority('')
                break
            case "subsidiary":
                setIsSubsisdiaries('')
                break
        }

        setIsFilterSelected((prevList) => prevList.filter(item => !(item.option === option)))
    }

    return (
        <div>
            <div className="grid grid-cols-6 gap-4 p-11">
                <div className="col-start-2 col-span-4 flex justify-center items-center p-5 bg-slate-50">
                    <Paper variant="outlined" className="p-5">
                        <h3 className="text-xl font-semibold p-4">Which agreements, forms and notices should be sent to Jason Smith?</h3>
                        <h4 className="font-medium pl-4 pb-4">Employees assigned to this job type will be required to review, where relevant fill-in, and sign the following agreements and notices:</h4>
                    </Paper>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4 justify-center items-center">
                <div className="col-start-2 col-span-4 pl-11 ml-5">
                    <label className="font-medium">Select the agreements, notices and documents you want Jason Smith to sign</label>
                </div>
                <div className="col-start-2 col-span-2 flex bg-slate-50 pl-11 ml-5">
                    <Paper variant="outlined" className="p-5">
                        <label className="font-semibold">Available Documents</label>
                        <div className="col-span-10 pt-2">
                            {/* Search Bar */}
                            <SearchBar
                                wordsInput={[]}
                            />
                        </div>
                        <div className="pt-3">
                            <label className="font-semibold pt-10">Filter By:</label>
                            {/* Selection for choosing different values from dropdown */}
                            <div className="pt-2 flex">
                                <select data-te-select-init data-te-select-filter="true" id="jobtemplate" className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:border-gray-500 focus:ring-gray-500 p-2 dark:bg-gray-100 dark:text-white dark:focus:ring-blue-500 w-3/5"
                                    value={isJobTemplate}
                                    onChange={(e) => { handleFilterSelection(e.target.value, "Job Templates") }}
                                >
                                    <option defaultValue={"Job Templates"}>Job Templates</option>
                                    {jobTemplates.map((jobTemplate, index) => (
                                        <option key={index} value={jobTemplate.value}>
                                            {jobTemplate.displayName}
                                        </option>
                                    ))}
                                </select>
                                <select id="locations" className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:border-gray-500 focus:ring-gray-500 p-2 ml-3 dark:bg-gray-100 dark:text-white dark:focus:ring-blue-500 w-3/5"
                                    value={location}
                                    onChange={(e) => { handleFilterSelection(e.target.value, "Locations") }}
                                >
                                    <option selected>Locations</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location.value}>
                                            {location.displayName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="pt-2 flex">
                                <select id="subsidiary" className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:border-gray-500 focus:ring-gray-500 p-2 dark:bg-gray-100 dark:text-white dark:focus:ring-blue-500 w-3/5"
                                    value={isSubsidiaries}
                                    onChange={(e) => { handleFilterSelection(e.target.value, "Subsidiary") }}
                                >
                                    <option selected>Subsidiary</option>
                                    {subsidiaries.map((subsidiary, index) => (
                                        <option key={index} value={subsidiary.value}>
                                            {subsidiary.displayName}
                                        </option>
                                    ))}
                                </select>
                                <select id="seniority" className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:border-gray-500 focus:ring-gray-500 p-2 ml-3 dark:bg-gray-100 dark:text-white dark:focus:ring-blue-500 w-3/5"
                                    value={isSeniority}
                                    onChange={(e) => { handleFilterSelection(e.target.value, "Seniority") }}
                                >
                                    <option selected>Seniority</option>
                                    {seniority.map((seniority, index) => (
                                        <option key={index} value={seniority.value}>
                                            {seniority.displayName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Handling the filter selection by displaying them in chips */}
                            {
                                isFilterSelections.length > 0 ?
                                    (
                                        <div className="block p-6 bg-white-100 border rounded-lg shadow mt-3 text-center border-gray-200 relative overflow-x-auto h-28">
                                            {
                                                isFilterSelections.map((object, index) => {
                                                    const groupKey = object.group.toLowerCase();
                                                    const colorStyle = Object.prototype.hasOwnProperty.call(chipColor, groupKey)
                                                        ? (chipColor as any)[groupKey].color
                                                        : '';
                                                    const badgeStyle = Object.prototype.hasOwnProperty.call(chipColor, groupKey)
                                                        ? (chipColor as any)[groupKey].badge
                                                        : '';

                                                    return (
                                                        <span
                                                            key={index}
                                                            id={`badge-dismiss-${index}`}
                                                            className={`inline-flex items-center px-2 py-1 me-2 m-2 text-sm font-medium ${colorStyle}`}
                                                        >
                                                            {object.option}
                                                            <button
                                                                type="button"
                                                                className={`inline-flex items-center p-1 ms-2 text-sm ${badgeStyle}`}
                                                                data-dismiss-target={`#badge-dismiss-${index}`}
                                                                aria-label="Remove"
                                                                onClick={() => { handleRemovalOfChip(object.option, object.group) }}
                                                            >
                                                                <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                </svg>
                                                                <span className="sr-only">Remove badge</span>
                                                            </button>
                                                        </span>
                                                    );
                                                })
                                            }
                                        </div>
                                    )
                                    :
                                    <>
                                    </>
                            }


                            <div className="p-5 flex items-center justify-between">
                                <label className="text-black">{accordionInfo.length} Available Documents</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Select All</span>
                                </label>
                            </div>
                        </div>
                        {/* Accordion to show different list of documents for selection */}
                        {
                            accordionInfo.map((item, groupIndex) => (
                                <Accordion key={groupIndex} expanded={expanded === item.id} onChange={handleChange(item.id)}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                                        <Typography className="text-gray-700">{item.displayName}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul>
                                            {item.options.map((option, optionIndex) => (
                                                <div className="my-4">
                                                    <li className="flex items-center justify-between text-black font-medium">
                                                        <span className="ml-4">{option}</span>
                                                        <button className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded text-black" onClick={() => { handleDocumentSelections(groupIndex, optionIndex, option) }} disabled={isDocSelected[groupIndex][optionIndex]}>
                                                            {
                                                                isDocSelected[groupIndex][optionIndex] ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-black">
                                                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                                    </svg>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-3 text-black">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                                    </svg>
                                                            }
                                                        </button>
                                                    </li>
                                                </div>
                                            ))}
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>

                            ))
                        }
                    </Paper>
                </div>
                <div className="col-start-4 col-span-2 bg-slate-50 mr-5">
                    <Paper variant="outlined" className="p-5">
                        <label className="font-semibold">Selected Documents</label>
                        <div className="col-span-10 pt-2">
                            {/* Search Bar */}

                            <SearchBar
                                wordsInput={listedDocuments.map(item => item.option)}
                            />

                        </div>

                        {/* Card to hold the selected documents */}
                        <div className={`block p-6 bg-gray-100 border rounded-lg shadow mt-3 text-center h-auto ${listedDocuments.length > 0 ? 'border-green-500' : 'border-gray-200'} h-80 relative overflow-x-auto`}>
                            {
                                listedDocuments.length === 0 ?
                                    (
                                        <>
                                            <svg className="w-40 h-10 text-gray-300 dark:text-white inline-block align-middle mb-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                            </svg>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">Select documents from the left panel to have employees review them and provide a signature acknowledging review</p>
                                        </>
                                    )
                                    :
                                    (
                                        <div>
                                            <ul>
                                                {listedDocuments.map((document, index) => (
                                                    <li key={index} className="flex items-center justify-between text-black font-medium my-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-green-500 font-extrabold">
                                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>{document.option}</span>
                                                        <button className="hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-200 rounded text-black bg-slate-100" onClick={() => handleDocumentSelections(document.groupIndex, document.optionIndex, document.option)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-black">                                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                            }
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default Agreement