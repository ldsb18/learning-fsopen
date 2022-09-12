const Contact = ({ contact, eraseContact }) => {
    return(
        <tr>
            <td>{ contact.name }</td>
            <td>{ contact.number }</td>
            <td><button onClick={eraseContact}>delete</button></td>
        </tr>
    )
}

const DisplayContacts = ({ contacts, eraseContact }) => {

    return(
        <table>
            <tbody>
                {contacts.map( (person) => 
                    <Contact key={person.id} contact={person} eraseContact={() => eraseContact(person.id)}/>
                )}
            </tbody>
        </table>
    )
}
    
export default DisplayContacts