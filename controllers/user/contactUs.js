import {
    findContactByEmail,
    createContact,
    updateContactMessages
} from "../../services/contactUsServices.js";

import {
    badRequestResponse,
    notFoundResponse,
    serverErrorResponse,
    successResponse,
    unauthorizedResponse,
} from "../../helpers/apiResponses.js";

const createContactController = async(req, res) => {
    try {
        const {name, email, message} = req.body;
        if (!name || !email || !message) {
            return badRequestResponse(res, "All fields are mandatory", null);
        }
        const existingContact = await findContactByEmail({email});
        if (existingContact) {
            const updateContact = await updateContactMessages(email, message);
            if (updateContact) {
                return successResponse(res, "Another message added successfully", updateContact);
            }
            else {
                return serverErrorResponse(res, "Failed to add another message");
            }
        }
        else {
            const contact = await createContact(
                {
                    name,
                    email,
                    messages: [{ message }],
                }
            );
            if (contact) {
                return successResponse(res, "Message has been deleivered succcessfully", contact);
            }
            else {
                return serverErrorResponse(res, "Error while sending message");
            }
        }
        
    } catch (error) {
        return serverErrorResponse(res, "Internal Server error Please try again later");
    }
};



export {
    createContactController
};