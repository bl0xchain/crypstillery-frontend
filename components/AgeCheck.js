import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const AgeCheck = () => {
    const [show, setShow] = useState(true);
    const onClose = () => {
        setShow(false)
    }
    const onClick = () => {
        window.location.href = "http://www.responsibledrinking.org/";
    }
    return (
        <Modal
            show={show}
            size="md"
            popup={true}
            onClose={onClose}
        >
            <Modal.Body>
                <div className="text-center pt-5 leading-loose">
                    <FaExclamationCircle className="mx-auto mb-5 h-10 w-10 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        ARE YOU 21 YEARS OF AGE?
                    </h3>
                    <p className="mb-5 ">By clicking YES, you confirm that you are the required age of your country to visit our website, you accept Terms and Conditions and you declare that you have read our Privacy & Cookies notice.</p>
                    <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            onClick={onClose}
                        >
                            Yes, I'm
                        </Button>
                        <Button
                            color="gray"
                            onClick={onClick}
                        >
                            No
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AgeCheck;