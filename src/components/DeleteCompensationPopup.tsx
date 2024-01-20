import { useState } from "react";

interface DeleteCompensationProps {
    popup: boolean;
    id: string;
    onDelete: (deleteId: string) => void;
}

const DeleteCompensation: React.FC<DeleteCompensationProps> = ({ popup, id, onDelete }) => {
    const [open, setOpen] = useState<boolean>(popup);

    const handleOnClick = () => {
        onDelete(id);
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
                                    Delete Custom Compensation Type
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setOpen(!open)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-4 flex items-center justify-center">
                                <div className=" rounded-full bg-red-100 h-20 w-20 justify-center flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-red-500">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="items-center justify-center font-medium">
                                <p>Are you sure you would like to delete the draft custom compensation type Custom Compensation Name?</p>
                                <br />
                                <p>This will not effect existing compensations assigned previously with using this type.</p>
                            </div>
                            <hr className="my-4" />
                            {/* <!-- Modal Footer --> */}
                            <div className="float-end border-gray-200 rounded-b dark:border-gray-600 mt-4">
                                <button data-modal-hide="default-modal" type="button" className="text-black bg-white border font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => setOpen(!open)}>Cancel</button>
                                <button data-modal-hide="default-modal" type="button" className="ms-3 text-white bg-orange-500 rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10" onClick={() => { handleOnClick() }}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )

}

export default DeleteCompensation