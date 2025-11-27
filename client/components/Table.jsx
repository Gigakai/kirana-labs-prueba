import Row from "./Row.jsx";

const Table = ({rows}) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                {rows.map((row, index) =>
                    <Row
                        key={index}
                        email={row.email}
                        name={row.name}
                        phone={row.phone}
                        isValidEmail={row.isValidEmail}
                        isValidPhone={row.isValidPhone}
                        hasDuplicates={row.hasDuplicates}
                    />
                )}
                </tbody>
            </table>
        </div>
    )
}
export default Table
