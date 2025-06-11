import React, {FC} from 'react';
import {Box, Tab, Tabs, Typography, Card, Grid} from '@material-ui/core';

import tables from 'lib/constants/tables.json';
import _ from 'lodash';
import MaterialTable from 'material-table';

import {PdfViewer} from 'components/elements';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TimeseriesData: FC = () => {
  const [value, setValue] = React.useState(0);
  const [tableData, setTableData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [annotation, setAnnotation] = React.useState(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const UpdateData = () => {
    let data = [];

    _.map(tables.tables[value].sections, ({text: sectionText, columns: colArr, dataItems}) => {
      const columns = _.map(colArr, (col) => col.text);
      const columnSize = colArr.length;

      const values = _.map(dataItems, ({text: colText, values}) => {
        const obj: any = {};
        for (let i = 0; i < columnSize; i++) {
          obj[columns[i]] = {
            value: values[i]?.value.toLocaleString().replace('-', ''),
            location: values[i]?.location,
          };
        }
        return {section: colText, ...obj};
      });
      data = [...data, {section: sectionText, header: true}, ...values];
    });
    setTableData(data);
  };

  React.useEffect(() => {
    UpdateData();
  }, [value]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <img
          src="https://raw.githubusercontent.com/soulpage/image-assets/master/pdf.svg"
          className="pdf-icon"
          height={50}
          width={50}
          style={{cursor: 'pointer'}}
          onClick={() => setShow(!show)}
        ></img>
      </Box>

      <Grid container>
        <Grid item xs={show ? 6 : 12}>
          <Box sx={{width: '100%'}} p={1}>
            <Card>
              <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {_.map(tables.tables, (item, index) => {
                    return <Tab label={item.text} key={index} />;
                  })}
                </Tabs>
              </Box>
              {_.map(tables.tables, (item, index) => {
                return (
                  <TabPanel value={value} index={index} key={index}>
                    <MaterialTable
                      columns={[
                        {
                          title: '',
                          field: 'section',
                        },
                        ..._.map(item?.sections[0].columns, (col) => {
                          return {
                            title: col.text,
                            field: col.text,
                            render: (rowData) => {
                              return (
                                <span
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                    setAnnotation({
                                      parseddata: {
                                        ...rowData[col.text].location,
                                        pagenumber: rowData[col.text].location.page,
                                      },
                                      value: rowData[col.text].value,
                                    });
                                    localStorage.setItem(
                                      'normaliseannotate',
                                      JSON.stringify({
                                        parseddata: {
                                          ...rowData[col.text].location,
                                          pagenumber: rowData[col.text].location.page,
                                        },
                                        value: rowData[col.text].value,
                                      })
                                    );
                                    setShow(true);
                                  }}
                                >
                                  {rowData[col.text]?.value}
                                </span>
                              );
                            },
                          };
                        }),
                      ]}
                      data={tableData}
                      options={{
                        search: false,
                        paging: false,
                      }}
                    />
                  </TabPanel>
                );
              })}
            </Card>
          </Box>
        </Grid>
        {show && (
          <Grid item xs={6} style={{position: 'relative'}}>
            <Box sx={{width: '100%'}} p={1}>
              <PdfViewer
                fileUrl="https://libero-notes.s3.ap-south-1.amazonaws.com/output.pdf"
                annotationData={annotation}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default TimeseriesData;
