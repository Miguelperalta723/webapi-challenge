import React, {useState , useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projects , setProjects] = useState([]);
  const [project , setProject] = useState({name: '', description: ''});

  useEffect(()=>{
    axios.get('http://localhost:7000/api/projects')
    .then(res => {
      setProjects(res.data)
    })
    .catch( err => {
      console.log(err)
    })
  }, [])


  const handleChange = (e) => {
    setProject({...project, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/api/projects' , project)
    .then(res => {
      console.log(res)
    })
  }


  console.log(project)
  return (
    <div className="App">
      <h2>Add a Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <input 
            name='name'
            type='text'
            placeholder='project name'
            value={project.value}
            onChange={handleChange}
          />
        </label>
        <label>
          description
          <input 
            name='description'
            type='text'
            placeholder='description'
            value={project.value}
            onChange={handleChange}
          />
        </label>
        <button>add</button>
      </form>
      <h1>Projects</h1>
      {projects.map(project => {
        return (<div className='project-details' key={project.id}>
           <h3>{project.name}</h3>
           <p>{project.description}</p>
        </div>)
       
      })}
    </div>
  );
}

export default App;

