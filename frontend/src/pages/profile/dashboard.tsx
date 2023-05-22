import * as React from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Modal, Typography, FormControl, InputLabel, Input, InputAdornment, Select, SelectChangeEvent, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, ImageListItem } from "@mui/material";
import { List, Abc, Delete } from "@mui/icons-material";

interface MonitoringPointListData {
    id: string;
    name: string;
    sensorName: string;
    imageSource: string;
  }

function createMonitoringPointListData(
    id: string,
    name: string,
    sensorName: string,
    imageSource: string,
  ): MonitoringPointListData {
    return {
      id,
      name,
      sensorName,
      imageSource
    };
  }

  

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: '2px solid primary',
    boxShadow: 24,
    p: 4,
  };

export default function Dashboard() {

    //Modal's variables
    const [ addMonitoringPointModal, setAddMonitoringPointModal ] = React.useState(false);
    const [ addMachineModal, setAddMachineModal ] = React.useState(false);
    const [ listMonitoringPointsModal, setListMonitoringPointsModal ] = React.useState(false);
    //Create new Monitoring Point variables
    const [ selectedMachineId, setSelectedMachineId] = React.useState("");
    const [ selectedMachineName, setSelectedMachineName] = React.useState("");
    const [ selectedMachineType, setSelectedMachineType] = React.useState("");
    const [ newMonitoringPointType, setNewMonitoringPointType] = React.useState("");
    //Create new Machine variables
    const [ newMachineType, setNewMachineType] = React.useState("");
    //Select input variables
    const [ monitoringPointTypes, setMonitoringPointTypes] = React.useState(["TcAg", "TcAs", "HF+"]);
    const [ machineTypes, setMachineTypes] = React.useState(["Fan", "Pump"]);
    //Monitoring Point list variables
    const [ monitoringPointRows, setMonitoringPointRows] = React.useState([
        createMonitoringPointListData("12314", "Sensor Teste 2", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("45346", "Sensor Teste 3", "HF+", "/sensors/sensor-hf.png"),
        createMonitoringPointListData("12346346314", "Sensor Teste 4", "HF+", "/sensors/sensor-hf.png"),
    ]);

    //State management variables
    //Monitoring Point creation
    const handleMonitoringPointOpen = (machineId: string, machineName: string, machineType: string) => {
        setSelectedMachineId(machineId);
        setSelectedMachineName(machineName);
        setSelectedMachineType(machineType);

        machineType === "Pump" ? setMonitoringPointTypes(["HF+"] ) : setMonitoringPointTypes(["TcAg", "TcAs", "HF+"]) ;

        setAddMonitoringPointModal(true);   
    }
    const handleMonitoringPointClose = () => setAddMonitoringPointModal(false);
    const handleNewMonitoringTypeChange = (event: SelectChangeEvent) => {
        setNewMonitoringPointType(event.target.value as string);
    }
    //Machine
    const handleMachineOpen = () => setAddMachineModal(true);
    const handleMachineClose = () => setAddMachineModal(false);
    const handleNewMachineTypeChange = (event: SelectChangeEvent) => {
        setNewMachineType(event.target.value as string);
    }
    //Monitoring Point list
    const handleMonitoringPoingListOpen = (machineId: string, machineName: string, machineType: string) => {
        setSelectedMachineId(machineId);
        setSelectedMachineName(machineName);
        setSelectedMachineType(machineType);

        setListMonitoringPointsModal(true);   
    }
    const handleMonitoringPoingListClose = () => setListMonitoringPointsModal(false);
    

    const isMobile = false;

    return (
        <Box sx={{ display: "flex" }}>
            <Header></Header>
            { isMobile ? null : <Sidebar></Sidebar> }
            <Box component="main"  sx={{ flexGrow: 1, p: 3, marginTop: 7 }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h6">Minhas máquinas</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleMachineOpen();
                            }}
                        >
                            Adicionar Máquina
                        </Button>
                    </Grid>
                </Grid>
                <Grid 
                    container 
                    spacing={{ sm: 1, md: 2 }} columns={{ sm: 12, md: 4 }}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Nome da máquina
                                </Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography color="primary">
                                            Tipo da máquina
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="secondary">
                                            Pontos de monitoramento (0)
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            aria-label="Listar pontos de monitoramento"
                                            onClick={() => {
                                                handleMonitoringPoingListOpen("123", "Nome da máquina", "Fan");
                                            }}
                                        >
                                            <List></List>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions variant="align-right">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleMonitoringPointOpen("123", "Nome da máquina", "Fan");
                                    }}
                                >
                                    Adicionar Ponto de Monitoramento
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        alert("Deletou");
                                    }}
                                >
                                    Deletar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Modal
                open={addMonitoringPointModal}
                onClose={handleMonitoringPointClose}
                aria-labelledby="addMonitoringPointLabel"
                aria-describedby="addMonitoringPointDescription"
            >
                <Box sx={style}>
                  <Typography id="addMonitoringPointLabel" variant="h6" component="h2">
                    Adicione um Ponto de Monitoramento para a {selectedMachineName}
                  </Typography>
                  <FormControl fullWidth sx={{ m: 1, marginTop: 4 }}>
                        <InputLabel htmlFor="monitoringPoint-name">Nome do sensor</InputLabel>
                        <Input
                            id="monitoringPoint-name"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Abc />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="monitoringPoint-type">Tipo do sensor</InputLabel>
                        <Select
                            id="monitoringPoint-type"
                            value={newMonitoringPointType}
                            label="Tipo do sensor"
                            onChange={handleNewMonitoringTypeChange}
                        >
                            { monitoringPointTypes.map((type) => {
                                return (
                                    <MenuItem value={type}>{type}</MenuItem>
                                );
                            }) }
                        </Select>
                    </FormControl>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ marginTop: 4 }}
                    >
                        <Button
                                    variant="contained"
                                    onClick={() => {
                                        alert("Criou ponto");
                                    }}
                                >
                                    Adicionar
                                </Button>
                    </Grid>
                </Box>
            </Modal>
            <Modal
                open={addMachineModal}
                onClose={handleMachineClose}
                aria-labelledby="addMachineLabel"
                aria-describedby="addMachineDescription"
            >
                <Box sx={style}>
                  <Typography id="addMachineLabel" variant="h6" component="h2">
                    Adicione uma nova Máquina
                  </Typography>
                  <FormControl fullWidth sx={{ m: 1, marginTop: 4 }}>
                        <InputLabel htmlFor="machine-name">Nome da Máquina</InputLabel>
                        <Input
                            id="machine-name"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Abc />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="machine-type">Tipo da Máquina</InputLabel>
                        <Select
                            id="machine-type"
                            value={newMachineType}
                            label="Tipo do sensor"
                            onChange={handleNewMachineTypeChange}
                        >
                            { machineTypes.map((type) => {
                                return (
                                    <MenuItem value={type}>{type}</MenuItem>
                                );
                            }) }
                        </Select>
                    </FormControl>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ marginTop: 4 }}
                    >
                        <Button
                                    variant="contained"
                                    onClick={() => {
                                        alert("Criou máquina");
                                    }}
                                >
                                    Adicionar
                                </Button>
                    </Grid>
                </Box>
            </Modal>
            <Modal
                open={listMonitoringPointsModal}
                onClose={handleMonitoringPoingListClose}
                aria-labelledby="monitoringPointListLabel"
                aria-describedby="monitoringPointListDescription"
            >
                <Box sx={style}>
                    <Typography id="monitoringPointListLabel" variant="h6" component="h2">
                        Adicione uma nova Máquina
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                        <Table stickyHeader sx={{ minWidth: 600 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align="center">Tipo</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {monitoringPointRows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={4}>
                                                    <ImageListItem  sx={{ width: 50, height: 50 }}>
                                                        <img 
                                                            src={row.imageSource}
                                                            srcSet={row.imageSource}
                                                            alt={row.sensorName}
                                                            loading="lazy"
                                                        />
                                                    </ImageListItem>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    {row.sensorName}
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="Listar pontos de monitoramento"
                                                color="error"
                                                onClick={() => {
                                                    alert(row.id);
                                                }}
                                            >
                                                <Delete></Delete>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </Box>
    );
}