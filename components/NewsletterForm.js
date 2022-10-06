import { useState } from 'react';
import { sanitize } from '../services/utils';

const NewsletterForm = ( { status, message, onValidated }) => {

    const [ error, setError ] = useState(null);
    const [ email, setEmail ] = useState(null);

    /**
     * Handle form submit.
     *
     * @return {{value}|*|boolean|null}
     */
    const handleFormSubmit = () => {

        setError(null);

        if ( ! email ) {
        setError( 'Please enter a valid email address' );
        return null;
        }

        const isFormValidated = onValidated({ EMAIL: email });

        // On success return true
        return email && email.indexOf("@") > -1 && isFormValidated;
    }

    /**
     * Handle Input Key Event.
     *
     * @param event
     */
    const handleInputKeyEvent = ( event ) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit();
        }
    }

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    const getMessage = (message) => {
        if ( !message ) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ( "0" !== result?.[0]?.trim() ) {
            return sanitize(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? sanitize( formattedMessage ) : null;
    }

    return (
        <div className='mt-20'>
            <div class="relative max-w-md mx-auto font-sans">
                <input 
                    type="email" 
                    class="block py-4 pl-4 pr-40 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="satoshi@gmgin.com" 
                    onChange={(event) => setEmail(event?.target?.value ?? '')}
                    onKeyUp={(event) => handleInputKeyEvent(event)}
                    required 
                />
                <button 
                    type="submit" 
                    className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 btn-color"
                    onClick={handleFormSubmit}
                >NOTIFY ME</button>
            </div>
            <div className="min-h-42px font-sans">
                { 'sending' === status ? 'Loading...' : null }
                {'error' === status || error ? (
                    <div
                        className="text-red-700 pt-2"
                        dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}
                    />
                ) : null }
                {'success' === status && 'error' !== status && !error && (
                    <div className="text-green-200 font-bold pt-2" dangerouslySetInnerHTML={{ __html: sanitize(message) }} />
                )}
            </div>
        </div>
    );
}

export default NewsletterForm