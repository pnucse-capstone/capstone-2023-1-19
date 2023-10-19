import React, { useState, useEffect } from 'react';
import FilterForm from './FilterForm'
import GridComponent from './GridComponent'
import dayjs from 'dayjs';
import { apiBaseUrl } from 'config';

const SearchDashboard = ( ) => {
  const [ixData, setIxData] = useState([]);
  const [ixAsync, setIxAsync] = useState(false);
  const [txAsync, setTxAsync] = useState(false);
  const [mergeData, setMergeData] = useState([]);
  useEffect(() => {
    getCarList(false);
    getCarIxList();
  }, []);
  useEffect(() => {
    if (txAsync && ixAsync) {
      matchData();
    }
  }, [txAsync, ixAsync]);

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    status:'SellerRequest',
    priceFilter: false,
    mileageFilter: false,
    model: '',
    assignor: '',
    periodRangeStart: dayjs().subtract(1, "y").format('YYYY-MM-DD'),
    periodRangeEnd: dayjs().format('YYYY-MM-DD'),
    priceRangeStart: '',
    priceRangeEnd: '',
    mileageRangeStart: '',
    mileageRangeEnd: '',
  });

  const getData = (filterData) => {
    setFilters(filterData);
    console.log("in dashboard  ", filterData);
    getCarList(true);
  };

  const matchData = () => {
    const mergedData = data.map(item1 => {
      const matchingItemInData2 = ixData.find(item2 => item2.id === item1.id && item2.inspectionStatus);
      if (matchingItemInData2) {
        return item1;
      } else {
        return null; // data2에 해당 id를 가진 항목이 없는 경우
      }
    });
    const filteredMerge = mergedData.filter(row => row !== null);
    console.log("merge data  ", filteredMerge);
    setData(filteredMerge);
  };

  const getCarIxList = async () => {
    const url = `${apiBaseUrl}/car-info/inspec-all`;
    const json = await (
      await fetch(url, {
        method: "GET"
        })
      ).json();
    console.log("ix data  ",json);
    if (json.result == 'SUCCESS') {
      setIxData(json.data);
      setIxAsync(true);
      // alert("로그인");
    } else {
      // alert("로그인 실패");
    }
  };

  const getCarList = async (type) => {
    // console.log(localStorage.getItem('Authorization'));
    setTxAsync(false);
    const url = `${apiBaseUrl}/contract/get-contract`;
    const json = await (
      await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        },
          body: JSON.stringify({
            filter: type,
            priceFilter: filters.priceFilter,
            mileageFilter: filters.mileageFilter,
            model: filters.model,
            status: filters.status,
            assignor: filters.assignor,
            periodRangeStart: filters.periodRangeStart,
            periodRangeEnd: filters.periodRangeEnd,
            priceRangeStart: filters.priceRangeStart,
            priceRangeEnd: filters.priceRangeEnd,
            mileageRangeStart: filters.mileageRangeStart,
            mileageRangeEnd: filters.mileageRangeEnd,
          })
        })
      ).json();
    console.log(json);
    if (json.result == 'SUCCESS') {
      localStorage.getItem('Authorization', 'Bearer '+json.data.accessToken);
      setData(json.data);
      setTxAsync(true);
      // alert("로그인");
    } else {
      // alert("로그인 실패");
    }
  };

  return (
    <div>
      <FilterForm getData={getData} />
      <GridComponent data={data} setData={setData}/>
    </div>
  );
};

export default SearchDashboard;