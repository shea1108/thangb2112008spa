/**
* @param {string} url
* @param {RequestInit} options
* @returns Promise<Response>
*/
async function efetch(url, options = {}) {
    let result = {};
    let json = {};
    try {
        result = await fetch(url, options);
        json = await result.json();
    } catch (error) {
        throw new Error(error.message);
    }
    if (!result.ok || json.status !== 'success') {
        throw new Error(json.message);
    }
    return json.data;
}

function makeContactsService() {
    const baseUrl = '/api/v1/contacts';
    
    async function fetchContacts(page, limit = 10) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        return efetch(url);
    }

    async function fetchContact(id) {
        const { contact } = await efetch(`${baseUrl}/${id}`);
        return contact;
    }

    async function createContact(contact) {
        return efetch('/api/v1/contacts', {
          method: 'POST',
          body: contact,
        });
    }

    async function deleteAllContacts() {
        return efetch(baseUrl, {
            method: 'DELETE',
        });
    }

    async function updateContact(id, contact) {
        return efetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            body: contact,
        });
    }

    async function deleteContact(id) {
        return efetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
    }

    return {
        fetchContacts,
        fetchContact,
        createContact,
        updateContact,
        deleteContact,
        deleteAllContacts,
    };
}

export default makeContactsService();
