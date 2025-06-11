import React, {FC} from 'react';
// Hooks
import {useRequest} from 'lib/hooks';
import useSWR from 'swr';
// router
import {useRouter} from 'next/router';
// endpoints
import {COMPANIES_DETAIL} from 'lib/constants/endpoints';
// services
import StorageService from 'services/StorageService';
// componenet
import {PdfViewer} from 'components/elements';
// material UI
import {Box, Grid, Tab, Typography, Divider} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';

const PdfAnnotate: FC = () => {
  const [tabHeader, setTabHeader] = React.useState();
  const [pdfTab, setpdfTab] = React.useState('1');
  const [annotation, SetAnnotation] = React.useState(null);
  //service instance creation
  const storageService = new StorageService();

  const router = useRouter();
  const {company_id} = router.query;
  const {document_id} = router.query;

  // get companyDetail based on id
  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });

  const handlePdf = (event: any, newValue: any) => {
    setpdfTab(newValue);
  };

  // get localStorage values
  const getStorageInfo = () => {
    const data = storageService.getItem('normaliseannotate');
    SetAnnotation(data);
  };

  // tab Heads
  const getTabHeader = () => {
    const pdfFile = company_detail.documentid.filter((item: any) => item.documentid == document_id);
    return pdfFile[0].period.periodname;
  };
  useSWR('/', getStorageInfo, {
    refreshInterval: 3000,
  });
  React.useEffect(() => {
    window.addEventListener('storage', getStorageInfo);
  }, []);

  React.useEffect(() => {
    if (company_detail) {
      setTabHeader(getTabHeader());
    }
  }, [company_detail]);

  const pdfFile =
    company_detail &&
    company_detail.documentid.filter((item: any) => item.documentid == document_id);

  if (!company_detail) {
    return <>loading...</>;
  }
  const pdfPath = pdfFile[0].filedisplayname;

  return (
    <>
      <Box mb={4}>
        <div>
          <Box className="headerTop">
            <Box>
              <Typography className="companyHeading">
                <span style={{fontWeight: 400}}>{company_detail && company_detail.name} </span>
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Grid className="content-box">
            <Box style={{width: '100%', height: '100%'}}>
              <Grid style={{border: '1px solid #ADCDF0', paddingTop: '10px', background: '#fff'}}>
                <TabContext value={pdfTab}>
                  <TabList
                    onChange={handlePdf}
                    aria-label="simple tabs"
                    className="tabview"
                    TabIndicatorProps={{style: {background: 'transparent'}}}
                  >
                    <Tab className="tabList" label={tabHeader && tabHeader} value="1" />
                  </TabList>
                  <TabPanel value="1" style={{padding: '0'}}>
                    <Box className="">
                      <Grid className="pdfWrapper-normalised">
                        {annotation ? (
                          <PdfViewer
                            fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfPath}`}
                            annotationData={annotation}
                          />
                        ) : (
                          <PdfViewer
                            fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfPath}`}
                          />
                        )}
                      </Grid>
                    </Box>
                  </TabPanel>
                </TabContext>
              </Grid>
            </Box>
          </Grid>
        </div>
      </Box>
    </>
  );
};
export default PdfAnnotate;
