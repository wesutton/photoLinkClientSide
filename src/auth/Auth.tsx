import * as React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Paper from "@material-ui/core/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import './Auth.css'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Auth: React.FC<{updateToken: (newtoken: any) => void}> = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent | string, newValue: number) => {
    setValue(newValue);
  };

  const paperStyle = { width: "fit-content", margin: "20px auto", };
  const tabstyle = {marginLeft:'80px',};

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
  <div className="auth-background">
    
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        style={tabstyle}
      >
        <Tab label="Sign In" {...a11yProps(0)} />

        <Tab label="Sign Up" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} updateToken={props.updateToken} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup updateToken={props.updateToken} />
      </TabPanel>
    </Paper></div>
  );
};

export default Auth;
