import React from 'react';

const CompanyCell = ({ rowData }) => {
    return (
        <div className="company-cell">
            <div className="company-en">
                {rowData.N_COMPANY_E ?? "(ไม่มีข้อมูล)"}
            </div>
            <div className="company-th">
                {rowData.N_COMPANY_T  ?? "(ไม่มีข้อมูล)"}
            </div>
        </div>
    );
};

export default CompanyCell;