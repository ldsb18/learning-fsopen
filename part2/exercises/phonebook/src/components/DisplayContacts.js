const Contact = ({ contact }) => {
    return(
        <tr>
            <td>{ contact.name }</td>
            <td>{ contact.number }</td>
        </tr>
    )
}

const DisplayContacts = ({ contacts }) => {

    return(
        <table>
            <tbody>
                {contacts.map( (person) => 
                    <Contact key={person.id} contact={person} />
                )}
            </tbody>
        </table>
    )
}
    
export default DisplayContacts