import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import axios from 'axios'
import './todo.css';
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(#1bcdd7,#4153d3 )',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "auto",
    width: "350px",
    border: "1px solid white",
    position: "absolute",
    transform: "translate(-50 %, -50 %)",
    top: "50 %",
    left: "50 %",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "5px"
  },
  textfield: {
    width: "70%",
  },
  btn: {
    '& > *': {
      margin: theme.spacing(1),
      height: "39px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.danger,
    },
  },
  box: {
    width: "90%",
    height: "70px",
    backgroundColor: "#f1eeeab8",
    padding: "5px",
    margin: theme.spacing(1),
    alignItems: "center",
  },
  boxs: {
    width: "90%",
    height: "40px",
    padding: "5px",
    backgroundColor: "#f1eeeab8",
    margin: theme.spacing(1),
    alignItems: "center",
  },
  input: {
    float: "left"
  },
  btn5: {
    float: "right",
    marginTop: "3px"
  },
  btns: {
    float: "right",
    height: "40px",
    backgroundColor: "#f33636",
    padding: "0",
    marginLeft: " 3px"
  },
  btn2: {
    float: "right",
    height: "30px",
  },
  foot: {
    marginTop: "30px",
    width: "95%",
    marginLeft: "5px",
  },
  text: {
    float: "left",
    paddingTop: "10px"
  }
}

));

function Todo() {
  const [state, setstate] = useState([])
  const [addNew, setAddNew] = useState('')
  const [update, setupdate] = useState([])
  const [state1 , setstate1] = useState(false)
  const [ids , setids] = useState('');
  const classes = useStyles()
  let z = state?.length;
  const getData = () => {
    axios.get('http://localhost:5000/api/getnames').then(res => {
      if (res.data.success) {
        setstate(res.data.names)
      }
    }).catch(err => console.log(err.message))
  }
  useEffect(() => {
    getData()
  }, [])
  const clickhandler = () => {
    axios.post('http://localhost:5000/api/names', { name: addNew }).then(res => {
      if (res.data.success) setstate(res.data.names)
    }).catch(err => console.log(err.message))
  }
  const deletehandler = (idx) => {
    axios.delete(`http://localhost:5000/api/deletenames/${idx}`, {
      body: state[idx]
    })
      .then((response) => {
        console.log(response.data)
        setstate(response.data.names);
      });
  }
  const clearhandler = () => {
    axios.post('http://localhost:5000/api/clearnames', { name: "no tasks to show" }).then(res => {
      if (res.data.success) setstate(res.data.names)
    }).catch(err => console.log(err.message))
  }
  const edithandler = (idx) => {
    setids(idx);
setstate1(true);
  }
  const updatehandler = (idx) => {
    axios.post(`http://localhost:5000/api/updatename/${idx}`, { name: update })
      .then((response) => {
        console.log(response.data)
        setstate(response.data.names);
        setstate1(false);
      });
  }
  return (
    <Box className={classes.main}>
      <Box component="span" className={classes.container}>
        <Typography variant="h4" gutterBottom>Todo App</Typography>
        <Box className={classes.btn} >
          <TextField id="outlined-basic" label="Add your new Todo" size="small" variant="outlined" className={classes.textfield} onChange={(e) => setAddNew(e.target.value)} />
          <Button variant="contained" color="primary" size="large" onClick={clickhandler}  >
            <FontAwesomeIcon className={classes.btn} icon={faPlusSquare} />
          </Button>
        </Box>
        {state?.length ? state.map((item, idx) => (
          <Box key={idx} className={classes.box} >
            <Typography variant="body2" className={classes.text} gutterBottom >{item}</Typography>
            <Button variant="contained" color="primary" size="large" className={classes.btns} onClick={() => deletehandler(idx)} >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button variant="contained" color="secondary" size="large" className={classes.btns} onClick={()=>edithandler(idx)} >Edit</Button>
            {state1 && idx===ids ?
              <>
                <input type="text" placeholder="update data" className={classes.input} placeholder={item} onChange={(e) => setupdate(e.target.value)} />
                <button className={classes.btn5} onClick={() => updatehandler(idx)} >Update</button>
              </>
              : ""
            }
          </Box>
        )) : "No tasks for now"}
        <Box className={classes.foot}>
          <Typography variant="body2" paragraph>You have {z} pending tasks </Typography>
          <Button variant="contained" color="primary" className={classes.btn2} onClick={clearhandler}> Clear All</Button>
        </Box>
      </Box>
    </Box >
  );

}

export default Todo;