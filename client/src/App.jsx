import {useState, useRef} from 'react'
import './App.css'
import {uploadContact} from "../services/contact.js";
import Stats from "../components/Stats.jsx";
import Table from "../components/Table.jsx";

function App() {
    // States
    const [contacts, setContacts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const fileRefInput = useRef(null)
    const [file, setFile] = useState(null)
    const [contactCount, setContactCount] = useState(0)
    const [duplicateCount, setDuplicateCount] = useState(0)
    const [errorFile, setErrorFile] = useState(null)

    // Methods
    const uploadCSV = async () => {
        try{
            if(!file) {
                setErrorFile("Please select a CSV file")
                return
            }
            setErrorFile(null)
            const formData = new FormData()
            formData.append('file', file)
            setIsLoading(true)

            const response = await uploadContact(formData)

            if(response?.data){
                setContacts(response.data.contacts)
                setDuplicateCount(response.data.stats.contactsWithDuplicates)
                setContactCount(response.data.stats.totalContacts)
                setIsLoading(false)
            }
        }catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h1>Kirana Labs Guide</h1>
            <div>
                <input type="file" accept=".csv" ref={fileRefInput} onChange={(e) => e.target.files[0] && setFile(e.target.files[0])}/>
                <button disabled={isLoading} onClick={uploadCSV}>{isLoading ? "Uploading..." : "Upload Contacts"}</button>
                {errorFile && <p style={{color: 'red'}}>{errorFile}</p>}
            </div>
            <Stats
                totalContacts={contactCount}
                contactsWithDuplicates={duplicateCount}
            />
            { contacts.length > 0 && <Table rows={contacts}/>}


        </>
    )
}

export default App
