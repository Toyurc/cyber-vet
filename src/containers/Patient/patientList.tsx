import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { PatientHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './patient.module.scss';
import dashboardStyles from '../Dashboard/dashboard.module.scss';
import Router from 'next/router';

const PatientList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('patients')
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setData(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }, []);

  const checkIn = (id: string) => {
    setLoading(true);
    requestClient.put(`/patients/${id}/check-in`)
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          Router.push(`/app/patient/checkin/${id}`);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }

  const checkOut = (id: string) => {
    setLoading(true);
    requestClient.put(`/patients/${id}/check-out`)
      .then((response) => {
        console.log(response);

        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          Router.push(`/app/dashboard`);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }
  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Patient List</h2>
        <div className={dashboardStyles.searchBar}>
          <SearchIcon />
          <Input
            placeholder="Search for clients or Patients"
          />
        </div>
        <Button type={ButtonTypes.primary} href="/app/patient/add/client">Add new patient</Button>
      </div>
      <div>
        <Card>
          {loading ? <Loader /> :
            data.length > 0 ?
              <Table
                data={data}
                headers={PatientHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row?.client?.title}. {row?.client?.firstName} {row?.client?.lastName}</td>
                    <td>{row.name}</td>
                    <td>{row.specie}</td>
                    <td>{row.breed}</td>
                    <td>{
                      // TODO: add roles and permissions
                      actionButton(row.checkedIn, row.id, checkIn, checkOut)
                    }</td>
                  </tr>
                )} /> : <h2>No Patient Record Found</h2>
          }
        </Card>
      </div>
    </div>
  )
};

export const actionButton = (checkedIn: boolean, id: string, checkIn: (id: string) => void, checkOut: (id: string) => void, hideEdit?: boolean) => {
  if (!checkedIn) {
    return (
      <div style={{ display: 'flex' }}>
        {!hideEdit && <Button href={`/app/patient/edit/${id}`}>Edit</Button>}
        &nbsp;&nbsp;<Button onClick={() => checkIn(id)}>Check In</Button>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex' }}>
        { !hideEdit && <Button href={`/app/patient/edit/${id}`}>Edit</Button>}
        &nbsp;&nbsp;<Button onClick={() => checkOut(id)}>Check Out</Button>
      </div>
    )
  }
};

export default PatientList;
