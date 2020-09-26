import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { HospitalHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';
import { ReactComponent as FolderIcon } from '../../assets/icons/folder.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './admin.module.scss';

const HospitalList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('staff')
      .then(response => {
        console.log(response);
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setData(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Hospital Staff List</h2>
        <Input />
        <Button type={ButtonTypes.primary} href="/app/admin/add">Add new staff</Button>
      </div>
      <div>
        <Card>
          {loading ? <Loader /> : data.length > 3 ?
            <Table
              data={data}
              headers={HospitalHeaders}
              renderRow={(row) => (
                <tr key={row.id}>
                  <td>{row.title}. {row.firstName} {row.lastName}</td>
                  <td>{row.accountId}</td>
                  <td>{row.phoneNumber}</td>
                  <td>{row.Role}</td>
                  <td><Button>Open</Button></td>
                </tr>
              )} /> : <div className={styles.cardBody}>
              <FolderIcon />
              <h3>Add new staff</h3>
            </div>
          }
        </Card>
      </div>
    </div>
  )
};

export default HospitalList;