import React from 'react'

const Paginacion = (props) => {
    return(
        <div className="py-3">
            <button type="button" onClick={props.paginaAnterior} className="btn btn-info mr-1">Anterior &larr;</button>
            <button type="button" onClick={props.paginaSiguiente} className="btn btn-info">Siguiente &rarr;</button>
        </div>
    )
}

export default Paginacion;