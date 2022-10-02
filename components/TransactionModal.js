import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { hideTxModal } from "../redux/slices/transactionSlice";

const TransactionModal = () => {
    const dispatch = useDispatch()
    const transaction = useSelector((state) => state.transaction)

    const handleClose = () => {
        dispatch(hideTxModal())
    }

    const onClick = () => {
        
    }

    return (<>
        <Modal
            show={transaction.show}
            size="md"
            popup={true}
            onClose={handleClose}
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                {
                    transaction.status == 200 ?
                    <>
                        <FaCheckCircle className="mx-auto mb-4 h-10 w-10 text-green-600" />
                        <h3 className="mb-5 text-xl font-bolder text-gray-900 dark:text-gray-400">
                            { transaction.message }
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button >
                                <a className="btn btn-color active" href={`https://ropsten.etherscan.io/tx/${transaction.address}`} target="_blank">View TXN</a>
                            </Button>
                            <Button onClick={handleClose} color="gray">Close</Button>
                        </div>
                    </> : 
                    <>
                        <FaTimesCircle className="mx-auto mb-4 h-10 w-10 text-red-600" />
                        <h3 className="mb-5 text-xl font-bolder text-gray-900 dark:text-gray-400">
                            Your transaction has been cancelled
                        </h3>
                        <p className="mb-5">
                            { transaction.message }
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={handleClose}>Close</Button>
                        </div>
                    </>
                }
                </div>
            </Modal.Body>
        </Modal>
    </>)
}

export default TransactionModal;