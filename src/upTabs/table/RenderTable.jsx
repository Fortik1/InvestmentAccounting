import React, { useState, useEffect } from "react";
import axios from "axios";
import { uniqueId } from "lodash";
import RenderPagination from "./RenderPagination.jsx"
import RenderLimitList from "./RenderLimitList.jsx";
import filterData from "./filterData.js";

const getStyle = (key) => {
  switch (key.toLowerCase()) {
    case 'quantity':
      return 'rigthContent';
    case 'price':
      return 'rigthContent';
    case 'total amount':
      return 'rigthContent';
    default:
      return 'leftContent';
  }
};


const RenderTags = ({ tags }) => {
  return (
        <>
        <div className="tags">
        {Object.keys(tags).map((key) => 
          <div className={ getStyle(key) } key={uniqueId()}>
            {key}
          </div>
        )}
        </div>
        </>
  )
};

const RenderBody = ({ body }) => {
  return (
      <>
      {body.map((element) => 
        <div className="body" key={uniqueId()}>
          {Object.entries(element).map(([key, value]) => 
            <div className={ getStyle(key) } key={uniqueId()}>{value}</div>
          )}
        </div>
        )}
      </>
  )
};

const RenderTable = () => {
  const [reqData, setReqData] = useState({ page: 1, limit: 25, });

  useEffect(() => {
    const { page, limit } = reqData;
    const getData = async () => await axios.get(`http://localhost:8080/transactions?page=${page}&limit=${limit}`)
    .then(({ data }) => !!data.data && setReqData(filterData(data)));
    getData();
  }, [reqData.page, reqData.limit]);

  return (
      <>
      {reqData.data && 
        <>
        <div className="table">
          <RenderTags tags={reqData.data[0]}/>
          <RenderBody body={reqData.data} />
        </div>
        <div className="pagination-limit">
          {reqData.data.length !== 0 && 
            <tr>
              <th><RenderLimitList reqData={reqData} setReqData={setReqData} /></th>
              <th><RenderPagination reqData={reqData} setReqData={setReqData} /></th>
            </tr>}
        </div>
        </>
         || <div>Loaded</div>}
      </>
  );
};

export default RenderTable;
