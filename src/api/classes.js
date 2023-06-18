export const addRoom = async classData => {
    const response = await fetch(`http://localhost:5000/rooms`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(classData),
    })

    const data = await response.json()
    return data
}

export const addSelectClass = async classData => {
    const response = await fetch(`https://fabserver-1zfv0qa9u-naimurrahman-1998.vercel.app/selected`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(classData),
    })

    const data = await response.json()
    return data
}


export const addPayments = async classData => {
    const response = await fetch(`https://fabserver-1zfv0qa9u-naimurrahman-1998.vercel.app/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
    })

    const data = await response.json()
    return data
}
