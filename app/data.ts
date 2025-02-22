
type Member = {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
};

export async function getMembers() {
    try {
        const response = await fetch('http://localhost:3000/api/members');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        //console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function addMember(member: Member) {
    try {
        const response = await fetch('http://localhost:3000/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(member),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}