import React, { useState, useEffect } from 'react';
import './App.css';
import './Components/Popup.css';
import './Components/CompanyCell.css';
import DataTable from 'react-data-table-component';
import Popup from './Components/Popup';
import CompanyCell from './Components/CompanyCell';
import { BsThreeDotsVertical } from "react-icons/bs";
import Nav from './Components/Nav';

function App() {
  // ประกาศ state
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const numRows = filteredItems.length;
  const [selectedRowData, setSelectedRowData] = useState(null);

  // เรียก api
  useEffect(() => {
    fetch("https://stockradars.co/assignment/data.php")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  useEffect(() => {
    // กรองข้อมูลที่มีเงื่อนไขตามคำค้นหา
    const filtered = items.filter(item =>
      item.N_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.N_COMPANY_E.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.N_COMPANY_T.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.N_URL.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filtered);
  }, [searchTerm, items]);

  // column
  const columns = [
    {
      name: 'Name',
      selector: row => row.N_name !== `` ? row.N_name : "(ไม่มีข้อมูล)",
      width: '100px'
    },
    {
      name: 'Company',
      cell: row => <CompanyCell rowData={row} />,
      width: '450px',
    },
    {
      name: 'URL',
      cell: row => (
        row.N_URL !== "" ? <a href={row.N_URL.startsWith('http') ? row.N_URL : `http://${row.N_URL}`} target="_blank" rel="noopener noreferrer">{row.N_URL}</a> : "(ไม่มีข้อมูล)"
      ),
      width: '270px'
    },
    {
      name: 'Marketcap',
      selector: row => {
        if (row.marketcap !== null) {
          const million = 1000000;
          const marketcapInMillion = row.marketcap / million;
          return `${marketcapInMillion.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M`;
        } else {
          return "(ไม่มีข้อมูล)";
        }
      }
    },
    {
      name: 'Action',
      cell: row => (
        <button className='btn-detail' onClick={() => setSelectedRowData(row)}><BsThreeDotsVertical /> </button>
      )
    },
  ];

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <div className="App">
        <Nav />
        <main>

          <h1>Data-Table</h1>
          <h5>{numRows} Company</h5>
          <input type='text' placeholder='Search...' className='searchInput' value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} />
          <DataTable className='table'
            columns={columns}
            data={filteredItems}
            pagination
          // data={items}

          />
        </main>

        {selectedRowData && (
          <Popup
            trigger={selectedRowData !== null}
            setTrigger={setSelectedRowData}
          >
            <div className='pop-head'>
              <h2>More detail</h2>
              <p>{selectedRowData.N_fullname ?? "(ไม่มีข้อมูล)"}</p><br />
            </div><br />
            <div className='pop-grid'>
              <div className='pop-item'>
                Short name:
                <p>{selectedRowData.N_shortname ?? "(ไม่มีข้อมูล)"}</p>
              </div>

              <div className='pop-item'>
                FType:
                <p>{selectedRowData.F_TYPE ?? "(ไม่มีข้อมูล)"}</p>
              </div>
            </div><br />
            <div className='pop-item2'>Business Type EN:
              <p>{selectedRowData.N_BUSINESS_TYPE_E ?? "(ไม่มีข้อมูล)"}</p>
            </div><br />
            <div className='pop-item2'>Business Type TH:
              <p>{selectedRowData.N_BUSINESS_TYPE_T ?? "(ไม่มีข้อมูล)"}</p>
            </div>
          </Popup>
        )}

      </div>
    );
  }
}

export default App;
