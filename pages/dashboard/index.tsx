import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// Hooks
import {useRequest} from 'lib/hooks';
//endpoints
import {COMPANIES_LIST} from 'lib/constants/endpoints';
// lodash
import {debounce} from 'lodash';
//services
// import {APIFetcher} from 'lib/service';
import CompanyService from 'services/CompanyService';
// components
import {CompanyList} from 'components/tables';
import {CompanyForm, FilingForm} from 'components/forms';
// material ui
import {withStyles} from '@material-ui/core';
import {AddCircle, Close, Check, Search, CheckCircle} from '@material-ui/icons';
import {
  Grid,
  FormControl,
  Button,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  StepConnector,
  Box,
  OutlinedInput,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import {StepIconProps} from '@material-ui/core/StepIcon';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

//service instance creation
const companyService = new CompanyService();

export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
const DialogTitle = (props: DialogTitleProps) => {
  const {children, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className="dialog-header" {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className="closeButton" onClick={onClose}>
          <Close style={{color: 'white'}} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 6,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#ffffff',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

function QontoStepIcon(props: StepIconProps) {
  const {active, completed} = props;
  return (
    <div
      className={clsx('steproot', {
        ['stepactive']: active,
      })}
    >
      {completed ? <Check className="stepComplete" /> : <div className="stepcircle" />}
    </div>
  );
}

function getSteps() {
  return ['1', '2'];
}
const DashboardPage: FC = () => {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [tablelist, setTablelist] = React.useState(null);
  const steps = getSteps();

  // get companies list
  const {data: table_data}: any = useRequest({
    url: COMPANIES_LIST(page),
  });

  React.useEffect(() => {
    if (table_data && inputText == '') {
      setTablelist(table_data);
    }
  }, [table_data, inputText]);

  // method for open model
  const handleModalOpen = () => {
    setOpen(true);
  };

  // save company
  const SaveAndFiling = (data: any) => {
    setData(data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // method for close model
  const handleModalClose = () => {
    setShowSuccess(true);
    setActiveStep(0);
  };

  // cancel company creation
  const handleCancel = () => {
    setShowSuccess(false);
    setOpen(false);
    setActiveStep(0);
  };

  const handlePageNumber = (newPage: number) => {
    setPage(newPage + 1);
  };

  // call search api
  const updateQuery = () => {
    if (inputText !== '') {
      companyService.search(inputText).then((res) => {
        setTablelist(res);
        setPage(1);
      });
    }
  };
  const search = React.useCallback(debounce(updateQuery, 300), [inputText]);

  // get search keyword
  const handleSearch = (event: any) => {
    setInputText(event.target.value);
  };

  React.useEffect(() => {
    search();
    return search.cancel;
  }, [inputText, search]);

  // model steps
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CompanyForm
            SaveAndFiling={SaveAndFiling}
            handleClose={handleModalClose}
            handleCancel={handleCancel}
          />
        );
      case 1:
        return (
          <FilingForm
            companyInfo={data}
            handleClose={handleModalClose}
            handleCancel={handleCancel}
          />
        );
    }
  };

  // show successMsg on company creation
  const SuccessMessage = () => {
    return (
      <>
        <Card>
          <CardContent>
            <Box justifyContent="center">
              <Box display="flex" justifyContent="center" className="mt-3 mb-3">
                <CheckCircle style={{color: '#7EC17B', fontSize: '150px'}} />
              </Box>
              <Box display="flex" justifyContent="center" className="mt-3 mb-3">
                <Typography className="success-text">Company Created Successfully!</Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" className="w-100 pb-4">
              <Button
                variant="outlined"
                size="large"
                className="roundButton"
                onClick={() => {
                  setOpen(false), setShowSuccess(false);
                }}
              >
                Close
              </Button>
            </Box>
          </CardActions>
        </Card>
      </>
    );
  };

  return (
    <div className="pt-4 pb-4">
      <Grid className="contentBox">
        <Box display="flex">
          <Box>
            <FormControl className="searchtextField" variant="outlined">
              <OutlinedInput
                className="searchInput"
                id="outlined-adornment-search"
                value={inputText}
                startAdornment={
                  <InputAdornment position="end">
                    <Search className="search-icon" />{' '}
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'search',
                }}
                onChange={handleSearch}
                labelWidth={0}
                placeholder="Search by company name"
              />
            </FormControl>
          </Box>
          <Box ml="auto">
            <Button variant="contained" className="createbtn" onClick={handleModalOpen}>
              <AddCircle />
              &nbsp; Create Company
            </Button>
          </Box>
        </Box>
        {/* create company popup */}
        <Dialog
          className="dialog-form"
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          {showSuccess ? (
            <SuccessMessage />
          ) : (
            <>
              <DialogTitle id="form-dialog-title" onClose={handleCancel}>
                Create {activeStep == 0 ? 'Company' : 'Filing'}
                <Stepper
                  alternativeLabel
                  className="stepper"
                  activeStep={activeStep}
                  connector={<QontoConnector />}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </DialogTitle>
              <DialogContent>{getStepContent(activeStep)}</DialogContent>
            </>
          )}
        </Dialog>
        <div className="mt-3">
          <CompanyList
            data={{
              info: {count: tablelist?.info?.count || 0 + 1, pages: tablelist?.info?.pages || 1},
              results: [
                {
                  companyid: '15856',
                  name: 'Endo International plc',
                  documentid: [
                    {
                      cdnpath: '10001/2019/10218_2019Q4_ER_SEC_HTML.html',
                      documentid: 21304,
                      filedisplayname: '10218_2019Q4_ER_SEC_HTML.html',
                      filereceivedname: '10218_2019Q4_ER_SEC_HTML.html',
                      filereportedtime: '02/26/2020',
                      filingtypeid: 100423,
                      period: {
                        periodname: 'F4Q19',
                      },
                    },
                  ],

                  currency: {currencyname: 'USD'},
                },
                ...(tablelist?.results || []),
              ],
            }}
            pageNumber={page}
            handlePageNumber={handlePageNumber}
          />
        </div>
      </Grid>
    </div>
  );
};

export default DashboardPage;
