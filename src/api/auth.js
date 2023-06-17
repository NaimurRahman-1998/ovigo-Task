
export const saveUser = user => {
    const currentUser = {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        role: 'user'
    }

    fetch(`https://fabserver-1zfv0qa9u-naimurrahman-1998.vercel.app/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser),
    })
        .then(res => res.json())
        .then(data => console.log(data))
}
