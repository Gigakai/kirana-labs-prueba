const Row = ({email, name, phone, isValidEmail, isValidPhone, hasDuplicates}) => {

    const styles = {
        duplicate: {
            background: 'red'
        },
        invalid: {
            background: 'yellow',
            fontWeight: 'bold',
            color: 'black'
        },
        valid: {
            color: 'white',
        }
    }
    return (
        <tr style={hasDuplicates ? styles.duplicate : {}}>
            <td style={isValidEmail ? styles.valid: styles.invalid } >{email}</td>
            <td>{name}</td>
            <td style={isValidPhone ? styles.valid: styles.invalid } >{phone}</td>
        </tr>
    )
}
export default Row
