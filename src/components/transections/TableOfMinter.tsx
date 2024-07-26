import { LANG } from "@/constant/language";
import useLocalization from "@/lib/UseLocalization";
import { Col, Table } from "react-bootstrap";
import Link from 'next/link';
import { USERPROFILELINK } from "@/constant/routes";

export default function TableItemOfMinter({ currentItems }: { currentItems: any }) {
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <Col xl='12' lg='12'>
      <div className='full-div'>
        <div className='table-container lg'>
          <div className='table-inner-container'>
            <Table striped hover className='article-table transTable'>
              <thead>
                <tr>
                  <th>
                    <p>User</p>
                  </th>

                  <th>
                    {' '}
                    <p>Minting Amount </p>
                  </th>
                  <th className=''>
                    {' '}
                    <p>Date </p>
                  </th>
                  <th className=''>
                    {' '}
                    <p>Time </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link
                          href={USERPROFILELINK + item?.user}
                          target='_blank'
                          className='myUserLink'
                        >
                          {item?.name.slice(0, 75)}
                          {item?.name.length > 75 && '...'}{' '}
                        </Link>
                      </td>

                      <td>{item?.tokens}</td>
                      <td>{item?.date}</td>
                      <td>{item?.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Col>
  );
}