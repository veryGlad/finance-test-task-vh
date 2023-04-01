import './App.css';
import {Box, Button} from "@mui/material";
import Header from "./Components/Header";
import BasicTable from "./Components/BasicTable";
import Typography from "@mui/material/Typography";
import DiscreteSlider from "./Components/DiscreteSlider";

function App() {
  return (
      <Box>
          <Header/>
          <Box marginTop={2} marginBottom={2} marginRight={5} marginLeft={5.5} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems={"center"}>
                      <DiscreteSlider/>
                      <Typography color={"#505050"} fontWeight={"bold"} marginLeft={5}> Here you can change updating time interval</Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                      <Typography color={"#505050"} fontWeight={"bold"} marginRight={5}>Here you can set the list</Typography>
                      <Button variant={"contained"}>Set list</Button>
                  </Box>
          </Box>

          <BasicTable/>
      </Box>
  );
}

export default App;
