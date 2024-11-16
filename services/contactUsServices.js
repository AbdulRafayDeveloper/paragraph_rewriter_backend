import Contact from '../models/ContactModel.js';

const findContactByEmail = async (data) => {
    return await Contact.findOne(data);
};

const createContact = async(data) => {
    const contact = new Contact(data);
    await contact.save();
    return contact;
};

const updateContactMessages = async (email, newMessage) => {
    return await Contact.findOneAndUpdate(
        { email },
        { $push: { messages: { message: newMessage } } },
        { new: true }
    );
};


export {
    findContactByEmail,
    createContact,
    updateContactMessages
}