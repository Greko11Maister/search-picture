import React, {Component} from 'react';
import Buscador from './components/Buscador'
import Resultado from './components/Resultado'
import socketIOClient from "socket.io-client";

class App extends Component {

  state = {
    termino : 'Café',
    imagenes:[],
   // endpoint: "http://192.168.88.50:9501",
    endpoint: "http://192.168.88.154:9978/front-admin",
    pagina:''
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("connect", data =>{
        console.log('Socket', data)
    });

    socket.on('saludo', (data)=> {
        console.log('// ', data)
        socket.emit('res_saludo',{message:" Hola Servidor"})
    })

    socket.on('my-message', (data)=> {
      console.group('Intevalo server')
      console.log('|__ ', data)
      console.groupEnd()
      socket.emit('res_saludo',{message:" Hola Servidor"})
  })

    setInterval(()=>{ 
      console.log('Saludando al servidor', socket)
      socket.emit("res_saludo",{message:" Hola Servidor"}); }, 7000)
  }

  scroll = () => {
    const elemt = document.querySelector('.jumbotron')
    elemt.scrollIntoView('smooth','start');
  }

  paginaAnterior = () => {
    console.log('anterior...')

    console.log('siguiente...')
    //leer el state de la pagina actual
    let pagina = this.state.pagina;
   
    if(pagina === 1) return null;
    // Resta uno a la pagina actual
    pagina-=1;
    
    this.setState({pagina},()=>{
      this.consultarAPI();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    console.log('siguiente...')
    //leer el state de la pagina actual
    let pagina = this.state.pagina;
   
    // Sumar uno a la pagina actual
    pagina++;
    
    this.setState({pagina},()=>{
      this.consultarAPI();
      this.scroll();
    });
  }

  consultarAPI = () =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=13090994-3018f8154f6f58573c60bbceb&q=${termino}&per_page=30&page=${pagina}`;

    fetch(url)
    .then(response => response.json())
    .then(resultado => {
      console.log('Resultado', resultado)
      this.setState({imagenes: resultado.hits })
    })
  }

  datosBusqueda = (termino) => {
    console.log('--> Datos Busqueda:', termino)
    this.setState({termino:termino, pagina:1},
      ()=> {
        this.consultarAPI()
      })
  }
  render(){
    return (
      <div className="container">
        <div className="jumbotron">
          <Buscador datosBusqueda={this.datosBusqueda}/>
        </div>
        <div className="row justify-content-center">
              <Resultado 
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}
              />
        </div>
      </div>
    );
  }
}

export default App;
