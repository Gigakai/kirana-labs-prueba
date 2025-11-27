import React from 'react'

const Stats = ({totalContacts, contactsWithDuplicates}) => {

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        },
        title: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        subtitle: {
            fontSize: '1.5rem',
            fontWeight: 'normal',
            textAlign: 'start'
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Stats</h2>
            <div>
                <div>
                    <h3 style={styles.subtitle}>Total Contacts: {totalContacts}</h3>
                    <h3 style={styles.subtitle}>Contacts with Duplicates: {contactsWithDuplicates}</h3>
                </div>
            </div>
        </div>
    )
}
export default Stats
