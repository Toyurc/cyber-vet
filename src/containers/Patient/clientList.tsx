import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { ClientHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './patient.module.scss';
import dashboardStyles from '../Dashboard/dashboard.module.scss';

const ClientList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('clients')
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
  },[]);
  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Client List</h2>
        <div className={dashboardStyles.searchBar}>
        <SearchIcon />
          <Input 
            placeholder="Search for clients"
          />
          </div>
        <Button type={ButtonTypes.primary} href="/app/patient/add/client">Add new clients</Button>
      </div>
      <div>
        <Card>
        {loading ? <Loader /> :
          <Table
            data={data}
            headers={ClientHeaders}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}. {row.firstName} {row.lastName}</td>
                <td>{row.address}</td>
                <td>{row.phoneNumber}</td>
                <td><Button href={`/app/client/edit/${row.id}`}>edit</Button> <Button href={`/app/client/${row.id}`} >Open</Button></td>
              </tr>
            )} />
          }
        </Card>
      </div>
    </div>
  )
};

export default ClientList;
